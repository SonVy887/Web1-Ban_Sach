'use strict';
(() => {
  const toast = document.getElementById('od-toast');
  const dialog = document.getElementById('od-dialog');
  const heading = document.getElementById('od-dialog-title');
  const content = document.getElementById('od-dialog-content');
  const chat = document.getElementById('od-chat-form');
  let timer;
  let opener;
  function notify(message) {
    clearTimeout(timer);
    toast.textContent = message;
    toast.hidden = false;
    timer = setTimeout(() => { toast.hidden = true; }, 4500);
  }
  function show(title, lines, showChat = false) {
    opener = document.activeElement;
    heading.textContent = title;
    content.replaceChildren();
    lines.forEach(line => {
      const p = document.createElement('p');
      p.textContent = line;
      content.append(p);
    });
    chat.hidden = !showChat;
    chat.reset();
    dialog.showModal();
  }
  document.addEventListener('click', event => {
    if (event.target.closest('[data-od-close]')) { dialog.close(); return; }
    if (event.target.closest('[data-action="notifications"]')) {
      notify('Không có thông báo mới (mô phỏng).'); return;
    }
    const button = event.target.closest('[data-od-action]');
    if (!button) return;
    event.preventDefault();
    switch (button.dataset.odAction) {
      case 'print': notify('In đơn hàng thành công (mô phỏng).'); break;
      case 'invoice': notify('Tải hóa đơn #VAT-8942 thành công (mô phỏng).'); break;
      case 'call': notify('Liên hệ tổng đài 1900 6868 thành công (mô phỏng).'); break;
      case 'cancel':
        if (window.confirm('Xác nhận hủy đơn hàng mẫu #SV-8942?')) notify('Hủy đơn hàng thành công (mô phỏng).');
        break;
      case 'deliver':
        if (window.confirm('Chuyển đơn mẫu từ Đã xác nhận sang Đã giao thành công?')) notify('Xác nhận giao thành công (mô phỏng).');
        break;
      case 'tracking':
        show('Theo dõi vận chuyển', ['Mã vận đơn: VN8921820 · VNPost Express', 'Đơn hàng #SV-8942 đang được đóng gói.', 'Dự kiến giao: 18/05/2025.']);
        break;
      case 'chat': show('Nhắn thủ quán', ['Tiệm sách hỗ trợ cậu về đơn hàng #SV-8942.'], true); break;
    }
  });
  chat.addEventListener('submit', event => {
    event.preventDefault();
    dialog.close();
    notify('Gửi lời nhắn thành công (mô phỏng).');
  });
  dialog.addEventListener('close', () => opener?.focus());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  // Chỉ tương tác giao diện; không lưu, không gửi yêu cầu, không đổi đơn mẫu.
})();
