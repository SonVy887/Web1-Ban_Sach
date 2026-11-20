'use strict';

(() => {
  function switchMainTab(tab) {
    const ordersView = document.getElementById('view-orders');
    const analyticsView = document.getElementById('view-analytics');
    const btnOrders = document.getElementById('tabBtn-orders');
    const btnAnalytics = document.getElementById('tabBtn-analytics');

    if (tab === 'orders') {
      ordersView.classList.remove('hidden');
      analyticsView.classList.add('hidden');
      btnOrders.className = 'flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-primary-container text-on-primary shadow-xs transition-all';
      btnAnalytics.className = 'flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-secondary hover:text-primary transition-all';
    } else {
      ordersView.classList.add('hidden');
      analyticsView.classList.remove('hidden');
      btnAnalytics.className = 'flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-primary-container text-on-primary shadow-xs transition-all';
      btnOrders.className = 'flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-secondary hover:text-primary transition-all';
    }
  }

  const filters = document.getElementById('order-filters');
  const fromInput = document.getElementById('filterDateFrom');
  const toInput = document.getElementById('filterDateTo');

  function applyQuickDate(type) {
    const today = '2025-05-31';

    if (type === 'today') {
      fromInput.value = today;
      toInput.value = today;
    } else if (type === '7days') {
      const firstDay = new Date(today);
      firstDay.setUTCDate(firstDay.getUTCDate() - 6);
      fromInput.value = firstDay.toISOString().split('T')[0];
      toInput.value = today;
    } else if (type === 'month') {
      fromInput.value = '2025-05-01';
      toInput.value = '2025-05-31';
    }
    applyFilters();
  }

  function validDateRange(from, to) {
    if (from && to && from > to) {
      DemoUI.toast('Ngày bắt đầu phải trước hoặc bằng ngày kết thúc.');
      return false;
    }
    return true;
  }

  function applyFilters() {
    if (!validDateRange(fromInput.value, toInput.value)) return;
    // Giữ cùng một bộ đơn mẫu cho mọi bộ lọc.
    DemoUI.toast('Áp dụng bộ lọc thành công (mô phỏng).');
  }

  // Thống kê Top 5 khách hàng

  function runTopBuyersReport() {
    const displayDate = value => value ? value.split('-').reverse().join('/') : 'Chưa chọn';
    const from = document.getElementById('reportDateFrom').value;
    const to = document.getElementById('reportDateTo').value;
    if (!from || !to) {
      DemoUI.toast('Chọn đủ ngày bắt đầu và ngày kết thúc.');
      return;
    }
    if (!validDateRange(from, to)) return;
    document.getElementById('report-period').textContent = 'Kỳ thống kê: ' + displayDate(from) + ' – ' + displayDate(to);
    // Các hàng, thứ hạng và tổng tiền là mẫu HTML cố định, không truy vấn/lọc theo ngày.
    DemoUI.toast('Hiển thị thống kê Top 5 khách hàng thành công (mô phỏng).');
  }
  document.getElementById('top-buyers-form')?.addEventListener('submit', event => {
    event.preventDefault(); runTopBuyersReport();
  });
  function syncMainTab() {
    switchMainTab(location.hash === '#analytics' ? 'analytics' : 'orders');
  }

  document.querySelectorAll('[data-order-tab]').forEach(button => {
    button.addEventListener('click', () => {
      location.hash = button.dataset.orderTab;
    });
  });
  document.querySelectorAll('[data-order-period]').forEach(button => {
    button.addEventListener('click', () => applyQuickDate(button.dataset.orderPeriod));
  });
  filters.addEventListener('submit', event => {
    event.preventDefault();
    applyFilters();
  });
  document.querySelector('[data-order-reset]').addEventListener('click', () => {
    filters.reset();
    DemoUI.toast('Đã đặt lại bộ lọc.');
  });
  const masterCheck = document.getElementById('select-all-orders');
  const orderChecks = [...document.querySelectorAll('#ordersTableBody input[type="checkbox"]')];
  masterCheck.addEventListener('change', () => {
    orderChecks.forEach(check => { check.checked = masterCheck.checked; });
  });
  orderChecks.forEach(check => check.addEventListener('change', () => {
    masterCheck.checked = orderChecks.every(item => item.checked);
    masterCheck.indeterminate = !masterCheck.checked && orderChecks.some(item => item.checked);
  }));
  document.querySelectorAll('[data-order-next]').forEach(button => {
    button.addEventListener('click', () => {
      const status = button.closest('.order-row').dataset.status;
      if (status === 'unconfirmed') DemoUI.toast('Xác nhận đơn hàng thành công (mô phỏng).');
      if (status === 'confirmed') DemoUI.toast('Xác nhận giao hàng thành công (mô phỏng).');
    });
  });
  document.querySelectorAll('[data-order-print]').forEach(button => {
    button.addEventListener('click', () => DemoUI.toast('In phiếu thành công (mô phỏng).'));
  });
  window.addEventListener('hashchange', syncMainTab);
  syncMainTab();
})();
