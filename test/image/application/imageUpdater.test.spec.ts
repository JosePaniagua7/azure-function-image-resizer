import ImageUpdater from '../../../src/domain/image/application/ImageUpdater';
import { imagesSources } from '../../../src/domain/image/infrastructure/TestImageRepository';
import * as utils from '../../../src/domain/shared/utils';

describe("Test image updater use case", () => {
    it("Sould call path resolvers", async () => {
        const updater = new ImageUpdater();
        const fileExtensionSpy = jest.spyOn(utils, 'extractFileExtension');
        const hashSpy = jest.spyOn(utils, 'getHash');

        await updater.resizeOperationReceived({
            id: '1',
            resizedImage: [{
                originalname: 'test',
                mimetype: 'jpg',
                filename: 'technicalInterview',
                fieldname: 'resource',
                encoding: 'md5',
                destination: 'output',
                path: './test/resources/input.jpeg',
                size: 20,
            }],
            dimension: 800,
        });


        expect(fileExtensionSpy).toBeCalled();
        expect(hashSpy).toBeCalled();
    });
});