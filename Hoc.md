
## 1. Phần HTML (Dựng khung cho trang web)
HTML chia trang web thành các phần rõ ràng:
- `<header>`: Phần đầu trang, để logo tên quán "Shop Bún", menu chuyển trang và góc giỏ hàng.
- `<nav>`: Chứa các nút bấm menu (Giới thiệu, Món đặc biệt, Thực đơn, Đánh giá, Liên hệ).
- `<section>`: Từng khúc nội dung của trang web (Khúc banner chào mừng, khúc giới thiệu món, khúc danh sách, khúc nhận xét của khách).
- `<footer>`: Chân trang ở dưới cùng, ghi giờ mở cửa, số điện thoại hotline, bản đồ chỉ đường.

## 2. Phần CSS (Trang trí và làm đẹp giao diện)
CSS Làm đẹp trang web:
- **Đặt tên class có chữ `ml-` ở đầu**
  - `ml` là viết tắt tên của mình (Minh Lương).
  - Đặt như vậy để sau này có cài thêm thư viện nào khác vào thì code của em không bị trùng tên.
- **Biến màu trong `variables.css`:**
  - Gom các mã màu hay dùng lên đầu file. Khi muốn đổi màu cả web thì chỉ cần sửa 1 chỗ là xong.
- **Flexbox và Grid (Cách xếp các ô):**
  - `Flexbox`: Dùng để xếp các thứ nằm thẳng một hàng ngang (như menu hoặc nút bấm).
  - `Grid`: Dùng để chia lưới danh sách món ăn thành 4 cột đều nhau trên máy tính, khi xem trên điện thoại thì tự co lại thành 1 cột cho dễ nhìn.

## 3. Phần JavaScript Cốt Lõi (Các module dùng chung)
JavaScript giúp trang web có thể tương tác với người dùng:

### File 1: `cart.js` (Quản lý giỏ hàng)
- **Nhiệm vụ:** Đếm xem người ta đã chọn bao nhiêu món.
- **Hàm `addItem()`:** Cứ mỗi lần bấm nút "Mua", nó sẽ cộng số lượng thêm 1.
- **Hàm `updateBadge()`:** Cập nhật con số đó lên ô giỏ hàng ở góc trên màn hình, làm cho ô giỏ hàng nảy nhẹ một cái để người dùng biết là đã thêm thành công.

### File 2: `toast.js` (Hiện thông báo góc màn hình)
- **Nhiệm vụ:** Hiện cái bảng nhỏ thông báo ở góc phải dưới màn hình (ví dụ: "Đã thêm Bún đậu vào giỏ!").
- **Hàm `show()`:** 
  - Bật cái bảng lên.
  - Chờ khoảng 2.5 giây thì tự động ẩn đi.
  - Nếu bấm mua liên tục thì nó sẽ làm mới thời gian chờ, không bị chớp tắt giật cục.

### File 3: `pricing.js` (Đổi giá theo size)
- **Nhiệm vụ:** Tính tiền theo cỡ mẹt bún người dùng chọn.
- **Cách hoạt động:** Có sẵn bảng giá. Khi người dùng chọn size khác trong danh sách thả xuống, giá tiền trên màn hình tự đổi số tương ứng mà không cần phải tải lại trang web.

### File 4: `scrollspy.js` (Theo dõi cuộn chuột cho menu)
- **Nhiệm vụ:** Khi cuộn trang web xuống đến phần nào, thì chữ "Đánh giá" trên thanh menu trên cùng tự động sáng gạch chân màu cam, giúp người dùng biết mình đang ở đoạn nào của trang.

### File 5: `main.js` (Nối các nút bấm lại với nhau ở trang chủ)
- **Nhiệm vụ:** Là chỗ trung tâm của trang chủ. Khi trang web tải xong, nó sẽ:
  - Bật tính năng đổi giá (`pricing.js`) và theo dõi cuộn trang (`scrollspy.js`).
  - Gắn sự kiện "khi người dùng bấm chuột" (`click`) vào các nút Mua hàng: bấm một cái thì vừa tăng giỏ hàng (`cart.js`), vừa hiện bảng thông báo (`toast.js`).

