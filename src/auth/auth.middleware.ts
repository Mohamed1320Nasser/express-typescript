import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import AppError from '../helpers/ApiError';
import { catchAsyncError } from '../helpers/catchAsyncError';

const prisma = new PrismaClient();

export const protectedRoutes = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.token as string | undefined;
    if (!token) {
      return next(new AppError('Token not provided', 401));
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.secret_key || 'default_secret_key',
      ) as { userId: string };
      const user = await prisma.user.findUnique({
        where: { id: Number(decoded.userId) },
      });

      if (!user) {
        return next(new AppError('User not found', 401));
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
    async (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes(req.user?.role || '')) {
        return next(new AppError("You don't have permission to do this", 401));
      }
      next();
    },
  );
};
