import "../../src/utils/stringExtensions"

describe("String extensions", () => {
    test("groupByLength(2) of 4 results in 2 groups", () => {
        expect("ABCD".groupByLength(2)).toEqual(["AB", "CD"]);
    });
    test("groupByLength(3) of 6 results in 2 groups", () => {
        expect("ABCDEF".groupByLength(3)).toEqual(["ABC", "DEF"]);
    });
    test("groupByLength(7) of 28 results in 4 groups", () => {
        expect("ABCDEFGHIJKLMNOPQRSTUVWXYZ01".groupByLength(7)).toEqual(["ABCDEFG", "HIJKLMN", "OPQRSTU", "VWXYZ01"]);
    });
    test("groupByLength(1) of 512 throws RangeError: Invalid array length", () => {
        expect("1".groupByLength(512)).toEqual(["1"])
    });
    test("groupByLength(12) of 512 throws RangeError: Invalid array length", () => {
        expect("12".groupByLength(512)).toEqual(["12"])
    });

    test("encodeUnicodeToHex ASCII", () => {
        expect("1234ABCD".encodeUnicodeToHex()).toEqual("00310032003300340041004200430044");
    });
    test("encodeUnicodeToHex Bitcoin symbol", () => {
        expect("₿".encodeUnicodeToHex()).toEqual("20bf");
    });
    test("encodeUnicodeToHex smile", () => {
        expect("🙂".encodeUnicodeToHex()).toEqual("d83dde42");
    });

    test("decodeHexToUnicode ASCII", () => {
        expect("00310032003300340041004200430044".decodeHexToUnicode()).toEqual("1234ABCD");
    });
    test("decodeHexToUnicode Bitcoin symbol", () => {
        expect("20bf".decodeHexToUnicode()).toEqual("₿");
    });
    test("decodeHexToUnicode smile", () => {
        expect("d83dde42".decodeHexToUnicode()).toEqual("🙂");
    });
});