import sharp from "sharp";
import ImageResizerService from "../contracts/ImageResizerService";
import { createHash } from "crypto";
import { mkdir } from "fs/promises";

export default class LocalImageResizer implements ImageResizerService {
    outputDir: string;
    constructor() {
        this.outputDir = './output'
    }

    private getHash(path: string, dimension: number, originalName: string) {
        return createHash('md5')
            .update(JSON.stringify({ path, dimension, originalName }))
            .digest('hex');
    }

    private extractFileName(originalName: string) {
        return originalName.split('.').shift();
    }

    private extractFileExtension(originalName: string) {
        return originalName.split('.').pop();
    }

    private getDestinationPath(dimension: number, originalName: string) {
        const nameWithoutExtension = this.extractFileName(originalName);
        return `${this.outputDir}/${nameWithoutExtension}/${dimension}`;
    };

    private async createDestinationFolder(path: string): Promise<void> {
        await mkdir(path, { recursive: true });
    }

    async resize(path: string, dimension: number, originalName: string): Promise<string> {
        const destinationPath = this.getDestinationPath(dimension, originalName);
        const operationHash = this.getHash(path, dimension, originalName);
        const fileExtension = this.extractFileExtension(originalName);

        await this.createDestinationFolder(destinationPath);

        const resourcePath = `${destinationPath}/${operationHash}.${fileExtension}`;

        return sharp(path)
            .resize({ width: dimension, height: dimension })
            .toFile(resourcePath)
            .then((result) => {
                // console.log('resizing result: ');
                // console.log(result);
                return resourcePath;
            })
    };
}