/**
 * Họ và tên: Lê Nhựt Huy
 * Mã SV: CE200376
 * Lớp: SE1910
 */

import { useState } from "react";
import Modal from "../components/common/Modal";
import ConfirmDialog from "../components/common/ConfirmDialog";

/**
 * Component UserManagement: Quản lý tài khoản người dùng hệ thống (CRUD + Kiểm tra trùng Username + Phân quyền)
 * 
 * @param {Object} props - Các props truyền vào component
 * @param {Array} props.users - Danh sách người dùng hiện tại
 * @param {Function} props.setUsers - Hàm setter cập nhật danh sách người dùng
 * @param {Object} props.currentUser - Thông tin tài khoản người dùng đang đăng nhập
 */
function UserManagement({ users, setUsers, currentUser }) {
  // State lưu từ khóa tìm kiếm theo tên đăng nhập (username)
  const [searchTerm, setSearchTerm] = useState("");

  // State kiểm soát việc hiển thị modal Thêm/Sửa người dùng
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State xác định chế độ modal: "create" (tạo mới tài khoản) hoặc "update" (chỉnh sửa tài khoản)
  const [modalMode, setModalMode] = useState("create");

  // State lưu người dùng đang được chọn để chỉnh sửa
  const [selectedUser, setSelectedUser] = useState(null);

  // State quản lý dữ liệu nhập liệu trên Form
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: 2, // Mặc định role = 2 (Staff)
    status: 1 // Mặc định status = 1 (Active)
  });

  // State lưu thông báo lỗi kiểm tra hợp lệ của form (bỏ trống, trùng lặp username, v.v.)
  const [formError, setFormError] = useState("");

  // State lưu người dùng đang được chọn để xóa
  const [deleteTarget, setDeleteTarget] = useState(null);

  // State kiểm soát hiển thị popup xác nhận xóa người dùng
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  /**
   * Mở modal ở chế độ tạo tài khoản mới
   */
  const handleOpenCreate = () => {
    setModalMode("create");
    setSelectedUser(null);
    setFormData({
      username: "",
      password: "",
      role: 2,
      status: 1
    });
    setFormError("");
    setIsModalOpen(true);
  };

  /**
   * Mở modal ở chế độ chỉnh sửa thông tin tài khoản
   * @param {Object} user - Tài khoản cần sửa
   */
  const handleOpenEdit = (user) => {
    setModalMode("update");
    setSelectedUser(user);
    setFormData({
      username: user.username,
      password: user.password,
      role: user.role,
      status: user.status
    });
    setFormError("");
    setIsModalOpen(true);
  };

  /**
   * Đóng modal và đặt lại dữ liệu form
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setFormData({
      username: "",
      password: "",
      role: 2,
      status: 1
    });
    setFormError("");
  };

  /**
   * Xử lý gửi biểu mẫu Thêm mới / Cập nhật tài khoản
   * @param {React.FormEvent} e - Sự kiện form submit
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const trimmedUsername = formData.username.trim();
    const trimmedPassword = formData.password.trim();

    // Ràng buộc: Username và Password không được để trống
    if (!trimmedUsername || !trimmedPassword) {
      setFormError("Both Username and Password are required.");
      return;
    }

    // Kiểm tra trùng tên đăng nhập:
    // Nếu tạo mới: không được trùng với bất kỳ user nào trong hệ thống
    // Nếu cập nhật: không được trùng với user khác (ngoại trừ chính tài khoản đang sửa)
    const duplicateUser = users.find(
      (u) =>
        (u.username || "").toLowerCase() === trimmedUsername.toLowerCase() &&
        (modalMode === "create" || u.id !== selectedUser?.id)
    );

    if (duplicateUser) {
      setFormError("Username is already taken. Please choose another.");
      return;
    }

    if (modalMode === "create") {
      // Tự động sinh ID kế tiếp
      const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      const newUser = {
        id: nextId,
        username: trimmedUsername,
        password: trimmedPassword,
        role: Number(formData.role),
        status: Number(formData.status)
      };
      // Thêm tài khoản mới vào danh sách users
      setUsers([...users, newUser]);
    } else if (modalMode === "update" && selectedUser) {
      // Cập nhật tài khoản hiện tại
      const updatedUsers = users.map((u) =>
        u.id === selectedUser.id
          ? {
              ...u,
              username: trimmedUsername,
              password: trimmedPassword,
              role: Number(formData.role),
              status: Number(formData.status)
            }
          : u
      );
      setUsers(updatedUsers);
    }

    // Đóng modal sau khi hoàn thành
    handleCloseModal();
  };

  /**
   * Mở hộp thoại xác nhận xóa tài khoản
   * @param {Object} user - Tài khoản muốn xóa
   */
  const handleOpenDelete = (user) => {
    setDeleteTarget(user);
    setIsConfirmOpen(true);
  };

  /**
   * Xác nhận thực hiện xóa tài khoản khỏi danh sách
   */
  const handleConfirmDelete = () => {
    if (deleteTarget) {
      const updatedUsers = users.filter((u) => u.id !== deleteTarget.id);
      setUsers(updatedUsers);
    }
    setIsConfirmOpen(false);
    setDeleteTarget(null);
  };

  /**
   * Hủy bỏ thao tác xóa tài khoản
   */
  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setDeleteTarget(null);
  };

  // Chuẩn hóa từ khóa tìm kiếm
  const normalizedSearch = searchTerm.trim().toLowerCase();

  // Danh sách tài khoản được lọc theo từ khóa tìm kiếm
  const displayedUsers = users.filter((u) =>
    (u.username || "").toLowerCase().includes(normalizedSearch)
  );

  return (
    <div className="page-container">
      {/* Tiêu đề trang và nút thêm tài khoản */}
      <div className="page-header">
        <div>
          <h2>User Management</h2>
          <p className="page-subtitle">Manage system accounts, user roles, and access status</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleOpenCreate}>
          + Add User
        </button>
      </div>

      {/* Thanh tìm kiếm tài khoản */}
      <div className="table-controls">
        <div className="search-bar">
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search by username..."
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

      {/* Bảng dữ liệu người dùng */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-state">
                  {searchTerm
                    ? `No users found matching "${searchTerm}".`
                    : "No users available."}
                </td>
              </tr>
            ) : (
              displayedUsers.map((user) => (
                <tr key={user.id}>
                  <td>#{user.id}</td>
                  <td className="font-medium">
                    {user.username}{" "}
                    {/* Đánh dấu badge (You) nếu dòng này là tài khoản đang đăng nhập */}
                    {(currentUser?.username || "").toLowerCase() === (user.username || "").toLowerCase() && (
                      <span className="badge badge-info">(You)</span>
                    )}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === 1 ? "badge-primary" : "badge-purple"
                      }`}
                    >
                      {user.role === 1 ? "Admin" : "Staff"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        user.status === 1 ? "badge-success" : "badge-secondary"
                      }`}
                    >
                      {user.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="text-right table-actions">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline"
                      onClick={() => handleOpenEdit(user)}
                    >
                      Edit
                    </button>
                    {/* Nút xóa bị vô hiệu hóa (disabled) nếu là tài khoản đang đăng nhập để tránh tự xóa chính mình */}
                    <button
                      type="button"
                      className="btn btn-sm btn-danger-outline"
                      onClick={() => handleOpenDelete(user)}
                      disabled={(currentUser?.username || "").toLowerCase() === (user.username || "").toLowerCase()}
                      title={
                        (currentUser?.username || "").toLowerCase() === (user.username || "").toLowerCase()
                          ? "Cannot delete current logged-in user"
                          : "Delete user"
                      }
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

      {/* Modal Thêm mới / Cập nhật tài khoản */}
      <Modal
        isOpen={isModalOpen}
        title={modalMode === "create" ? "Create User Account" : "Edit User Account"}
        onClose={handleCloseModal}
      >
        <form onSubmit={handleFormSubmit} className="modal-form">
          {formError && <div className="alert alert-error">{formError}</div>}

          {/* Ô nhập Username */}
          <div className="form-group">
            <label htmlFor="userUsername">Username *</label>
            <input
              id="userUsername"
              type="text"
              className="form-input"
              placeholder="e.g. alex_admin"
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
                if (formError) setFormError("");
              }}
            />
          </div>

          {/* Ô nhập Password */}
          <div className="form-group">
            <label htmlFor="userPassword">Password *</label>
            <input
              id="userPassword"
              type="password"
              className="form-input"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                if (formError) setFormError("");
              }}
            />
          </div>

          {/* Chọn Role và Status */}
          <div className="form-row">
            <div className="form-group form-col">
              <label htmlFor="userRole">Role</label>
              <select
                id="userRole"
                className="form-select"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: Number(e.target.value) })
                }
              >
                <option value={1}>Admin (Role 1)</option>
                <option value={2}>Staff (Role 2)</option>
              </select>
            </div>
            <div className="form-group form-col">
              <label htmlFor="userStatus">Status</label>
              <select
                id="userStatus"
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
          </div>

          {/* Nút hành động trong Modal */}
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

      {/* Hộp thoại xác nhận xóa tài khoản */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete User Account"
        message={`Are you sure you want to delete the user account "${deleteTarget?.username}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default UserManagement;
