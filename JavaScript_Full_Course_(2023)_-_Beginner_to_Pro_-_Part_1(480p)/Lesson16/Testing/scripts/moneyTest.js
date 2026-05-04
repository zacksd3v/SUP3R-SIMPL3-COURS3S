import { formatMoney } from "../../../Lesson13/1/javascript-amazon-project/scripts/utils/money.js";

console.log('Test Suit: FormatCurrency');
console.log('Yana Converting cents into Dollers');

if (formatMoney(2050) === '20.50') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('Yana aiki da 0');

if (formatMoney(0) === '0.00') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('Yana aiki da negative numbers');

if (formatMoney(-2050) === '-20.50') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('Yana rounding to the nearest cent');

if (formatMoney(2000.5) === '20.01') {
    console.log('passed');
} else {
    console.log('failed');
}   

console.log('Yana aiki da wasu manyan lambobi');

if (formatMoney(1000000) === '1000000.00') {
    console.log('passed');
} else {
    console.log('failed');
}