## 4. Phần Mới Bổ Sung: Trang Thực Đơn (`collection.html`)
Thay vì nhồi nhét tất cả món ăn vào trang chủ, em đã làm riêng một trang Thực Đơn:

### 1. Cấu trúc trang `collection.html`
- **Đường dẫn bánh mì (Breadcrumb):** Dòng chữ `Trang chủ / Thực đơn quán` ở đầu trang để người xem biết mình đang đứng ở trang nào và có thể bấm quay về trang chủ nhanh.
- **Đầy đủ 14 món ăn chia thành 3 nhóm:**
  - Nhóm 1: Mẹt bún đậu (các size nhỏ, vừa, lớn, đại, đặc biệt).
  - Nhóm 2: Topping gọi thêm (đậu rán, chả cốm, nem rán, dồi sụn, thịt bắp).
  - Nhóm 3: Nước giải khát (trà tắc, nước mơ, nước sấu, trà chanh).
- **Mỗi thẻ món ăn lưu sẵn dữ liệu ẩn (Data Attributes):**
  - `data-category="combo"` (để biết món này thuộc nhóm nào).
  - `data-price="35000"` (để biết giá tiền dạng số mà sắp xếp).

### 2. File trang trí `css/collection.css`
- Làm đẹp cho thanh công cụ lọc: Các tab danh mục bo tròn dạng viên thuốc, ô tìm kiếm có icon kính lúp, dropdown chọn giá.
- Thêm trạng thái rỗng (`.ml-empty-state`): Khi khách gõ từ khóa tìm kiếm mà không có món nào trùng khớp, màn hình sẽ hiện một thông báo lịch sự "Không tìm thấy món ăn phù hợp" thay vì để màn hình trắng trơn.

### 3. File xử lý `js/collection.js`
File này chứa các chức năng cực kỳ thông minh:
- **Lọc theo tab danh mục:** Khi khách bấm vào tab "Nước Giải Khát", hàm sẽ xem thuộc tính `data-category` của từng món. Món nào không phải nước thì giấu đi (`display: none`), món nào là nước thì để lại.
- **Tìm kiếm món tức thì:** Khi khách gõ chữ vào ô tìm kiếm (ví dụ gõ "nem"), hàm tự động so sánh chữ đó với tên món và mô tả. Chữ nào khớp thì hiện, không khớp thì giấu đi ngay lập tức.
- **Sắp xếp theo giá (Hàm `applySort`):** Đọc giá tiền từ `data-price` rồi dùng hàm sắp xếp `sort()` của JavaScript để đảo lại thứ tự các ô: đưa món rẻ lên trước hoặc món đắt lên trước.
- **Tự đếm số món:** Đếm xem trên màn hình đang có bao nhiêu món thỏa mãn điều kiện và in ra con số (ví dụ: "14 món", "4 món"). Nếu là 0 món thì tự động bật thông báo rỗng lên.
- **Tái sử dụng giỏ hàng:** Dùng lại luôn `MLCart` và `MLToast` của các bài trước. Bấm mua món nào ở trang thực đơn thì góc trên màn hình vẫn cộng số và góc dưới vẫn nảy thông báo bình thường.

## 5. Phần Mới Bổ Sung: Trang Chi Tiết Món Ăn (`product-detail.html`)
Khi khách bấm vào nút "Xem chi tiết" hoặc bấm "Món đặc biệt" trên thanh menu, trang này sẽ mở ra để khách tùy ý cấu hình món ăn theo khẩu vị của mình.

### 1. Cấu trúc trang (HTML)
- **Cột bên trái - Bộ sưu tập ảnh (Gallery):**
  - Có 1 bức ảnh to nhất ở trên cùng hiển thị toàn cảnh món ăn.
  - Bên dưới là hàng 4 ảnh nhỏ (thumbnail) chụp cận cảnh từng phần: đĩa đậu rán, chả cốm nem rán, bát mắm tôm quất ớt.
