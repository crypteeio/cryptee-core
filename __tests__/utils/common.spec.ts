import { range } from "../../src/utils/common"

describe("Common utils", () => {
    test("range <0, 1>", () => {
        expect(range(2)).toEqual([0, 1]);
    })
    test("range <5, 10>", () => {
        expect(range(6, 5)).toEqual([5, 6, 7, 8, 9, 10]);
    })
});