import { Response } from 'express';
import { ResponseType } from '../types/responsType.d';

export default (res: Response, statusCode: number, data: ResponseType) => {
  res.status(statusCode).json(data);
};
