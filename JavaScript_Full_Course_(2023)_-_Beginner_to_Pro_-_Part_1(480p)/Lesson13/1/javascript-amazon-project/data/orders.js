import { cart } from "./cart.js";
import { products } from "./products.js";
import { formatMoney } from "../scripts/utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    orders.unshift(order);
    saveOrdersToStorage();
}

function saveOrdersToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function renderOrders() {
    let ordersHTML = '';
    orders.forEach((orderItem) => {

        console.log(orderItem);
        const orderTimeString = dayjs(orderItem.orderTime).format('MMMM D');
    
        ordersHTML += `
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTimeString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatMoney(orderItem.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderItem.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${productList(orders)}
          </div>
        </div>
        `;});

    const ordersGrid = document.querySelector('.js-orders-grid');
    if (ordersGrid) {
        ordersGrid.innerHTML = ordersHTML;
    }


    function productList(orders) {
        let productHtml = '';
        
        orders.products.forEach((productDetails) => {
            productHtml += `
            <div class="product-image-container">
                ${productDetails.image}
                </div>

                <div class="product-details">
                <div class="product-name">
                    ${productDetails.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: August 15
                </div>
                <div class="product-quantity">
                    Quantity: 1
                </div>
                <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
                </div>

                <div class="product-actions">
                <a href="tracking.html">
                    <button class="track-package-button button-secondary">
                    Track package
                    </button>
                </a>
                </div>

                <div class="product-image-container">
                <img src="images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg">
                </div>

                <div class="product-details">
                <div class="product-name">
                    Adults Plain Cotton T-Shirt - 2 Pack
                </div>
                <div class="product-delivery-date">
                    Arriving on: August 19
                </div>
                <div class="product-quantity">
                    Quantity: 2
                </div>
                <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
                </div>

                <div class="product-actions">
                <a href="tracking.html">
                    <button class="track-package-button button-secondary">
                    Track package
                    </button>
                </a>
                </div>
            `;
        })

    }
}

renderOrders();

