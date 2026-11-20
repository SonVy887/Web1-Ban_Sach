'use strict';

(() => {
  if (document.body.dataset.page !== 'order-detail') return;

  const analytics = new URLSearchParams(location.search).get('from') === 'analytics';
  const backUrl = analytics ? 'admin/orders.html#analytics' : 'admin/orders.html#orders';
  const backLabel = analytics ? 'Thống kê khách hàng' : 'Quản lý đơn hàng';
  const page = document.getElementById('order-detail');

  const link = document.createElement('a');
  link.href = backUrl;
  link.textContent = backLabel;
  const separator = document.createElement('span');
  separator.textContent = '›';
  const title = document.createElement('span');
  title.textContent = 'Chi tiết #SV-8942';
  page.querySelector('.od-breadcrumb').replaceChildren(link, separator, title);

  const actions = page.querySelector('.od-heading .od-actions');
  actions.querySelector('a').href = backUrl;
  actions.querySelector('[data-od-action="cancel"]').hidden = true;
  const confirm = document.createElement('button');
  confirm.type = 'button';
  confirm.className = 'od-button primary';
  confirm.textContent = 'Xác nhận đã giao';
  confirm.addEventListener('click', () => DemoUI.toast('Xác nhận giao hàng thành công (mô phỏng).'));
  actions.append(confirm);
})();
