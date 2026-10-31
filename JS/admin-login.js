'use strict';
(() => {
  const form = document.getElementById('admin-login-form');
  const password = document.getElementById('admin-password');
  const toggle = document.getElementById('toggle-password');
  toggle.addEventListener('click', () => {
    const show = password.type === 'password';
    password.type = show ? 'text' : 'password';
    toggle.setAttribute('aria-pressed', String(show));
    toggle.setAttribute('aria-label', show ? 'Ẩn mật khẩu' : 'Hiện mật khẩu');
  });
  form.noValidate = true;
  form.addEventListener('submit', event => {
    event.preventDefault();
    // Đăng nhập mô phỏng: nhận tài khoản bất kỳ, không gửi hoặc lưu thông tin.
    window.location.assign('dashboard.html');
  });
  document.getElementById('forgot-password').addEventListener('click', () => {
    const message = document.getElementById('login-message');
    message.hidden = false;
    message.textContent = 'Vui lòng liên hệ người quản lý hệ thống để được hỗ trợ truy cập.';
  });
})();
