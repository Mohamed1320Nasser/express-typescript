import { v2 as cloudinary } from 'cloudinary';
import AppError from './ApiError';

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

export const uploadToCloudinary = async (
  file: Express.Multer.File,
  fieldName: string,
) => {
  try {
    if (file.size > 2100000) {
      throw new AppError('File size should be less than 2Mb', 401);
    }
    const result = await cloudinary.uploader.upload(file.path, {
      folder: `E-Commerce/${fieldName}`,
      resource_type: 'image',
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};
export const deleteFromCloudinary = async (cloudinary_id: string) => {
  await cloudinary.uploader.destroy(cloudinary_id);
};
