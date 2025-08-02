import { Router } from 'express';
import { body } from 'express-validator';
import {
  createBooking,
  getAllBookings,
  getBookedSeats
} from '../controllers/booking.controller';
import { validate } from '../middlewares/validation.middleware';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @route   POST /api/bookings
 * @desc    Create a new booking
 * @access  Private
 */
router.post(
  '/',
  [
    auth,
    body('slotId').isString().withMessage('Valid slot ID is required'),
    body('seats')
      .isArray({ min: 1 })
      .withMessage('At least one seat must be selected'),
    body('totalAmount')
      .isFloat({ gt: 0 })
      .withMessage('Total amount must be greater than zero'),
    body('user.name').isString().notEmpty().withMessage('User name is required'),
    body('user.email').isEmail().withMessage('Valid email is required'),
    body('user.phone')
      .isMobilePhone('any')
      .withMessage('Valid phone number is required'),
  ],
  validate,
  createBooking
);


// router.get('/my-bookings', auth, getUserBookings);


router.post('/my-bookings', auth, getAllBookings);
router.get('/slots/:slot_ucode/booked-seats', getBookedSeats);

export default router;
