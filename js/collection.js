(function (global) {
    'use strict';

    // Module quản lý lọc danh mục, tìm kiếm và sắp xếp trên trang Collection
    const MLCollection = {
        currentCategory: 'all',
        searchQuery: '',
        currentSort: 'default',

        init: function () {
            const tabButtons = document.querySelectorAll('.ml-tab-btn');
            const searchInput = document.getElementById('ml-collection-search');
            const sortSelect = document.getElementById('ml-collection-sort');

            // 1. Lắng nghe chọn tab danh mục (Tất cả, Mẹt bún, Topping, Nước)
            tabButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    tabButtons.forEach(b => b.classList.remove('ml-tab-btn--active'));
                    btn.classList.add('ml-tab-btn--active');
                    this.currentCategory = btn.getAttribute('data-category');
                    this.applyFilters();
                });
            });

            // 2. Lắng nghe ô tìm kiếm món ăn
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    this.searchQuery = e.target.value.trim().toLowerCase();
                    this.applyFilters();
                });
            }

            // 3. Lắng nghe đổi kiểu sắp xếp giá
            if (sortSelect) {
                sortSelect.addEventListener('change', (e) => {
                    this.currentSort = e.target.value;
                    this.applySort();
                });
            }

            // 4. Gắn sự kiện thêm món vào giỏ hàng
            this.bindCartButtons();

            // Áp dụng lọc ban đầu
            this.applyFilters();
        },

        // Áp dụng bộ lọc danh mục và từ khóa tìm kiếm
        applyFilters: function () {
            const cards = document.querySelectorAll('.ml-collection-card');
            const emptyState = document.getElementById('ml-empty-state');
            const countDisplay = document.getElementById('ml-results-count');
            let visibleCount = 0;

            cards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                const title = (card.querySelector('.ml-product-title')?.textContent || '').toLowerCase();
                const snippet = (card.querySelector('.ml-product-snippet')?.textContent || '').toLowerCase();

                const matchesCategory = (this.currentCategory === 'all') || (category === this.currentCategory);
                const matchesSearch = !this.searchQuery || title.includes(this.searchQuery) || snippet.includes(this.searchQuery);

                if (matchesCategory && matchesSearch) {
                    card.classList.remove('ml-card--hidden');
                    visibleCount++;
                } else {
                    card.classList.add('ml-card--hidden');
                }
            });

            // Cập nhật số lượng món hiển thị
            if (countDisplay) {
                countDisplay.textContent = visibleCount + ' món';
            }

            // Hiển thị thông báo rỗng khi không có kết quả phù hợp
            if (emptyState) {
                if (visibleCount === 0) {
                    emptyState.classList.add('ml-empty-state--visible');
                } else {
                    emptyState.classList.remove('ml-empty-state--visible');
                }
            }
        },

        // Sắp xếp lại thứ tự các thẻ sản phẩm theo giá
        applySort: function () {
            const grid = document.getElementById('ml-collection-grid');
            if (!grid) return;

            const cards = Array.from(grid.querySelectorAll('.ml-collection-card'));

            if (this.currentSort === 'price-asc') {
                cards.sort((a, b) => {
                    const priceA = parseInt(a.getAttribute('data-price') || '0', 10);
                    const priceB = parseInt(b.getAttribute('data-price') || '0', 10);
                    return priceA - priceB;
                });
            } else if (this.currentSort === 'price-desc') {
                cards.sort((a, b) => {
                    const priceA = parseInt(a.getAttribute('data-price') || '0', 10);
                    const priceB = parseInt(b.getAttribute('data-price') || '0', 10);
                    return priceB - priceA;
                });
            } else {
                // Trả về thứ tự gốc ban đầu
                cards.sort((a, b) => {
                    const orderA = parseInt(a.getAttribute('data-order') || '0', 10);
                    const orderB = parseInt(b.getAttribute('data-order') || '0', 10);
                    return orderA - orderB;
                });
            }

            // Gắn lại DOM theo thứ tự đã sắp xếp
            cards.forEach(card => grid.appendChild(card));
        },

        // Kết nối nút mua với module MLCart và MLToast
        bindCartButtons: function () {
            const buyButtons = document.querySelectorAll('.ml-collection-card .ml-btn-buy--card');

            buyButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const name = button.getAttribute('data-name') || 'Món ăn';
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

    global.MLCollection = MLCollection;

    document.addEventListener('DOMContentLoaded', () => {
        MLCollection.init();
    });
})(typeof window !== 'undefined' ? window : this);

