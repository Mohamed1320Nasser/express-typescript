import { prisma, Role } from '../utils/prismaClient';
import AppError from '../utils/ApiError';
import bcrypt from 'bcrypt';
import { SignUpType } from '../types/user.types';

class AuthService {
  async signUp(Data: SignUpType) {
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
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new AppError('Incorrect Email or password', 400);
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError('Incorrect Email or password', 400);
    }
    return user;
  }
}
const authService = new AuthService();
export default authService;
