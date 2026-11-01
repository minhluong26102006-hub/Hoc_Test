# Shop Bún - Giao Diện Bún Đậu Mắm Tôm Chuẩn Vị Hà Thành

Website giới thiệu và đặt món cho cửa hàng bún đậu mắm tôm "Shop Bún".

## 📁 Cấu Trúc Thư Mục Chuẩn Hóa (Project Structure)

```text
Hoc_HTML/
├── index.html                   # Trang đích chính
├── Product.html                 # Trang sản phẩm & đặt món
├── css/                         # Thư mục chứa toàn bộ stylesheets phân hệ
│   ├── variables.css            # Biến màu sắc, khoảng cách, bo góc, typography
│   ├── reset.css                # Reset CSS & cấu hình cơ bản cho body
│   ├── header.css               # Sticky Navigation & Giỏ hàng
│   ├── hero.css                 # Banner mở đầu với hình ảnh & lớp phủ tối
│   ├── products.css             # Chi tiết món đặc biệt & lưới danh sách món
│   ├── reviews.css              # Thống kê uy tín & đánh giá của khách hàng
│   ├── footer.css               # Chân trang nền đậm, icon MXH & bản đồ Maps
│   ├── toast.css                # Thông báo Toast
│   ├── responsive.css           # Cấu hình hiển thị Tablet & Mobile
│   └── main.css                 # Điểm tập hợp toàn bộ các module CSS
├── js/                          # Thư mục chứa các module JavaScript độc lập
│   ├── toast.js                 # Module thông báo Toast (MLToast.show)
│   ├── cart.js                  # Module đếm và cập nhật giỏ hàng (MLCart)
│   ├── pricing.js               # Module tính giá tự động theo Combo size (MLPricing)
│   ├── scrollspy.js             # Module cuộn theo dõi menu tương tác (MLScrollspy)
│   └── main.js                  # Điểm khởi chạy và gắn sự kiện giao diện
└── README.md                    # Tài liệu hướng dẫn dự án
```

## 📐 Quy Ước Đặt Tên & Thiết Kế (Conventions)
1. **Tách biệt thư mục:** Toàn bộ CSS được gom vào thư mục `/css`, JavaScript được gom vào thư mục `/js`.
2. **Tính Module Hóa (Modularity):** Mỗi file đảm nhận một vai trò duy nhất, các function trong JavaScript được đóng gói thành các đối tượng/hàm có thể tái sử dụng độc lập (`MLToast`, `MLCart`, `MLPricing`, `MLScrollspy`).
3. **Tiền tố Class Tránh Xung Đột (Prefix Convention):** Toàn bộ các class được đặt theo tiền tố `.ml-` (ví dụ: `.ml-body`, `.ml-site-header`, `.ml-product-card`, `.ml-btn-buy`) nhằm chống xung đột (conflict) với bất kỳ thư viện hoặc gói package ngoài nào.
4. **Ngôn ngữ chuẩn Tiếng Anh (English Naming):** Tất cả tên file và tên class CSS được chuẩn hóa 100% bằng tiếng Anh rõ nghĩa theo chuẩn BEM/Semantic.
