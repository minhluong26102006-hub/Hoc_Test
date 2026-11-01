document.addEventListener("DOMContentLoaded", function () {
    'use strict';

    // Cập nhật giá theo combo size
    if (window.MLPricing) {
        window.MLPricing.bindSizeSelector("#ml-size-select", "#ml-featured-price");
    }

    // Theo dõi vị trí cuộn trang để đổi active menu
    if (window.MLScrollspy) {
        window.MLScrollspy.init(
            ".ml-main-nav .ml-nav-link",
            "section[id], footer[id]",
            "ml-nav-link--active",
            130
        );
    }

    // Xử lý nút thêm vào giỏ hàng cho mẹt đặc biệt
    const featuredAddBtn = document.getElementById("ml-btn-add-featured");
    const sizeSelect = document.getElementById("ml-size-select");

    if (featuredAddBtn) {
        featuredAddBtn.addEventListener("click", function () {
            if (window.MLCart) {
                window.MLCart.addItem(1);
            }
            const selectedSize = sizeSelect ? sizeSelect.value : "M";
            if (window.MLToast) {
                window.MLToast.show("Đã thêm Bún Đậu Đặc Biệt (Size " + selectedSize + ") vào giỏ hàng!");
            }
        });
    }

    // Xử lý nút thêm vào giỏ hàng cho các món trong danh sách
    const cardBuyButtons = document.querySelectorAll(".ml-btn-buy--card");

    cardBuyButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            if (window.MLCart) {
                window.MLCart.addItem(1);
            }
            const productName = button.getAttribute("data-name") || "Bún đậu";
            if (window.MLToast) {
                window.MLToast.show("Đã thêm " + productName + " vào giỏ hàng!");
            }
        });
    });
});
