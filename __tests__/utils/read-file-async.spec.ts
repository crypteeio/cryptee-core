import { readFileAsync } from "../../src/utils/read-file-async"

describe("Read file async", () => {
    test("readFileAsync with basic file", async () => {
        const file = new Blob(['1'], { type: 'text/plain' }) as File;
        await expect(readFileAsync(file)).resolves.toEqual([49])
    })
});