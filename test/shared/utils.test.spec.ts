import { extractFileExtension, extractFileName, getHash } from '../../src/domain/shared/utils';

describe("Test extract file extension utils", () => {
    it("Should return file extension", () => {
        const fileName = 'test.txt';
        const expectedFileExtension = 'txt';

        const extractedFileExtension = extractFileExtension(fileName);

        expect(extractedFileExtension).toBe(expectedFileExtension)
    });
});

describe("Test extract file name utils", () => {
    it("Should return file name", () => {
        const fileName = 'test.txt';
        const expectedFileName = 'test';

        const extractedFileName = extractFileName(fileName);

        expect(extractedFileName).toBe(expectedFileName)
    });
});

describe("Test get hash from string source", () => {
    it("Should return a has string", () => {
        const source = 'my-hash-source';
        // This test is valid since hash function is expected to always 
        // generate the same has based on the same source.
        const expectedHash = 'c251638fb13d1030f46e30876844081b';
        const generatedHash = getHash(source);

        expect(generatedHash).toBe(expectedHash);
    });
});