import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import { catchAsyncError } from '../helpers/catchAsyncError';
import AppError from '../helpers/ApiError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const signUp = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return next(new AppError('User is already exists', 401));
    }

    req.body.emailToken = crypto.randomBytes(16).toString('hex');
    await prisma.user.create({
      data: req.body,
    });
    res
      .status(200)
      .json('Success registration. Please verify your email address.');
  },
);

export const signin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    const token = jwt.sign(
      { userId: user.id, name: user.name },
      process.env.secret_key || 'defult',
    );

    res.status(200).json({ token, role: user.role });
  },
);

export const signout = catchAsyncError(async (req: Request, res: Response) => {
  res.clearCookie('token');

  jwt.sign({}, process.env.secret_key || 'default_secret_key', {
    expiresIn: '10',
  });

  res.status(200).json({ message: 'Logged out', status: true });
});
