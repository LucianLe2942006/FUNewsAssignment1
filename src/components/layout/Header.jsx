/**
 * Họ và tên: Lê Nhựt Huy
 * Mã SV: CE200376
 * Lớp: SE1910
 */

import logo from "../../assets/logo.png";

/**
 * Component Header: Thanh tiêu đề nằm ở trên cùng của giao diện quản trị
 * 
 * @param {Object} props - Các props truyền vào Header
 * @param {Object} props.currentUser - Đối tượng thông tin người dùng đang đăng nhập
 * @param {Function} props.onLogout - Hàm callback kích hoạt khi nhấn nút Logout
 */
function Header({ currentUser, onLogout }) {
  return (
    <header className="app-header">
      {/* Khối thương hiệu gồm logo và tên hệ thống tin tức */}
      <div className="header-brand">
        <img src={logo} alt="FUNews Logo" className="header-logo" />
        <span className="header-title">FUNewsManagementSystem</span>
      </div>

      {/* Khối tài khoản người dùng và nút đăng xuất */}
      <div className="header-user-info">
        {/* Badge hiển thị tên người dùng hiện tại */}
        <span className="user-badge">
          {currentUser?.username || "Admin"}
        </span>

        {/* Nút bấm đăng xuất khỏi hệ thống */}
        <button type="button" className="btn btn-outline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
