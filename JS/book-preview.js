'use strict';

(() => {
  const books = {
    "SV-BK02": {
      "title": "Cây Cam Ngọt Của Tôi",
      "author": "José Mauro",
      "publisher": "NXB Nhã Nam",
      "distributor": "Nhã Nam",
      "category": "Văn học & Tiểu thuyết",
      "originalTitle": "Meu Pé de Laranja Lima",
      "translator": "Tô Huệ Lan",
      "description": "Câu chuyện dịu dàng về tuổi thơ, tình yêu thương và những điều làm nên một trái tim tốt.",
      "cover": "assets/books/admin-book-2.jpg",
      "edition": {
        "format": "Bìa Mềm Tiêu Chuẩn",
        "isbn": "978-604-2",
        "price": 108000,
        "listPrice": null,
        "stock": 34,
        "editionNumber": "",
        "pageCount": "",
        "dimensions": "",
        "paperType": "",
        "status": "Đang mở bán"
      }
    },
    "SV-BK03": {
      "title": "Thổ Hạc Xuân Tình Tuyển Tập",
      "author": "Sơn Vỹ Tuyển Tập",
      "publisher": "Xưởng Thư Họa",
      "distributor": "Xưởng Thư Họa",
      "category": "Văn học & Tiểu thuyết",
      "originalTitle": "",
      "translator": "",
      "description": "",
      "cover": "assets/books/admin-book-3.jpg",
      "edition": {
        "format": "Bìa Cứng Boxset",
        "isbn": "978-604-7",
        "price": 950000,
        "listPrice": null,
        "stock": 5,
        "editionNumber": "Bản cổ phục dựng",
        "pageCount": "",
        "dimensions": "",
        "paperType": "",
        "status": "Đang mở bán"
      }
    },
    "SV-BK04": {
      "title": "Dune Messiah",
      "author": "Frank Herbert",
      "publisher": "NXB Kim Đồng",
      "distributor": "NXB Kim Đồng",
      "category": "Văn học & Tiểu thuyết",
      "originalTitle": "Dune Messiah",
      "translator": "",
      "description": "",
      "cover": "assets/books/admin-book-4.jpg",
      "edition": {
        "format": "Bìa Mềm Tiêu Chuẩn",
        "isbn": "978-604-5",
        "price": 185000,
        "listPrice": null,
        "stock": 4,
        "editionNumber": "",
        "pageCount": "",
        "dimensions": "",
        "paperType": "",
        "status": "Đang mở bán"
      }
    }
  };

  const params = new URLSearchParams(location.search);
  const code = params.get('book');
  if (params.has('mode') || !Object.hasOwn(books, code)) return;
  const book = books[code];
  const edition = book.edition;
  const money = value => new Intl.NumberFormat('vi-VN').format(value) + 'đ';
  const $ = selector => document.querySelector(selector);
  const remove = selector => $(selector)?.remove();

  document.title = book.title + ' | Tiệm Sách Sơn Vỹ';
  $('.product-info h1').textContent = book.title;
  $('.product-subtitle').textContent = book.originalTitle || edition.format;
  $('.breadcrumb').replaceChildren(
    ...Array.from($('.breadcrumb').children).slice(0, 4),
    Object.assign(document.createElement('strong'), {textContent: book.title})
  );
  const cover = $('.gallery-main img');
  cover.src = book.cover;
  cover.alt = 'Bìa ' + book.title;
  for (const selector of ['.limited-badge', '.bestseller-badge', '.edition-note', '.product-info .rating', '.reviews-section', '.price-row del', '.price-row span']) {
    remove(selector);
  }
  $('.authors > span:first-child strong').textContent = book.author;
  if (book.translator) {
    $('.authors > span:last-child strong').textContent = book.translator;
  } else {
    document.querySelectorAll('.authors > span:not(:first-child)').forEach(item => item.remove());
  }
  $('.price-row strong').textContent = money(edition.price);
  const formats = $('.format-options');
  const format = $('.format-options .format-option');
  format.firstChild.nodeValue = edition.format;
  format.querySelector('strong').textContent = money(edition.price);
  formats.replaceChildren(formats.querySelector('legend'), format);
  const intro = $('#product-introduction .description-card');
  intro.querySelector('h2').textContent = 'Giới thiệu tác phẩm';
  intro.querySelector('p').textContent = book.description || book.title;
  intro.querySelectorAll('blockquote, p:not(:first-of-type)').forEach(item => item.remove());
  $('.author-card strong').textContent = book.author;
  $('.author-avatar').textContent = Array.from(book.author)[0];
  document.querySelectorAll('.author-card :is(small, p, a)').forEach(item => item.remove());

  const specs = $('.product-spec-table');
  specs.tHead.rows[0].cells[1].textContent = edition.format;
  const values = {
    'Nhà xuất bản': book.publisher,
    'Đơn vị phát hành': book.distributor,
    'Danh mục': book.category,
    'Định dạng': edition.format,
    'ISBN (mẫu)': edition.isbn,
    'Giá bìa / giá cũ': edition.listPrice && money(edition.listPrice),
    'Giá bán': money(edition.price),
    'Số lượng tồn': edition.stock,
    'Mã / số hiệu ấn bản': edition.editionNumber,
    'Số trang': edition.pageCount,
    'Kích thước': edition.dimensions,
    'Loại giấy': edition.paperType,
    'Trạng thái bán': edition.status
  };
  Array.from(specs.rows).forEach(row => {
    row.deleteCell(2);
    if (row.parentNode === specs.tHead) return;
    const value = values[row.cells[0].textContent.trim()];
    if (value === '' || value == null) row.remove();
    else row.cells[1].textContent = value;
  });
})();
