/**
 * Họ và tên: Lê Nhựt Huy
 * Mã SV: CE200376
 * Lớp: SE1910
 */

import Header from "./Header";
import Sidebar from "./Sidebar";

/**
 * Component AdminLayout: Bố cục khung sườn chung cho trang quản trị (gồm Header, Sidebar và vùng nội dung chính)
 * 
 * @param {Object} props - Các props truyền vào layout
 * @param {Object} props.currentUser - Thông tin tài khoản người dùng hiện tại
 * @param {Function} props.onLogout - Hàm callback xử lý đăng xuất
 * @param {string} props.activeMenu - Mã menu đang kích hoạt
 * @param {Function} props.onSelectMenu - Hàm callback thay đổi trang/menu được chọn
 * @param {React.ReactNode} props.children - Nội dung trang con tương ứng với menu được chọn
 */
function AdminLayout({ currentUser, onLogout, activeMenu, onSelectMenu, children }) {
  return (
    <div className="admin-layout">
      {/* Thanh đầu trang hiển thị thương hiệu và thông tin người dùng */}
      <Header currentUser={currentUser} onLogout={onLogout} />

      {/* Thân trang quản trị: chia làm cột Sidebar bên trái và Content bên phải */}
      <div className="admin-body">
        {/* Menu điều hướng bên trái */}
        <Sidebar activeMenu={activeMenu} onSelectMenu={onSelectMenu} />

        {/* Khu vực hiển thị nội dung của từng trang quản lý */}
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
