import { HttpRequest } from "@azure/functions";
import { ResizedException } from "./ResizerException";
import { MultiparFile } from "./MultipartFile";

export interface ValidationRule {
    fn: (req: HttpRequest | MultiparFile[]) => Boolean;
    error: ResizedException;
}