import { encryptText } from "../../src/services/encrypt-text"

describe("Encrypt text", () => {
    // TODO: fix broken test
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
        encryptText(["123456789"], "test").then(() => {
            expect(cipherKeyValueMock.mock.calls.length).toEqual(1);
        });
    });
});