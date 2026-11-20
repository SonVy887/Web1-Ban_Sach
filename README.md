# Tiệm Sách Sơn Vỹ

Tiệm Sách Sơn Vỹ là website bán sách demo được xây dựng bằng HTML, CSS và JavaScript thuần. Giao diện lấy cảm hứng từ cửa hàng sách Việt Nam, sử dụng màu xanh rừng, terracotta và nền kem như giấy sách.

Dự án mô phỏng hai phân hệ:

- Người mua: xem sách, tìm kiếm, danh mục, giỏ hàng, đặt hàng và lịch sử đơn hàng.
- Quản trị: đăng nhập quản trị, quản lý người dùng, sách, đơn hàng và thống kê khách hàng.

## Mục tiêu

- Tạo một mẫu website bán sách hoàn chỉnh có thể chạy trực tiếp trên trình duyệt.
- Mô phỏng luồng mua hàng và vận hành cửa hàng mà không cần backend hoặc cơ sở dữ liệu.
- Duy trì giao diện thống nhất giữa trang người mua và trang quản trị.
- Hỗ trợ kiểm tra responsive trên mobile, tablet và desktop.

## Công nghệ

- HTML5.
- CSS3, gồm CSS nội bộ theo từng phân trang và các biến thiết kế dùng chung.
- JavaScript thuần.
- LocalStorage để lưu trạng thái demo.
- Chrome DevTools và Lighthouse để kiểm tra giao diện, responsive và accessibility.
- Không sử dụng framework hoặc server backend.

## Chức năng người mua

### Khám phá sản phẩm

- Hiển thị trang chủ và sách đề cử.
- Xem sách theo danh mục.
- Xem chi tiết sách.
- Hiển thị kết quả dạng danh sách hoặc lưới.
- Hiển thị dữ liệu theo trang bằng tham số `page`.

### Tìm kiếm

- Tìm kiếm cơ bản theo tên tựa sách, tác giả hoặc dịch giả.
- Tìm kiếm nâng cao theo:
  - Tên sách.
  - Danh mục.
  - Hình thức.
  - Khoảng giá.
  - Cách sắp xếp.
- Hiển thị bộ lọc đang áp dụng và hỗ trợ bỏ từng điều kiện.

### Tài khoản và đăng ký

- Giao diện đăng nhập và đăng ký.
- Trạng thái đăng nhập được mô phỏng bằng tham số `demo-login=1`.
- Khi đăng nhập, header hiển thị menu tài khoản của người mua.
- Trang tài khoản hiển thị thông tin cá nhân và cài đặt tài khoản.

### Giỏ hàng

- Thêm và bỏ sản phẩm khỏi giỏ hàng.
- Thay đổi số lượng.
- Xóa từng sản phẩm hoặc xóa toàn bộ giỏ.
- Chọn địa chỉ giao hàng có sẵn hoặc nhập địa chỉ mới.
- Chọn thanh toán khi nhận hàng hoặc chuyển khoản QR.
- Tính tạm tính, chiết khấu, mã giảm giá và tổng thanh toán.

### Đơn hàng

- Tạo đơn hàng sau khi hoàn tất đặt hàng.
- Lưu đơn hàng demo bằng `localStorage`.
- Hiển thị mã đơn, trạng thái, sản phẩm, địa chỉ và tổng tiền.
- Xem lịch sử đơn hàng được nhóm theo từng đơn.
- Hỗ trợ giao diện hủy đơn, theo dõi và đánh giá demo.

## Chức năng quản trị

### Đăng nhập quản trị

- Cổng đăng nhập riêng trong thư mục `admin/`.
- Tài khoản quản trị demo không kết nối hệ thống xác thực thật.
- Trạng thái đăng nhập demo được lưu trong `localStorage`.

### Quản lý người dùng

- Hiển thị danh sách người dùng.
- Tạo tài khoản người dùng.
- Sửa thông tin người dùng.
- Khóa hoặc mở khóa tài khoản.

### Quản lý sách

- Hiển thị danh sách sách.
- Tạo sách mới.
- Chọn phân loại đúng với danh mục.
- Upload ảnh và xem trước ảnh trước khi lưu.
- Sửa thông tin, phân loại, ấn bản, giá và hình ảnh.
- Lọc theo tên, danh mục, nhà xuất bản và khoảng giá.
- Xóa hoặc ẩn sản phẩm tùy theo tình trạng đã từng được bán.

### Quản lý đơn hàng

- Hiển thị danh sách đơn hàng.
- Cập nhật trạng thái đơn hàng.
- Luồng trạng thái chỉ cho phép tiến xuôi:
  - Chưa xác nhận.
  - Đã xác nhận.
  - Đã giao thành công.
  - Đã hủy.
- Lọc đơn hàng theo trạng thái.
- Lọc theo khoảng thời gian đặt hàng.
- Lọc theo địa điểm giao hàng.
- Xem chi tiết từng đơn.

### Thống kê

- Nhập khoảng thời gian thống kê.
- Liệt kê 5 khách hàng mua nhiều nhất trong khoảng thời gian.
- Sắp xếp khách hàng theo tổng tiền mua giảm dần.
- Liệt kê từng đơn hàng của khách hàng.
- Cung cấp liên kết xem chi tiết đơn hàng.
- Tính tổng tiền mua và tổng số đơn.

## Cấu trúc thư mục

