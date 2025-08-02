// store/booking/bookingReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Booking {
  id: number;
  user: { name: string; email: string; phone: string };
  slot: any;
//   user_ucode:string;
  seats: string[];
  totalAmount: number;
  bookingReference: string;
  status: string;
}

interface BookingState {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: BookingState = {
  bookings: [],
  isLoading: false,
  error: null,
  successMessage: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    // ✅ CREATE BOOKING
    createBookingRequest: (state, _action: PayloadAction<any>) => {
      state.isLoading = true;
      state.error = null;
    },
    createBookingSuccess: (state, action: PayloadAction<Booking>) => {
      state.isLoading = false;
      state.bookings.push(action.payload);
      state.successMessage = 'Booking created successfully';
    },
    createBookingFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ✅ GET BOOKINGS
    getBookingsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getBookingsSuccess: (state, action: PayloadAction<Booking[]>) => {
      state.isLoading = false;
      state.bookings = action.payload;
    },
    getBookingsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ✅ CLEAR BOOKING STATE
    clearBookingState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const {
  createBookingRequest,
  createBookingSuccess,
  createBookingFailure,
  getBookingsRequest,
  getBookingsSuccess,
  getBookingsFailure,
  clearBookingState, // ✅ Export clear action
} = bookingSlice.actions;

export default bookingSlice.reducer;
