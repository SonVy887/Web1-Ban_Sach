'use strict';

  // Mock Data Store for Orders
  const ordersDatabase = {
    'SV-8942': {
      code: '#SV-8942',
      customer: 'Trần Thảo Ly',
      phone: '0912.345.678',
      address: 'Số 18 Tràng Tiền, Quận Hoàn Kiếm, Hà Nội',
      carrier: 'VNPost Express (Bưu Điện Việt Nam)',
      payment: 'Chuyển khoản VCB (Đã thanh toán)',
      book: 'Rừng Na Uy (Haruki Murakami)',
      bookSub: 'Ấn bản bìa cứng đóng tay giới hạn · Giấy xốp Phần Lan',
      amount: '385.000₫',
      date: '31/05/2025, 14:25',
      status: 'unconfirmed',
      city: 'HN'
    },
    'SV-8941': {
      code: '#SV-8941',
      customer: 'Đỗ Minh Tuấn',
      phone: '0988.102.394',
      address: 'Số 45 Nguyễn Thị Minh Khai, Hải Châu, Đà Nẵng',
      carrier: 'GHTK Liên Tỉnh',
      payment: 'COD (Thu hộ khi nhận hàng)',
      book: 'Cây Cam Ngọt Của Tôi (Tái Bản Đặc Biệt)',
      bookSub: 'Kèm Bookmark gỗ khắc thư pháp',
      amount: '215.000₫',
      date: 'Hôm nay, 13:10',
      status: 'unconfirmed',
      city: 'DN'
    },
    'SV-8940': {
      code: '#SV-8940',
      customer: 'Lê Hoàng Yến',
      phone: '0903.456.789',
      address: 'Căn hộ 12B, Landmark 81, Quận 1, TP.HCM',
      carrier: 'VNPost Hỏa Tốc',
      payment: 'VNPAY QR (Đã thanh toán)',
      book: 'Thổ Hạc Xuân Tình Tuyển Tập',
      bookSub: 'Bìa da phục dựng cổ độc bản Sơn Vỹ',
      amount: '950.000₫',
      date: '31/05/2025, 10:48',
      status: 'confirmed',
      city: 'HCM'
    },
    'SV-8939': {
      code: '#SV-8939',
      customer: 'Phạm Nhật Anh',
      phone: '0977.511.890',
      address: 'Số 102 Cầu Giấy, Quận Cầu Giấy, Hà Nội',
      carrier: 'Giao Hàng Nội Thành 2 Giờ',
      payment: 'Chuyển khoản (Đã thanh toán)',
      book: 'Dune Messiah + Hoàng Tử Bé',
      bookSub: 'Bản minh họa màu kỷ niệm',
      amount: '490.000₫',
      date: '30/05/2025, 18:20',
      status: 'delivered',
      city: 'HN'
    },
    'SV-8812': {
      code: '#SV-8812',
      customer: 'Lê Hoàng Yến',
      phone: '0903.456.789',
      address: 'Căn hộ 12B, Landmark 81, Quận 1, TP.HCM',
      carrier: 'VNPost Express',
      payment: 'Thẻ tín dụng Visa',
      book: 'Bộ Trọn Bộ Danh Tác Văn Học Nga (5 tập bọc da)',
      bookSub: 'Ấn bản sưu tầm thượng hạng',
      amount: '2.150.000₫',
      date: '14/05/2025',
      status: 'delivered',
      city: 'HCM'
    },
    'SV-8730': {
      code: '#SV-8730',
      customer: 'Lê Hoàng Yến',
      phone: '0903.456.789',
      address: 'Căn hộ 12B, Landmark 81, Quận 1, TP.HCM',
      carrier: 'VNPost Express',
      payment: 'VNPAY QR',
      book: 'Trăm Năm Cô Đơn (Ấn bản 50 năm)',
      bookSub: 'Minh họa màu, bìa bọc nhung xanh',
      amount: '1.580.000₫',
      date: '02/05/2025',
      status: 'delivered',
      city: 'HCM'
    },
    'SV-8650': {
      code: '#SV-8650',
      customer: 'Trần Thảo Ly',
      phone: '0912.345.678',
      address: 'Số 18 Tràng Tiền, Hoàn Kiếm, Hà Nội',
      carrier: 'VNPost Express',
      payment: 'Chuyển khoản ngân hàng',
      book: 'Tuyển Tập Thơ Xuân Quỳnh & Lưu Quang Vũ (Hộp sơn mài)',
      bookSub: 'Hộp sơn mài Bát Tràng cẩn ốc',
      amount: '3.035.000₫',
      date: '25/04/2025',
      status: 'delivered',
      city: 'HN'
    },
    'SV-8501': {
      code: '#SV-8501',
      customer: 'Phạm Nhật Anh',
      phone: '0977.511.890',
      address: 'Số 102 Cầu Giấy, Hà Nội',
      carrier: 'Hỏa tốc nội thành',
      payment: 'Chuyển khoản Techcombank',
      book: 'Nghìn Lẻ Một Đêm (Ấn bản tiếng Việt cổ 1974 phục chế)',
      bookSub: 'Giấy dó truyền thống',
      amount: '2.260.000₫',
      date: '18/04/2025',
      status: 'delivered',
      city: 'HN'
    },
    'SV-8422': {
      code: '#SV-8422',
      customer: 'Vũ Đình Trọng',
      phone: '0938.892.112',
      address: 'Số 29 Liễu Giai, Ba Đình, Hà Nội',
      carrier: 'VNPost Express',
      payment: 'Chuyển khoản BIDV',
      book: 'Bách Khoa Lịch Sử Nghệ Thuật Phương Đông',
      bookSub: 'Khổ đại 25x35cm in 4 màu',
      amount: '2.160.000₫',
      date: '08/04/2025',
      status: 'delivered',
      city: 'HN'
    },
    'SV-8319': {
      code: '#SV-8319',
      customer: 'Hoàng Diệu Thu',
      phone: '0945.112.334',
      address: 'Số 12 Bạch Đằng, Hải Châu, Đà Nẵng',
      carrier: 'GHTK Liên Tỉnh',
      payment: 'Thẻ ATM nội địa',
      book: 'Bộ Tiểu Thuyết Di Sản (3 cuốn bìa lụa)',
      bookSub: 'Lụa tơ tằm Vạn Phúc dệt riêng',
      amount: '1.850.000₫',
      date: '28/03/2025',
      status: 'delivered',
      city: 'DN'
    }
  };

  // Switch Between Orders and Top 5 Analytics View
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

  // Các nút xử lý chỉ xác nhận mô phỏng, giữ nguyên dữ liệu mẫu.
  function confirmOrderStep(orderId, targetStatus) {
    const order = ordersDatabase[orderId];
    if (!order) return;
    if (['delivered', 'cancelled'].includes(order.status)) {
      alert('Đơn hàng đã kết thúc, không thể cập nhật trạng thái.');
      return;
    }
    const allowed = order.status === 'unconfirmed'
      ? ['confirmed', 'cancelled'] : ['delivered', 'cancelled'];
    if (!allowed.includes(targetStatus)) {
      alert('Vui lòng thực hiện theo đúng thứ tự xử lý đơn hàng.');
      return;
    }
    const labels = {confirmed:'Xác nhận đơn', delivered:'Xác nhận đã giao', cancelled:'Hủy đơn'};
    if (confirm(labels[targetStatus] + ' ' + order.code + '?')) {
      alert(labels[targetStatus] + ' thành công (mô phỏng).');
    }
  }

  // MULTI-FILTER LOGIC
  function updateDistrictOptions() {
    const city = document.getElementById('filterCity').value;
    const districtSelect = document.getElementById('filterDistrict');
    districtSelect.innerHTML = '<option value="all">Tất cả quận/huyện</option>';

    if (city === 'HN') {
      districtSelect.innerHTML += `
        <option value="HK">Hoàn Kiếm</option>
        <option value="CG">Cầu Giấy</option>
        <option value="BD">Ba Đình</option>
        <option value="HBT">Hai Bà Trưng</option>
      `;
    } else if (city === 'HCM') {
      districtSelect.innerHTML += `
        <option value="Q1">Quận 1</option>
        <option value="Q3">Quận 3</option>
        <option value="BT">Bình Thạnh</option>
        <option value="TPTD">TP. Thủ Đức</option>
      `;
    } else if (city === 'DN') {
      districtSelect.innerHTML += `
        <option value="HC">Hải Châu</option>
        <option value="ST">Sơn Trà</option>
        <option value="TK">Thanh Khê</option>
      `;
    }
  }

  function applyQuickDate(type) {
    const fromInput = document.getElementById('filterDateFrom');
    const toInput = document.getElementById('filterDateTo');
    const today = '2025-05-31';

    if (type === 'today') {
      fromInput.value = today;
      toInput.value = today;
    } else if (type === '7days') {
      const past7 = new Date('2025-05-31T12:00:00');
      past7.setDate(past7.getDate() - 7);
      fromInput.value = past7.toISOString().split('T')[0];
      toInput.value = today;
    } else if (type === 'month') {
      fromInput.value = '2025-05-01';
      toInput.value = '2025-05-31';
    }
    applyFilters();
  }

  // Bộ lọc chỉ là giao diện mô phỏng: không lọc/ẩn bất kỳ đơn nào.
  function applyFilters() {
    document.querySelectorAll('.order-row').forEach(row => {
      row.hidden = false;
      row.style.removeProperty('display');
    });
    document.getElementById('orderCountBadge').textContent = 'Đang hiển thị: 4 đơn mẫu';
    window.alert('Áp dụng bộ lọc thành công (mô phỏng).');
  }

  function resetFilters() {
    document.getElementById('filterStatus').value = 'all';
    document.getElementById('filterDateFrom').value = '2025-05-01';
    document.getElementById('filterDateTo').value = '2025-05-31';
    document.getElementById('filterCity').value = 'all';
    updateDistrictOptions();
    document.querySelectorAll('.order-row').forEach(row => { row.hidden = false; });
    document.getElementById('orderCountBadge').textContent = 'Đang hiển thị: 4 đơn mẫu';
  }

  // ACCORDION TOGGLE FOR TOP 5 CUSTOMERS
  function toggleCustomerAccordion(id) {
    const panel = document.getElementById(id);
    const arrow = document.getElementById('arrow-' + id);
    if (!panel) return;

    if (panel.classList.contains('hidden')) {
      panel.classList.remove('hidden');
      if (arrow) arrow.style.transform = 'rotate(180deg)';
    } else {
      panel.classList.add('hidden');
      if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
  }

  function runTopBuyersReport() {
    const displayDate = value => value ? value.split('-').reverse().join('/') : 'Chưa chọn';
    const from = document.getElementById('reportDateFrom').value;
    const to = document.getElementById('reportDateTo').value;
    document.getElementById('report-period').textContent = 'Kỳ thống kê: ' + displayDate(from) + ' – ' + displayDate(to);
    // Các hàng, thứ hạng và tổng tiền là mẫu HTML cố định, không truy vấn/lọc theo ngày.
    window.alert('Hiển thị thống kê Top 5 khách hàng thành công (mô phỏng).');
  }
  document.getElementById('top-buyers-form')?.addEventListener('submit', event => {
    event.preventDefault(); runTopBuyersReport();
  });
  document.addEventListener('click', event => {
    const link = event.target.closest('[data-report-order]');
    if (!link) return;
    event.preventDefault(); openOrderModal(link.dataset.reportOrder);
  });
  if (window.location.hash === '#analytics') switchMainTab('analytics');

  // ORDER DETAIL POPUP MODAL
  function openOrderModal(orderId) {
    // Mọi nút Xem đều mở cùng một đơn minh họa, không đọc đơn được chọn.
    orderId = 'SV-8942';
    const order = ordersDatabase['SV-8942'];

    document.getElementById('modalOrderCode').textContent = `Chi tiết đơn hàng mẫu ${order.code}`;
    document.getElementById('modalOrderDate').textContent = `Thời gian đặt: ${order.date} · Hệ thống kho DC-01`;
    document.getElementById('modalCustomerName').textContent = order.customer;
    document.getElementById('modalCustomerPhone').textContent = `Điện thoại: ${order.phone}`;
    document.getElementById('modalCustomerAddress').textContent = `Địa chỉ: ${order.address}`;
    document.getElementById('modalCarrier').textContent = order.carrier;
    document.getElementById('modalPayment').textContent = `Phương thức: ${order.payment}`;
    document.getElementById('modalBookTitle').textContent = order.book;
    document.getElementById('modalTotalAmount').textContent = order.amount;
    document.getElementById('modalBookSubtitle').textContent = order.bookSub;
    document.getElementById('modalUnitAmount').textContent = order.amount;
    document.getElementById('modalLineAmount').textContent = order.amount;

    const badge = document.getElementById('modalOrderStatusBadge');
    const actionBtn = document.getElementById('modalActionNextBtn');

    if (order.status === 'unconfirmed') {
      badge.textContent = '1. Chưa xác nhận';
      badge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300';
      actionBtn.style.display = 'inline-flex';
      actionBtn.innerHTML = '<span class="material-symbols-outlined text-[16px]">check_circle</span><span>Xác nhận đơn</span>';
      actionBtn.onclick = function() {
        closeOrderModal();
        confirmOrderStep(orderId, 'confirmed');
      };
    } else if (order.status === 'confirmed') {
      badge.textContent = '2. Đã xác nhận';
      badge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200';
      actionBtn.style.display = 'inline-flex';
      actionBtn.innerHTML = '<span class="material-symbols-outlined text-[16px]">local_shipping</span><span>Xác nhận đã giao</span>';
      actionBtn.onclick = function() {
        closeOrderModal();
        confirmOrderStep(orderId, 'delivered');
      };
    } else if (order.status === 'delivered') {
      badge.textContent = '3. Đã giao thành công (Đã Khóa)';
      badge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300';
      actionBtn.style.display = 'none';
    } else {
      badge.textContent = 'Đã huỷ đơn (Đã Khóa)';
      badge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-900 border border-red-300';
      actionBtn.style.display = 'none';
    }

    document.getElementById('orderDetailModal').classList.remove('hidden');
  }

  function closeOrderModal() {
    document.getElementById('orderDetailModal').classList.add('hidden');
  }

  // Close modal when clicking outside
  document.getElementById('orderDetailModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeOrderModal();
    }
  });

  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || button.getAttribute('onclick') || button.onclick) return;
    const text = button.textContent.replace(/\s+/g, ' ').trim();
    if (/Tạo đơn thủ công/i.test(text)) alert('Tạo đơn thủ công thành công (mô phỏng).');
    else if (/In danh sách|In Phiếu|print/i.test(text)) alert('In phiếu thành công (mô phỏng).');
    else if (/^[123]$/.test(text) || /chevron_(left|right)/.test(text)) alert('Chuyển trang mẫu thành công.');
  });

// Đăng xuất mô phỏng từ avatar trong header quản trị.
(() => {
  const header = document.querySelector('header .admin-header-inner');
  if (!header || header.querySelector('[data-admin-logout]')) return;
  const actions = header.lastElementChild;
  if (!actions) return;
  const avatar = document.createElement('button');
  avatar.type = 'button';
  avatar.dataset.adminLogout = '';
  avatar.className = 'w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-sm shadow-sm';
  avatar.setAttribute('aria-label', 'Đăng xuất tài khoản quản trị');
  avatar.title = 'Đăng xuất';
  avatar.textContent = 'NA';
  avatar.addEventListener('click', () => {
    if (window.confirm('Cậu muốn đăng xuất tài khoản quản trị?')) {
      window.location.assign('admin-login.html');
    }
  });
  actions.append(avatar);
})();
