import { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export const catchAsyncError = (
  asyncHandler: AsyncRequestHandler,
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    asyncHandler(req, res, next).catch(next);
  };
};
