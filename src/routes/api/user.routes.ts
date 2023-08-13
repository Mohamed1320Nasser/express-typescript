import { Router } from 'express';

import { allowedTo, protectedRoutes } from '../../middleware/auth.middleware';
import userController from '../../controller/user.controller';

const routes = Router();
routes.post('/', protectedRoutes, allowedTo('admin'), userController.addUser);
routes.get('/', protectedRoutes, allowedTo('admin'), userController.getUsers);
routes.delete(
  '/:id',
  protectedRoutes,
  allowedTo('admin'),
  userController.deleteUser,
);
routes.put(
  '/:id',
  protectedRoutes,
  allowedTo('admin'),
  userController.updateUser,
);
routes.get('/id', protectedRoutes, allowedTo('admin'), userController.getUser);

export default routes;
