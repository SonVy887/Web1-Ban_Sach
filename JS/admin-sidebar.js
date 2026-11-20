'use strict';

(() => {
  const body = document.body;
  const productEditor = body.dataset.userPage === 'chitietsanpham'
    && ['add', 'edit'].includes(new URLSearchParams(location.search).get('mode'));
  const sharedOrderDetail = body.classList.contains('admin-order-detail-mode');
  if (!body.classList.contains('admin-layout') && !productEditor) return;

  const prefix = productEditor || sharedOrderDetail ? '../admin/' : '';
  const page = productEditor ? 'books' : body.dataset.page;
  const activePage = page === 'order-detail' ? 'orders' : page;
  const items = [
    ['dashboard', 'Tổng quan'],
    ['books', 'Quản lý sách'],
    ['orders', 'Đơn hàng'],
    ['inventory', 'Kho & nhập sách'],
    ['customers', 'Khách hàng'],
    ['promotions', 'Khuyến mãi']
  ];
  const sidebar = document.createElement('aside');
  sidebar.className = 'admin-sidebar';
  sidebar.innerHTML = `
    <a class="admin-sidebar-brand" href="${prefix}dashboard.html">
      <span class="admin-sidebar-logo"><img src="../assets/logo/logo.png" alt=""></span>
      <span>Tiệm Sách Sơn Vỹ<small>Quản trị hệ thống</small></span>
    </a>
    <nav aria-label="Điều hướng quản trị">
      ${items.map(([key, label]) => `<a href="${prefix}${key}.html"${activePage === key ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
    </nav>
    <div class="admin-sidebar-account">
      <span>Nguyễn Văn A<small>Quản trị viên</small></span>
      <button type="button" data-admin-notifications>Thông báo</button>
      <a href="${prefix}admin-login.html?signed-out=1">Đăng xuất</a>
    </div>`;
  body.classList.add('admin-layout');
  body.prepend(sidebar);
  sidebar.querySelector('[data-admin-notifications]').addEventListener('click', () => {
    DemoUI.toast('Hiện chưa có thông báo mới.');
  });
})();
