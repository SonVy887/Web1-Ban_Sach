'use strict';
(() => {
  const dialog = document.getElementById('od-dialog');
  const heading = document.getElementById('od-dialog-title');
  const content = document.getElementById('od-dialog-content');
  const chat = document.getElementById('od-chat-form');
  const confirmButton = document.getElementById('od-confirm-action');
  let opener;
  let pendingAction = null;
  function show(title, lines, mode = '') {
    if (!dialog.open) opener = document.activeElement;
    heading.textContent = title;
    content.replaceChildren();
    lines.forEach(line => {
      const p = document.createElement('p'); p.textContent = line; content.append(p);
    });
    chat.hidden = mode !== 'chat'; chat.reset();
    confirmButton.hidden = mode !== 'confirm';
    if (mode !== 'confirm') pendingAction = null;
    if (!dialog.open) dialog.showModal();
  }
  function notify(message) { show('Thao tác thành công', [message]); }
  function confirmAction(title, message, success) {
    show(title, [message], 'confirm'); pendingAction = success;
  }
  document.addEventListener('click', event => {
    if (event.target.closest('[data-od-close]')) { dialog.close(); return; }
    const button = event.target.closest('[data-od-action]');
    if (!button) return;
    event.preventDefault();
    switch (button.dataset.odAction) {
      case 'print': notify('In đơn hàng thành công.'); break;
      case 'invoice': notify('Tải hóa đơn #VAT-8942 thành công.'); break;
      case 'call': show('Liên hệ tiệm sách', ['Tổng đài hỗ trợ: 1900 6868', 'Thời gian hỗ trợ: 08:00 – 21:30 hằng ngày.']); break;
      case 'cancel': confirmAction('Xác nhận hủy đơn hàng', 'Cậu muốn hủy đơn hàng #SV-8942?', 'Hủy đơn hàng thành công.'); break;
      case 'tracking': show('Theo dõi vận chuyển', ['Mã vận đơn: VN8921820 · VNPost Express', 'Đơn hàng #SV-8942 đang được đóng gói.', 'Dự kiến giao: 18/05/2025.']); break;
      case 'chat': show('Nhắn thủ quán', ['Tiệm sách hỗ trợ cậu về đơn hàng #SV-8942.'], 'chat'); break;
    }
  });
  confirmButton.addEventListener('click', () => {
    if (pendingAction) notify(pendingAction);
  });
  chat.addEventListener('submit', event => { event.preventDefault(); notify('Gửi lời nhắn thành công.'); });
  dialog.addEventListener('close', () => { pendingAction = null; opener?.focus(); });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  // Tất cả thao tác là mô phỏng, không lưu hay thay đổi dữ liệu đơn hàng.
})();