- **Cột bên phải - Khu vực chọn món (Configurator):**
  - **Tên món và điểm đánh giá:** Ghi rõ số sao (4.9/5) và số lượt khách đã mua.
  - **Hộp giá tiền tự nhảy:** Hiện số tiền to rõ ràng, tự động tính lại mỗi khi khách chọn thêm topping hay đổi kích cỡ.
  - **Chọn cỡ mẹt (Size M, L, XL, XXL):** Dùng thẻ `<input type="radio" name="size">` để mỗi lúc chỉ được chọn đúng 1 cỡ duy nhất.
  - **Chọn loại nước chấm:** Dùng `<input type="radio" name="sauce">` để khách chọn ăn mắm tôm truyền thống hay nước mắm chua ngọt.
  - **Topping gọi thêm:** Dùng thẻ `<input type="checkbox">` để khách có thể tích chọn nhiều món cùng lúc (ví dụ vừa thêm chả cốm vừa thêm nem rán, dồi sụn).
  - **Nút tăng giảm số lượng (+ / -):** Giúp chọn nhanh số suất ăn mà không cần gõ phím.
  - **Nút "Thêm vào giỏ hàng" và "Đặt giao ngay".**
- **Khu vực các tab thông tin chi tiết:**
  - Tab 1: Thành phần định lượng (bao nhiêu gam bún, mấy miếng đậu, mấy lạng thịt).
  - Tab 2: Hướng dẫn ăn ngon (cách pha mắm tôm sủi bọt, mẹo hâm nóng bằng nồi chiên không dầu).
  - Tab 3: Cam kết của quán (100% dầu mới, đậu làng Mơ tươi trong ngày).
- **Gợi ý món ăn kèm:** Đưa ra các món nước giải khát (trà tắc, nước mơ) và nem rán thêm để gợi ý khách đặt thêm.

### 2. File trang trí `css/product-detail.css`
- **Chia 2 cột bằng Grid:** Bên trái là ảnh, bên phải là thông tin chọn món. Khi xem trên điện thoại thì tự động xếp thành 1 cột dọc thẳng hàng.
- **Hiệu ứng ghim ảnh (`position: sticky`):** Khi cuộn trang xuống để xem danh sách topping dài, khung ảnh bên trái vẫn đứng yên trôi theo màn hình máy tính chứ không bị khuất lên trên.
- **Làm nổi bật ô đang chọn:** Ô kích cỡ hoặc topping nào được chọn sẽ đổi viền cam và nền cam nhạt rất trực quan.
- **Thiết kế dạng thẻ bo tròn:** Bo góc mềm mại, đổ bóng nhẹ tạo cảm giác hiện đại, sạch sẽ.

### 3. File xử lý `js/product-detail.js`
File này chứa các chức năng hoạt động như sau:
- **Đổi ảnh lớn khi bấm ảnh nhỏ (`initGallery`):** Khi bấm vào ảnh thumbnail nào, hàm sẽ lấy đường dẫn ảnh từ `data-full-img` rồi gán vào ảnh lớn, kèm hiệu ứng mờ nhẹ trong chớp mắt (0.15s) tạo cảm giác chuyển ảnh mượt mà.
- **Tính tiền thông minh (`calculateTotal`):**
  - Công thức: `Tổng tiền = (Giá cỡ mẹt + Tiền các topping đã tích chọn) * Số lượng`.
  - Cứ mỗi lần khách bấm đổi cỡ (M -> L), tích thêm topping (+20k), hoặc bấm nút tăng số lượng (+), hàm này lập tức tính lại và hiển thị ngay số tiền mới dạng chuẩn Việt Nam (ví dụ: `139.000đ`).
- **Chuyển đổi tab (`initTabs`):** Khi bấm vào tab "Hướng dẫn thưởng thức", JavaScript sẽ giấu tab "Thành phần" đi (`display: none`) và hiện tab hướng dẫn lên (`display: block`).
- **Nối với giỏ hàng và thông báo:**
  - Bấm nút "Thêm vào giỏ hàng", hàm sẽ gọi `MLCart.addItem(số lượng)` để cộng dồn vào giỏ hàng trên thanh menu, đồng thời gọi `MLToast.show()` để nảy thông báo "Đã thêm mẹt bún vào giỏ!" ở góc dưới màn hình.
