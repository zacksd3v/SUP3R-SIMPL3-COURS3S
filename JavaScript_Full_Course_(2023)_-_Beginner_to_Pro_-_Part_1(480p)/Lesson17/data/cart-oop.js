import { renderCheckOutHeader } from "../scripts/checkout/checkOutHeader.js";

const cart = {
  cartItems: undefined,

  loadFromLocalStorage() {
  cart.cartItems = JSON.parse(localStorage.getItem('cart')) || [
    {
      productId: 'zrng10042026-cont00n3nt41-rolexWatch2026',
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: '58b4fc92-e98c-42aa-8c55-b6b79996769a',
      quantity: 1,
      deliveryOptionId: '2'
    }
  ];
},

savingToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart.cartItems));
},

_addToCart(productId) {
      let matchingItem; 

       let itemValue;

      const addItemsUsingSelect = document.querySelector(`.js-quantity-selector-${productId}`);
      itemValue = Number(addItemsUsingSelect.value);

      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += itemValue;
      } else {
          cart.push({
          productId,
          quantity: itemValue,
          deliveryOptionId: '1'
      });
      }

      cart.savingToStorage();
  },

removeFromCart(productId) {
    const newCart = [];

    cart.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    cart.cartItems = newCart;

    savingToStorage();
    renderCheckOutHeader();
  }


};

cart.loadFromLocalStorage();

console.log(cart);

// export function updateQuantity(productId, newQuantity) {
//   if (newQuantity < 0 || newQuantity >= 1000) {
//     alert('Quantity must be at least 0 and less than 1000');
//     return; // Wannan zai sa function din ya tsaya nan, ba zai canza komai ba
//   }

//   let matchingItem;

//   cart.forEach((cartItem) => {
//     if (productId === cartItem.productId) {
//       matchingItem = cartItem;
//     }
//   });

//   if (matchingItem) {
//     matchingItem.quantity = newQuantity;

//     const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
//     if (quantityLabel) {
//       quantityLabel.innerHTML = newQuantity;
//     }
//     savingToStorage();
//     renderCheckOutHeader();
//   }

// }

// export function removingContainer(productId) {
//   const container = document.querySelector(`.js-cart-item-container-${productId}`);
//     container.classList.remove('is-editing-quantity');
// }

// export function quantityInput(productId, newQuantity) {
//   const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
//     newQuantity = Number(quantityInput.value);
//     return newQuantity;
// }

// export function updateDeliveryOption(productId, deliveryOptionId) {
//   let matchingItem;

//   cart.forEach((cartItem) => {
//         if (productId === cartItem.productId) {
//           matchingItem = cartItem;
//         }
//       });

//       matchingItem.deliveryOptionId = deliveryOptionId;
//       savingToStorage();
// }

