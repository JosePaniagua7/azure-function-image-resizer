import { copyFile, mkdir } from "fs/promises";

import Container from "../../../dependency.injection";
import { TOKENS } from "../../shared/constants";
import { extractFileExtension, getHash } from "../../shared/utils";
import { IMAGE_STATUS } from "../constants";
import { ImageRepository } from "../contracts/ImageRepository";
import { ImageUpdatePayload } from "../contracts/ImageUpdatePayload";
import ImageException from "../exceptions/ImageException";
import { getDestinationPath } from "../utils";
import ImageFinder from "./ImageFinder";

export default class ImageUpdater {
  repository: ImageRepository;

  constructor() {
    this.repository = Container.get(TOKENS.IMAGE_REPOSITORY);
  }

  async resizeOperationReceived(source: ImageUpdatePayload) {
    const image = await new ImageFinder().findById(source.id);
    try {
      const destinationPath = getDestinationPath(
        image.dimension,
        image.originalName
      );
      const operationHash = getHash(
        JSON.stringify({
          path: image.originalResourcePath,
          dimension: image.dimension,
          originalName: image.originalName,
        })
      );
      const fileExtension = extractFileExtension(image.originalName);

      await mkdir(destinationPath, { recursive: true });

      const resourcePath = `${destinationPath}/${operationHash}.${fileExtension}`;
      await copyFile(source.resizedImage[0].path, resourcePath);

      const updatedImage = await image.update({
        resizedResourcePath: resourcePath,
        md5: operationHash,
        status: IMAGE_STATUS.RESIZED,
      });

      return updatedImage;
    } catch (e) {
      console.warn("Error in ImageUpdater use case: ", e);
      throw ImageException.couldNotProcessImageResize();
    }
  }
}
