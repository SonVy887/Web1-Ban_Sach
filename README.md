# Tiệm Sách Sơn Vỹ

Website bán sách với phong cách ấm áp, sử dụng màu xanh rừng, terracotta và nền kem như giấy sách.

## Các trang hiện có

- `index.html` mở trang chủ `user/trangchu.html`. Toàn bộ các trang người mua nằm trong `user/`.
- `user/danhmucsanpham.html` và `user/ketquatimkiem.html` dùng tham số `page` cho phân trang mô phỏng.
- `user/chitietsanpham.html` và `user/chitietdonhang.html` dùng chung cho người mua và chế độ quản trị.
- `user/giohang.html` là trang giỏ hàng và thanh toán. `user/wishlist.html` là trang sách yêu thích.
- `admin/index.html` mở trang tổng quan `admin/dashboard.html`. Các trang quản trị nằm trong `admin/`.

## Quy tắc giao diện cần giữ

### Header và footer

- Các trang mới phải giữ cấu trúc header giống `user/trangchu.html`.
- Navigation, logo, ô tìm kiếm, icon yêu thích, giỏ hàng, đăng nhập và đăng ký phải đồng nhất với trang chủ.
- Footer phải giữ đúng cấu trúc và nội dung của trang chủ.
- Block voucher **Đặc Quyền Thành Viên Mới** phải nằm ngay trước footer, gồm:
  - `Đặc Quyền Thành Viên Mới`
  - `Gia Nhập Câu Lạc Bộ Bạn Đọc Sơn Vỹ`
  - Voucher 50.000đ
  - Ô nhập email
  - Nút `Nhận voucher`
  - Dòng cam kết không gửi thư rác

### Typography

Website chỉ sử dụng hai font được khai báo trong `CSS/theme.css`:

- `--font-serif`: Lora, dùng cho logo, tiêu đề lớn, tên sách, giá nổi bật và nội dung quote.
- `--font-sans`: Inter, dùng cho nội dung, menu, metadata, form, filter, button và label.

Dùng `CSS/typography.css` sau CSS riêng của trang để đồng bộ các vai trò: tiêu đề trang 26–32 px, tiêu đề mục 24 px, tiêu đề thẻ 18 px, nội dung cơ bản 16 px và nhãn, nút, ô nhập 14 px ở cỡ chữ mặc định của trình duyệt. Tiêu đề banner và tên sách nổi bật trên trang chi tiết dùng thang chữ riêng.

Không thêm hệ font riêng cho từng trang. Khi tạo trang mới, phải tải `Lora` và `Inter` hoặc dùng fallback đã định nghĩa trong theme.

### Màu sắc và biến theme

Ưu tiên dùng biến trong `CSS/theme.css`, không hard-code màu nếu đã có biến tương ứng:

- `--color-primary`: xanh rừng chủ đạo.
- `--color-secondary`: terracotta.
- `--color-surface` và các biến `--color-surface-container-*`: nền kem và nền card.
- `--color-text-main`, `--color-text-muted`, `--color-error`, `--color-success`.
- `--font-regular`, `--font-medium`, `--font-semibold`, `--font-bold`.

### JavaScript

- Không sử dụng JavaScript trong các file HTML.
- Không thêm thẻ `<script>`, inline event handler như `onclick`, hoặc URL `javascript:`.
- Các tương tác cần được thể hiện bằng HTML và CSS tĩnh theo yêu cầu giao diện.

## Quy tắc tài nguyên

- Dùng đường dẫn tài nguyên cục bộ. Từ HTML trong `user/` và `admin/`, ảnh nằm ở `../assets/books/...` và `../assets/logo/...`.
- Kiểm tra ảnh trong Chrome, bảo đảm không có request ảnh local bị lỗi.
- Không đưa file mẫu tạm hoặc ảnh chụp kiểm tra vào repo nếu không được yêu cầu.
- Các file CSS riêng đặt trong thư mục `CSS/` và dùng chung `CSS/main.css`, `CSS/reset.css`, `CSS/theme.css` khi phù hợp.

## Quy trình kiểm tra giao diện

Khi dựng hoặc chỉnh một trang theo mẫu:

1. Đọc code hiện có trước khi sửa.
2. Render cả trang mẫu và trang dự án bằng Chrome DevTools.
3. Chụp và đối chiếu theo từng block nhỏ:
   - header/navigation
   - tiêu đề và breadcrumb
   - filter/sort
   - card sản phẩm hoặc card sách
   - analytics/recommendation nếu có
   - voucher
   - footer
4. Kiểm tra computed style cho font, font-weight, màu, margin, padding, width và height.
5. Sửa đúng block bị lệch, không sửa lan sang phần không liên quan.
6. Kiểm tra console, ảnh local, responsive layout và `git diff --check`.

## Các lỗi đã từng gặp và cách tránh

- Ảnh homepage bị hỏng do dùng sai đường dẫn thư mục cha: luôn dùng đường dẫn local đúng từ file HTML.
- Header bảng giỏ hàng bị lệch do số cột CSS không khớp số phần tử trực tiếp: số grid columns phải khớp markup.
- Tiêu đề sách bị xuống dòng sai: kiểm soát kích thước vùng thông tin và chỉ dùng `<br>` khi mẫu thực sự yêu cầu.
- Font bị rơi về Georgia/Segoe UI: trang phải tải Lora và Inter, sau đó dùng `var(--font-serif)` hoặc `var(--font-sans)`.
- Wishlist từng thiếu block voucher trước footer: mọi trang có footer theo trang chủ phải giữ block này.
- Không sử dụng JavaScript trong HTML theo quy tắc chung của dự án.

## Kiểm tra nhanh

```powershell
git diff --check
```

Khi kiểm tra wishlist bằng Chrome, cần xác nhận:

- Không có lỗi console.
- Không có ảnh bị hỏng.
- Có đủ voucher, footer, analytics và recommendation.
