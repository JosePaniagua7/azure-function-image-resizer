import { ResizedException } from "../contracts/ResizerException";

export default class ImageResizerControlledExceptions {
    public static missingTaskId(): ResizedException {
        return {
            message: 'Task id is missing, service wont know how to notify backend',
            status: 400
        }
    }
    public static missingDimensions(): ResizedException {
        return {
            message: 'Please, specify the image dimensions you are willing to obtain',
            status: 400
        }
    }
    public static notEnoughFiles(): ResizedException {
        return {
            message: 'Please, provide ONE file to transform',
            status: 400
        }
    }
    public static tooManyFiles(providedFiles: number): ResizedException {
        return {
            message: `You have provided ${providedFiles} files, this services support one file transformation per request`,
            status: 400
        }
    }
}