import { UploadedFile } from "../../shared/contracts/UploadedFile";

export interface TaskCreationPayload {
    status: string;
    resourcePath: string;
    resource: UploadedFile[]
}