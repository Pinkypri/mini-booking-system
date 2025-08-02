import  AppDataSource  from '../config/database';
import { Booking } from '../models/Booking';
import { User } from '../models/User';
import { Slot } from '../models/Slot';

export const createBookingService = async (payload: {
  user: { name: string; email: string; phone: string };
  slotId: string;
  userId: string;
  seats: string[];
  totalAmount: number;
}) => {
  const { user, slotId, seats, totalAmount, userId } = payload;

  const userRepo = AppDataSource.getRepository(User);
  const slotRepo = AppDataSource.getRepository(Slot);
  const bookingRepo = AppDataSource.getRepository(Booking);

  const existingUser = await userRepo.findOne({ where: { user_ucode: userId } });
  if (!existingUser) {
    throw new Error('User Not Found');
  }

  const slot = await slotRepo.findOne({ where: { slot_ucode: slotId } });
  if (!slot) throw new Error('Slot not found');
  if (!slot.isAvailable || slot.capacity - slot.bookedSeats < seats.length) {
    throw new Error('Not enough seats available');
  }

  slot.bookedSeats += seats.length;
  await slotRepo.save(slot);

  const booking = bookingRepo.create({
    user:existingUser,
    slot,        // same for this
    seats,
    totalAmount,
    bookingReference: `BK${Date.now().toString().slice(-6)}`,
    status: 'confirmed',
  });

  return await bookingRepo.save(booking);
};


export const getAllBookingsService = async (user_ucode: string) => {
  const bookingRepo = AppDataSource.getRepository(Booking);
  return await bookingRepo.find({
 where: {
      user: { user_ucode: user_ucode }, // reference nested relation field
    },
  relations: ['user','slot'], // make sure this is included!
});
};

export const getBookedSeatsBySlotUcode = async (slot_ucode: string): Promise<string[]> => {
  const bookingRepo = AppDataSource.getRepository(Booking);

  const bookings = await bookingRepo.find({
    where: {
      slot: { slot_ucode },
    },
    relations: ['slot'],
    select: ['seats'],
  });

  const bookedSeats = bookings.flatMap((booking) => booking.seats);
  return bookedSeats;
};

