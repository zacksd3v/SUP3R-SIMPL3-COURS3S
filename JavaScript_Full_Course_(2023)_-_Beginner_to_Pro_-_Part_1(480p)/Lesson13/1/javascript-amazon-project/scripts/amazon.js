// const products = [{
//     image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
//     name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
//     rating: {
//         stars: 4.5,
//         count: 87
//     }, 
//     priceCents: 1090 
// }, {
//     image: 'images/products/intermediate-composite-basketball.jpg',
//     name: ' Intermediate Size Basketball',
//     rating: {
//         stars: 4,
//         count: 127
//     },
//     priceCents: 2095
// }, {
//     image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//     name: 'Adults Plain Cotton T-Shirt - 2 Pack',
//     rating: {
//         stars: 4.5,
//         count: 56
//     },
//     priceCents: 799
// }, {
//     image: 'images/products/black-2-slot-toaster.jpg',
//     name: '2 Slot Toaster - Black',
//     rating: {
//         stars: 5,
//         count: 2197
//     },
//     priceCents: 1899
// }];

// muna iya importing fnx | var kamar ydd yke a qasa.
import { products } from "../data/products.js";
import { formatMoney } from "./utils/money.js";
import { cart, _addToCart, savingTheProduct } from "../data/cart.js";

let productsHtml = '';

//// Exercise Lesson 13a = find the selector tag.
//// Exercise Lesson 13b = add a class & id.
products.forEach((product) => { 
    productsHtml += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatMoney(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-item-is-added-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
});

document.querySelector('.js-product-grid')
    .innerHTML = productsHtml;

function updateCart(productId) {
     // Basket (add-to-cart)
      let addToCart = 0;

      cart.forEach((cartItem) => {
        addToCart += cartItem.quantity;
      });

      document.querySelector('.js-cart-quantity')
        .innerHTML = addToCart;

      const newClss = document.querySelector(`.js-item-is-added-${productId}`)
        newClss.classList.add('added');
        setTimeout(() => {newClss.classList.remove('added');

        }, 1000); // Ex13l = removing the class
  }

document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const { productId } = button.dataset;
            _addToCart(productId);
            updateCart(productId);               
        });
    });