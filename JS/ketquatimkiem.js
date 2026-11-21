'use strict';

(() => {
  const searchQuery = document.getElementById('search-results-query');
  const query = new URLSearchParams(location.search).get('q')?.trim();
  if (query) {
    searchQuery.textContent = 'Từ khóa: ' + query;
    searchQuery.hidden = false;
  }
  const params = new URLSearchParams(location.search);
  const minPrice = Number(params.get('min-price') || 0);
  const maxPrice = Number(params.get('max-price') || 0);
  const categoryValues = params.getAll('category');
  const formatValues = params.getAll('format');
  const keyword = (params.get('q') || '').trim().toLocaleLowerCase('vi');
  const cards = [...document.querySelectorAll('.sr-book-card')];
  const list = document.querySelector('.sr-book-list');

  function applyFilters() {
    let visibleCount = 0;
    cards.forEach(card => {
      const cardPrice = Number(card.dataset.price || 0);
      const cardCategory = card.dataset.category || '';
      const cardFormat = card.dataset.format || '';
      const cardText = card.textContent.toLocaleLowerCase('vi');
      const inPrice = (!minPrice || cardPrice >= minPrice) && (!maxPrice || cardPrice <= maxPrice);
      const inCategory = !categoryValues.length || categoryValues.some(category => cardCategory === category);
      const inFormat = !formatValues.length || formatValues.some(format => cardFormat.includes(format));
      const inKeyword = !keyword || cardText.includes(keyword);
      const visible = inPrice && inCategory && inFormat && inKeyword;
      card.hidden = !visible;
      if (visible) visibleCount++;
    });
    const count = document.querySelector('.sr-result-count');
    if (count) count.textContent = 'Hiển thị ' + visibleCount + ' kết quả';
  }

  function sortCards() {
    const sort = document.getElementById('sort').value;
    if (sort === 'price-asc') {
      cards.sort((a,b)=>Number(a.dataset.price||0)-Number(b.dataset.price||0)).forEach(card=>list.append(card));
    }
  }

  document.getElementById('sort').addEventListener('change', () => {
    sortCards();
    DemoUI.toast('Đã sắp xếp kết quả.');
  });
  applyFilters();
  sortCards();
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
