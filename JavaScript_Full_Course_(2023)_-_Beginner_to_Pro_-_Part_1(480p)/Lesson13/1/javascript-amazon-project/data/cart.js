export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: 'zrng10042026-cont00n3nt41-rolexWatch2026',
    quantity: 2
},
{
    productId: '58b4fc92-e98c-42aa-8c55-b6b79996769a',
    quantity: 1
}];

}

export function savingTheProduct() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function _addToCart(productId) {
      let matchingItem; 

       let itemValue;

      /// Exercise Lesson 13c = use DOM to get the class.
      const addItemsUsingSelect = document.querySelector(`.js-quantity-selector-${productId}`);
      itemValue = Number(addItemsUsingSelect.value); /// Exercise Lesson 13d = get the value using .value property. && Ex13e = Convert from String - No

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
          quantity: itemValue
      });
      }

      savingTheProduct();
  }

  export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    cart = newCart;

    savingTheProduct();
    totalCheckoutItems();
  }

  export function totalCheckoutItems() {
    let totalItems = 0;
      cart.forEach((cartItem) => {
          totalItems += cartItem.quantity;
          
          document.querySelector('.js-return-to-home-link')
              .innerHTML = `${totalItems} items`;
      });
  }