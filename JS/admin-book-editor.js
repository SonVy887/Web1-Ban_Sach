'use strict';

(() => {
  const main = document.querySelector('.detail-page');
  if (!main) return;
  const mode = new URLSearchParams(location.search).get('mode');
  const codeField = main.querySelector('.product-code-field');
  if (codeField && ['view', 'edit', 'add'].includes(mode)) {
    const code = codeField.querySelector('input');
    if (mode === 'add') code.value = code.dataset.newCode;
    codeField.hidden = false;
  }
  if (!['add', 'edit'].includes(mode)) return;

  const isNew = mode === 'add';
  const title = isNew ? 'Thêm sản phẩm' : 'Sửa sản phẩm mẫu';
  document.title = title + ' | Tiệm Sách Sơn Vỹ';
  document.body.classList.add('product-editor-mode');

  const form = document.createElement('form');
  form.className = 'product-editor-form';
  form.noValidate = true;
  form.innerHTML = `
    <div class="product-editor-toolbar">
      <h1>${title}</h1>
      <div>
        <a href="../admin/books.html">Quay lại quản lý sách</a>
        <button type="submit">Lưu thông tin</button>
      </div>
    </div>`;
  const breadcrumb = main.querySelector('.breadcrumb');
  breadcrumb.hidden = true;
  breadcrumb.after(form);
  const overview = main.querySelector('.product-detail');
  form.append(overview, main.querySelector('.description-section'));

  function replaceWithField(element, label, options = {}) {
    const field = document.createElement('label');
    field.className = 'product-edit-field';
    const caption = document.createElement('span');
    caption.textContent = options.money ? label + ' (đ)' : label;
    const value = isNew ? '' : (options.value ?? element?.textContent.trim() ?? '');
    const control = document.createElement(options.choices ? 'select' : options.multiline ? 'textarea' : 'input');
    if (options.choices) {
      for (const choice of options.choices) {
        const option = document.createElement('option');
        option.value = option.textContent = choice;
        control.append(option);
      }
    }
    if (options.multiline) control.rows = 3;
    control.value = options.choices && !options.choices.includes(value) ? options.choices[0] : value;
    if (options.money) DemoUI.moneyInput(control);
    field.append(caption, control);
    if (element) element.replaceWith(field);
    return field;
  }

  const product = form.querySelector('.product-info');
  replaceWithField(product.querySelector('h1'), 'Tên sách');
  const subtitle = product.querySelector('.product-subtitle');
  const editionSubtitle = subtitle.querySelector('.product-edition-subtitle');
  const originalTitleField = replaceWithField(subtitle, 'Tên nguyên tác / tên phụ', {
    value: subtitle.firstChild.textContent.trim()
  });
  originalTitleField.after(replaceWithField(null, 'Tên ấn bản hiển thị', {
    value: editionSubtitle.textContent.trim()
  }));
  const [author, translator] = product.querySelectorAll('.authors strong');
  const authorField = replaceWithField(author.closest('span'), 'Tác giả', {
    value: author.textContent.trim()
  }).querySelector('input');
  replaceWithField(translator.closest('span'), 'Dịch giả', {value: translator.textContent.trim()});
  product.querySelector('.authors > span').remove();

  const authorCard = form.querySelector('.author-card');
  authorCard.querySelector('a')?.remove();
  const authorName = authorCard.querySelector('strong');
  const authorAvatar = authorCard.querySelector('.author-avatar');
  function updateAuthorCard() {
    const name = authorField.value.trim();
    authorName.textContent = name || 'Giới thiệu tác giả';
    authorAvatar.textContent = Array.from(name)[0]?.toLocaleUpperCase('vi') || '–';
  }
  replaceWithField(authorCard.querySelector('small'), 'Dòng giới thiệu tác giả');
  replaceWithField(authorCard.querySelector('p'), 'Tiểu sử tác giả', {multiline: true});
  authorField.addEventListener('input', updateAuthorCard);
  updateAuthorCard();
  const description = form.querySelector('#product-introduction .description-card');
  replaceWithField(description.querySelector('h2'), 'Tiêu đề giới thiệu');
  const [intro, editionIntro] = description.querySelectorAll('p');
  replaceWithField(intro, 'Mô tả tác phẩm', {multiline: true});
  const quote = description.querySelector('blockquote');
  replaceWithField(quote, 'Trích đoạn', {multiline: true, value: quote.firstChild.textContent.trim()});
  replaceWithField(editionIntro, 'Giới thiệu ấn bản', {multiline: true});

  const care = form.querySelector('#product-care');
  replaceWithField(care.querySelector('p'), 'Hướng dẫn đóng gói & bảo quản', {multiline: true});

  const categories = ['Văn học & Tiểu thuyết', 'Kinh doanh - Khởi nghiệp', 'Phát triển bản thân', 'Thiếu nhi & Tranh truyện'];
  const saleStatuses = ['Đang mở bán', 'Đang ẩn', 'Ngừng bán'];
  const table = form.querySelector('.product-spec-table');
  const pricePanel = document.createElement('section');
  pricePanel.className = 'product-editor-price-panel';
  const priceTitle = document.createElement('h2');
  priceTitle.textContent = 'Giá theo ấn bản';
  const priceFields = document.createElement('div');
  priceFields.className = 'product-editor-editions product-editor-prices';
  pricePanel.append(priceTitle, priceFields);
  overview.append(pricePanel);

  const specForm = document.createElement('div');
  specForm.className = 'product-editor-specifications';
  const specFields = document.createElement('div');
  specFields.className = 'product-editor-editions';
  const publishingFields = document.createElement('div');
  publishingFields.className = 'product-editor-publishing';

  const editions = [...table.tHead.rows[0].cells].slice(1).map((cell, index) => {
    const title = cell.textContent.trim();
    const specs = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = title;
    specs.append(legend);
    specFields.append(specs);

    const prices = document.createElement('div');
    const heading = document.createElement('h3');
    heading.id = 'product-editor-price-edition-' + (index + 1);
    heading.textContent = title;
    prices.className = 'product-editor-price-card';
    prices.setAttribute('role', 'group');
    prices.setAttribute('aria-labelledby', heading.id);
    prices.append(heading);
    priceFields.append(prices);
    return { specs, prices };
  });

  const group = document.createElement('fieldset');
  group.className = 'product-editor-categories';
  const categoryTitle = document.createElement('legend');
  categoryTitle.textContent = 'Danh mục';
  group.append(categoryTitle);
  specForm.append(publishingFields, group, specFields);

  for (const row of table.tBodies[0].rows) {
    const [heading, ...values] = row.cells;
    const label = heading.textContent.trim();
    if (label === 'Danh mục') {
      const selected = new Set(values.map(cell => cell.textContent.trim()));
      categories.forEach(category => {
        const option = document.createElement('label');
        const box = document.createElement('input');
        box.type = 'checkbox';
        box.name = 'category';
        box.value = category;
        box.checked = !isNew && selected.has(category);
        option.append(box, category);
        group.append(option);
      });
    } else if (['Nhà xuất bản', 'Đơn vị phát hành'].includes(label)) {
      publishingFields.append(replaceWithField(null, label, {value: values[0].textContent.trim()}));
    } else {
      values.forEach((cell, index) => {
        const edition = editions[index];
        const options = {
          value: cell.textContent.trim(),
          money: label.startsWith('Giá')
        };
        if (label === 'Trạng thái bán') options.choices = saleStatuses;
        const specField = replaceWithField(null, label, options);
        edition.specs.append(specField);
        if (options.money) {
          const priceField = replaceWithField(null, label, options);
          edition.prices.append(priceField);
          const specInput = specField.querySelector('input');
          const priceInput = priceField.querySelector('input');
          specInput.addEventListener('input', () => { priceInput.value = specInput.value; });
          priceInput.addEventListener('input', () => { specInput.value = priceInput.value; });
        }
      });
    }
  }
  table.closest('.product-spec-scroll').replaceWith(specForm);

  const cover = form.querySelector('.gallery-main');
  const image = cover.querySelector('img');
  const slot = document.createElement('label');
  slot.className = 'product-editor-image-slot';
  slot.innerHTML = `
    <span class="product-editor-image-frame">
      <span class="product-editor-cover-placeholder">Chưa chọn ảnh bìa</span>
    </span>
    <span class="product-editor-image-caption">${isNew ? 'Chọn ảnh bìa' : 'Đổi ảnh bìa'}</span>
    <input class="product-editor-image-picker" type="file" accept="image/*">`;
  const picker = slot.querySelector('input');
  const placeholder = slot.querySelector('.product-editor-cover-placeholder');
  image.hidden = isNew;
  placeholder.hidden = !isNew;
  slot.querySelector('.product-editor-image-frame').prepend(image);
  cover.replaceWith(slot);

  let previewUrl;
  picker.addEventListener('change', () => {
    const file = picker.files[0];
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = URL.createObjectURL(file);
    image.src = previewUrl;
    image.hidden = false;
    placeholder.hidden = true;
  });
  window.addEventListener('pagehide', event => {
    if (!event.persisted && previewUrl) URL.revokeObjectURL(previewUrl);
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    DemoUI.toast(isNew ? 'Thêm sản phẩm thành công (mô phỏng).' : 'Lưu thông tin thành công (mô phỏng).');
  });
})();
