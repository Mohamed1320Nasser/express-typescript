import { Request, Response } from 'express';
import Error from '../interfaces/error.interface';
const errorHandler = (err: Error, req: Request, res: Response) => {
  err.status = err.status || 500;
  if (err.message === 'Unexpected field') err.message = 'Error MaxCount 3 ';

  if (process.env.NODE_ENV === 'development') {
    devMode(err, res);
  } else {
    prodMode(err, res);
  }
};

const devMode = (err: Error, res: Response) => {
  res.status(Number(err.status));
  res.json({
    status: err.status,
    message: err.message,
    path: err.stack,
  });
};

const prodMode = (err: Error, res: Response) => {
  res.status(Number(err.status));
  res.json({
    status: err.status,
    message: err.message,
  });
};

export default errorHandler;
