'use strict';
(() => {
  const dialog = document.getElementById('book-editor-dialog');
  const form = document.getElementById('book-editor-form');
  const editionList = document.getElementById('edition-list');
  const editionTemplate = document.getElementById('edition-template');
  const imageInput = form.elements.coverFile;
  const imagePreview = form.querySelector('.book-cover-preview');
  const demoMessage = document.getElementById('book-demo-message');
  let editingRow = null;
  let opener = null;
  let previewUrl = null;
  let imageRead = Promise.resolve();

  const categories = ['Văn học & Tiểu thuyết','Kinh doanh - Khởi nghiệp','Phát triển bản thân','Thiếu nhi & Tranh truyện'];
  const readJson = (value, fallback) => {
    try { return value ? JSON.parse(value) : fallback; } catch { return fallback; }
  };

  function showPreview(src) {
    imagePreview.hidden = !src;
    if (src) imagePreview.src = src;
    else imagePreview.removeAttribute('src');
  }

  function addEdition(data = {}) {
    const item = editionTemplate.content.firstElementChild.cloneNode(true);
    item.querySelectorAll('[data-edition-field]').forEach(input => {
      const key = input.dataset.editionField;
      if (key === 'listPrice' && !(Number(data[key]) > 0)) {
        input.value = ''; // Không có giá cũ: không hiển thị 0đ.
      } else if (data[key] !== undefined && data[key] !== null) input.value = String(data[key]);
    });
    editionList.append(item);
    refreshEditionLabels();
  }

  function refreshEditionLabels() {
    const items = [...editionList.querySelectorAll('.edition-item')];
    items.forEach((item, index) => {
      item.querySelector('.edition-item-title').textContent = `Ấn bản ${index + 1}`;
      item.querySelector('[data-remove-edition]').hidden = items.length === 1;
    });
  }

  function openEditor(row, button) {
    editingRow = row;
    opener = button;
    form.reset();
    demoMessage.hidden = true;
    demoMessage.textContent = 'Lưu mô phỏng thành công. Danh sách sách mẫu không thay đổi.';
    editionList.replaceChildren();
    imageInput.value = '';
    imageRead = Promise.resolve();
    showPreview('');
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = null;

    document.getElementById('book-editor-title').textContent = row ? 'Sửa thông tin sách' : 'Thêm sách mới';
    if (row) {
      for (const key of ['title','originalTitle','author','translator','category','publisher','distributor','description','quote']) {
        form.elements[key].value = row.dataset[key] || '';
      }
      const editions = readJson(row.dataset.editions, null);
      if (editions?.length) editions.forEach(addEdition);
      else addEdition({
        format: row.dataset.format || 'Bìa Mềm Tiêu Chuẩn',
        isbn: row.dataset.isbn || '',
        price: row.dataset.price ? Number(row.dataset.price.replace(/[^\d]/g,'')) : '',
        listPrice: row.dataset.listPrice ? Number(row.dataset.listPrice.replace(/[^\d]/g,'')) : '',
        stock: row.dataset.stock || 0,
        status: row.dataset.status || 'Đang mở bán'
      });
      showPreview(row.dataset.cover || row.querySelector('img')?.getAttribute('src') || '');
    } else {
      form.elements.category.value = categories[0];
      addEdition({format:'Bìa Mềm Tiêu Chuẩn',stock:0,status:'Đang mở bán'});
    }
    dialog.showModal();
  }

  window.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.id === 'btn-open-add' || button.matches('.btn-edit')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      openEditor(button.matches('.btn-edit') ? button.closest('.book-row') : null, button);
    } else if (button.hasAttribute('data-book-close')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      dialog.close();
    } else if (button.hasAttribute('data-add-edition')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      addEdition({format:'Bìa Mềm Tiêu Chuẩn',stock:0,status:'Đang mở bán'});
    } else if (button.hasAttribute('data-remove-edition')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      button.closest('.edition-item')?.remove();
      refreshEditionLabels();
    }
  }, true);

  imageInput.addEventListener('change', () => {
    const file = imageInput.files?.[0];
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = null;
    if (!file) return;
    if (!['image/jpeg','image/png','image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
      imageInput.value = '';
      imageInput.setCustomValidity('Chọn ảnh JPG, PNG hoặc WebP tối đa 5MB.');
      imageInput.reportValidity();
      return;
    }
    imageInput.setCustomValidity('');
    imageRead = new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => { showPreview(String(reader.result || '')); resolve(); };
      reader.onerror = () => { imageInput.setCustomValidity('Không đọc được ảnh, hãy chọn lại.'); imageInput.reportValidity(); resolve(); };
      reader.readAsDataURL(file);
    });
  });

  dialog.addEventListener('close', () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = null;
    showPreview('');
    opener?.focus();
  });

  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });

  form.addEventListener('submit', async event => {
    if (event.target !== form) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    await imageRead;
    if (!form.reportValidity()) return;
    let invalidPrice = false;
    editionList.querySelectorAll('.edition-item').forEach(item => {
      const price = Number(item.querySelector('[data-edition-field="price"]').value || 0);
      const listPriceInput = item.querySelector('[data-edition-field="listPrice"]');
      const listPrice = Number(listPriceInput.value || 0);
      listPriceInput.setCustomValidity('');
      if (listPrice > 0 && price > listPrice) {
        listPriceInput.setCustomValidity('Giá bìa phải lớn hơn hoặc bằng giá bán.');
        invalidPrice = true;
      }
    });
    if (invalidPrice) { form.reportValidity(); return; }
    demoMessage.hidden = false;
    demoMessage.focus?.();
    // Demo only: do not mutate the table, persist values, or send the chosen image anywhere.
  }, true);

  document.addEventListener('DOMContentLoaded', () => {
    if (window.AdminUI) window.AdminUI.mount({
      createTitle:'Thêm sách mới',
      summary:'Thông tin sách và các ấn bản.',
      fields:[
        {label:'Tên sách',type:'text'}, {label:'Tác giả',type:'text'},
        {label:'Danh mục',options:categories}, {label:'Nhà xuất bản',type:'text'}
      ]
    });
  });
})();
