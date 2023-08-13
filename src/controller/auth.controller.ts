import { NextFunction, Request, Response } from 'express';
import authService from '../services/auth.service';
import response from '../utils/respons';
import signToken from '../utils/signToken';
class AuthController {
  async signUpUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.signUp(req.body);
      response(res, 201, {
        status: true,
        message: 'Account created successfully!',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await authService.login(email, password);
      const token = signToken({ id: user.id });
      response(res, 200, {
        status: true,
        message: 'Login successful!',
        data: { token, user },
      });
    } catch (error) {
      next(error);
    }
  }
}
const authController = new AuthController();
export default authController;
