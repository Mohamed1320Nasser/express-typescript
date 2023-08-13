import { NextFunction, Request, Response } from 'express';
import response from '../utils/respons';
import brandService from '../services/brand.service';

class BrandController {
  async addBrand(req: Request, res: Response, next: NextFunction) {
    try {
      const Brand = await brandService.AddBrand(req.body, req.file!);
      response(res, 201, {
        status: true,
        message: ' Create Brand successfully!',
        data: Brand,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteBrand(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await brandService.deleteBrand(Number(id));
      response(res, 200, {
        status: true,
        message: ' Brand Deleted successful!',
      });
    } catch (error) {
      next(error);
    }
  }
  async updateBrand(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const Brand = await brandService.UpdateBrand(
        req.body,
        Number(id),
        req.file!,
      );
      response(res, 200, {
        status: true,
        message: 'update Brand successful!',
        data: Brand,
      });
    } catch (error) {
      next(error);
    }
  }
  async getBrand(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const Brand = await brandService.getBrand(Number(id));

      response(res, 200, {
        status: true,
        message: 'get Brand successful!',
        data: Brand,
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const Categories = await brandService.getBrands();

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
const brandController = new BrandController();
export default brandController;
