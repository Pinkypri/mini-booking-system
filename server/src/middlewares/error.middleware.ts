import { Request, Response, NextFunction } from 'express';
import { ApiError, errorHandler } from '../utils/apiError';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, 'Route not found'));
};

export const errorMiddleware = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  errorHandler(err, req, res, next);
};