'use strict';
(() => {
  const dialog = document.getElementById('user-dialog');
  const form = document.getElementById('user-form');
  const fields = document.getElementById('user-form-fields');
  const error = document.getElementById('user-form-error');
  const toast = document.getElementById('users-toast');
  let action, trigger, timer;
  function notify(text) {
    clearTimeout(timer); toast.textContent = text; toast.hidden = false;
    timer = setTimeout(() => { toast.hidden = true; }, 4500);
  }
  function close() { dialog.close(); trigger?.focus(); }
  function field(label, name, type, value = '', required = true) {
    const group = document.createElement('div'); group.className = 'user-field';
    const labelNode = document.createElement('label'); labelNode.htmlFor = 'user-' + name; labelNode.textContent = label;
    const input = document.createElement('input'); input.id = 'user-' + name; input.name = name; input.type = type; input.value = value; input.required = required;
    if (type === 'password') { input.minLength = 6; input.autocomplete = 'new-password'; }
    if (type === 'tel') { input.pattern = '0[0-9]{9}'; input.title = 'Số điện thoại gồm 10 chữ số, bắt đầu bằng 0'; }
    group.append(labelNode, input); fields.append(group);
  }
  document.addEventListener('click', event => {
    if (event.target.closest('[data-close-user-dialog]')) { close(); return; }
    const button = event.target.closest('[data-user-action]');
    if (!button) return;
    trigger = button; action = button.dataset.userAction;
    const user = button.closest('tr')?.dataset;
    fields.replaceChildren(); error.hidden = true;
    document.getElementById('user-dialog-title').textContent = {create:'Thêm user / Đăng ký',edit:'Sửa thông tin người dùng',lock:'Khóa tài khoản',unlock:'Mở khóa tài khoản'}[action];
    document.getElementById('user-form-submit').textContent = {create:'Tạo tài khoản',edit:'Lưu thông tin',lock:'Khóa user',unlock:'Mở khóa user'}[action];
    if (action === 'create' || action === 'edit') {
      field('Họ và tên', 'name', 'text', user?.name);
      field('Email', 'email', 'email', user?.email);
      field('Số điện thoại', 'phone', 'tel', user?.phone);
      if (action === 'create') { field('Mật khẩu (tối thiểu 6 ký tự)', 'password', 'password'); field('Xác nhận mật khẩu', 'confirmPassword', 'password'); }
      else field('Địa chỉ', 'address', 'text', user?.address, false);
    } else {
      const description = document.createElement('p');
      description.textContent = action === 'lock'
        ? `Xác nhận khóa tài khoản ${user.name} (${user.email})? Tài khoản bị khóa sẽ không được phép đăng nhập.`
        : `Xác nhận mở khóa tài khoản ${user.name} (${user.email}) để cho phép đăng nhập trở lại?`;
      fields.append(description);
    }
    dialog.showModal();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (action === 'create' && form.elements.password.value !== form.elements.confirmPassword.value) {
      error.textContent = 'Mật khẩu xác nhận chưa khớp.'; error.hidden = false; return;
    }
    const messages = {create:'Tạo tài khoản thành công (mô phỏng).', edit:'Cập nhật thông tin thành công (mô phỏng).', lock:'Khóa tài khoản thành công (mô phỏng).', unlock:'Mở khóa tài khoản thành công (mô phỏng).'};
    close(); notify(messages[action]);
    // Không cập nhật danh sách mẫu, không gửi yêu cầu và không lưu thông tin.
  });
  dialog.addEventListener('close', () => trigger?.focus());
  // Luôn hiện cùng hai tài khoản mẫu, không so khớp từ khóa/trạng thái.
  function applyDemoFilter(event) {
    event?.preventDefault();
    document.querySelectorAll('tr[data-user-id]').forEach((row, index) => {
      row.hidden = index >= 2;
    });
    document.getElementById('users-empty').hidden = true;
    document.getElementById('users-count').textContent = 'Kết quả lọc: 2 tài khoản';
  }
  document.getElementById('apply-user-filter')?.addEventListener('click', applyDemoFilter);
  document.getElementById('user-status-filter').addEventListener('change', applyDemoFilter);
  document.getElementById('user-search').addEventListener('keydown', event => {
    if (event.key === 'Enter') applyDemoFilter(event);
  });
  document.querySelector('header [data-action="notifications"]')?.addEventListener('click', () => notify('Không có thông báo mới.'));
})();
