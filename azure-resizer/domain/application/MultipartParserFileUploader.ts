import { HttpRequest } from "@azure/functions";
import { FileUploader } from "../contracts/FileUploader";
import { MultiparFile } from "../contracts/MultipartFile";
import * as multipart from 'parse-multipart';

export default class MultipartParserFileUplaoder implements FileUploader {
    uploadFiles(req: HttpRequest): MultiparFile[] {
        const bodyBuffer = Buffer.from(req.body);
        const boundary = multipart.getBoundary(req.headers['content-type']);
        return multipart.Parse(bodyBuffer, boundary);
    }
}