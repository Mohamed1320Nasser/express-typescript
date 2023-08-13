import express from 'express';
import morgan from 'morgan';
import AppError from '../utils/ApiError';

import userRoutes from './api/user.routes';
import auth from './api/auth.routes';
import categoryRoutes from './api/category.routes';

export const allRequires = (app: express.Application) => {
  // Determine if development or production is enabled
  if (process.env.MODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/auth', auth);
  app.use('/api/v1/categories', categoryRoutes);

  // Requires
  app.all('*', (req, res, next) => {
    next(new AppError(`Cannot get this route ${req.originalUrl} here`, 404));
  });
};
