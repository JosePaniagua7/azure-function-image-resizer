import { HttpRequest } from "@azure/functions";

import { MultiparFile } from "./MultipartFile";
import { ResizedException } from "./ResizerException";

export interface ValidationRule {
  fn: (req: HttpRequest | MultiparFile[]) => boolean;
  error: ResizedException;
}
