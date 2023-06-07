import { NextFunction, Request, Response } from "express";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

export const uploadFiles = (req: Request, res: Response, next: NextFunction) =>
  upload.fields([
    { name: "resource", maxCount: 1 },
    { name: "resizedImage", maxCount: 1 },
  ])(req, res, next);
