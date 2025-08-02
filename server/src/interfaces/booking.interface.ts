import { IUser } from './user.interface';
import { ISlot } from './slot.interface';

export interface IBooking {
  id: number;
  user: IUser;
  user_ucode: string;
  userId:String;
  slotId:String;
  slot_ucode: string;
  slot: ISlot;
  seats: string[];
  totalAmount: number;
  status: string;
  bookingReference: string;
  bookingDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
