/**
 * Họ và tên: Lê Nhựt Huy
 * Mã SV: CE200376
 * Lớp: SE1910
 */

import { useState } from "react";
import ConfirmDialog from "../components/common/ConfirmDialog";

/**
 * Component SettingsPage: Trang cài đặt hệ thống, hồ sơ quản trị viên và khôi phục dữ liệu ban đầu
 * 
 * @param {Object} props - Các props truyền vào component
 * @param {Object} props.currentUser - Thông tin tài khoản người dùng hiện tại
 * @param {Function} props.onResetData - Hàm callback đặt lại dữ liệu mẫu ban đầu từ App
 */
function SettingsPage({ currentUser, onResetData }) {
  // State lưu tên hệ thống ứng dụng
  const [systemName, setSystemName] = useState("FUNewsManagementSystem");

  // State lưu email liên hệ quản trị
  const [contactEmail, setContactEmail] = useState("admin@funews.edu.vn");

  // State kiểm soát hiển thị banner thông báo lưu cài đặt thành công
  const [saveSuccess, setSaveSuccess] = useState(false);

  // State kiểm soát việc hiển thị popup xác nhận Reset toàn bộ dữ liệu
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  /**
   * Xử lý lưu các thiết lập tùy chỉnh của hệ thống
   * @param {React.FormEvent} e - Sự kiện form submit
   */
  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    // Tự động ẩn banner thông báo thành công sau 3 giây
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  /**
   * Xác nhận khôi phục toàn bộ danh mục, tin tức và tài khoản về dữ liệu mẫu mặc định
   */
  const handleConfirmReset = () => {
    onResetData(); // Kích hoạt callback reset dữ liệu ở App component
    setIsResetConfirmOpen(false); // Đóng popup xác nhận
    setSaveSuccess(true); // Hiển thị thông báo thành công
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="page-container">
      {/* Tiêu đề trang Cài đặt */}
      <div className="page-header">
        <div>
          <h2>System Settings</h2>
          <p className="page-subtitle">Configure application settings and view system profile</p>
        </div>
      </div>

      {/* Banner thông báo cập nhật thành công */}
      {saveSuccess && (
        <div className="alert alert-success">Settings have been successfully updated!</div>
      )}

      {/* Lưới các khối thiết lập */}
      <div className="settings-grid">
        {/* Khối thông tin hồ sơ Quản trị viên và thông tin sinh viên thực hiện */}
        <div className="settings-card">
          <h3>Administrator Profile</h3>
          <div className="profile-details">
            <div className="profile-row">
              <span className="profile-label">Current User:</span>
              <span className="profile-value">{currentUser?.username || "Admin"}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">System Role:</span>
              <span className="profile-value">
                <span className="badge badge-primary">
                  {currentUser?.role === 1 ? "Administrator" : "Staff"}
                </span>
              </span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Student:</span>
              <span className="profile-value">Lê Nhựt Huy (CE200376)</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Class Code:</span>
              <span className="profile-value">SE1910</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Course:</span>
              <span className="profile-value">SBA301 - Single Page Application with Spring Boot</span>
            </div>
          </div>
        </div>

        {/* Khối cài đặt thông số cấu hình ứng dụng */}
        <div className="settings-card">
          <h3>Application Preferences</h3>
          <form onSubmit={handleSaveSettings} className="settings-form">
            <div className="form-group">
              <label htmlFor="sysName">System Name</label>
              <input
                id="sysName"
                type="text"
                className="form-input"
                value={systemName}
                onChange={(e) => setSystemName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactMail">Contact Email</label>
              <input
                id="contactMail"
                type="email"
                className="form-input"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Save Preferences
            </button>
          </form>
        </div>

        {/* Khối quản lý và khôi phục dữ liệu gốc */}
        <div className="settings-card">
          <h3>Data Management</h3>
          <p className="settings-description">
            Reset all categories, news articles, and user accounts back to original default seed data.
          </p>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setIsResetConfirmOpen(true)}
          >
            Reset to Default Seed Data
          </button>
        </div>
      </div>

      {/* Hộp thoại xác nhận thao tác Reset dữ liệu */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        title="Reset All Data"
        message="Are you sure you want to reset all data to default mock records? Any custom categories, news, and users created will be restored."
        onConfirm={handleConfirmReset}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
}

export default SettingsPage;
