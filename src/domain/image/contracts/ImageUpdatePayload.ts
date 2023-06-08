import { UploadedFile } from "../../shared/contracts/UploadedFile";

export interface ImageUpdatePayload {
  id: string;
  dimension: number;
  resizedImage: UploadedFile[];
}
