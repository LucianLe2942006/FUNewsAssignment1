/**
 * Họ và tên: Lê Nhựt Huy
 * Mã SV: CE200376
 * Lớp: SE1910
 */

import { useState } from "react";
import logo from "../assets/logo.png";

/**
 * Component LoginPage: Giao diện và logic xác thực đăng nhập tài khoản
 * 
 * @param {Object} props - Các props truyền vào LoginPage
 * @param {Function} props.onLogin - Hàm callback truyền từ App để xử lý khi đăng nhập thành công
 * @param {Array} props.users - Danh sách người dùng hiện có trong hệ thống
 */
function LoginPage({ onLogin, users = [] }) {
  // State lưu giá trị ô nhập tên đăng nhập
  const [username, setUsername] = useState("");

  // State lưu giá trị ô nhập mật khẩu
  const [password, setPassword] = useState("");

  // State lưu thông báo lỗi hiển thị cho người dùng (nếu có)
  const [error, setError] = useState("");

  /**
   * Xử lý sự kiện khi người dùng nhấn submit biểu mẫu đăng nhập
   * @param {React.FormEvent} e - Sự kiện form submit
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn trình duyệt reload lại trang

    // Chuẩn hóa loại bỏ khoảng trắng thừa đầu và cuối
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    // Kiểm tra tính hợp lệ: không được để trống tài khoản hoặc mật khẩu
    if (!trimmedUser || !trimmedPass) {
      setError("Please enter both username and password.");
      return;
    }

    // Trường hợp kiểm tra tài khoản mặc định của Admin (Admin / Admin)
    if (trimmedUser === "Admin" && trimmedPass === "Admin") {
      setError(""); // Xóa thông báo lỗi nếu có trước đó
      // Tìm tài khoản Admin trong mảng users hoặc gán đối tượng Admin mặc định
      const adminUser = users.find((u) => (u.username || "").toLowerCase() === "admin") || {
        id: 1,
        username: "Admin",
        role: 1,
        status: 1
      };
      // Gọi callback thông báo cho App biết đăng nhập thành công
      onLogin(adminUser);
      return;
    }

    // Tìm kiếm tài khoản trùng khớp tên đăng nhập và mật khẩu trong danh sách users
    const matchedUser = users.find(
      (u) => (u.username || "").toLowerCase() === trimmedUser.toLowerCase() && u.password === trimmedPass
    );

    if (matchedUser) {
      // Nếu tài khoản đã bị khóa (status = 0), chặn không cho đăng nhập
      if (matchedUser.status === 0) {
        setError("This account is currently inactive.");
        return;
      }
      setError(""); // Xóa lỗi
      onLogin(matchedUser); // Gọi callback truyền thông tin user đăng nhập lên App
    } else {
      // Trường hợp không tìm thấy tài khoản hoặc sai mật khẩu
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Phần thương hiệu gồm logo, tên hệ thống và mô tả */}
        <div className="login-brand">
          <img src={logo} alt="FUNews Logo" className="login-logo" />
          <h2>FUNewsManagementSystem</h2>
          <p className="login-subtitle">Sign in to access management portal</p>
        </div>

        {/* Hiển thị banner thông báo lỗi khi có lỗi đăng nhập */}
        {error && <div className="alert alert-error">{error}</div>}

        {/* Form đăng nhập */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Ô nhập Username */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="form-input"
              placeholder="Enter username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError(""); // Tự động ẩn lỗi khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

          {/* Ô nhập Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(""); // Tự động ẩn lỗi khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

          {/* Nút bấm Sign In */}
          <button type="submit" className="btn btn-primary btn-block">
            Sign In
          </button>

          {/* Gợi ý thông tin tài khoản đăng nhập mặc định */}
          <div className="login-hint">
            <span>Default credentials: <strong>Admin</strong> / <strong>Admin</strong></span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
