/**
 * Họ và tên: Lê Nhựt Huy
 * Mã SV: CE200376
 * Lớp: SE1910
 */

/**
 * Component Modal: Khung popup tái sử dụng cho các biểu mẫu thêm mới hoặc chỉnh sửa dữ liệu
 * 
 * @param {Object} props - Các thuộc tính truyền vào
 * @param {boolean} props.isOpen - Trạng thái hiển thị modal (true: mở, false: đóng)
 * @param {string} props.title - Tiêu đề của modal
 * @param {Function} props.onClose - Hàm callback xử lý khi đóng modal
 * @param {React.ReactNode} props.children - Nội dung JSX bên trong modal (thường là form nhập liệu)
 */
function Modal({ isOpen, title, onClose, children }) {
  // Nếu isOpen là false thì không render component ra giao diện
  if (!isOpen) return null;

  return (
    // Lớp overlay nền tối mờ, nhấn vào overlay để đóng modal
    <div className="modal-overlay" onClick={onClose}>
      {/* Khung chứa nội dung chính, chặn sự kiện click lan truyền ra ngoài overlay */}
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header của modal chứa tiêu đề và nút đóng (x) */}
        <div className="modal-header">
          <h3>{title}</h3>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Thân modal chứa các trường nhập liệu hoặc nội dung con */}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
