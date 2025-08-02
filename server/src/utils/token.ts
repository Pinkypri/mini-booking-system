import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import env from '../config/env';

interface JwtPayload {
  id: string;
  [key: string]: any;
}

export const generateToken = (payload: JwtPayload): string => {
  const secret: Secret = env.JWT_SECRET;

  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  };

  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string): JwtPayload => {
  const secret: Secret = env.JWT_SECRET;
  return jwt.verify(token, secret) as JwtPayload;
};
