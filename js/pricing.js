(function (global) {
    'use strict';

    // Bảng giá tương ứng theo từng cỡ mẹt combo
    const sizePriceMap = {
        "M": "99.000đ",
        "L": "139.000đ",
        "XL": "189.000đ",
        "XXL": "249.000đ"
    };

    const MLPricing = {
        getPriceBySize: function (sizeCode) {
            return sizePriceMap[sizeCode] || sizePriceMap["M"];
        },

        bindSizeSelector: function (selectSelector, priceTargetSelector) {
            const selectEl = document.querySelector(selectSelector);
            const priceTargetEl = document.querySelector(priceTargetSelector);
            if (!selectEl || !priceTargetEl) return;

            selectEl.addEventListener("change", () => {
                priceTargetEl.textContent = this.getPriceBySize(selectEl.value);
            });
        }
    };

    global.MLPricing = MLPricing;
})(typeof window !== 'undefined' ? window : this);
