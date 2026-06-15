    import { _addToCart, cart, loadFromLocalStorage } from "../../../../../Lesson13/1/javascript-amazon-project/data/cart.js";

    describe('Test suite: addToCart', () => {
        it('adds an existing product to the cart', () => {
            spyOn(localStorage, 'setItem');
            spyOn(localStorage, 'getItem').and.callFake(() => {
                return JSON.stringify([{
                    productId: '58b4fc92-e98c-42aa-8c55-b6b79996769a',
                    quantity: 1,
                    deliveryOptionId: '1'
                }])
            });
            loadFromLocalStorage();
            document.querySelector('.js-test-container').innerHTML = `
            <select class="js-quantity-selector-58b4fc92-e98c-42aa-8c55-b6b79996769a">
                <option value="1" selected>1</option>
            </select>
            `;

            _addToCart('58b4fc92-e98c-42aa-8c55-b6b79996769a');
            expect(cart.length).toEqual(1);
            expect(cart[0].productId).toEqual('58b4fc92-e98c-42aa-8c55-b6b79996769a');
            expect(cart[0].quantity).toEqual(2);
            expect(localStorage.setItem).toHaveBeenCalledTimes(1);

            document.querySelector('.js-test-container').innerHTML = '';
        });

        it('adds a new product to the cart', () => {
            spyOn(localStorage, 'setItem');
            spyOn(localStorage, 'getItem').and.callFake(() => {
                return JSON.stringify([]);
            });
            loadFromLocalStroge();
            document.querySelector('.js-test-container').innerHTML = `
            <select class="js-quantity-selector-58b4fc92-e98c-42aa-8c55-b6b79996769a">
                <option value="1" selected>1</option>
            </select>
            `;

            _addToCart('58b4fc92-e98c-42aa-8c55-b6b79996769a');
            expect(cart.length).toEqual(1);

            expect(cart[0].productId).toEqual('58b4fc92-e98c-42aa-8c55-b6b79996769a');
            expect(cart[0].quantity).toEqual(1);
            expect(localStorage.setItem).toHaveBeenCalledTimes(1);

            document.querySelector('.js-test-container').innerHTML = '';
        });
    });