'use strict';
window.AdminUI.mount({
  "createTitle": "Tạo mã khuyến mãi mới",
  "summary": "Thông tin chương trình và lịch sử sử dụng mã ưu đãi.",
  "fields": [
    {
      "label": "Mã khuyến mãi",
      "type": "text"
    },
    {
      "label": "Tên chương trình",
      "type": "text"
    },
    {
      "label": "Giá trị giảm (đ)",
      "type": "number"
    },
    {
      "label": "Đơn hàng tối thiểu (đ)",
      "type": "number"
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
