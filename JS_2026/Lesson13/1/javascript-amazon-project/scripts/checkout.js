import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckOutHeader } from "./checkout/checkOutHeader.js";
// import  "../../../../Lesson17/data/cart-oop.js";
// import "../../../../Lesson17/data/cart-class.js";
// import "../../../../Lesson17/data/car.js";
import "../../../../Lesson18/data/backendClass.js";
import { orders, renderOrders } from "../data/orders.js";
import { loadingProducts, loadingProductsUsingFetch } from "../data/products.js";
// import { loadCartFetch } from "../data/cart.js";

/*
new Promise((resolve) => {
    loadingProducts(() => {
        resolve();
    });
}).then(() => {
    renderCheckOutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
*/

// loadingProductsUsingFetch().then(() => {
//     renderCheckOutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// });

// DA INA LOADING DA CALLBACK FNX
// YANXU KUMA PROMISES SND YAFI
/*
loadingProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/


// FINALY MUNA IYA AIKI DA ASYNC&AWAIT
async function loadPage() {
    await loadingProductsUsingFetch();

    renderCheckOutHeader();
    renderOrderSummary();
    renderPaymentSummary();
    renderOrders();
    
}

loadPage();

// loadCartFetch();