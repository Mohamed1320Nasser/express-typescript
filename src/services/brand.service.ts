import { prisma } from '../utils/prismaClient';
import AppError from '../utils/ApiError';
import { deleteFromCloudinary, uploadToCloudinary } from '../utils/cloudinary';
import slugify from 'slugify';
import { brand } from '../types/brandTypes';
class BrandService {
  async AddBrand(Data: brand, file: Express.Multer.File) {
    try {
      const result = await uploadToCloudinary(file, 'Brand');
      if (!result) {
        throw new Error('Error uploading image to Cloudinary');
      }
      Data.image = result.secure_url;
      Data.cloudinary_id = result.public_id;
      Data.slug = slugify(Data.name);
      const Brand = await prisma.brand.create({
        data: { ...Data },
      });
      return Brand;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteBrand(id: number) {
    const Brand = await prisma.brand.findUnique({
      where: {
        id: id,
      },
    });
    if (!Brand) {
      throw new AppError('Brand not found', 404);
    }
    await deleteFromCloudinary(Brand.cloudinary_id!);
    await prisma.brand.delete({
      where: {
        id: id,
      },
    });
    return 'Brand deleted';
  }
  async UpdateBrand(Data: brand, id: number, file: Express.Multer.File) {
    if (Data.name) {
      Data.slug = slugify(Data.name);
    }
    if (file) {
      const IsBrand = await prisma.brand.findUnique({ where: { id } });
      if (!IsBrand) throw new AppError('Brand not found', 404);
      await deleteFromCloudinary(IsBrand.cloudinary_id!);
      const result = await uploadToCloudinary(file, 'Brand');
      if (!result) {
        throw new Error('Error uploading image to Cloudinary');
      }
      Data.image = result.secure_url;
      Data.cloudinary_id = result.public_id;
    }
    const Brand = await prisma.brand.update({
      where: { id },
      data: { ...Data },
    });
    return Brand;
  }

  async getBrand(id: number) {
    const Brand = await prisma.brand.findUnique({ where: { id: id } });
    if (!Brand) throw new AppError('Brand not found', 404);
    return Brand;
  }
  async getBrands() {
    const Categories = await prisma.brand.findMany({});
    if (!Categories) throw new AppError('Brands not found', 404);
    return Categories;
  }
}
const brandService = new BrandService();
export default brandService;
