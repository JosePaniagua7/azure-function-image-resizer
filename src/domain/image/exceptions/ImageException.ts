import { ControlledException } from "../../shared/exceptions";

export default class ImageException {
  public static imageNotFound = (imageId: number): ControlledException => {
    return {
      message: `Image ${imageId} could not be found`,
      status: 404,
    };
  };
  public static couldNotCreateImage = (): ControlledException => {
    return {
      message: `Image could not be created`,
      status: 400,
    };
  };
  public static couldNotProcessImageResize = (): ControlledException => {
    return {
      message: `Image resize could not be processed`,
      status: 400,
    };
  };
}
