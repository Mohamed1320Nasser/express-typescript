import express from 'express';
import morgan from 'morgan';
import AppError from '../helpers/ApiError';

import userRoutes from './api/user.routes';
import auth from '../auth/auth.routes';

export const allRequires = (app: express.Application) => {
  // Determine if development or production is enabled
  if (process.env.MODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/auth', auth);

  // Requires
  app.all('*', (req, res, next) => {
    next(new AppError(`Cannot get this route ${req.originalUrl} here`, 404));
  });
};
