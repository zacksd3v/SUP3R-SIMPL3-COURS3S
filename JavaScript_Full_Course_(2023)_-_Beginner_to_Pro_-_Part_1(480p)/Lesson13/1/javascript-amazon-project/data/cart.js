export const cart = [];

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
  }