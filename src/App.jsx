/**
 * Họ và tên: Lê Nhựt Huy
 * Mã SV: CE200376
 * Lớp: SE1910
 */

import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./components/layout/AdminLayout";
import DashboardPage from "./pages/DashboardPage";
import CategoryManagement from "./pages/CategoryManagement";
import NewsManagement from "./pages/NewsManagement";
import UserManagement from "./pages/UserManagement";
import SettingsPage from "./pages/SettingsPage";
import {
  defaultCategories,
  defaultNews,
  defaultUsers,
  getStoredData,
  setStoredData
} from "./data/initialData";

/**
 * Component App: Component gốc quản lý toàn bộ luồng dữ liệu và điều hướng trang
 */
function App() {
  // State lưu thông tin người dùng hiện đang đăng nhập (null nếu chưa đăng nhập)
  const [currentUser, setCurrentUser] = useState(() =>
    getStoredData("funews_auth", null)
  );

  // State lưu trữ menu/trang hiện tại đang được chọn (dashboard, category, news, users, settings)
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // State danh sách các danh mục (Categories), khởi tạo từ localStorage hoặc danh sách mặc định
  const [categories, setCategories] = useState(() =>
    getStoredData("funews_categories", defaultCategories)
  );

  // State danh sách các bài viết tin tức (News), khởi tạo từ localStorage hoặc danh sách mặc định
  const [news, setNews] = useState(() =>
    getStoredData("funews_news", defaultNews)
  );

  // State danh sách người dùng hệ thống (Users), khởi tạo từ localStorage hoặc danh sách mặc định
  const [users, setUsers] = useState(() =>
    getStoredData("funews_users", defaultUsers)
  );

  // Tự động đồng bộ danh sách danh mục vào localStorage mỗi khi state categories thay đổi
  useEffect(() => {
    setStoredData("funews_categories", categories);
  }, [categories]);

  // Tự động đồng bộ danh sách bài viết vào localStorage mỗi khi state news thay đổi
  useEffect(() => {
    setStoredData("funews_news", news);
  }, [news]);

  // Tự động đồng bộ danh sách người dùng vào localStorage mỗi khi state users thay đổi
  useEffect(() => {
    setStoredData("funews_users", users);
  }, [users]);

  // Tự động đồng bộ thông tin tài khoản đăng nhập hiện tại vào localStorage
  useEffect(() => {
    setStoredData("funews_auth", currentUser);
  }, [currentUser]);

  /**
   * Xử lý đăng nhập thành công
   * @param {Object} user - Đối tượng thông tin người dùng vừa đăng nhập
   */
  const handleLogin = (user) => {
    setCurrentUser(user); // Lưu thông tin người dùng vào state
    setActiveMenu("dashboard"); // Chuyển hướng người dùng về trang tổng quan (Dashboard)
  };

  /**
   * Xử lý đăng xuất khỏi hệ thống
   */
  const handleLogout = () => {
    setCurrentUser(null); // Đưa user về null để quay lại màn hình Login
    localStorage.removeItem("funews_auth"); // Xóa session đăng nhập khỏi localStorage
  };

  /**
   * Đặt lại (reset) toàn bộ dữ liệu ứng dụng về dữ liệu mẫu ban đầu
   */
  const handleResetData = () => {
    // Cập nhật lại các state về mảng mặc định ban đầu
    setCategories(defaultCategories);
    setNews(defaultNews);
    setUsers(defaultUsers);

    // Ghi đè lại dữ liệu vào localStorage
    setStoredData("funews_categories", defaultCategories);
    setStoredData("funews_news", defaultNews);
    setStoredData("funews_users", defaultUsers);
  };

  // Nếu chưa đăng nhập (currentUser = null), render màn hình LoginPage
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} users={users} />;
  }

  // Khi đã đăng nhập, render giao diện quản trị AdminLayout kèm các trang chức năng tương ứng
  return (
    <AdminLayout
      currentUser={currentUser}
      onLogout={handleLogout}
      activeMenu={activeMenu}
      onSelectMenu={setActiveMenu}
    >
      {/* Trang thống kê và thông số tổng quan hệ thống */}
      {activeMenu === "dashboard" && (
        <DashboardPage
          categories={categories}
          news={news}
          users={users}
        />
      )}

      {/* Trang quản lý danh mục tin tức */}
      {activeMenu === "category" && (
        <CategoryManagement
          categories={categories}
          setCategories={setCategories}
          news={news}
        />
      )}

      {/* Trang quản lý bài viết tin tức */}
      {activeMenu === "news" && (
        <NewsManagement
          news={news}
          setNews={setNews}
          categories={categories}
          currentUser={currentUser}
        />
      )}

      {/* Trang quản lý tài khoản người dùng */}
      {activeMenu === "users" && (
        <UserManagement
          users={users}
          setUsers={setUsers}
          currentUser={currentUser}
        />
      )}

      {/* Trang cấu hình hệ thống và hồ sơ admin */}
      {activeMenu === "settings" && (
        <SettingsPage
          currentUser={currentUser}
          onResetData={handleResetData}
        />
      )}
    </AdminLayout>
  );
}

export default App;
