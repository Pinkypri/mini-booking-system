import { Slot, Booking } from './types';

export const mockSlots: Slot[] = [
  {
    id: 1,
    startTime: '2025-08-02T10:00:00',
    endTime: '2025-08-02T12:00:00',
    isAvailable: true,
    capacity: 100,
    bookedSeats: 25,
    price: 250,
    title: 'Morning Conference',
    description: 'Professional development workshop',
    venue: 'Conference Hall A'
  },

];

export const mockBookings: Booking[] = [
  {
    id: 1,
    bookingDate: '2025-08-01T15:30:00',
    user: { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890' },
    slot: mockSlots[0],
    seats: ['A1', 'A2'],
    totalAmount: 1000,
    status: 'confirmed',
    bookingReference: 'BK001'
  }
];