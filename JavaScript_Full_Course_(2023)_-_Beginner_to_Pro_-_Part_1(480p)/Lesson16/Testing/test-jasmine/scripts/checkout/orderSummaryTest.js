import { renderOrderSummary } from "../../../../../Lesson13/1/javascript-amazon-project/scripts/checkout/orderSummary.js";
import { cart, loadFromLocalStroge } from "../../../../../Lesson13/1/javascript-amazon-project/data/cart.js";

describe('Test suite: renderOrderSummary', () => {
    const productId1 = 'zrng10042026-cont00n3nt41-rolexWatch2026';
    const productId2 = '58b4fc92-e98c-42aa-8c55-b6b79996769a';

    // Wannan zai gudu kafin kowane 'it' block
    beforeEach(() => {
        // Yi mocking na localStorage
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '2'
            }]);
        });

        // Samar da dukkan containers da ake bukata
        document.querySelector('.js-test1-container').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
            <div class="js-checkout-header"></div>
        `;

        loadFromLocalStroge();
        renderOrderSummary();
    });

    // Wannan zai gudu bayan kowane 'it' block don tsaftace gurin
    afterEach(() => {
        document.querySelector('.js-test1-container').innerHTML = '';
    });

    it('renders the order summary', () => {
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);

        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');

        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');
    });

    it('removes a product', () => {
        // Danna delete link
        document.querySelector(`.js-delete-link-${productId1}`).click();

        // Duba ko ragowar item din yana nan
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);

        // Duba ko item din da aka goge baya nan
        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);

        // Duba ko wanda ba a goge ba yana nan
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
    });
});

// THIS IS AN AI CODE, REPLACE SOME PARTS BY ME.