import { UploadOptions } from "../application/upload-builder";
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import multer_s3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { IError } from "../helpers/errors.helper";
import yenv from "yenv";

const env = yenv();

export interface IUploadImage {
  save(
    options: UploadOptions
  ): (req: Request, res: Response, next: NextFunction) => void;
}

export class FactoryAWS implements IUploadImage {
  private readonly S3 = new S3Client({});

  save(options: UploadOptions) {
    return multer({
      limits: { fileSize: options.maxFieldSize },
      storage: multer_s3({
        s3: this.S3,
        bucket: env.S3.bucketName,
        acl: options.isPublic ? "public-read" : "",
        metadata(req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key(req: Request, file, cb) {
          const mimeType = file.mimetype;
          const isFileAllowed = options.mimeTypesAllowed.includes(mimeType);

          if (!isFileAllowed) {
            const error: IError = new Error("File type not allowed");
            error.status = 422;
            return cb(error, null);
          }

          const partsFile = file.originalname.split(".");
          const newName = Date.now().toString();
          const extension = partsFile[partsFile.length - 1];
          const newFileName = `${options.directory}/${newName}.${extension}`;
          req.body[options.fieldName] = newFileName;
          cb(null, newFileName);
        },
      }),
    }).single(options.fieldName);
  }
}

export class FactoryGCP implements IUploadImage {
  save(
    options: UploadOptions
  ): (req: Request, res: Response, next: NextFunction) => void {
    throw new Error("Method not implemented.");
  }
}

export class FactoryAzure implements IUploadImage {
  save(
    options: UploadOptions
  ): (req: Request, res: Response, next: NextFunction) => void {
    throw new Error("Method not implemented.");
  }
}
