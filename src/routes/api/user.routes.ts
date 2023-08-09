import { Router } from 'express';
import * as controller from '../../controller/user.controller';

const routes = Router();
routes.post('/', controller.create);

export default routes;
