export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;

}

export interface Slot {
  id: number;
  slot_ucode?:string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  capacity: number;
  bookedSeats: number;
  price: number;
  title: string;
  description?: string;
  venue?: string;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  isBooked: boolean;
  isSelected: boolean;
  type: 'regular' | 'premium' | 'vip';
  price: number;
}

export interface Booking {
  id: number;
  bookingDate: string;
  user: User;
  slot: Slot;
  seats: string[];
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingReference: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
}