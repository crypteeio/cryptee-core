import { decodeFile } from '../../src/services/decode-file'

describe("Decode file", () => {
    test("basic", async () => {
        const byteArray = '3100000000000000000000000000001E'.match(/.{2}/g).map(item => parseInt(item, 16))
        expect(decodeFile(byteArray)).toEqual({ value: ['31000000000000000000000000000000'], padding: 30 })
    });
});