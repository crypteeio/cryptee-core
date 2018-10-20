import { decodeHexToUnicode, encodeUnicodeToHex, groupByLength, padEnd } from '../../src/utils/string-converters'

describe("String converters", () => {
    test("groupByLength(2) of 4 results in 2 groups", () => {
        expect(groupByLength("ABCD", 2)).toEqual(["AB", "CD"]);
    });
    test("groupByLength(3) of 6 results in 2 groups", () => {
        expect(groupByLength("ABCDEF", 3)).toEqual(["ABC", "DEF"]);
    });
    test("groupByLength(7) of 28 results in 4 groups", () => {
        expect(groupByLength("ABCDEFGHIJKLMNOPQRSTUVWXYZ01", 7)).toEqual(["ABCDEFG", "HIJKLMN", "OPQRSTU", "VWXYZ01"]);
    });
    test("groupByLength(1) of 512 throws RangeError: Invalid array length", () => {
        expect(groupByLength("1", 512)).toEqual(["1"])
    });
    test("groupByLength(12) of 512 throws RangeError: Invalid array length", () => {
        expect(groupByLength("12", 512)).toEqual(["12"])
    });

    test("encodeUnicodeToHex ASCII", () => {
        expect(encodeUnicodeToHex("1234ABCD")).toEqual("00310032003300340041004200430044");
    });
    test("encodeUnicodeToHex Bitcoin symbol", () => {
        expect(encodeUnicodeToHex("₿")).toEqual("20bf");
    });
    test("encodeUnicodeToHex smile", () => {
        expect(encodeUnicodeToHex("🙂")).toEqual("d83dde42");
    });

    test("decodeHexToUnicode ASCII", () => {
        expect(decodeHexToUnicode("00310032003300340041004200430044")).toEqual("1234ABCD");
    });
    test("decodeHexToUnicode Bitcoin symbol", () => {
        expect(decodeHexToUnicode("20bf")).toEqual("₿");
    });
    test("decodeHexToUnicode smile", () => {
        expect(decodeHexToUnicode("d83dde42")).toEqual("🙂");
    });

    test("padEnd 8", () => {
        expect(padEnd('1', 8, '8')).toEqual('18888888');
    });
});