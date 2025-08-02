import { Request, Response } from 'express';
import { getAvailableSlots, createSlot } from '../services/slot.service';
import { successResponse, errorResponse } from '../utils/apiResponse';
import { validationResult } from 'express-validator';
import logger from '../utils/logger';

export const getSlotsController = async (_req: Request, res: Response) => {
  try {
    const slots = await getAvailableSlots();
    successResponse(res, slots, 'Available slots fetched successfully');
  } catch (error) {
    logger.error('Error in getSlotsController:', error);
    errorResponse(res, 'Failed to fetch slots', 500);
  }
};

export const createSlotController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 'Validation failed', 400, { errors: errors.array() });
    }

    const slot = await createSlot(req.body);
    successResponse(res, slot, 'Slot created successfully', 201);
  } catch (error) {
    logger.error('Error in createSlotController:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    errorResponse(res, errorMessage, 400);
  }
};
