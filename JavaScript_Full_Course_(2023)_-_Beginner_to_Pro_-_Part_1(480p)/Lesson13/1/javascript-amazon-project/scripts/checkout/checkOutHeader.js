export function renderCheckOutHeader() {
    const checkOutHeader = `
    Checkout (<a class="return-to-home-link js-return-to-home-link"
        href="amazon.html"></a>)
    `;

    document.querySelector('.js-check-out-header')
        .innerHTML = checkOutHeader;
}