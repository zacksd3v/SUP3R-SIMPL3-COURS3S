// muna iya importing fnx | var kamar ydd yke a qasa.
import { products, loadingProducts } from "../data/products.js";
import { formatMoney } from "./utils/money.js";
import { cart, _addToCart } from "../data/cart.js";

loadingProducts(renderProductsGrid);

function renderProductsGrid() {
  // --- GYARAN SEARCH LOGIC (Exercise 18p & 18q) ---
  const url = new URL(window.location.href);
  const searchParam = url.searchParams.get('search');

  let filteredProducts = products;

  if (searchParam) {
    const lowerSearch = searchParam.toLowerCase();

    filteredProducts = products.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(lowerSearch);

      // Tabbatar da keywords suna nan kafin amfani da .some()
      const matchesKeyword = product.keywords && product.keywords.some((keyword) => 
        keyword.toLowerCase().includes(lowerSearch)
      );

      return matchesName || matchesKeyword;
    });

    // Sanya kalmar da aka bincika a cikin search bar don kyautata UX
    document.querySelector('.search-bar').value = searchParam;
  }

  let productsHtml = '';

  if (filteredProducts.length === 0) {
    productsHtml = `<div class="no-products-message" style="grid-column: 1/-1; text-align: center; margin-top: 20px; font-size: 18px; font-weight: bold;">No products matched your search.</div>`;
  } else {
    //// Exercise Lesson 13a = find the selector tag.
    //// Exercise Lesson 13b = add a class & id.
    filteredProducts.forEach((product) => { 
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
                  src="${product.getStartsUrl()}">
                <div class="product-rating-count link-primary">
                  ${product.rating.count}
                </div>
              </div>

              <div class="product-price">
                ${product.getPrice()}
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

              ${product.extraInfoHtml()}

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
  }

  // -------------POLYMORPHISM--------------
  // ${product.extraInfoHtml()}
  // WNN CODE DIN NA SAMA, SHINE POLYMORPHISM A AIKACE. 
  // MA'NAR SA SHINE ZAMU KIRA METHOD DAGA BOTH PARENT&CHILD 
  // BA TARE DA MUN BAM-BANCE WANE MUKE KIRA BA. SAI SHI CLASS YA MANA SELECTING RIGHT ONE
  // A TAKAICE CE ALT NE NA IF-STATEMENT A CLASS.
  // NB: IDAN DA ZAMU QARA INHERIT NA CLASS NAMU KWAE WANI MEHTOD DIN ZAMU SANYA CHIKIN SABON CHILD NAMU, BABU BUQATAR CANZA WNN CODE DIN NA SAMA.
  // ---------------------------END----------
  document.querySelector('.js-product-grid')
      .innerHTML = productsHtml;

  let addToCart;

  function updateCart(productId) {
      // Basket (add-to-cart)
        addToCart = 0;

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

    let basketItem = 0;
    
    cart.forEach((cartItem) => {
      basketItem += cartItem.quantity;

        document.querySelector('.js-cart-quantity')
          .innerHTML = basketItem;
    });
}

// --- GLOBAL SEARCH EVENT LISTENERS (Exercise 18p & 18r) ---
function executeSearch() {
  const searchInput = document.querySelector('.search-bar');
  const searchTerm = searchInput.value.trim();

  if (searchTerm) {
    // Redirects to amazon.html with URL query parameter
    window.location.href = `amazon.html?search=${encodeURIComponent(searchTerm)}`;
  } else {
    // If empty, just reload home page without params
    window.location.href = 'amazon.html';
  }
}

// Event listener for search button click
document.querySelector('.search-button').addEventListener('click', () => {
  executeSearch();
});

// Extra Feature (Exercise 18r): Allow pressing 'Enter' key to search
document.querySelector('.search-bar').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    executeSearch();
  }
});
