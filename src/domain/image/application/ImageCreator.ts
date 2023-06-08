import Container from "../../../dependency.injection";
import { requiredSizes, TOKENS } from "../../shared/constants";
import { IMAGE_STATUS } from "../constants";
import { ImageCreationPayload } from "../contracts/ImageCreationPayload";
import { ImageRepository } from "../contracts/ImageRepository";
import ImageResizerService from "../contracts/ImageResizerService";
import ImageException from "../exceptions/ImageException";

export default class ImageCreator {
  repository: ImageRepository;
  resizer: ImageResizerService;

  constructor() {
    this.repository = Container.get(TOKENS.IMAGE_REPOSITORY);
    this.resizer = Container.get(TOKENS.IMAGE_RESIZER);
  }

  private async createVariations(source: ImageCreationPayload, taskId: string) {
    const creationPromises = requiredSizes.map((size) =>
      this.repository.create({
        status: IMAGE_STATUS.CREATED,
        originalResourcePath: source.path,
        originalName: source.originalName,
        mimeType: source.mimeType,
        md5: source.md5,
        dimension: size,
        taskId,
      })
    );
    return Promise.all(creationPromises);
  }

  private async requestVariationResize(variations: any): Promise<string[]> {
    return variations.map((variation: any) =>
      this.resizer.resize(
        variation.id,
        variation.originalResourcePath,
        variation.dimension,
        variation.originalName
      )
    );
  }

  private async setGeneratingStatusToVariations(variations: any[]) {
    const updatePromises = variations.map((variation) => {
      variation.status = IMAGE_STATUS.RESIZING;
      return variation.save();
    });
    return Promise.all(updatePromises);
  }

  async create(source: ImageCreationPayload, taskId: string) {
    try {
      const imageVariations = await this.createVariations(source, taskId);
      console.log("Image variations created: ", imageVariations.length);
      // Once we have the variations in our scope, we can send a request to resize the images
      const resizingOperations = await this.requestVariationResize(
        imageVariations
      );
      console.log("Resize operations created: ", resizingOperations.length);
      // After that, we can update the variations status to generating
      const updatedVariations = await this.setGeneratingStatusToVariations(imageVariations);
      console.log("image status updated");
      return updatedVariations;
    } catch (e) {
      console.warn("Error while calling create method in repository: ", e);
      throw ImageException.couldNotCreateImage();
    }
  }
}
