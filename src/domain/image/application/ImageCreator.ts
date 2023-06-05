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

    async create(source: ImageCreationPayload, taskId: string) {
        try {
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
            const imageVariations = await Promise.all(creationPromises);
            console.log('Image variations created: ', imageVariations.length);
            // Once we have the variations in our scope, we can send a request to resize the images
            const resizingOperations = imageVariations.map((variation) => this.resizer.resize(
                variation.originalResourcePath,
                variation.width,
                variation.originalName
            )
            );
            console.log('Resize operations created: ', resizingOperations.length);
            // After that, we can update the variations status to generating
            const statusGenerationUpdate = imageVariations.map((variation) => {
                variation.status = 'generating';
                return variation.save();
            })
            // Let's wait for db update 
            await Promise.all(statusGenerationUpdate);
            console.log('image status updated');

            // Now, let's wait for all the resizing operations to finish
            const resizingOperationsResult = await Promise.allSettled(resizingOperations);
            console.log('Resizing operations is done: ', resizingOperationsResult);

            // Let's update image based on the promise status
            const resizedImageVariations = resizingOperationsResult.map((settledPromiseResult, i) => {
                const curreentImageProcessin = imageVariations[i];
                curreentImageProcessin.status = settledPromiseResult.status === 'fulfilled' ? 'success' : 'error';
                if (settledPromiseResult.status === 'fulfilled' && curreentImageProcessin.status === 'success')
                    curreentImageProcessin.resizedResourcePath = settledPromiseResult.value;
                return curreentImageProcessin.save();
            })
            return Promise.all(resizedImageVariations);
        } catch (e) {
            console.warn('Error while calling create method in repository: ', e);
            throw ImageException.couldNotCreateImage();
        }
    }
}