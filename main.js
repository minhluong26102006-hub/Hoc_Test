// ==========================================================================
// XỬ LÝ GIỎ HÀNG & TƯƠNG TÁC CHO SHOP BÚN
// ==========================================================================

// 1. KHỞI TẠO BIẾN TOÀN CỤC
let cartCount = 0;

// Các phần tử giao diện chính
const addButton = document.getElementById("add-button");
const cartText = document.getElementById("cart-count");
const sizeSelect = document.getElementById("size");
const toastElement = document.getElementById("toast");

let toastTimeout = null;

/**
 * Hiển thị thông báo nổi (Toast) tạm thời khi thêm sản phẩm thành công
 * @param {string} message - Nội dung thông báo
 */
function showToast(message) {
    if (!toastElement) return;

    toastElement.textContent = message;
    toastElement.classList.add("show");

    // Xóa bộ đếm giờ cũ nếu người dùng nhấn liên tục
    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }

    // Tự động ẩn thông báo sau 2.2 giây
    toastTimeout = setTimeout(function () {
        toastElement.classList.remove("show");
    }, 2200);
}

/**
 * Cập nhật số lượng giỏ hàng và kích hoạt hiệu ứng rung nhẹ (bump)
 */
function updateCartCount() {
    cartCount = cartCount + 1;
    if (cartText) {
        cartText.textContent = cartCount;

        // Thêm class tạo hiệu ứng nảy nhẹ của số lượng
        cartText.classList.remove("bump");
        // Buộc trình duyệt tính toán lại (reflow) để kích hoạt animation
        void cartText.offsetWidth;
        cartText.classList.add("bump");
    }
}

// 2. SỰ KIỆN KHI BẤM NÚT "MUA BÚN" Ở PHẦN BÚN ĐẬU ĐẶC BIỆT
if (addButton) {
    addButton.addEventListener("click", function () {
        updateCartCount();

        // Lấy thông tin size đang chọn
        const selectedSize = sizeSelect ? sizeSelect.value : "M";
        showToast("Đã thêm Bún đậu đặc biệt (Size " + selectedSize + ") vào gian hàng!");
    });
}

// 3. SỰ KIỆN KHI BẤM NÚT MUA Ở CÁC THẺ SẢN PHẨM TRONG DANH SÁCH
const cardButtons = document.querySelectorAll(".btn-card-buy");

cardButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        updateCartCount();

        // Lấy tên món từ thuộc tính data-name hoặc tiêu đề thẻ
        const productName = button.getAttribute("data-name") || "Bún đậu";
        showToast("Đã thêm " + productName + " vào gian hàng!");
    });
});
