import { encodeFile } from "../../src/services/encode-file"

describe("Encode file", () => {
    test("encode", () => {
        expect(encodeFile([49])).toEqual({ value: ['31000000000000000000000000000000'], padding: 30 })
    });
});