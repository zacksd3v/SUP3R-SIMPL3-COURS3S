import { cart } from "../../data/cart.js";

export function renderCheckOutHeader() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    const html = `
    <div class="header-content">
        <div class="checkout-header-left-section">
          <a href="amazon.html">
            <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link"
            href="amazon.html">${cartQuantity} Items</a>)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png">
        </div>
      </div>
    `;

    document.querySelector('.js-checkout-header')
        .innerHTML = html;
}