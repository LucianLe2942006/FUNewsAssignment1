/**
 * Họ và tên: Lê Nhựt Huy
 * Mã SV: CE200376
 * Lớp: SE1910
 */

/**
 * Danh sách danh mục mẫu ban đầu (Default Categories)
 * - id: Mã định danh danh mục
 * - name: Tên danh mục
 * - status: Trạng thái (1: Đang hoạt động / Active, 0: Ngưng hoạt động / Inactive)
 */
export const defaultCategories = [
  { id: 1, name: "Technology", status: 1 },
  { id: 2, name: "Campus Life", status: 1 },
  { id: 3, name: "Academic", status: 1 },
  { id: 4, name: "Events", status: 0 }
];

/**
 * Danh sách bài viết tin tức mẫu ban đầu (Default News)
 * - id: Mã định danh bài viết
 * - title: Tiêu đề bài viết
 * - content: Nội dung bài viết
 * - categoryId: Khóa ngoại liên kết tới danh mục (Category)
 * - createdBy: Tên người tạo bài viết
 * - status: Trạng thái (1: Xuất bản / Active, 0: Ẩn / Inactive)
 */
export const defaultNews = [
  {
    id: 1,
    title: "Spring Boot 3.4 Integration Guide Released",
    content: "Detailed walkthrough for connecting React SPA frontend with Spring Boot backend services.",
    categoryId: 1,
    createdBy: "Admin",
    status: 1
  },
  {
    id: 2,
    title: "FPT University Welcomes New Semester",
    content: "Campus events and orientation schedules for students entering the Fall term.",
    categoryId: 2,
    createdBy: "Admin",
    status: 1
  },
  {
    id: 3,
    title: "Midterm Project Presentation Guidelines",
    content: "Evaluation criteria and rubrics for single page application presentations.",
    categoryId: 3,
    createdBy: "Staff",
    status: 1
  },
  {
    id: 4,
    title: "Annual Sports Festival Postponed",
    content: "Due to facility upgrades, the sports festival will be held next month.",
    categoryId: 4,
    createdBy: "Staff",
    status: 0
  }
];

/**
 * Danh sách tài khoản người dùng mẫu ban đầu (Default Users)
 * - id: Mã định danh tài khoản
 * - username: Tên đăng nhập
 * - password: Mật khẩu
 * - role: Phân quyền (1: Quản trị viên / Admin, 2: Nhân viên / Staff)
 * - status: Trạng thái tài khoản (1: Kích hoạt / Active, 0: Bị khóa / Inactive)
 */
export const defaultUsers = [
  { id: 1, username: "Admin", password: "Admin", role: 1, status: 1 },
  { id: 2, username: "john_staff", password: "123", role: 2, status: 1 },
  { id: 3, username: "mary_editor", password: "123", role: 2, status: 1 },
  { id: 4, username: "guest_user", password: "123", role: 2, status: 0 }
];

/**
 * Hàm tiện ích lấy dữ liệu từ localStorage
 * @param {string} key - Tên khóa lưu trữ trong localStorage
 * @param {*} fallback - Giá trị mặc định trả về nếu khóa chưa tồn tại hoặc parse lỗi
 * @returns {*} Dữ liệu đã parse từ JSON hoặc giá trị fallback
 */
export function getStoredData(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Hàm tiện ích lưu dữ liệu vào localStorage
 * @param {string} key - Tên khóa lưu trữ trong localStorage
 * @param {*} value - Giá trị cần lưu (sẽ được chuyển đổi thành chuỗi JSON)
 */
export function setStoredData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to save to localStorage", error);
  }
}
