import { Router } from 'express';
import * as controller from '../../controller/user.controller';
import { allowedTo, protectedRoutes } from '../../auth/auth.middleware';

const routes = Router();
routes.post('/', protectedRoutes, allowedTo('admin'), controller.create);
routes.delete('/', protectedRoutes, allowedTo('admin'), controller.deleteUser);

export default routes;
