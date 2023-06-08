import sharp from "sharp";

import { ImageResizer } from "../contracts/ImageResizer";

export default class SharpImageResizer implements ImageResizer {
  async resize(source: Buffer | string, dimension: number): Promise<Buffer> {
    return await sharp(source)
      .resize({ width: dimension, height: dimension })
      .toBuffer();
  }
}
