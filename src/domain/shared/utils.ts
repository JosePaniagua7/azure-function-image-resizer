import { createHash } from "crypto";
import { mkdir } from "fs/promises";

export const extractFileName = (path: string) => path.split('.').shift();

export const extractFileExtension = (path: string) => path.split('.').pop();

export const getHash = (source: string) => createHash('md5')
    .update(source)
    .digest('hex');