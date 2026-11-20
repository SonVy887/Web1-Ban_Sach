'use strict';
window.AdminUI.mount({
  ...window.AdminUI.receiptForm,
  summary: 'Thông tin phiếu nhập sách, nhà xuất bản và lịch giao nhận.',
  describeRecord(action, trigger) {
    const row = trigger.closest('tr');
    if (!row || (action !== 'details' && action !== 'tracking')) return;
    const [code, date] = row.cells[0].children;
    const tracking = action === 'tracking';
    return {
      title: tracking ? 'Lộ trình phiếu nhập' : 'Chi tiết phiếu nhập',
      entries: [['Mã phiếu nhập', code.textContent.trim()], ['Thời điểm', date.textContent.trim()]],
      columns: tracking ? [1, 4, 5] : [1, 2, 3, 4, 5]
    };
  }
});
