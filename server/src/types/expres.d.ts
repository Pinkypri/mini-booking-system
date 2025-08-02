// No imports needed here - this is a declaration file
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: string;
      };
    }
  }
}

// Ensure this file is treated as a module
export {};