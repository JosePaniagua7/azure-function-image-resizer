import ImageCreator from '../../../src/domain/image/application/ImageCreator';
import { imagesSources } from '../../../src/domain/image/infrastructure/TestImageRepository';

describe("Test image creator use case", () => {
    it("Sould call repository, create variations and update status", async () => {
        const creator = new ImageCreator();
        const createVariationsSpy = jest.spyOn(creator as any, 'createVariations');
        const requestVariationsSpy = jest.spyOn(creator as any, 'requestVariationResize');
        const updateVariationStatusSpy = jest.spyOn(creator as any, 'setGeneratingStatusToVariations');
        const { originalName, mimeType, md5 } = imagesSources[0];

        await creator.create({ path: originalName, originalName, mimeType, md5 }, '1');


        expect(createVariationsSpy).toBeCalled();
        expect(requestVariationsSpy).toBeCalled();
        expect(updateVariationStatusSpy).toBeCalled();
    });
});