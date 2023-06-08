import Container from "../../../dependency.injection";
import { TOKENS } from "../../shared/constants";
import { ImageRepository } from "../contracts/ImageRepository";
import ImageException from "../exceptions/ImageException";

export default class ImageFinder {
  repository: ImageRepository;
  constructor() {
    this.repository = Container.get(TOKENS.IMAGE_REPOSITORY);
  }

  async findById(id: string) {
    const image = await this.repository.findByPk(id);
    if (!image) throw ImageException.imageNotFound(Number(id));
    return image;
  }
}
