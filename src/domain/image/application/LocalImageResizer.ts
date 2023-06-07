import sharp from "sharp";
import ImageResizerService from "../contracts/ImageResizerService";
import { mkdir } from "fs/promises";
import { extractFileExtension, getHash } from "../../shared/utils";
import { getDestinationPath } from "../utils";

export default class LocalImageResizer implements ImageResizerService {
    outputDir: string;
    constructor() {
        this.outputDir = './output'
    }

    async resize(imageId: string, path: string, dimension: number, originalName: string): Promise<string> {
        const destinationPath = getDestinationPath(dimension, originalName);
        const operationHash = getHash(JSON.stringify({ path, dimension, originalName }));
        const fileExtension = extractFileExtension(originalName);

        await mkdir(destinationPath, { recursive: true });

        const resourcePath = `${destinationPath}/${operationHash}.${fileExtension}`;

        return sharp(path)
            .resize({ width: dimension, height: dimension })
            .toFile(resourcePath)
            .then(() => resourcePath)
    };
}