import { User } from '../models/User';
import AppDataSource from '../config/database';
import { ILogin, IRegister, IAuthResponse } from '../interfaces/auth.interface';
import { generateToken } from '../utils/token';
import bcrypt from 'bcryptjs';
import logger from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

const userRepository = AppDataSource.getRepository(User);

export const register = async (userData: IRegister): Promise<IAuthResponse> => {
  try {
    const existingUser = await userRepository.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new Error('Email already in use');
    }
    const user_ucode = uuidv4();

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = userRepository.create({
      ...userData,
      password: hashedPassword,
      user_ucode: user_ucode
    });

    await userRepository.save(user);

    const token = generateToken({ id: user_ucode });

    return {
      user: {
        user_ucode: user.user_ucode,
        name: user.name,
        email: user.email
      },
      token
    };
  } catch (error) {
    logger.error('Error in register service:', error);
    throw error;
  }
};

export const login = async (loginData: ILogin): Promise<IAuthResponse> => {
  try {
    const user = await userRepository.findOne({ where: { email: loginData.email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

  const isMatch = await bcrypt.compare(loginData.password, user.password!);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken({ id: user.user_ucode });

    return {
      user: {
        user_ucode: user.user_ucode,
        name: user.name,
        email: user.email
      },
      token
    };
  } catch (error) {
    logger.error('Error in login service:', error);
    throw error;
  }
};

export const forgotPassword = async (email: string, newPassword: string): Promise<{ message: string }> => {
  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    throw new Error('User not found');
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;

  await userRepository.save(user);

  return { message: 'Password updated successfully' };
};
