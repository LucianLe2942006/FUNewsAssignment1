/**
 * Họ và tên: Lê Nhựt Huy
 * Mã SV: CE200376
 * Lớp: SE1910
 */

/**
 * Component Sidebar: Thanh điều hướng bên trái chứa danh sách các menu chức năng
 * 
 * @param {Object} props - Các props truyền vào Sidebar
 * @param {string} props.activeMenu - Key của mục menu hiện đang được chọn
 * @param {Function} props.onSelectMenu - Hàm callback khi click chọn mục menu khác
 */
function Sidebar({ activeMenu, onSelectMenu }) {
  // Danh sách các mục menu điều hướng trong hệ thống
  const menuItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "category", label: "Category" },
    { key: "news", label: "News" },
    { key: "users", label: "Users" },
    { key: "settings", label: "Settings" }
  ];

  return (
    <aside className="app-sidebar">
      <nav className="sidebar-nav">
        {/* Lặp qua danh sách menuItems để sinh các nút bấm menu */}
        {menuItems.map((item) => (
          <button
            key={item.key}
            type="button"
            // Gán thêm class 'active' nếu mục này đang được chọn
            className={`nav-item ${activeMenu === item.key ? "active" : ""}`}
            // Khi click, gọi callback để cập nhật activeMenu ở component App
            onClick={() => onSelectMenu(item.key)}
          >
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
