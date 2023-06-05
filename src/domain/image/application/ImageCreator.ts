import { ImageRepository } from "../contracts/ImageRepository";
import Container from '../../../dependency.injection';
import { TOKENS } from '../../shared/constants';
import ImageException from "../exceptions/ImageException";
import ImageResizerService from "../contracts/ImageResizerService";
import { ImageCreationPayload } from "../contracts/ImageCreationPayload";

const requiredSizes = [800, 1000];

export default class ImageCreator {
    repository: ImageRepository;
    resizer: ImageResizerService;

    constructor() {
        this.repository = Container.get(TOKENS.IMAGE_REPOSITORY);
        this.resizer = Container.get(TOKENS.IMAGE_RESIZER);
    }

    private async createVariations(source: ImageCreationPayload, taskId: string) {
        const creationPromises = requiredSizes.map((size) => this.repository.create({
            status: 'created',
            originalResourcePath: source.path,
            originalName: source.originalName,
            mimeType: source.mimeType,
            md5: source.md5,
            width: size,
            heigth: size,
            taskId,
        }))
        return Promise.all(creationPromises);
    }

    private async requestVariationResize(variations: any): Promise<string[]> {
        return variations.map((variation: any) => this.resizer.resize(
            variation.originalResourcePath,
            variation.width,
            variation.originalName
        ));
    }

    private async setGeneratingStatusToVariations(variations: any[], status: string) {
        const updatePromises = variations.map((variation) => {
            variation.status = 'generating';
            return variation.save();
        });
        return Promise.all(updatePromises);
    }

    private async handleResizingResponse(variations: any, resizingResponse: PromiseSettledResult<string>[]) {
        const updateImagesPromises = resizingResponse.map((settledPromiseResult: PromiseSettledResult<string>, i: number) => {
            const curreentImageProcessing = variations[i];
            curreentImageProcessing.status = settledPromiseResult.status === 'fulfilled' ? 'success' : 'error';
            if (settledPromiseResult.status === 'fulfilled' && curreentImageProcessing.status === 'success')
                curreentImageProcessing.resizedResourcePath = settledPromiseResult.value;

            return curreentImageProcessing.save();
        })
        return Promise.all(updateImagesPromises);
    }

    async create(source: ImageCreationPayload, taskId: string) {
        try {
            const imageVariations = await this.createVariations(source, taskId);
            console.log('Image variations created: ', imageVariations.length);
            // Once we have the variations in our scope, we can send a request to resize the images
            const resizingOperations = await this.requestVariationResize(imageVariations);
            console.log('Resize operations created: ', resizingOperations.length);
            // After that, we can update the variations status to generating
            await this.setGeneratingStatusToVariations(imageVariations, 'generating');
            console.log('image status updated');

            // Now, let's wait for all the resizing operations to finish
            const resizingOperationsResult = await Promise.allSettled(resizingOperations);
            console.log('Resizing operations is done: ', resizingOperationsResult);

            // Let's update image based on the promise status
            const resizedImageVariations = await this.handleResizingResponse(imageVariations, resizingOperationsResult);
            return Promise.all(resizedImageVariations);
        } catch (e) {
            console.warn('Error while calling create method in repository: ', e);
            throw ImageException.couldNotCreateImage();
        }
    }
}