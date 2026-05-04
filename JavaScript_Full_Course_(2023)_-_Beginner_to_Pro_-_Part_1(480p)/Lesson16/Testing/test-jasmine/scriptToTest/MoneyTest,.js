import { formatMoney } from "../../../../Lesson13/1/javascript-amazon-project/scripts/utils/money.js";

describe('test suit: formatMoney', () => {
    it('converts cents into dollars', () => {
        expect(formatMoney(2250)).toEqual('22.50');
    });

    it('works with zero', () => {
        expect(formatMoney(0)).toEqual('0.00');
    });

    it('works with negative numbers', () => {
        expect(formatMoney(-2050)).toEqual('-20.50');
    });

    it('rounds to the nearest cent', () => {
        expect(formatMoney(2000.5)).toEqual('20.01');
    });

    it('works with large numbers', () => {
        expect(formatMoney(1000000)).toEqual('1000000.00');
    });
});