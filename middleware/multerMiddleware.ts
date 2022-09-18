import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import fs from 'fs';

const destinationPath = './uploads';

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void,
  ) => {
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, {
        recursive: true,
      });
    }

    callback(null, destinationPath);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void,
  ) => {
    callback(null, file.originalname);
  },
})

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(new Error('Invalid file type.'));
  }
}

export const uploadImage = multer({
  storage,
  fileFilter,
})