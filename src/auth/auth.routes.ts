import { Router } from 'express';
import { signUp, signin, signout } from './auth.service';
const routes = Router();

routes.post('/signup', signUp);
routes.post('/signin', signin);
routes.post('/signout', signout);
export default routes;
