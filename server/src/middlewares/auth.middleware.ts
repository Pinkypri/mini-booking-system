import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token';
import { errorResponse } from '../utils/apiResponse';
// src/middlewares/auth.middleware.ts
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;  // Make optional if not always present
        role?: string;  // Make optional if not always present
      };
    }
  }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return errorResponse(res, 'Authentication failed: No token provided', 401);
    }

    const decoded = verifyToken(token);
    req.user = { id: decoded.id }; // Now TypeScript knows about this property
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorResponse(res, `Authentication failed: ${error.message}`, 401);
    }
    return errorResponse(res, 'Authentication failed: Unknown error', 401);
  }
};