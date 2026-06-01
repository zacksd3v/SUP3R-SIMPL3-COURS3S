import { renderCheckOutHeader } from "../../Lesson13/1/javascript-amazon-project/scripts/checkout/checkOutHeader.js";


// FIRST WAY TO CREATE AN OOP
const cart = {
  cartItems: undefined,

  loadFromLocalStorage() {
  this.cartItems = JSON.parse(localStorage.getItem('cart-oop')) || [
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
  localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
},

_addToCart(productId) {
      let matchingItem; 

       let itemValue;

      const addItemsUsingSelect = document.querySelector(`.js-quantity-selector-${productId}`);
      itemValue =  addItemsUsingSelect ? addNumber(addItemsUsingSelect.value) : 1;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += itemValue;
      } else {
          this.cartItems.push({
          productId,
          quantity: itemValue,
          deliveryOptionId: '1'
      });
      }

      this.savingToStorage();
  },

removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.savingToStorage();
    renderCheckOutHeader();
  }


};

// SECOND WAY TO CREATE ANOTHER OOP.
// USING COPY & PASTE WHICH IS !RECOMMENDED!
const businessCart = {
  cartItems: undefined,

  loadFromLocalStorage() {
  this.cartItems = JSON.parse(localStorage.getItem('business-cart')) || [
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
  localStorage.setItem('business-cart', JSON.stringify(this.cartItems));
},

_addToCart(productId) {
      let matchingItem; 

       let itemValue;

      const addItemsUsingSelect = document.querySelector(`.js-quantity-selector-${productId}`);
      itemValue =  addItemsUsingSelect ? addNumber(addItemsUsingSelect.value) : 1;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += itemValue;
      } else {
          this.cartItems.push({
          productId,
          quantity: itemValue,
          deliveryOptionId: '1'
      });
      }

      this.savingToStorage();
  },

removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.savingToStorage();
    renderCheckOutHeader();
  }


};


// THIRD HANYA NA CREATING OOP
// UNSING FUNCTION LET'S SEE HOW THAT'S WORK!
// WNN ITACE HANYA MAFI SAUKI SABD BABU COPY & PASTE!
function Cart(cartsKey) {
    const businessCart = {
      cartItems: undefined,

      loadFromLocalStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(cartsKey)) || [
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
      localStorage.setItem(cartsKey, JSON.stringify(this.cartItems));
    },

    _addToCart(productId) {
          let matchingItem; 

          let itemValue;

          const addItemsUsingSelect = document.querySelector(`.js-quantity-selector-${productId}`);
          itemValue =  addItemsUsingSelect ? addNumber(addItemsUsingSelect.value) : 1;

          this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
              matchingItem = cartItem;
            }
          });

          if (matchingItem) {
            matchingItem.quantity += itemValue;
          } else {
              this.cartItems.push({
              productId,
              quantity: itemValue,
              deliveryOptionId: '1'
          });
          }

          this.savingToStorage();
      },

    removeFromCart(productId) {
        const newCart = [];

        this.cartItems.forEach((cartItem) => {
          if (cartItem.productId !== productId) {
            newCart.push(cartItem);
          }
        });

        this.cartItems = newCart;

        this.savingToStorage();
        renderCheckOutHeader();
      }


  };

  return businessCart;
}


// Code for method 3
const cart3 = Cart('business-cart');
const businessCart3 = Cart('business-cart');

cart.loadFromLocalStorage();
businessCart.loadFromLocalStorage();

// 3rd Methods
cart3.loadFromLocalStorage();
businessCart3.loadFromLocalStorage();

cart._addToCart('zrng21-042026-cont00n3nt41-game2026');

console.log('// WANN YANA RUNNING FROM CART-OOP.JS FILE');

console.log(cart);
console.log(businessCart);

console.log(cart3);
console.log(businessCart3);

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

