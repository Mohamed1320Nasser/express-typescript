import { prisma, Role } from '../utils/prismaClient';
import AppError from '../utils/ApiError';
import bcrypt from 'bcrypt';
import { SignUpType } from '../types/user.types';
import { User } from '@prisma/client';

class UserService {
  async AddUser(Data: SignUpType) {
    const existingUser = await prisma.user.findUnique({
      where: { email: Data.email },
    });
    if (existingUser) {
      throw new AppError('email already exist', 400);
    }
    Data.password = await bcrypt.hash(Data.password, 8);
    const user = await prisma.user.create({
      data: { ...Data, role: Data.role as Role },
    });
    return user;
  }
  async deleteUser(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new AppError('user not found', 404);
    }
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return 'user deleted';
  }
  async UpdateUser(Data: User, id: number) {
    const UpdateUser = await prisma.user.update({
      where: { id: id },
      data: Data,
    });
    return UpdateUser;
  }

  async getUser(id: number) {
    const user = await prisma.user.findUnique({ where: { id: id } });
    if (!user) throw new AppError('User not found', 404);
    return user;
  }
  async getUsers() {
    const users = await prisma.user.findMany({});
    if (!users) throw new AppError('Users not found', 404);
    return users;
  }
}
const userService = new UserService();
export default userService;
