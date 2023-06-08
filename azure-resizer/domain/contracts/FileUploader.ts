import { HttpRequest } from "@azure/functions";

import { MultiparFile } from "./MultipartFile";

export interface FileUploader {
  uploadFiles(req: HttpRequest): MultiparFile[];
}
