export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: 'zrng10042026-cont00n3nt41-rolexWatch2026',
    quantity: 2,
    deliveryOptionId: '1'
},
{
    productId: '58b4fc92-e98c-42aa-8c55-b6b79996769a',
    quantity: 1,
    deliveryOptionId: '2'
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
          quantity: itemValue,
          deliveryOptions: '1'
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

export function updateQuantity(productId, newQuantity) {
  if (newQuantity < 0 || newQuantity >= 1000) {
    alert('Quantity must be at least 0 and less than 1000');
    return; // Wannan zai sa function din ya tsaya nan, ba zai canza komai ba
  }

  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity = newQuantity;

    const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
    if (quantityLabel) {
      quantityLabel.innerHTML = newQuantity;
    }
    savingTheProduct();
    totalCheckoutItems();
  }

}

export function removingContainer(productId) {
  const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');
}

export function quantityInput(productId, newQuantity) {
  const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    newQuantity = Number(quantityInput.value);
}