```text
DoAnWeb/
├── index.html
├── README.md
├── user/
│   ├── trangchu.html
│   ├── danhmucsanpham.html
│   ├── ketquatimkiem.html
│   ├── chitietsanpham.html
│   ├── giohang.html
│   ├── order-success.html
│   ├── my-orders.html
│   ├── chitietdonhang.html
│   ├── account.html
│   ├── wishlist.html
│   ├── login.html
│   └── register.html
├── admin/
│   ├── admin-login.html
│   ├── dashboard.html
│   ├── books.html
│   ├── book-editor.html
│   ├── customers.html
│   ├── orders.html
│   ├── order-detail.html
│   ├── inventory.html
│   └── promotions.html
├── CSS/
├── JS/
└── assets/
    ├── books/
    ├── logo/
    ├── fonts/
    └── member-pages/
```

## Cách chạy

Website là trang tĩnh. Không cần cài đặt backend hoặc database.

Mở `index.html` trực tiếp bằng trình duyệt hoặc chạy một HTTP server cục bộ:

```powershell
python -m http.server 5500
```

Sau đó truy cập:

```text
http://localhost:5500/index.html
```

Các đường dẫn demo chính:

```text
Trang chủ:
http://localhost:5500/user/trangchu.html

Danh mục:
http://localhost:5500/user/danhmucsanpham.html

Giỏ hàng:
http://localhost:5500/user/giohang.html?demo-login=1

Đơn hàng của tôi:
http://localhost:5500/user/my-orders.html?demo-login=1

Đăng nhập quản trị:
http://localhost:5500/admin/admin-login.html

Quản lý sách:
http://localhost:5500/admin/books.html

Quản lý đơn hàng:
http://localhost:5500/admin/orders.html
```

## Trạng thái dữ liệu demo

Dữ liệu mẫu được lưu trong `localStorage` dưới khóa:

```text
sv_demo_store_v1
```

Mức lưu trữ hiện tại bao gồm:

- Giỏ hàng.
- Địa chỉ giao hàng.
- Hình thức thanh toán.
- Đơn hàng.
- Danh sách người dùng.
- Danh sách sản phẩm.
- Trạng thái đăng nhập quản trị.

Dữ liệu có thể được đặt lại bằng cách xóa `localStorage` của trang trong Chrome DevTools hoặc sử dụng JavaScript:

```javascript
localStorage.removeItem('sv_demo_store_v1');
location.reload();
```

## Quy tắc giao diện

- Logo, header, navigation và footer được giữ thống nhất giữa các trang người mua.
- Hai font chính:
  - `--font-serif`: Lora cho tiêu đề, tên sách và giá nổi bật.
  - `--font-sans`: Inter cho giao diện, menu, form, nút và metadata.
- Màu chủ đạo được khai báo trong `CSS/theme.css`:
  - Xanh rừng cho thương hiệu và tiêu đề.
  - Terracotta cho sắc nhấn và khuyến mãi.
  - Nền kem cho toàn bộ trang.
- Không dùng đường dẫn ảnh tuyệt đối.
- Không đặt JavaScript inline trong các file HTML.
- Sử dụng các file JavaScript trong thư mục `JS/`.
- Đặt block voucher trước footer trên các trang người mua phù hợp.

## Responsive

Trang nên được kiểm tra tối thiểu tại:

- Mobile: `375 × 667` và `390 × 844`.
- Tablet: `768 × 1024`.
- Laptop nhỏ: `1024 × 768`.
- Laptop/desktop: `1366 × 768` và `1440 × 900`.

Các tiêu chí kiểm tra:

- Không có tràn ngang.
- Header không che nội dung.
- Menu mobile hoạt động đúng.
- Card và bảng không tràn khỏi khung.
- Form và nút có kích thước chạm phù hợp.
- Heading hierarchy hợp lý.
- Hình ảnh có `alt`.
- Tất cả control có label hoặc accessible name.
- Không có lỗi Console.

## Kiểm tra Chrome DevTools

Nên kiểm tra trang bằng Chrome DevTools ở phần:

- Lighthouse: Accessibility, Best Practices và SEO.
- Network: kiểm tra request ảnh/CSS/JS.
- Console: kiểm tra lỗi JavaScript.
- Device Emulation: kiểm tra responsive.
- Accessibility snapshot: kiểm tra tên control và heading.
- Performance trace: kiểm tra LCP và render blocking.

Ví dụ kiểm tra Git cơ bản:

```powershell
git diff --check
git status --short
```

## Hạn chế của bản demo

- Chưa kết nối API hoặc backend.
- Chưa lưu dữ liệu trên máy chủ.
- Chưa xử lý thanh toán thật.
- Chưa gửi email, SMS hoặc thông báo.
- Chưa có xác thực tài khoản bảo mật.
- Các thao tác thêm, sửa, xóa, thống kê là mô phỏng giao diện.
- Cần dùng `localStorage` để duy trì trạng thái demo giữa các trang.

## Hướng phát triển

- Thay `localStorage` bằng REST API và cơ sở dữ liệu.
- Thêm xác thực đăng nhập bằng JWT hoặc session.
- Thêm phân quyền chi tiết cho quản trị viên và nhân viên.
- Lưu sản phẩm, tồn kho và đơn hàng ở backend.
- Kết nối cổng thanh toán thật.
- Thêm upload ảnh lên server hoặc object storage.
- Thêm unit test và end-to-end test.
- Thêm CI/CD và triển khai thực tế.
