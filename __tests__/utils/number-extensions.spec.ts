import { toHexString } from "../../src/utils/number-converters"

describe("Number extensions", () => {
    test("0 toHexString", () => {
        const value = 0
        expect(toHexString(value)).toEqual('00');
    })
    test("123 toHexString", () => {
        const value = 123
        expect(toHexString(value)).toEqual('7B');
    });
    test("255 toHexString", () => {
        const value = 255
        expect(toHexString(value)).toEqual('FF');
    });
    test("256 toHexString throws exception", () => {
        const value = 256
        expect(() => toHexString(value)).toThrow()
    });
    test("-1 toHexString throws exception", () => {
        const value = -1        
        expect(() => toHexString(value)).toThrow()
    });
    test("0.1 toHexString throws exception", () => {
        const value = 0.1        
        expect(() => toHexString(value)).toThrow()
    });
});