import { cart, _addToCart } from "./cart.js";
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

function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    
    const cartQuantityHeader = document.querySelector('.js-cart-quantity');
    if (cartQuantityHeader) {
        cartQuantityHeader.innerHTML = cartQuantity;
    }
}

export function renderOrders() {
    let ordersHTML = '';

    updateCartQuantity();

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
            ${productList(orderItem.products, orderItem.id)}
          </div>
        </div>
        `;
    });

    const ordersGrid = document.querySelector('.js-orders-grid');
    if (ordersGrid) {
        ordersGrid.innerHTML = ordersHTML;
    }

    document.querySelectorAll('.js-buy-again')
        .forEach((button) => {
            button.addEventListener('click', () => {
                const { productId } = button.dataset;
                // console.log(productId);

                _addToCart(productId);

                // GYARA: An dawo da updateCartQuantity() nan sama don adadin cart ya karu nan take!
                updateCartQuantity();

                button.innerHTML = 'Added';
                setTimeout(() => {
                    button.innerHTML = `
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                    `;
                }, 1000);
            });
        });

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
            // console.log(productInfo.id);

            productHtml += `
            <div class="product-image-container">
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
                <button class="buy-again-button button-primary js-buy-again" data-product-id="${productInfo.id}">
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
    await loadingProductsUsingFetch();
    
    renderOrders();
}

loadPage();
