import { NextFunction, Request, Response } from 'express';
import response from '../utils/respons';
import userService from '../services/user.service';
class UserController {
  async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.AddUser(req.body);
      response(res, 201, {
        status: true,
        message: 'Account created successfully!',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await userService.deleteUser(Number(id));
      response(res, 200, {
        status: true,
        message: ' User Deleted successful!',
      });
    } catch (error) {
      next(error);
    }
  }
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.UpdateUser(req.body, Number(id));
      response(res, 200, {
        status: true,
        message: 'update User successful!',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.getUser(Number(id));

      response(res, 200, {
        status: true,
        message: 'get User successful!',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getUsers();

      response(res, 200, {
        status: true,
        message: 'get Users successful!',
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }
}
const userController = new UserController();
export default userController;
