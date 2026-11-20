'use strict';

(() => {
  const dialog = document.getElementById('user-dialog');
  const form = document.getElementById('user-form');
  const fields = document.getElementById('user-form-fields');
  const error = document.getElementById('user-form-error');
  let action;
  let trigger;

  function field(label, name, type, readOnlyValue) {
    const group = document.createElement('div');
    group.className = 'user-field';
    const caption = document.createElement('label');
    caption.htmlFor = 'user-' + name;
    caption.textContent = label;
    const input = document.createElement('input');
    input.id = caption.htmlFor;
    input.name = name;
    input.type = type;
    input.readOnly = readOnlyValue !== undefined;
    input.required = !input.readOnly;
    if (input.readOnly) input.value = readOnlyValue;
    if (type === 'password') {
      input.minLength = 6;
      input.autocomplete = 'new-password';
    }
    if (type === 'tel') input.pattern = '0[0-9]{9}';
    group.append(caption, input);
    fields.append(group);
  }

  document.addEventListener('click', event => {
    if (event.target.closest('[data-close-user-dialog]')) {
      dialog.close();
      return;
    }
    const button = event.target.closest('[data-user-action]');
    if (!button) return;
    trigger = button;
    action = button.dataset.userAction;
    const user = button.closest('tr')?.dataset;
    fields.replaceChildren();
    error.hidden = true;
    const titles = {create: 'Thêm tài khoản', lock: 'Khóa tài khoản', unlock: 'Mở khóa tài khoản'};
    document.getElementById('user-dialog-title').textContent = titles[action];
    document.getElementById('user-form-submit').textContent = action === 'create' ? 'Tạo tài khoản' : titles[action];
    if (action === 'create') {
      field('Mã tài khoản', 'code', 'text', '#DG-8943');
      field('Họ và tên', 'name', 'text');
      field('Email', 'email', 'email');
      field('Số điện thoại (10 chữ số)', 'phone', 'tel');
      field('Địa chỉ', 'address', 'text');
      field('Mật khẩu (tối thiểu 6 ký tự)', 'password', 'password');
      field('Xác nhận mật khẩu', 'confirmPassword', 'password');
    } else {
      const description = document.createElement('p');
      description.textContent = titles[action] + ' của ' + user.name + ' (' + user.email + ')?';
      fields.append(description);
    }
    dialog.showModal();
  });

  form.noValidate = true;
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (action === 'create') {
      const invalid = form.querySelector(':invalid');
      if (invalid || form.elements.password.value !== form.elements.confirmPassword.value) {
        error.textContent = invalid ? 'Kiểm tra thông tin đã nhập và điền đủ các trường.' : 'Mật khẩu xác nhận chưa khớp.';
        error.hidden = false;
        invalid?.focus();
        return;
      }
    }
    dialog.close();
    const messages = {create: 'Tạo tài khoản', lock: 'Khóa tài khoản', unlock: 'Mở khóa tài khoản'};
    DemoUI.toast(messages[action] + ' thành công (mô phỏng).');
  });
  dialog.addEventListener('close', () => trigger?.focus());
})();
