import { renderCheckOutHeader } from "../../Lesson13/1/javascript-amazon-project/scripts/checkout/checkOutHeader.js";

// ZAMU YI AMFANI DA CLASS INSTEAD OF FUNCTION DOMI CREATING OBJCT.
// ASHE DAGA NORMAL OBJCT --> AKA SAMU ---> FUNCTIONAL OBJECT ---> DAGA NAN KUMA ---> AKA SAMU CLASS OBJECT STYLE HAH.
class Cart {
    // A CIKIN CLASS WANN SHINE PROPERTY!
    // NB: BAMA CEWA const, let | var INFRONT OF ANY NAME SABODA PROPERTY NE BAR VARIABLE BA!
    // MUNA DA SHORTCUT FOR UNDEFINEs
    // cartItems = undefined;
    cartItem;
    // lStorageKey = undefined;
    lStorageKey;

    // NB: AKWAE ABINDA AKE CE MA CONSTRUCTOR A CLASS OBJECTS.
    // ANAN ZAMU IYA SAI DUK WANI SETUP NA WAJE ANAN CIKIN CONSTRUCTOR DIN.
    // KAMAR LOCAL STORAGE NAMU DA METHOD NASHI.
    // MUNA AMFANI DA constructor keywrd ne Dole.
    // SANAN BAZAMUI RETURNING KOMAI BA. LET'S GOOO...
    constructor(lStorageKey) {
        this.lStorageKey = lStorageKey;
        this.loadFromLocalStorage();
    }
    
    // METHOD NA CLASS KUMA IS THE SAME AS REGULAR OBJT METHODS.
    // NB: this keywrd na  CLASS is the same as NA REGULAR Objct.
    loadFromLocalStorage() {
  this.cartItems = JSON.parse(localStorage.getItem(this.lStorageKey)) || [
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
}

savingToStorage() {
  localStorage.setItem(this.lStorageKey, JSON.stringify(this.cartItems));
}

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
  }

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

}


// WANAN SHI AKE KIRA 'INSTACE' NA CLASS A.K.A COPY NA CLASS.
// NB: DOLE MUYI AMFANI DA new Keywrd infront of class NAME NAMU.
// NB: IDAN MUKAI AMFANI DA constructor sann muka bada Paramter TO DOLE NE MUYI PASSING CIKIN CLASS OBJCT NAMU
const cart = new Cart('cart-oop');
const businessCart = new Cart('business-cart');

// SABODA MUN MAIDA lStoragekey NAMU OBJCT.
// DOLE NE MUYI ACCESSING NASHI KAMAR HAKA.
// ZAN COPY NA WANN + loadFromLocalStorage METHODIZUWA constructor METHOD!
// cart.lStorageKey = 'cart-oop';
// businessCart.lStorageKey = 'business-cart';

// cart.loadFromLocalStorage();
// businessCart.loadFromLocalStorage();

cart._addToCart('zrng21-042026-cont00n3nt41-game2026');

console.log(cart);
console.log(businessCart);