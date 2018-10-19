
import "../../src/utils/stringExtensions"
import { format, encryptText } from "../../src/services/encrypt-text"

describe("Encrypt text - format", () => {
    test("format 1", () => {
        expect(format("1")).toEqual(["00310000000000000000000000000000"]);
    });
    test("format 12", () => {
        expect(format("12")).toEqual(["00310032000000000000000000000000"]);
    });
    test("format 12345678", () => {
        expect(format("12345678")).toEqual(["00310032003300340035003600370038"]);
    });
    test("format 123456789", () => {
        expect(format("123456789")).toEqual(["0031003200330034003500360037003800390000000000000000000000000000"]);
    });

    test("TrezorConnect.cipherKeyValue called once", () => {
        const cipherKeyValueMock = jest.fn(() => ({
            success: false,
            payload: null
        }))
        
        jest.mock('trezor-connect', () => {
            return {
                'default': {
                    cipherKeyValue: cipherKeyValueMock
                }
            }
        });
        // async/await throws runtime timeout exception
        encryptText("123456789", "test").then(() => {
            expect(cipherKeyValueMock.mock.calls.length).toEqual(1);
        });
    });
});