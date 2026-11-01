(function (global) {
    'use strict';

    // Quản lý số lượng món và cập nhật huy hiệu giỏ hàng
    let cartCount = 0;

    const MLCart = {
        getCount: function () {
            return cartCount;
        },

        addItem: function (amount = 1) {
            cartCount += amount;
            this.updateBadge();
            return cartCount;
        },

        updateBadge: function () {
            const badgeElement = document.getElementById("ml-cart-count");
            if (!badgeElement) return;

            badgeElement.textContent = cartCount;
            badgeElement.classList.remove("ml-bump");
            void badgeElement.offsetWidth;
            badgeElement.classList.add("ml-bump");
        }
    };

    global.MLCart = MLCart;
})(typeof window !== 'undefined' ? window : this);
