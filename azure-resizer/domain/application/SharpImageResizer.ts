import { ImageResizer } from "../contracts/ImageResizer";
import sharp from "sharp";

export default class SharpImageResizer implements ImageResizer {
    async resize(source: Buffer | string, dimension: number): Promise<Buffer> {
        return await sharp(source).resize(dimension).toBuffer();
    }
}