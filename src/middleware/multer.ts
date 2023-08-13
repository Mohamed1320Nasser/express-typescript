import mimeTypes from 'mime-types';
import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

const options = () => {
  const storage = multer.diskStorage({});
  function fileFilter(
    req: Request,
    file: Express.Multer.File,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cb: multer.FileFilterCallback | any,
  ) {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const fileMimeType = mimeTypes.lookup(file.originalname) as string;
    if (allowedMimeTypes.includes(fileMimeType)) {
      cb(null, true);
    } else {
      cb(new Error('image only'), false);
    }
  }
  const upload = multer({ storage, fileFilter });
  return upload;
};

export const uploadSingleImage = (fieldName: string) =>
  options().single(fieldName);

export const fileMixUpload = (fieldArry: multer.Field[]) =>
  options().fields(fieldArry);

export const checkImageUpload = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }
  next();
};
