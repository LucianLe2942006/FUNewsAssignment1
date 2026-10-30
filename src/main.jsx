/**
 * Họ và tên: Lê Nhựt Huy
 * Mã SV: CE200376
 * Lớp: SE1910
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

/**
 * Điểm khởi chạy chính (entry point) của ứng dụng React:
 * Gắn kết component gốc <App /> vào thẻ div#root trong file index.html
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
