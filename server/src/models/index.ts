import { Booking } from './Booking';
import { Slot } from './Slot';
import { User } from './User';

export { User } from './User';
export { Slot } from './Slot';
export { Booking } from './Booking';

// Optional: Export all models as a single object
const models = {
  User,
  Slot,
  Booking
};

export default models;