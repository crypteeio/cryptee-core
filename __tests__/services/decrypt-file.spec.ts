import { decode } from '../../src/services/decrypt-file'

describe("Decrypt file", () => {
    test("decode", async () => {
        const byteArray = new Uint8Array('3100000000000000000000000000001E'.match(/.{2}/g).map(item => parseInt(item, 16)))
        const file = new Blob([byteArray], { type: 'application/octet-stream' }) as File
        await expect(decode(file)).resolves.toEqual({ value: ['31000000000000000000000000000000'], padding: 30 })
    });
});