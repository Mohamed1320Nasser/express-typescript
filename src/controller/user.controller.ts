import { NextFunction, Request, Response } from 'express';
import { catchAsyncError } from '../helpers/catchAsyncError';

import { PrismaClient } from '@prisma/client';
import AppError from '../helpers/ApiError';
const prisma = new PrismaClient();

export const create = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return next(new AppError('User is already exists', 401));
    }

    await prisma.user.create({
      data: req.body,
    });
    res.status(200).json({ message: 'success to add user' });
  },
);
