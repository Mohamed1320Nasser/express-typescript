import { Router } from 'express';

import { allowedTo, protectedRoutes } from '../../middleware/auth.middleware';
import categoryController from '../../controller/category.controller';

const routes = Router();
routes.post(
  '/',
  protectedRoutes,
  allowedTo('admin'),
  categoryController.addCategory,
);
routes.get(
  '/',
  protectedRoutes,
  allowedTo('admin'),
  categoryController.getCategories,
);
routes.delete(
  '/:id',
  protectedRoutes,
  allowedTo('admin'),
  categoryController.deleteCategory,
);
routes.put(
  '/:id',
  protectedRoutes,
  allowedTo('admin'),
  categoryController.updateCategory,
);
routes.get(
  '/id',
  protectedRoutes,
  allowedTo('admin'),
  categoryController.getCategory,
);

export default routes;
