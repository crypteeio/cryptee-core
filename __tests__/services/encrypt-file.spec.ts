import { encode } from "../../src/services/encrypt-file"

describe("Encrypt file", () => {
    test("encode", async () => {
        const file = new Blob(['1'], { type: 'text/plain' }) as File;
        await expect(encode(file)).resolves.toEqual({ value: ['31000000000000000000000000000000'], padding: 30 })
    });
});