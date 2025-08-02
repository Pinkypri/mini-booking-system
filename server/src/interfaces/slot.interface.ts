export interface ISlotCreate {
  startTime: Date | string;
  endTime: Date | string;
  isAvailable?: boolean;
  capacity: number;
  bookedSeats?: number;
  price: number;
  title: string;
  description: string;
  venue: string;
  slot_ucode:string;
}
export interface ISlot {
  // slot fields
  startTime: Date | string;
  endTime: Date | string;
  capacity: number;
  price: number;
  title: string;
  venue: string;
  // etc.
}

export interface ISlotResponse extends ISlotCreate {
  id: number;
   slot_ucode:string;
}
