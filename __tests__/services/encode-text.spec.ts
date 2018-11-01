import { encodeText } from "../../src/services/encode-text"

describe("Encrypt text", () => {
    test("encode 1", () => {
        expect(encodeText("1")).toEqual(["00310000000000000000000000000000"]);
    });
    test("encode 12", () => {
        expect(encodeText("12")).toEqual(["00310032000000000000000000000000"]);
    });
    test("encode 12345678", () => {
        expect(encodeText("12345678")).toEqual(["00310032003300340035003600370038"]);
    });
    test("encode 123456789", () => {
        expect(encodeText("123456789")).toEqual(["0031003200330034003500360037003800390000000000000000000000000000"]);
    });
});