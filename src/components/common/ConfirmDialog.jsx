/**
 * Họ và tên: Lê Nhựt Huy
 * Mã SV: CE200376
 * Lớp: SE1910
 */

/**
 * Component ConfirmDialog: Hộp thoại xác nhận các thao tác nguy hiểm (ví dụ: Xóa, Reset)
 * 
 * @param {Object} props - Các props truyền vào component
 * @param {boolean} props.isOpen - Trạng thái hiển thị hộp thoại (true: hiển thị, false: ẩn)
 * @param {string} [props.title="Confirm Action"] - Tiêu đề của hộp thoại
 * @param {string} props.message - Nội dung lời nhắn/câu hỏi xác nhận
 * @param {Function} props.onConfirm - Hàm callback được gọi khi người dùng bấm xác nhận (Delete/Confirm)
 * @param {Function} props.onCancel - Hàm callback được gọi khi người dùng bấm hủy hoặc đóng hộp thoại
 */
function ConfirmDialog({ isOpen, title = "Confirm Action", message, onConfirm, onCancel }) {
  // Nếu isOpen là false thì không render gì cả (ẩn hộp thoại)
  if (!isOpen) return null;

  return (
    // Lớp phủ nền mờ (overlay), click vào nền sẽ gọi onCancel để đóng popup
    <div className="modal-overlay" onClick={onCancel}>
      {/* Khung nội dung hộp thoại, e.stopPropagation() để ngăn click bên trong làm đóng modal */}
      <div className="modal-container confirm-modal" onClick={(e) => e.stopPropagation()}>
        {/* Phần tiêu đề và nút đóng (x) */}
        <div className="modal-header">
          <h3>{title}</h3>
          <button type="button" className="modal-close-btn" onClick={onCancel}>
            &times;
          </button>
        </div>

        {/* Phần nội dung thông báo xác nhận */}
        <div className="modal-body">
          <p className="confirm-message">{message}</p>
        </div>

        {/* Phần các nút hành động (Hủy / Đồng ý xóa) */}
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
