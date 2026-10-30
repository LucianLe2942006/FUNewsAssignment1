/**
 * Họ và tên: Lê Nhựt Huy
 * Mã SV: CE200376
 * Lớp: SE1910
 */

import { useState } from "react";
import Modal from "../components/common/Modal";
import ConfirmDialog from "../components/common/ConfirmDialog";

/**
 * Component CategoryManagement: Trang quản lý danh mục tin tức (CRUD + Tìm kiếm + Ràng buộc dữ liệu)
 * 
 * @param {Object} props - Các props truyền vào component
 * @param {Array} props.categories - Danh sách danh mục hiện tại
 * @param {Function} props.setCategories - Hàm setter cập nhật danh sách danh mục
 * @param {Array} props.news - Danh sách tin tức (dùng để kiểm tra ràng buộc khóa ngoại trước khi xóa danh mục)
 */
function CategoryManagement({ categories, setCategories, news = [] }) {
  // State lưu từ khóa tìm kiếm theo tên danh mục
  const [searchTerm, setSearchTerm] = useState("");

  // State kiểm soát việc hiển thị modal Thêm/Sửa danh mục
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State xác định chế độ modal: "create" (tạo mới) hoặc "update" (chỉnh sửa)
  const [modalMode, setModalMode] = useState("create");

  // State lưu đối tượng danh mục đang được chọn để chỉnh sửa
  const [selectedCategory, setSelectedCategory] = useState(null);

  // State quản lý dữ liệu nhập liệu trên Form (name: tên danh mục, status: trạng thái)
  const [formData, setFormData] = useState({ name: "", status: 1 });

  // State lưu thông báo lỗi kiểm tra dữ liệu của Form
  const [formError, setFormError] = useState("");

  // State lưu đối tượng danh mục đang được chọn để xóa
  const [deleteTarget, setDeleteTarget] = useState(null);

  // State kiểm soát hiển thị popup xác nhận xóa
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // State lưu thông báo lỗi ràng buộc quan hệ dữ liệu (khi danh mục còn chứa bài viết thì không cho xóa)
  const [relationError, setRelationError] = useState("");

  /**
   * Mở modal ở chế độ tạo mới danh mục
   */
  const handleOpenCreate = () => {
    setModalMode("create");
    setSelectedCategory(null);
    setFormData({ name: "", status: 1 });
    setFormError("");
    setIsModalOpen(true);
  };

  /**
   * Mở modal ở chế độ chỉnh sửa thông tin danh mục
   * @param {Object} category - Danh mục cần chỉnh sửa
   */
  const handleOpenEdit = (category) => {
    setModalMode("update");
    setSelectedCategory(category);
    setFormData({ name: category.name, status: category.status });
    setFormError("");
    setIsModalOpen(true);
  };

  /**
   * Đóng modal và reset trạng thái biểu mẫu
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setFormData({ name: "", status: 1 });
    setFormError("");
  };

  /**
   * Xử lý gửi biểu mẫu Thêm mới / Cập nhật danh mục
   * @param {React.FormEvent} e - Sự kiện form submit
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();

    // Ràng buộc: Tên danh mục không được để trống
    if (!trimmedName) {
      setFormError("Category name is required.");
      return;
    }

    if (modalMode === "create") {
      // Tính ID kế tiếp dựa trên ID lớn nhất hiện tại
      const nextId = categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1;
      const newCategory = {
        id: nextId,
        name: trimmedName,
        status: Number(formData.status)
      };
      // Thêm danh mục mới vào danh sách
      setCategories([...categories, newCategory]);
    } else if (modalMode === "update" && selectedCategory) {
      // Cập nhật thông tin danh mục đã chọn
      const updatedCategories = categories.map((cat) =>
        cat.id === selectedCategory.id
          ? { ...cat, name: trimmedName, status: Number(formData.status) }
          : cat
      );
      setCategories(updatedCategories);
    }

    // Đóng modal sau khi lưu thành công
    handleCloseModal();
  };

  /**
   * Mở hộp thoại xác nhận xóa danh mục
   * Có kiểm tra ràng buộc toàn vẹn dữ liệu: Không cho xóa nếu có bài viết đang liên kết với danh mục này
   * @param {Object} category - Danh mục muốn xóa
   */
  const handleOpenDelete = (category) => {
    // Lọc tìm các bài viết đang thuộc danh mục này
    const linkedNews = news.filter((n) => n.categoryId === category.id);
    if (linkedNews.length > 0) {
      // Hiển thị thông báo lỗi ràng buộc toàn vẹn
      setRelationError(
        `Cannot delete "${category.name}" because it is currently linked to ${linkedNews.length} news article(s). Please reassign or delete associated articles first.`
      );
      // Tự động ẩn thông báo lỗi sau 5 giây
      setTimeout(() => setRelationError(""), 5000);
      return;
    }

    // Nếu không có bài viết liên kết, cho phép mở popup xác nhận xóa
    setRelationError("");
    setDeleteTarget(category);
    setIsConfirmOpen(true);
  };

  /**
   * Xác nhận thực hiện xóa danh mục khỏi danh sách
   */
  const handleConfirmDelete = () => {
    if (deleteTarget) {
      const updatedCategories = categories.filter((c) => c.id !== deleteTarget.id);
      setCategories(updatedCategories);
    }
    setIsConfirmOpen(false);
    setDeleteTarget(null);
  };

  /**
   * Hủy bỏ thao tác xóa danh mục
   */
  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setDeleteTarget(null);
  };

  // Chuẩn hóa từ khóa tìm kiếm
  const normalizedSearch = searchTerm.trim().toLowerCase();

  // Danh sách danh mục được lọc theo từ khóa tìm kiếm
  const displayedCategories = categories.filter((cat) =>
    (cat.name || "").toLowerCase().includes(normalizedSearch)
  );

  return (
    <div className="page-container">
      {/* Header trang danh mục và nút Thêm mới */}
      <div className="page-header">
        <div>
          <h2>Category Management</h2>
          <p className="page-subtitle">Manage news categories and their active status</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleOpenCreate}>
          + Add Category
        </button>
      </div>

      {/* Hiển thị lỗi ràng buộc dữ liệu nếu danh mục đang có bài viết liên kết */}
      {relationError && <div className="alert alert-error">{relationError}</div>}

      {/* Thanh tìm kiếm */}
      <div className="table-controls">
        <div className="search-bar">
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search category by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setSearchTerm("")}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Bảng dữ liệu danh mục */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedCategories.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty-state">
                  {searchTerm
                    ? `No categories found matching "${searchTerm}".`
                    : "No categories available."}
                </td>
              </tr>
            ) : (
              displayedCategories.map((cat) => (
                <tr key={cat.id}>
                  <td>#{cat.id}</td>
                  <td className="font-medium">{cat.name}</td>
                  <td>
                    <span
                      className={`badge ${
                        cat.status === 1 ? "badge-success" : "badge-secondary"
                      }`}
                    >
                      {cat.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="text-right table-actions">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline"
                      onClick={() => handleOpenEdit(cat)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger-outline"
                      onClick={() => handleOpenDelete(cat)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Thêm mới / Cập nhật Category */}
      <Modal
        isOpen={isModalOpen}
        title={modalMode === "create" ? "Create Category" : "Edit Category"}
        onClose={handleCloseModal}
      >
        <form onSubmit={handleFormSubmit} className="modal-form">
          {formError && <div className="alert alert-error">{formError}</div>}

          <div className="form-group">
            <label htmlFor="categoryName">Category Name *</label>
            <input
              id="categoryName"
              type="text"
              className="form-input"
              placeholder="e.g. Technology, Education"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (formError) setFormError("");
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoryStatus">Status</label>
            <select
              id="categoryStatus"
              className="form-select"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: Number(e.target.value) })
              }
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {modalMode === "create" ? "Create" : "Save Changes"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Hộp thoại xác nhận xóa Category */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete Category"
        message={`Are you sure you want to delete the category "${deleteTarget?.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default CategoryManagement;
