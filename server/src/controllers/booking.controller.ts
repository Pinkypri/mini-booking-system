import { Request, Response } from 'express';
import { createBookingService, getAllBookingsService,getBookedSeatsBySlotUcode } from '../services/booking.service';
import { successResponse, errorResponse } from '../utils/apiResponse';
import { validationResult } from 'express-validator';
import logger from '../utils/logger';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 'Validation failed', 400, { errors: errors.array() });
    }

    const booking = await createBookingService(req.body);
    return successResponse(res, booking, 'Booking created successfully', 201);
  } catch (error: unknown) {
    logger.error('Error in createBookingController:', error);
    
    if (error instanceof Error) {
      return errorResponse(res, error.message, 400);
    }
    
    return errorResponse(res, 'An unknown error occurred while creating booking', 400);
  }
};




export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const user_ucode = req.body.user_ucode as string;

    if (!user_ucode) {
      return errorResponse(res, 'Missing user_ucode in query params', 400);
    }

    const bookings = await getAllBookingsService(user_ucode);
    return successResponse(res, bookings, 'All bookings fetched successfully');
  } catch (error: unknown) {
    logger.error('Error in getAllBookingsController:', error);
    
    if (error instanceof Error) {
      return errorResponse(res, error.message, 500);
    }
    
    return errorResponse(res, 'Failed to fetch bookings', 500);
  }
};
// controllers/booking.controller.ts


export const getBookedSeats = async (req: Request, res: Response) => {
  try {
    const { slot_ucode } = req.params;

    if (!slot_ucode) {
      return errorResponse(res, 'slot_ucode is required', 400);
    }

    const bookedSeats = await getBookedSeatsBySlotUcode(slot_ucode);

    return successResponse(res, {
      slot_ucode,
      bookedSeats,
      count: bookedSeats.length,
    }, 'Booked seats fetched successfully');
  } catch (error) {
    console.error('getBookedSeatsController error:', error);
    return errorResponse(res, 'Failed to fetch booked seats', 500);
  }
};
