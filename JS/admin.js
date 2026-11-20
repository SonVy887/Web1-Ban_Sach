(() => {
  'use strict';
  let page;
  let currentMessage;
  let lastTrigger;
  const byId = id => document.getElementById(id);
  const clean = node => (node?.textContent || '').replace(/\s+/g, ' ').trim();
  const messages = {
    save: 'Lưu thay đổi thành công.', create: 'Tạo mới thành công.', edit: 'Cập nhật thông tin thành công.',
    stock: 'Cập nhật tồn kho thành công.', delete: 'Xóa bản ghi thành công.', approve: 'Duyệt đơn hàng thành công.',
    cancel: 'Hủy đơn hàng thành công.', pause: 'Tạm dừng chiến dịch thành công.', activate: 'Kích hoạt chiến dịch thành công.',
    gift: 'Gửi thông tin đến khách hàng thành công.', call: 'Xác nhận đơn hàng thành công.',
    inventory: 'Hoàn tất kiểm kê thành công.', copy: 'Sao chép liên kết thành công.',
    print: 'In phiếu thành công.', export: 'Xuất báo cáo thành công.', bulk: 'Thực hiện tác vụ hàng loạt thành công.',
    search: 'Tìm kiếm thành công.', pagination: 'Chuyển trang thành công.'
  };
  const titles = { edit: 'Chỉnh sửa thông tin', stock: 'Cập nhật tồn kho', delete: 'Xác nhận xóa', details: 'Thông tin chi tiết', history: 'Lịch sử giao dịch', notifications: 'Thông báo hệ thống', bulk: 'Tác vụ hàng loạt', tracking: 'Thông tin theo dõi', cancel: 'Xác nhận hủy đơn', pause: 'Tạm dừng chiến dịch' };
  const toast = DemoUI.toast;
  function showFilterDemo() {
    toast('Áp dụng bộ lọc thành công (mô phỏng).');
  }
  function closeDialog() { byId('admin-dialog').close(); lastTrigger?.focus(); }
  function paragraph(text) { const p = document.createElement('p'); p.textContent = text; return p; }
  function recordDetails(trigger, container, {columns, entries = []} = {}) {
    const row = trigger.closest('tr');
    const card = trigger.closest('.order-item');
    if (row) {
      const headers = [...row.closest('table').querySelectorAll('thead th')].map(clean);
      const list = document.createElement('dl'); list.className = 'record-details';
      function appendEntry(label, value) {
        const dt = document.createElement('dt'); dt.textContent = label;
        const dd = document.createElement('dd'); dd.textContent = value;
        list.append(dt, dd);
      }
      for (const [label, value] of entries) appendEntry(label, value);
      [...row.cells].forEach((cell, index) => {
        if ((columns && !columns.includes(index)) || cell.querySelector('button') || !clean(cell)) return;
        appendEntry(headers[index] || 'Thông tin', clean(cell));
      });
      container.append(list);
    } else if (card) {
      [...card.children].slice(0, 2).forEach(part => container.append(paragraph(clean(part))));
    } else if (trigger.dataset.id) {
      for (const key of ['id','name','phone','address','items','total']) if (trigger.dataset[key]) container.append(paragraph(trigger.dataset[key]));
    } else {
      container.append(paragraph(page.summary));
    }
  }
  function addField(container, field, index, value = field.value) {
    const group = document.createElement('div'); group.className = 'dialog-field';
    const id = 'action-field-' + index;
    const label = document.createElement('label'); label.htmlFor = id; label.textContent = field.label;
    const input = document.createElement(field.options ? 'select' : field.multiline ? 'textarea' : 'input');
    input.id = id; input.name = field.name || id;
    if (field.options) field.options.forEach(text => { const option = document.createElement('option'); option.textContent = text; option.value = text; input.append(option); });
    else {
      if (!field.multiline) input.type = field.type === 'money' ? 'text' : field.type || 'text';
      input.placeholder = field.placeholder || field.label;
      if (field.type === 'number') { input.min = '0'; input.step = field.step || '1'; }
      if (value !== undefined) input.value = value;
      if (field.readOnly) input.readOnly = true;
    }
    if (field.type === 'money') DemoUI.moneyInput(input);
    input.required = !field.readOnly && field.required !== false;
    group.append(label, input); container.append(group);
  }
  function openDialog(action, trigger) {
    lastTrigger = trigger; currentMessage = messages[action] || 'Thực hiện thao tác thành công.';
    const dialog = byId('admin-dialog'); const content = byId('dialog-content');
    const form = byId('admin-action-form'); form.reset(); content.replaceChildren();
    byId('dialog-title').textContent = action === 'create' ? page.createTitle : titles[action] || trigger.dataset.label || 'Xác nhận thao tác';
    const readOnly = ['details','history','notifications','tracking'].includes(action);
    byId('dialog-confirm').hidden = readOnly;
    byId('dialog-confirm').textContent = action === 'delete' ? 'Xóa' : action === 'create' ? 'Tạo mới' : 'Xác nhận';
    byId('dialog-confirm').classList.toggle('danger', ['delete','cancel'].includes(action));
    const book = action === 'delete' ? trigger.closest('.book-row[data-sold]') : null;
    if (book) {
      const {title, sold, status} = book.dataset;
      const hasSales = Number(sold) > 0;
      const alreadyHidden = status === 'Đang ẩn';
      const confirm = byId('dialog-confirm');
      byId('dialog-title').textContent = hasSales ? 'Không thể xóa sản phẩm' : 'Xác nhận xóa vĩnh viễn';
      confirm.textContent = hasSales ? 'Đồng ý ẩn sản phẩm' : 'Xóa vĩnh viễn';
      confirm.hidden = hasSales && alreadyHidden;
      confirm.classList.toggle('danger', !hasSales);
      if (hasSales) {
        content.append(paragraph('Sản phẩm “' + title + '” đã bán ' + sold + ' cuốn. Để giữ lịch sử đơn hàng và báo cáo doanh thu, sản phẩm này không thể xóa vĩnh viễn.'));
        content.append(paragraph(alreadyHidden ? 'Sản phẩm đang ẩn khỏi cửa hàng.' : 'Bạn có muốn ẩn sản phẩm khỏi cửa hàng không?'));
        currentMessage = 'Ẩn sản phẩm thành công (mô phỏng).';
      } else {
        content.append(paragraph('Sản phẩm “' + title + '” chưa từng bán. Bạn có chắc muốn xóa vĩnh viễn sản phẩm này không?'));
        currentMessage = 'Xóa sản phẩm thành công (mô phỏng).';
      }
    } else if (readOnly) {
      const record = page.describeRecord?.(action, trigger);
      if (record) {
        byId('dialog-title').textContent = record.title;
        recordDetails(trigger, content, record);
      } else if (action === 'notifications') {
        content.append(paragraph('Có 38 đơn hàng cần theo dõi.'), paragraph('Có 3 đầu sách tồn kho thấp cần bổ sung.'));
      } else {
        // Cùng một mẫu cố định cho Xem chi tiết, Lịch sử và Theo dõi.
        content.append(
          paragraph('Thông tin minh họa cố định'),
          paragraph('Mã đơn: #SV-8942'),
          paragraph('Khách hàng: Trần Thảo Ly · 0912.345.678'),
          paragraph('Địa chỉ: Số 18 Tràng Tiền, Hoàn Kiếm, Hà Nội'),
          paragraph('Sản phẩm: Rừng Na Uy · Số lượng: 1'),
          paragraph('Tổng thanh toán: 385.000đ'),
          paragraph('Trạng thái: Chưa xác nhận')
        );
      }
    } else if (['create','edit'].includes(action)) {
      const editing = action === 'edit';
      if (editing) recordDetails(trigger, content, page.describeRecord?.(action, trigger));
      const fields = document.createElement('div'); fields.className = 'dialog-fields';
      page.fields.forEach((field, i) => {
        addField(fields, field, i, editing ? field.editValue?.(trigger) : undefined);
      });
      content.append(fields);
    } else if (action === 'stock') {
      recordDetails(trigger, content);
      addField(content, {label: 'Số lượng tồn kho', type: 'number'}, 0, trigger.closest('tr')?.dataset.stock || 0);
    } else if (action === 'bulk') {
      const count = document.querySelectorAll('tbody input[type="checkbox"]:checked').length;
      content.append(paragraph('Số bản ghi đã chọn: ' + count));
      addField(content, {label:'Chọn tác vụ', options:['Cập nhật trạng thái','Duyệt các bản ghi đã chọn','Xóa các bản ghi đã chọn']},0);
    } else {
      recordDetails(trigger, content);
      content.append(paragraph('Xác nhận thực hiện thao tác này?'));
    }
    dialog.showModal();
  }
  function handleAction(trigger) {
    const action = trigger.dataset.action;
    if (['create','edit','stock','delete','details','history','notifications','bulk','tracking','cancel','pause'].includes(action)) {
      openDialog(action, trigger); return;
    }
    if (['tab','select-status'].includes(action)) {
      trigger.parentElement.querySelectorAll('button').forEach(button => {
        const selected = button === trigger;
        button.setAttribute('aria-pressed', String(selected));
        button.classList.toggle('ui-selected', selected);
        button.classList.toggle('demo-selected-tab', selected);
      });
      showFilterDemo();
      return;
    }
    if (['search','filter'].includes(action)) { showFilterDemo(); return; }
    if (action === 'reset') { trigger.closest('form')?.reset(); toast('Đặt lại biểu mẫu thành công.'); return; }
    if (action === 'pagination') {
      if (/^\d+$/.test(clean(trigger))) {
        trigger.parentElement.querySelectorAll('button').forEach(b => { b.removeAttribute('aria-current'); b.classList.remove('ui-selected'); });
        trigger.setAttribute('aria-current','page'); trigger.classList.add('ui-selected');
      }
    }
    if (action === 'save') {
      const form = trigger.closest('form'); if (form && !form.checkValidity()) { toast('Kiểm tra thông tin đã nhập.'); return; }
    }
    toast(messages[action] || 'Thực hiện thao tác thành công.');
  }
  function mount(config) {
    page = config;
    byId('admin-action-form').noValidate = true;
    const logo = document.querySelector('.admin-logo-viewport img');
    if (logo) {
      const fallback = () => { logo.hidden = true; document.querySelector('.logo-fallback').hidden = false; };
      logo.addEventListener('error', fallback, { once: true });
      if (logo.complete && !logo.naturalWidth) fallback();
    }
    document.addEventListener('click', event => {
      const close = event.target.closest('[data-close-dialog]');
      if (close) { closeDialog(); return; }
      const trigger = event.target.closest('button[data-action], a[data-action]');
      if (!trigger || trigger.disabled) return;
      event.preventDefault(); handleAction(trigger);
    });
    document.addEventListener('submit', event => {
      event.preventDefault();
      if (!event.target.checkValidity()) { toast('Kiểm tra thông tin đã nhập.'); return; }
      if (event.target.id === 'admin-action-form') {
        if (byId('dialog-confirm').hidden) return;
        closeDialog();
        toast(currentMessage);
      }
      else toast(messages.save);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Enter' && event.target.matches('[data-search]')) { event.preventDefault(); showFilterDemo(); }
    });
    document.addEventListener('change', event => {
      const target = event.target;
      if (target.matches('thead input[type="checkbox"]')) target.closest('table').querySelectorAll('tbody input[type="checkbox"]').forEach(input => { input.checked = target.checked; });
      if (target.matches('tbody input[type="checkbox"]')) {
        const table = target.closest('table'); const master = table.querySelector('thead input[type="checkbox"]');
        const checks = [...table.querySelectorAll('tbody input[type="checkbox"]')];
        if (master) { master.checked = checks.every(input => input.checked); master.indeterminate = checks.some(input => input.checked) && !master.checked; }
      }
      if (target.matches('main select, main input[type="date"]') && !target.closest('#admin-dialog')) showFilterDemo();
    });
    byId('admin-dialog').addEventListener('click', event => {
      if (event.target !== byId('admin-dialog')) return;
      const box = event.target.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeDialog();
    });
  }
  const receiptForm = {
    createTitle: 'Tạo phiếu nhập sách',
    fields: [
      {label: 'Mã phiếu nhập', value: '#PN-2025-059', readOnly: true},
      {label: 'Nhà xuất bản / nhà cung cấp', type: 'text'},
      {label: 'Ngày nhập dự kiến', type: 'date'},
      {label: 'Tên sách', type: 'text'},
      {label: 'Số lượng', type: 'number'},
      {label: 'Đơn giá nhập (đ)', type: 'money'}
    ]
  };
  window.AdminUI = Object.freeze({ mount, receiptForm });
})();

