import { ResizedException } from "../contracts/ResizerException";

export default class ImageResizerControlledExceptions {
  public static invalidPayload(
    message,
    errorsFound: string[]
  ): ResizedException {
    return {
      message,
      status: 400,
      context: errorsFound,
    };
  }
  public static missingTaskId(): ResizedException {
    return {
      message: "Task id is missing, service wont know how to notify backend",
      status: 400,
    };
  }
  public static invalidTaskId(): ResizedException {
    return {
      message:
        "Task id is invalid, please, check that you are passing a valid number",
      status: 400,
    };
  }
  public static invalidDimensions(): ResizedException {
    return {
      message:
        "Invalid resizing dimensions, please, check that you are passing a valid number",
      status: 400,
    };
  }
  public static missingDimensions(): ResizedException {
    return {
      message: "Please, specify the image dimensions you are willing to obtain",
      status: 400,
    };
  }
  public static notEnoughFiles(): ResizedException {
    return {
      message: "Please, provide ONE file to transform",
      status: 400,
    };
  }
  public static tooManyFiles(): ResizedException {
    return {
      message: `You have provided too many files, this services support one file transformation per request`,
      status: 400,
    };
  }
}
