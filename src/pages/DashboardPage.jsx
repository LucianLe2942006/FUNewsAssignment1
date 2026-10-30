/**
 * Họ và tên: Lê Nhựt Huy
 * Mã SV: CE200376
 * Lớp: SE1910
 */

/**
 * Component DashboardPage: Trang bảng điều khiển hiển thị thống kê tổng quan và danh sách bài viết mới
 * 
 * @param {Object} props - Các props truyền vào trang Dashboard
 * @param {Array} props.categories - Danh sách toàn bộ danh mục
 * @param {Array} props.news - Danh sách toàn bộ bài viết tin tức
 * @param {Array} props.users - Danh sách toàn bộ tài khoản người dùng
 */
function DashboardPage({ categories = [], news = [], users = [] }) {
  // Biến đếm số lượng danh mục đang hoạt động (status = 1)
  const activeCategoriesCount = categories.filter((c) => c.status === 1).length;

  // Biến đếm số lượng danh mục đã ngưng hoạt động (status = 0)
  const inactiveCategoriesCount = categories.filter((c) => c.status === 0).length;

  // Biến đếm số lượng bài viết đang ở trạng thái kích hoạt / hiển thị (status = 1)
  const activeNewsCount = news.filter((n) => n.status === 1).length;

  // Biến đếm số lượng bài viết đang ở trạng thái ẩn (status = 0)
  const inactiveNewsCount = news.filter((n) => n.status === 0).length;

  // Biến đếm số lượng tài khoản quản trị viên (role = 1)
  const adminUsersCount = users.filter((u) => u.role === 1).length;

  // Biến đếm số lượng tài khoản nhân viên (role = 2)
  const staffUsersCount = users.filter((u) => u.role === 2).length;

  /**
   * Hàm trợ giúp tra cứu tên danh mục từ categoryId
   * @param {number} categoryId - Mã danh mục cần tìm
   * @returns {string} Tên danh mục hoặc "Uncategorized" nếu không tìm thấy
   */
  const getCategoryName = (categoryId) => {
    const found = categories.find((c) => c.id === categoryId);
    return found ? found.name : "Uncategorized";
  };

  return (
    <div className="page-container">
      {/* Tiêu đề trang Dashboard */}
      <div className="page-header">
        <div>
          <h2>Dashboard Overview</h2>
          <p className="page-subtitle">Summary metrics and system status</p>
        </div>
      </div>

      {/* Lưới các thẻ thống kê tổng quan (Cards) */}
      <div className="stats-grid">
        {/* Thẻ thống kê Danh mục (Categories) */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Categories</span>
          </div>
          <div className="stat-value">{categories.length}</div>
          <div className="stat-breakdown">
            <span className="badge badge-success">{activeCategoriesCount} Active</span>
            <span className="badge badge-secondary">{inactiveCategoriesCount} Inactive</span>
          </div>
        </div>

        {/* Thẻ thống kê Bài viết tin tức (News Articles) */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">News Articles</span>
          </div>
          <div className="stat-value">{news.length}</div>
          <div className="stat-breakdown">
            <span className="badge badge-success">{activeNewsCount} Active</span>
            <span className="badge badge-secondary">{inactiveNewsCount} Inactive</span>
          </div>
        </div>

        {/* Thẻ thống kê Tài khoản người dùng (Accounts) */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Accounts</span>
          </div>
          <div className="stat-value">{users.length}</div>
          <div className="stat-breakdown">
            <span className="badge badge-primary">{adminUsersCount} Admin</span>
            <span className="badge badge-purple">{staffUsersCount} Staff</span>
          </div>
        </div>
      </div>

      {/* Phần hiển thị danh sách các bài viết gần đây */}
      <div className="dashboard-section">
        <h3>Recent Articles</h3>
        {news.length === 0 ? (
          <div className="empty-state">No articles available.</div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Lấy 5 bài viết đầu tiên để hiển thị rút gọn trên Dashboard */}
                {news.slice(0, 5).map((item) => (
                  <tr key={item.id}>
                    <td>#{item.id}</td>
                    <td className="font-medium">{item.title}</td>
                    <td>
                      <span className="badge badge-info">{getCategoryName(item.categoryId)}</span>
                    </td>
                    <td>{item.createdBy}</td>
                    <td>
                      <span className={`badge ${item.status === 1 ? "badge-success" : "badge-secondary"}`}>
                        {item.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
