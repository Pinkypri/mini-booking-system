import { Request, Response } from 'express';
import { login, register,forgotPassword } from '../services/auth.service';
import { successResponse, errorResponse } from '../utils/apiResponse';
import { validationResult } from 'express-validator';
import logger from '../utils/logger';

export const registerController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(
        res, 
        'Validation failed', 
        400, 
        { errors: errors.array() }
      );
    }

    const result = await register(req.body);
    return successResponse(res, result, 'User registered successfully', 201);
  } catch (error) {
    logger.error('Error in registerController:', error);
    
    if (error instanceof Error) {
      return errorResponse(res, error.message, 400);
    }
    
    return errorResponse(res, 'An unknown error occurred during registration', 400);
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(
        res,
        'Validation failed',
        400,
        { errors: errors.array() }
      );
    }

    const result = await login(req.body);
    return successResponse(res, result, 'User logged in successfully');
  } catch (error) {
    logger.error('Error in loginController:', error);
    
    if (error instanceof Error) {
      return errorResponse(res, error.message, 401);
    }
    
    return errorResponse(res, 'An unknown error occurred during login', 401);
  }
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return errorResponse(res, 'Email and new password are required', 400);
    }

    const result = await forgotPassword(email, newPassword);
    return successResponse(res, result, 'Password reset successful');
  } catch (error) {
    logger.error('Error in forgotPasswordController:', error);
    return errorResponse(res, (error as Error).message, 400);
  }
};
