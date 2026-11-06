/* Trang chi tiết đơn hàng (Admin) - CHỈ MÔ PHỎNG.
   Dữ liệu mẫu luôn giữ nguyên; các nút chỉ hiển thị thông báo, không cập nhật trạng thái/dữ liệu. */
(function () {
  'use strict';

  var STATUS = {
    unconfirmed: { label: 'Bước 1: Chưa xác nhận', step: 0 },
    confirmed: { label: 'Bước 2: Đã xác nhận & đóng gói', step: 1 },
    delivered: { label: 'Bước 3: Đã giao thành công', step: 2 },
    cancelled: { label: 'Đã huỷ đơn', step: -1 }
  };
  var STEP_ICONS = ['hourglass_top', 'inventory_2', 'task_alt'];
  var STEP_NAMES = ['Chưa xác nhận', 'Đã xác nhận', 'Đã giao'];

  var ORDERS = {
    'SV-8942': { time: 'Hôm nay, 14:25', status: 'unconfirmed', customer: 'Trần Thảo Ly', phone: '0912.345.678', email: 'thaoly.tran@gmail.com', userId: 'DG-1042', tier: 'Hội Viên Thân Thiết', address: 'Hoàn Kiếm, Hà Nội', carrier: 'VNPost Express', tracking: 'Chưa có mã vận đơn', payment: 'Chuyển khoản', paid: true, shipping: 0, discount: 0,
      items: [{ title: 'Rừng Na Uy (Bìa Cứng Đặc Biệt)', sub: 'Boxset vải Kraft cổ điển', qty: 1, price: 385000, img: '../assets/books/RungNaUy.png' }], note: '' },
    'SV-8941': { time: 'Hôm nay, 13:10', status: 'unconfirmed', customer: 'Đỗ Minh Tuấn', phone: '0988.102.xxx', email: 'tuan.do88@gmail.com', userId: 'DG-2115', tier: 'Khách Hàng Mới', address: 'Hải Châu, Đà Nẵng', carrier: 'GHTK Liên Tỉnh', tracking: 'Chưa có mã vận đơn', payment: 'COD (Thu tiền tận nơi)', paid: false, shipping: 25000, discount: 25000,
      items: [{ title: 'Cây Cam Ngọt Của Tôi (Tái Bản)', sub: 'Kèm Bookmark gỗ khắc tên', qty: 1, price: 215000, img: '../assets/books/Cam.png' }], note: 'Khách yêu cầu gọi xác nhận trước khi giao.' },
    'SV-8940': { time: 'Hôm nay, 10:48', status: 'confirmed', customer: 'Lê Hoàng Yến', phone: '0903.456.xxx', email: 'hoangyen.le@gmail.com', userId: 'DG-1028', tier: 'VIP Hội Viên Sơn Vỹ', address: 'Quận 1, TP.HCM', carrier: 'VNPost Hỏa Tốc', tracking: 'VNP-HT-250510-8940', payment: 'VNPAY QR', paid: true, shipping: 0, discount: 0,
      items: [{ title: 'Thổ Hạc Xuân Tình Tuyển Tập', sub: 'Bìa da phục dựng cổ', qty: 1, price: 950000, img: '' }], note: 'Đã đóng gói hộp cứng, chờ bưu tá lấy hàng.' },
    'SV-8939': { time: 'Hôm qua, 18:20', status: 'delivered', customer: 'Phạm Nhật Anh', phone: '0977.511.xxx', email: 'nhatanh.pham@gmail.com', userId: 'DG-1187', tier: 'Hội Viên Thân Thiết', address: 'Cầu Giấy, Hà Nội', carrier: 'Giao Nội Thành 2h', tracking: 'NT2H-250509-8939', payment: 'Chuyển khoản', paid: true, shipping: 0, discount: 0,
      items: [{ title: 'Dune Messiah', sub: 'Bản minh họa màu ấn bản kỷ niệm', qty: 1, price: 210000, img: '../assets/books/dune-messiah.png' },
              { title: 'Hoàng Tử Bé (Bản Màu)', sub: 'Bản minh họa màu ấn bản kỷ niệm', qty: 1, price: 280000, img: '../assets/books/hoangtube.png' }], note: '' },
    'SV-8812': { time: '14/05/2025', status: 'delivered', customer: 'Lê Hoàng Yến', phone: '0903.456.xxx', email: 'hoangyen.le@gmail.com', userId: 'DG-1028', tier: 'VIP Hội Viên Sơn Vỹ', address: 'Quận 1, TP.HCM', carrier: 'Đã bàn giao đơn vị vận chuyển', tracking: 'Đã đối soát', payment: 'Chuyển khoản', paid: true, shipping: 0, discount: 0,
      items: [{ title: 'Bộ Danh Tác Văn Học Nga', sub: 'Ấn bản tiêu chuẩn', qty: 1, price: 2150000, img: '' }], note: '' },
    'SV-8730': { time: '02/05/2025', status: 'delivered', customer: 'Lê Hoàng Yến', phone: '0903.456.xxx', email: 'hoangyen.le@gmail.com', userId: 'DG-1028', tier: 'VIP Hội Viên Sơn Vỹ', address: 'Quận 1, TP.HCM', carrier: 'Đã bàn giao đơn vị vận chuyển', tracking: 'Đã đối soát', payment: 'Chuyển khoản', paid: true, shipping: 0, discount: 0,
      items: [{ title: 'Trăm Năm Cô Đơn', sub: 'Ấn bản tiêu chuẩn', qty: 1, price: 1580000, img: '' }], note: '' },
    'SV-8650': { time: '25/04/2025', status: 'delivered', customer: 'Trần Thảo Ly', phone: '0912.345.678', email: 'thaoly.tran@gmail.com', userId: 'DG-1042', tier: 'Hội Viên Thân Thiết', address: 'Hoàn Kiếm, Hà Nội', carrier: 'Đã bàn giao đơn vị vận chuyển', tracking: 'Đã đối soát', payment: 'Chuyển khoản', paid: true, shipping: 0, discount: 0,
      items: [{ title: 'Tuyển Tập Thơ Xuân Quỳnh & Lưu Quang Vũ', sub: 'Ấn bản tiêu chuẩn', qty: 1, price: 3035000, img: '' }], note: '' },
    'SV-8501': { time: '18/04/2025', status: 'delivered', customer: 'Phạm Nhật Anh', phone: '0977.511.xxx', email: 'nhatanh.pham@gmail.com', userId: 'DG-1187', tier: 'Hội Viên Thân Thiết', address: 'Cầu Giấy, Hà Nội', carrier: 'Đã bàn giao đơn vị vận chuyển', tracking: 'Đã đối soát', payment: 'Chuyển khoản', paid: true, shipping: 0, discount: 0,
      items: [{ title: 'Nghìn Lẻ Một Đêm', sub: 'Ấn bản tiêu chuẩn', qty: 1, price: 2260000, img: '' }], note: '' },
    'SV-8422': { time: '08/04/2025', status: 'delivered', customer: 'Vũ Đình Trọng', phone: 'Đang cập nhật', email: 'Đang cập nhật', userId: 'DG-xxxx', tier: 'Hội Viên Thân Thiết', address: 'Đang cập nhật', carrier: 'Đã bàn giao đơn vị vận chuyển', tracking: 'Đã đối soát', payment: 'Chuyển khoản', paid: true, shipping: 0, discount: 0,
      items: [{ title: 'Bách Khoa Lịch Sử Nghệ Thuật Phương Đông', sub: 'Ấn bản tiêu chuẩn', qty: 1, price: 2160000, img: '' }], note: '' },
    'SV-8319': { time: '28/03/2025', status: 'delivered', customer: 'Hoàng Diệu Thu', phone: 'Đang cập nhật', email: 'Đang cập nhật', userId: 'DG-xxxx', tier: 'Hội Viên Thân Thiết', address: 'Đang cập nhật', carrier: 'Đã bàn giao đơn vị vận chuyển', tracking: 'Đã đối soát', payment: 'Chuyển khoản', paid: true, shipping: 0, discount: 0,
      items: [{ title: 'Bộ Tiểu Thuyết Di Sản', sub: 'Ấn bản tiêu chuẩn', qty: 1, price: 1850000, img: '' }], note: '' }
  };

  var LOGS = {
    unconfirmed: [['Khách đặt hàng thành công', 'order']],
    confirmed: [['Khách đặt hàng thành công', 'order'], ['Nhân viên xác nhận đơn & đóng gói', 'confirm']],
    delivered: [['Khách đặt hàng thành công', 'order'], ['Nhân viên xác nhận đơn & đóng gói', 'confirm'], ['Giao hàng thành công', 'done']],
    cancelled: [['Khách đặt hàng thành công', 'order'], ['Đơn hàng đã bị huỷ', 'cancel']]
  };

  var $ = function (id) { return document.getElementById(id); };
  var fmt = function (n) { return n.toLocaleString('vi-VN') + '₫'; };
  var params = new URLSearchParams(window.location.search);
  var code = (params.get('id') || 'SV-8942').toUpperCase().replace(/^#/, '');
  var order = ORDERS[code];
  var toastTimer;

  function toast(msg) {
    var t = $('aod-toast');
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 3200);
  }
  function nowText() {
    var d = new Date();
    return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ', ' + d.toLocaleDateString('vi-VN');
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function renderStatus() {
    var st = STATUS[order.status];
    var badge = $('aod-badge');
    badge.dataset.status = order.status;
    badge.textContent = st.label;

    var steps = $('aod-steps');
    steps.textContent = '';
    steps.classList.toggle('is-cancelled', order.status === 'cancelled');
    for (var i = 0; i < 3; i++) {
      var li = el('li', 'aod-step');
      var cur = order.status === 'cancelled' ? 0 : st.step;
      if (i < cur) li.classList.add('is-done');
      if (i === cur) li.classList.add('is-current');
      var dot = el('span', 'aod-step-dot');
      var ic = el('span', 'material-symbols-outlined', order.status === 'cancelled' && i === 0 ? 'cancel' : (i < cur ? 'check' : STEP_ICONS[i]));
      ic.setAttribute('aria-hidden', 'true');
      dot.appendChild(ic);
      li.appendChild(dot);
      li.appendChild(el('span', '', order.status === 'cancelled' && i === 0 ? 'Đã huỷ' : STEP_NAMES[i]));
      steps.appendChild(li);
    }

    var next = $('aod-next'), cancel = $('aod-cancel'), lock = $('aod-lock');
    var final = order.status === 'delivered' || order.status === 'cancelled';
    next.disabled = final; cancel.disabled = final;
    next.querySelector('span:last-child').textContent = order.status === 'confirmed' ? 'Xác nhận đã giao' : 'Xác nhận đơn';
    lock.hidden = !final;
    document.title = 'Chi tiết đơn hàng #' + code + ' | Quản trị Tiệm Sách Sơn Vỹ';
  }

  function renderLog() {
    var ul = $('aod-log');
    ul.textContent = '';
    order.log.forEach(function (row) {
      var li = el('li', '', row[0]);
      li.appendChild(el('time', '', row[1]));
      ul.appendChild(li);
    });
  }

  function renderItems() {
    var body = $('aod-items'); body.textContent = '';
    var sub = 0;
    order.items.forEach(function (it) {
      sub += it.price * it.qty;
      var tr = el('tr');
      var td = el('td'); var wrap = el('div', 'aod-book');
      var cover;
      if (it.img) {
        cover = el('img', 'aod-cover'); cover.src = it.img; cover.alt = 'Bìa ' + it.title; cover.loading = 'lazy';
        cover.addEventListener('error', function () {
          var f = el('span', 'aod-cover'); var i = el('span', 'material-symbols-outlined', 'menu_book');
          f.appendChild(i); cover.replaceWith(f);
        });
      } else {
        cover = el('span', 'aod-cover'); cover.appendChild(el('span', 'material-symbols-outlined', 'menu_book'));
      }
      var info = el('div'); info.appendChild(el('strong', '', it.title)); info.appendChild(el('small', '', it.sub));
      wrap.appendChild(cover); wrap.appendChild(info); td.appendChild(wrap); tr.appendChild(td);
      tr.appendChild(el('td', '', fmt(it.price)));
      tr.appendChild(el('td', '', '× ' + it.qty));
      tr.appendChild(el('td', '', fmt(it.price * it.qty)));
      body.appendChild(tr);
    });
    var total = sub + order.shipping - order.discount;
    $('aod-sub').textContent = fmt(sub);
    $('aod-ship').textContent = order.shipping ? fmt(order.shipping) : 'Miễn phí';
    $('aod-disc').textContent = order.discount ? '-' + fmt(order.discount) : '0₫';
    $('aod-total').textContent = fmt(total);
  }

  function renderInfo() {
    $('aod-code').textContent = '#' + code;
    $('aod-time').textContent = 'Đặt lúc ' + order.time;
    $('aod-cname').textContent = order.customer;
    $('aod-cphone').textContent = order.phone;
    $('aod-cmail').textContent = order.email;
    $('aod-cid').textContent = '#' + order.userId;
    $('aod-ctier').textContent = order.tier;
    $('aod-addr').textContent = order.address;
    $('aod-carrier').textContent = order.carrier;
    $('aod-track').textContent = order.tracking;
    $('aod-method').textContent = order.payment;
    var pay = $('aod-paystate');
    pay.textContent = order.paid ? 'Đã thanh toán' : 'Chưa thu tiền (COD)';
    pay.className = order.paid ? 'aod-pay-ok' : 'aod-pay-wait';
    $('aod-note').value = order.note;
  }

  function changeStatus(to, reason) {
    // Chỉ mô phỏng thao tác: không sửa order.status, order.paid hay order.log.
    var messages = {
      confirmed: 'Xác nhận đơn hàng thành công',
      delivered: 'Xác nhận giao hàng thành công',
      cancelled: 'Gửi yêu cầu huỷ đơn thành công' + (reason ? ' (lý do: ' + reason + ')' : '')
    };
    toast('[Mô phỏng] ' + (messages[to] || 'Thao tác thành công') + '. Dữ liệu đơn hàng mẫu không thay đổi.');
  }

  function init() {
    if (!order) {
      $('aod-content').hidden = true;
      $('aod-notfound').hidden = false;
      $('aod-missing').textContent = '#' + code;
      return;
    }
    order.log = LOGS[order.status].map(function (r, i, arr) { return [r[0], i === 0 ? order.time : (i === arr.length - 1 ? 'Theo cập nhật gần nhất' : 'Trong ngày')]; });
    renderInfo(); renderItems(); renderStatus(); renderLog();

    $('aod-next').addEventListener('click', function () {
      changeStatus(order.status === 'unconfirmed' ? 'confirmed' : 'delivered');
    });
    var dlg = $('aod-cancel-dialog');
    $('aod-cancel').addEventListener('click', function () { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', ''); });
    dlg.addEventListener('click', function (e) { if (e.target.closest('[data-aod-close]')) dlg.close(); });
    $('aod-cancel-form').addEventListener('submit', function (e) {
      e.preventDefault();
      changeStatus('cancelled', $('aod-reason').value);
      dlg.close();
    });
    $('aod-print').addEventListener('click', function () { toast('[Mô phỏng] Đã gửi lệnh in phiếu đóng gói #' + code + '.'); });
    $('aod-savenote').addEventListener('click', function () {
      // Không lưu ghi chú; trả ô nhập về nội dung mẫu ban đầu.
      $('aod-note').value = order.note;
      toast('[Mô phỏng] Lưu ghi chú thành công. Dữ liệu mẫu không thay đổi.');
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
