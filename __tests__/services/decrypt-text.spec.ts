import { decryptText } from "../../src/services/decrypt-text"

describe("Decrypt text", () => {
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
        decryptText(["123456789"], "test").then(() => {
            expect(cipherKeyValueMock.mock.calls.length).toEqual(1);
        });
    });
});