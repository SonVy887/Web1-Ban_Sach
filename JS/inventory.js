'use strict';
window.AdminUI.mount({
  "createTitle": "Tạo phiếu nhập mới",
  "summary": "Thông tin phiếu nhập sách, nhà xuất bản và lịch giao nhận.",
  "fields": [
    {
      "label": "Mã phiếu nhập",
      "type": "text"
    },
    {
      "label": "Nhà xuất bản / nhà cung cấp",
      "type": "text"
    },
    {
      "label": "Ngày nhập dự kiến",
      "type": "date"
    },
    {
      "label": "Tên sách",
      "type": "text"
    },
    {
      "label": "Số lượng",
      "type": "number"
    },
    {
      "label": "Đơn giá nhập (đ)",
      "type": "number"
    }
  ]
});
