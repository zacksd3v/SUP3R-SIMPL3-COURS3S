import { cart } from "./cart.js";
import { getProduct, loadingProductsUsingFetch, products } from "./products.js";
import { formatMoney } from "../scripts/utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';;

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
            <!-- GYARA NA 1: Mun tura kayan wannan takaitaccen order din kawai -->
            ${productList(orderItem.products)}
          </div>
        </div>
        `;
    });

    const ordersGrid = document.querySelector('.js-orders-grid');
    if (ordersGrid) {
        ordersGrid.innerHTML = ordersHTML;
    }

    function productList(productsArray, orderId) {
        let productHtml = '';
        
        if (!productsArray) return '';

        productsArray.forEach((productDetails) => {
           const matchingProduct = getProduct(productDetails.productId);

           if (!matchingProduct) {
                console.error(`Ba a sami samfur mai ID: ${productDetails.productId} ba`);
                return; 
           }
            
            const productInfo = matchingProduct;

            productHtml += `
            <div class="product-image-container">
                <!-- GYARA NA 4: Mun saka hoton a cikin tsarin HTML na gaskiya -->
                <img src="${productInfo.image}">
            </div>

            <div class="product-details">
                <div class="product-name">
                    ${productInfo.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')}
                </div>
                <div class="product-quantity">
                    Quantity: ${productDetails.quantity}
                </div>
                <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html?orderId=${orderId}&productId=${productInfo.id}">
                    <button class="track-package-button button-secondary">
                        Track package
                    </button>
                </a>
            </div>
            `;
        });

        return productHtml; 
    }
}

async function loadPage() {
    // 1. Muna jiran kayan su gama ladowa daga backend tukunna
    await loadingProductsUsingFetch();
    
    // 2. Bayan sun gama ladowa, yanzu muna da tabbas 'products' ba zai dawo da [] ba
    renderOrders();
}

// Muna kiran aikin loda shafin gaba daya
loadPage();
