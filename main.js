
let cartCount = 0;

const addButton = document.getElementById("add-button");
const cartText = document.getElementById("cart-count");
const sizeSelect = document.getElementById("size");
const toastElement = document.getElementById("toast");

let toastTimeout = null;

/**
 * 
 * @param {string} message 
 */
function showToast(message) {
    if (!toastElement) return;

    toastElement.textContent = message;
    toastElement.classList.add("show");

    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }

    toastTimeout = setTimeout(function () {
        toastElement.classList.remove("show");
    }, 2200);
}

function updateCartCount() {
    cartCount = cartCount + 1;
    if (cartText) {
        cartText.textContent = cartCount;
        cartText.classList.remove("bump");
        void cartText.offsetWidth;
        cartText.classList.add("bump");
    }
}

if (addButton) {
    addButton.addEventListener("click", function () {
        updateCartCount();

        const selectedSize = sizeSelect ? sizeSelect.value : "M";
        showToast("Đã thêm Bún đậu đặc biệt (Size " + selectedSize + ") vào gian hàng!");
    });
}

const cardButtons = document.querySelectorAll(".btn-card-buy");

cardButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        updateCartCount();

        const productName = button.getAttribute("data-name") || "Bún đậu";
        showToast("Đã thêm " + productName + " vào gian hàng!");
    });
});
