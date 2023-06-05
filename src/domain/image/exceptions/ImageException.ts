import { ControlledException } from "../../shared/exceptions";

export default class ImageException {
    public static imageNotFound: Function = (imageId: number, dimensions: { width: string, height: string }): ControlledException => {
        return {
            message: `Image ${imageId} with dimensions ${dimensions} could not be found`,
            status: 404,
        };
    };
    public static couldNotCreateImage: Function = (): ControlledException => {
        return {
            message: `Image could not be created`,
            status: 400,
        };
    };
}