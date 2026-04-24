import { 
    cart,
    removeFromCart,
    updateQuantity,
    removingContainer,
    totalCheckoutItems,
    // saveAndUpdateQuantity,
} from "../data/cart.js";
import { formatMoney } from "./utils/money.js"
import { products } from "../data/products.js";
// Idan kana son importing abu 1 tak cikin lib || file ga ydd zakayi.
// Wurin shigo da file din sunan ba sa yiyi iri 1 baya sabanin 'export' kadai.
// A me export default muna iya canza suna kamar haka 'dayjsZacksR' ba lalle sai sunan shi ba kamar a na mi 'export'.
import { deliveryOptions } from "../data/deliveryOptions.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

let cartSummaryHtml = '';

cart.forEach((cartItem) => {

    const { productId } = cartItem;

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product
        }
    });

   const deliveryOptionId = cartItem.deliveryOptionId;
   let option;

    deliveryOptions.forEach((items) => {
        if (items.id === deliveryOptionId) {
            option = items;
        }
    });

     const today = dayjs();
        const deliveryDate = today.add(option.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');


    cartSummaryHtml += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatMoney(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
                </span>
                <input type="number" class="quantity-input js-quantity-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link" data-delete-id="${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>         
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
        </div>
        </div>
    `;
});

totalCheckoutItems();


function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((option) => {
        const today = dayjs();
        const deliveryDate = today.add(option.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const priceString = option.priceCents === 0 ? 'FREE' : `$${formatMoney(option.priceCents)}`;

        const isChecked = option.id === cartItem.deliveryOptionId;

        html += `
        <div class="delivery-option">
                <input type="radio"
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} - Shipping
                </div>
            </div>
        </div>
        `
    });    

    return html;
}

document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHtml;

    document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.deleteId;
                    removeFromCart(productId);
                
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.remove(); // zamu iya removing kowane irin element da wnn fxn dn.
            });
        });

// Ex14e
document.querySelectorAll('.js-update-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const { productId } = link.dataset;
                    
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                    container.classList.add('is-editing-quantity');
            });
        });

// Ex14j
document.querySelectorAll('.js-save-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const { productId } = link.dataset;

                const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
                const newQuantity = Number(quantityInput.value);

                updateQuantity(productId, newQuantity);

                removingContainer(productId);
            });
        });

document.querySelectorAll('.quantity-input')
        .forEach((input) => {
            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    const { productId } = input.dataset;
                    
                    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
                    const newQuantity = Number(quantityInput.value);

                    updateQuantity(productId, newQuantity);

                    removingContainer(productId);
                }
            });
        });