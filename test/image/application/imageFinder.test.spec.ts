import ImageFinder from '../../../src/domain/image/application/ImageFinder';
import { tasksSources } from '../../../src/domain/image/infrastructure/TestImageRepository';

describe("Test image finder use case", () => {
    it("find by id should return a new instance of image repository", async () => {
        const finder = new ImageFinder();
        const expectedProperties = tasksSources[0];

        const obtainedImage = await finder.findById('1');

        expect(obtainedImage.id).toBe(expectedProperties.id);
        expect(obtainedImage.status).toBe(expectedProperties.status);
        expect(obtainedImage.originalResourcePath).toBe(expectedProperties.originalResourcePath);
        expect(obtainedImage.resizedResourcePath).toBe(expectedProperties.resizedResourcePath);
        expect(obtainedImage.originalName).toBe(expectedProperties.originalName);
        expect(obtainedImage.mimeType).toBe(expectedProperties.mimeType);
        expect(finder.repository.findByPk).toBeCalled()

    });
});