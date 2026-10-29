/**
 * Họ và tên: Lê Nhựt Huy
 * Mã SV: CE200376
 * Lớp: SE1910
 */

import Header from "./Header";
import Sidebar from "./Sidebar";

function AdminLayout({ currentUser, onLogout, activeMenu, onSelectMenu, children }) {
  return (
    <div className="admin-layout">
      <Header currentUser={currentUser} onLogout={onLogout} />
      <div className="admin-body">
        <Sidebar activeMenu={activeMenu} onSelectMenu={onSelectMenu} />
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
