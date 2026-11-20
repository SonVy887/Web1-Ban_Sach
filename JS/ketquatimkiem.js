'use strict';

(() => {
  const searchQuery = document.getElementById('search-results-query');
  const query = new URLSearchParams(location.search).get('q')?.trim();
  if (query) {
    searchQuery.textContent = 'Từ khóa: ' + query;
    searchQuery.hidden = false;
  }
  document.getElementById('sort').addEventListener('change', () => {
    DemoUI.toast('Đã chọn kiểu sắp xếp (mô phỏng).');
  });
  document.querySelectorAll('[data-search-action]').forEach(button => {
    button.addEventListener('click', async () => {
      const action = button.dataset.searchAction;
      if (action === 'cart') DemoUI.toast('Thêm vào giỏ hàng thành công (mô phỏng).');
      if (action === 'favorite') DemoUI.toast('Thêm vào yêu thích thành công (mô phỏng).');
      if (action === 'request') {
        const fields = [{name: 'book', label: 'Tên sách hoặc thông tin cần tìm', type: 'textarea'}];
        if (await window.SV.dialog('Yêu cầu tìm sách', fields, {}, 'Gửi yêu cầu')) {
          DemoUI.toast('Đã gửi yêu cầu tìm sách (mô phỏng).');
        }
      }
    });
  });
})();
