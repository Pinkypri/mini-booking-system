import { Response } from 'express';

export const successResponse = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode = 500,
  data?: unknown
) => {
  const response: Record<string, unknown> = {
    success: false,
    message
  };

  if (data) {
    response.data = data;
  }

  res.status(statusCode).json(response);
};