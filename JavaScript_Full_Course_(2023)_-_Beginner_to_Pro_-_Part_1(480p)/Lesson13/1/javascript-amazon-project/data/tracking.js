import { orders } from "./orders.js";
import { cart } from "./cart.js";
import { getProduct, loadingProductsUsingFetch } from "./products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    const cartQuantityHeader = document.querySelector('.cart-quantity');

    if (cartQuantityHeader) {
        cartQuantityHeader.innerHTML = cartQuantity;
    }
}


async function loadTrackingPage() {
    await loadingProductsUsingFetch();
    
    updateCartQuantity();

    let matchingOrder;
    orders.forEach((order) => {
        if (order.id === orderId) {
            matchingOrder = order;
        }
    });

    if (!matchingOrder) {
        console.error('Ba a sami wannan order din ba');
        return;
    }

    let matchingProductDetails;
    matchingOrder.products.forEach((productDetails) => {
        if (productDetails.productId === productId) {
            matchingProductDetails = productDetails;
        }
    });

    if (!matchingProductDetails) {
        console.error('Ba a sami wannan kayan a cikin order din ba');
        return;
    }

    const productInfo = getProduct(productId);

    const today = dayjs();
    const orderTime = dayjs(matchingOrder.orderTime);
    const deliveryTime = dayjs(matchingProductDetails.estimatedDeliveryTime);
    
    const totalDays = deliveryTime.diff(orderTime, 'days');
    const daysPassed = today.diff(orderTime, 'days');
    let progressPercent = (daysPassed / totalDays) * 100;
    
    progressPercent = Math.max(0, Math.min(100, progressPercent));

    // HTML na nuna bayanan tracking
    const trackingHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dayjs(matchingProductDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
        </div>

        <div class="product-info">
          ${productInfo.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingProductDetails.quantity}
        </div>

        <img class="product-image" src="${productInfo.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${progressPercent <= 5 ? 'current-status' : ''}">
            Preparing
          </div>
          <div class="progress-label ${progressPercent >= 50 && progressPercent < 100 ? 'current-status' : ''}">
            Shipped
          </div>
          <div class="progress-label ${progressPercent >= 100 ? 'current-status' : ''}">
            Delivered
          </div>
        </div>

       <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${Math.max(5, progressPercent)}%;"></div>
        </div>
    `;

    const trackingContainer = document.querySelector('.js-order-tracking');
    if (trackingContainer) {
        trackingContainer.innerHTML = trackingHTML;
    }
}

loadTrackingPage();