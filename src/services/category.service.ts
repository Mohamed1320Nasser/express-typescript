import { prisma } from '../utils/prismaClient';
import AppError from '../utils/ApiError';
import { category } from '../types/categoryTypes';
import { deleteFromCloudinary, uploadToCloudinary } from '../utils/cloudinary';
import slugify from 'slugify';

class CategoryService {
  async AddCategory(Data: category, file: Express.Multer.File) {
    try {
      const result = await uploadToCloudinary(file, 'Category');
      if (!result) {
        throw new Error('Error uploading image to Cloudinary');
      }
      Data.image = result.secure_url;
      Data.cloudinary_id = result.public_id;
      Data.slug = slugify(Data.name);
      const category = await prisma.category.create({
        data: { ...Data },
      });
      return category;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteCategory(id: number) {
    const Category = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    if (!Category) {
      throw new AppError('Category not found', 404);
    }
    await deleteFromCloudinary(Category.cloudinary_id!);
    await prisma.category.delete({
      where: {
        id: id,
      },
    });
    return 'Category deleted';
  }
  async UpdateCategory(Data: category, id: number, file: Express.Multer.File) {
    if (Data.name) {
      Data.slug = slugify(Data.name);
    }
    if (file) {
      const IsCategory = await prisma.category.findUnique({ where: { id } });
      if (!IsCategory) throw new AppError('Category not found', 404);
      await deleteFromCloudinary(IsCategory.cloudinary_id!);
      const result = await uploadToCloudinary(file, 'Category');
      if (!result) {
        throw new Error('Error uploading image to Cloudinary');
      }
      Data.image = result.secure_url;
      Data.cloudinary_id = result.public_id;
    }
    const Category = await prisma.category.update({
      where: { id },
      data: { ...Data },
    });
    return Category;
  }

  async getCategory(id: number) {
    const Category = await prisma.category.findUnique({ where: { id: id } });
    if (!Category) throw new AppError('Category not found', 404);
    return Category;
  }
  async getCategorys() {
    const Categories = await prisma.category.findMany({});
    if (!Categories) throw new AppError('Categorys not found', 404);
    return Categories;
  }
}
const categoryService = new CategoryService();
export default categoryService;
