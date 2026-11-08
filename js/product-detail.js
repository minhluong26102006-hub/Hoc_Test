(function (global) {
    'use strict';

    // Module quản lý chi tiết sản phẩm, đổi ảnh và tính toán biến thể
    const MLProductDetail = {
        basePrices: {
            'M': 99000,
            'L': 139000,
            'XL': 189000,
            'XXL': 249000
        },
        selectedSize: 'M',
        selectedSauce: 'Mắm tôm truyền thống',
        selectedAddons: [],
        quantity: 1,

        init: function () {
            this.initGallery();
            this.initSizeSelector();
            this.initSauceSelector();
            this.initAddonsSelector();
            this.initQuantityControl();
            this.initTabs();
            this.initAddToCartButtons();
            this.calculateTotal();
        },

        // 1. Chuyển đổi ảnh lớn khi bấm vào ảnh thumbnail nhỏ
        initGallery: function () {
            const thumbs = document.querySelectorAll('.ml-thumb-item');
            const mainImg = document.getElementById('ml-main-image');

            thumbs.forEach(thumb => {
                thumb.addEventListener('click', () => {
                    thumbs.forEach(t => t.classList.remove('ml-thumb-item--active'));
                    thumb.classList.add('ml-thumb-item--active');

                    const newSrc = thumb.getAttribute('data-full-img');
                    const newAlt = thumb.querySelector('img')?.getAttribute('alt') || 'Ảnh món ăn';

                    if (mainImg && newSrc) {
                        mainImg.style.opacity = '0.3';
                        setTimeout(() => {
                            mainImg.src = newSrc;
                            mainImg.alt = newAlt;
                            mainImg.style.opacity = '1';
                        }, 150);
                    }
                });
            });
        },

        // 2. Chọn kích cỡ combo (Size M, L, XL, XXL)
        initSizeSelector: function () {
            const sizeInputs = document.querySelectorAll('input[name="size"]');
            const sizeLabels = document.querySelectorAll('.ml-size-label');
            const hintText = document.getElementById('ml-selected-size-hint');

            sizeInputs.forEach(input => {
                input.addEventListener('change', () => {
                    sizeLabels.forEach(label => label.classList.remove('ml-size-label--active'));
                    const parentLabel = input.closest('.ml-size-label');
                    if (parentLabel) parentLabel.classList.add('ml-size-label--active');

                    this.selectedSize = input.value;
                    if (hintText) {
                        hintText.textContent = 'Đã chọn: Cỡ ' + this.selectedSize;
                    }
                    this.calculateTotal();
                });
            });
        },

        // 3. Chọn loại nước chấm (Mắm tôm hoặc Nước mắm)
        initSauceSelector: function () {
            const sauceInputs = document.querySelectorAll('input[name="sauce"]');
            const sauceLabels = document.querySelectorAll('.ml-sauce-label');

            sauceInputs.forEach(input => {
                input.addEventListener('change', () => {
                    sauceLabels.forEach(label => label.classList.remove('ml-sauce-label--active'));
                    const parentLabel = input.closest('.ml-sauce-label');
                    if (parentLabel) parentLabel.classList.add('ml-sauce-label--active');

                    this.selectedSauce = input.value;
                });
            });
        },

        // 4. Chọn topping gọi thêm (Checkboxes)
        initAddonsSelector: function () {
            const addonCheckboxes = document.querySelectorAll('.ml-addon-checkbox');

            addonCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    const parentItem = checkbox.closest('.ml-addon-item');
                    if (parentItem) {
                        if (checkbox.checked) {
                            parentItem.classList.add('ml-addon-item--checked');
                        } else {
                            parentItem.classList.remove('ml-addon-item--checked');
                        }
                    }
                    this.calculateTotal();
                });
            });
        },

        // 5. Tăng giảm số lượng suất ăn (+ / -)
        initQuantityControl: function () {
            const minusBtn = document.getElementById('ml-qty-minus');
            const plusBtn = document.getElementById('ml-qty-plus');
            const qtyInput = document.getElementById('ml-qty-input');

            if (minusBtn && plusBtn && qtyInput) {
                minusBtn.addEventListener('click', () => {
                    if (this.quantity > 1) {
                        this.quantity--;
                        qtyInput.value = this.quantity;
                        this.calculateTotal();
                    }
                });

                plusBtn.addEventListener('click', () => {
                    if (this.quantity < 50) {
                        this.quantity++;
                        qtyInput.value = this.quantity;
                        this.calculateTotal();
                    }
                });

                qtyInput.addEventListener('change', () => {
                    let val = parseInt(qtyInput.value, 10);
                    if (isNaN(val) || val < 1) val = 1;
                    if (val > 50) val = 50;
                    this.quantity = val;
                    qtyInput.value = val;
                    this.calculateTotal();
                });
            }
        },

        // 6. Tính tổng giá tiền theo size + topping * số lượng
        calculateTotal: function () {
            const priceDisplay = document.getElementById('ml-detail-total-price');
            let base = this.basePrices[this.selectedSize] || 99000;
            let addonsTotal = 0;

            const addonCheckboxes = document.querySelectorAll('.ml-addon-checkbox:checked');
            addonCheckboxes.forEach(cb => {
                const p = parseInt(cb.getAttribute('data-price') || '0', 10);
                addonsTotal += p;
            });

            const total = (base + addonsTotal) * this.quantity;

            if (priceDisplay) {
                // Định dạng tiền tệ Việt Nam (ví dụ: 139.000đ)
                priceDisplay.textContent = total.toLocaleString('vi-VN') + 'đ';
            }
        },

        // 7. Chuyển đổi tab mô tả thành phần / hướng dẫn
        initTabs: function () {
            const tabButtons = document.querySelectorAll('.ml-detail-tab-btn');
            const panels = document.querySelectorAll('.ml-tab-content-panel');

            tabButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    tabButtons.forEach(b => b.classList.remove('ml-detail-tab-btn--active'));
                    panels.forEach(p => p.classList.remove('ml-tab-content-panel--active'));

                    btn.classList.add('ml-detail-tab-btn--active');
                    const targetId = btn.getAttribute('data-tab');
                    const targetPanel = document.getElementById(targetId);
                    if (targetPanel) {
                        targetPanel.classList.add('ml-tab-content-panel--active');
                    }
                });
            });
        },

        // 8. Gắn sự kiện Thêm vào giỏ và Mua ngay
        initAddToCartButtons: function () {
            const addBtn = document.getElementById('ml-btn-add-detail');
            const buyNowBtn = document.getElementById('ml-btn-buy-now');

            if (addBtn) {
                addBtn.addEventListener('click', () => {
                    if (global.MLCart) {
                        global.MLCart.addItem(this.quantity);
                    }
                    if (global.MLToast) {
                        global.MLToast.show('Đã thêm ' + this.quantity + ' Mẹt Bún Đậu (Cỡ ' + this.selectedSize + ') vào giỏ hàng!');
                    }
                });
            }

            if (buyNowBtn) {
                buyNowBtn.addEventListener('click', () => {
                    if (global.MLCart) {
                        global.MLCart.addItem(this.quantity);
                    }
                    if (global.MLToast) {
                        global.MLToast.show('Đang chuyển đến bước đặt hàng...');
                    }
                    setTimeout(() => {
                        window.location.href = '#contact';
                    }, 500);
                });
            }

            // Gắn sự kiện thêm món cho các món gợi ý đi kèm
            const relatedBuyBtns = document.querySelectorAll('.ml-related-section .ml-btn-buy--card');
            relatedBuyBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const name = btn.getAttribute('data-name') || 'Món ăn kèm';
                    if (global.MLCart) {
                        global.MLCart.addItem(1);
                    }
                    if (global.MLToast) {
                        global.MLToast.show('Đã thêm ' + name + ' vào giỏ hàng!');
                    }
                });
            });
        }
    };

    global.MLProductDetail = MLProductDetail;

    document.addEventListener('DOMContentLoaded', () => {
        MLProductDetail.init();
    });
})(typeof window !== 'undefined' ? window : this);

