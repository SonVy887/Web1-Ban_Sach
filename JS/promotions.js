'use strict';
window.AdminUI.mount({
  "createTitle": "Tạo mã khuyến mãi mới",
  "summary": "Thông tin chương trình và lịch sử sử dụng mã ưu đãi.",
  describeRecord(action) {
    if (action === 'details') return {title: 'Chi tiết voucher', columns: [0, 1, 2, 3, 4, 5, 6]};
    if (action === 'edit') return {columns: [1, 2, 3, 4, 5, 6]};
  },
  "fields": [
    {
      label: 'Mã voucher',
      value: 'SONVY_MOI',
      readOnly: true,
      editValue: trigger => trigger.closest('tr').querySelector('.promotion-code').textContent.trim()
    },
    {
      "label": "Tên chương trình",
      "type": "text"
    },
    {
      "label": "Giá trị giảm (đ)",
      "type": "money"
    },
    {
      "label": "Đơn hàng tối thiểu (đ)",
      "type": "money"
    },
    {
      "label": "Ngày bắt đầu",
      "type": "date"
    },
    {
      "label": "Ngày kết thúc",
      "type": "date"
    },
    {
      "label": "Số lượt sử dụng tối đa",
      "type": "number"
    }
  ]
});
