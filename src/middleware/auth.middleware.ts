import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import AppError from '../utils/ApiError';
import { catchAsyncError } from '../utils/catchAsyncError';
import CustomRequest from '../interfaces/customRequest';

const prisma = new PrismaClient();

export const protectedRoutes = catchAsyncError(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.replace('Bearer ', '');
    }
    if (!token) {
      return next(new AppError('No Token Provided', 401));
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });
      if (!user) {
        return next(new AppError('Unauthorized', 401));
      }
      req.user = user;
      next();
    } catch (error) {
      return next(new AppError('Invalid token', 401));
    }
  },
);

export const allowedTo = (...roles: string[]) => {
  return catchAsyncError(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      if (!req.user) {
        return next(new AppError('User not authenticated', 401));
      }

      if (!roles.includes(req.user.role)) {
        return next(new AppError("You don't have permission to do this", 401));
      }
      next();
    },
  );
};
