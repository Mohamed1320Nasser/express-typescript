import { Router } from 'express';
import authController from '../../controller/auth.controller';

const routes = Router();

routes.post('/signup', authController.signUpUser);
routes.post('/signin', authController.login);
export default routes;
