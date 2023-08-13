import { NextFunction, Request, Response } from 'express';
import response from '../utils/respons';
import categoryService from '../services/category.service';

class CategoryController {
  async addCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const Category = await categoryService.AddCategory(req.body, req.file!);
      response(res, 201, {
        status: true,
        message: ' Create Category successfully!',
        data: Category,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await categoryService.deleteCategory(Number(id));
      response(res, 200, {
        status: true,
        message: ' Category Deleted successful!',
      });
    } catch (error) {
      next(error);
    }
  }
  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const Category = await categoryService.UpdateCategory(
        req.body,
        Number(id),
        req.file!,
      );
      response(res, 200, {
        status: true,
        message: 'update Category successful!',
        data: Category,
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const Category = await categoryService.getCategory(Number(id));

      response(res, 200, {
        status: true,
        message: 'get Category successful!',
        data: Category,
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const Categories = await categoryService.getCategorys();

      response(res, 200, {
        status: true,
        message: 'get Categories successful!',
        data: Categories,
      });
    } catch (error) {
      next(error);
    }
  }
}
const categoryController = new CategoryController();
export default categoryController;
