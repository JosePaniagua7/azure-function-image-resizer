import { mkdir, copyFile } from "fs/promises";

import { ImageRepository } from "../contracts/ImageRepository";
import Container from '../../../dependency.injection';
import { TOKENS } from '../../shared/constants';
import { getHash, extractFileExtension } from "../../shared/utils";
import { getDestinationPath } from "../utils";
import ImageException from "../exceptions/ImageException";
import { ImageUpdatePayload } from "../contracts/ImageUpdatePayload";
import ImageFinder from "./ImageFinder";
import { IMAGE_STATUS } from "../constants";

export default class ImageUpdater {
    repository: ImageRepository;

    constructor() {
        this.repository = Container.get(TOKENS.IMAGE_REPOSITORY);
    }

    async resizeOperationReceived(source: ImageUpdatePayload) {
        const image = await new ImageFinder().findById(source.id);
        try {
            const destinationPath = getDestinationPath(image.dimension, image.originalName);
            const operationHash = getHash(JSON.stringify({
                path: image.originalResourcePath,
                dimension: image.dimension,
                originalName: image.originalName
            }));
            const fileExtension = extractFileExtension(image.originalName);

            await mkdir(destinationPath, { recursive: true });

            const resourcePath = `${destinationPath}/${operationHash}.${fileExtension}`;
            await copyFile(source.resizedImage[0].path, resourcePath);

            const updatedImage = await image.update({
                resizedResourcePath: resourcePath,
                md5: operationHash,
                status: IMAGE_STATUS.RESIZED
            });


            return updatedImage;
        } catch (e) {
            console.warn('Error in ImageUpdater use case: ', e);
            throw ImageException.couldNotProcessImageResize();
        }
    }
}