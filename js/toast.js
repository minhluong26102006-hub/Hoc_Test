(function (global) {
    'use strict';

    // Hiển thị thông báo toast tự động ẩn sau khoảng thời gian
    let toastTimeout = null;

    const MLToast = {
        show: function (message, durationMs = 2500) {
            const toastElement = document.getElementById("ml-toast");
            if (!toastElement) return;

            toastElement.textContent = message;
            toastElement.classList.add("ml-toast-notification--show");

            if (toastTimeout) {
                clearTimeout(toastTimeout);
            }

            toastTimeout = setTimeout(function () {
                toastElement.classList.remove("ml-toast-notification--show");
            }, durationMs);
        }
    };

    global.MLToast = MLToast;
})(typeof window !== 'undefined' ? window : this);
