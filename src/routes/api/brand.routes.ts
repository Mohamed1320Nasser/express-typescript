import { Router } from 'express';

import { allowedTo, protectedRoutes } from '../../middleware/auth.middleware';

import { checkImageUpload, uploadSingleImage } from '../../middleware/multer';
import brandController from '../../controller/brand.controller';

const routes = Router();
routes.post(
  '/',
  protectedRoutes,
  allowedTo('admin'),
  uploadSingleImage('image'),
  checkImageUpload,
  brandController.addBrand,
);
routes.get(
  '/',
  protectedRoutes,
  allowedTo('admin'),
  brandController.getCategories,
);
routes.delete(
  '/:id',
  protectedRoutes,
  allowedTo('admin'),
  brandController.deleteBrand,
);
routes.put(
  '/:id',
  protectedRoutes,
  allowedTo('admin'),
  uploadSingleImage('image'),
  checkImageUpload,
  brandController.updateBrand,
);
routes.get(
  '/id',
  protectedRoutes,
  allowedTo('admin'),
  brandController.getBrand,
);

export default routes;
