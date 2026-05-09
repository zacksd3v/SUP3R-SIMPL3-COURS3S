const cart = {
  cartItems: undefined,

  // 1. Loading data daga localStorage
  loadFromLocalStorage() {
    this.cartItems = JSON.parse(localStorage.getItem('cart')) || [
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

  // 2. Ajiye data a localStorage
  savingToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  },

  // 3. Kara kaya a cikin cart
  _addToCart(productId) {
    const addItemsUsingSelect = document.querySelector(`.js-quantity-selector-${productId}`);
    
    // Idan babu selector (misali a wani shafin daban), yi amfani da 1
    const itemValue = addItemsUsingSelect ? Number(addItemsUsingSelect.value) : 1;

    let matchingItem;
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

  // 4. Cire kaya daga cart
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
  },

  // 5. Gyara yawan kaya (Quantity Update)
  updateQuantity(productId, newQuantity) {
    if (newQuantity < 0 || newQuantity >= 1000) {
      alert('Quantity must be at least 0 and less than 1000');
      return;
    }

    let matchingItem;
    this.cartItems.forEach((cartItem) => {
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
      
      this.savingToStorage();
      renderCheckOutHeader();
    }
  },

  // 6. Cire 'editing mode' daga UI
  removingContainer(productId) {
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    if (container) {
      container.classList.remove('is-editing-quantity');
    }
  },

  // 7. Dauko darajar dake cikin input field
  quantityInput(productId) {
    const inputElement = document.querySelector(`.js-quantity-input-${productId}`);
    return inputElement ? Number(inputElement.value) : 0;
  },

  // 8. Canza tsarin isar da sako (Delivery Option)
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.savingToStorage(); // 'this' yana da muhimmanci anan
    }
  }
};

cart.loadFromLocalStorage();

console.log(cart);

export default cart;