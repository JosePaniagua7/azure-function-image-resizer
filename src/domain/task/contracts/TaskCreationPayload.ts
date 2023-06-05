import { UploadedFile } from "src/domain/shared/contracts/UploadedFile";

export interface TaskCreationPayload {
    status: string;
    resourcePath: string;
    resource: UploadedFile[]
}