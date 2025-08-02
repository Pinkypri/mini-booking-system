// store/reducers/bookedSlotReducer.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookedSlotState {
  isLoading: boolean;
  seats: string[];
  error: string | null;
  slot_ucode: string | null;
}

const initialState: BookedSlotState = {
  isLoading: false,
  seats: [],
  error: null,
  slot_ucode: null,
};

const bookedSlotSlice = createSlice({
  name: "bookedSlot",
  initialState,
  reducers: {
    requestBookedSeats: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
      state.slot_ucode = action.payload;
    },
    bookedSeatsSuccess: (state, action: PayloadAction<string[]>) => {
      state.isLoading = false;
      state.seats = action.payload;
    },
    bookedSeatsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearBookedSeats: (state) => {
      state.isLoading = false;
      state.seats = [];
      state.error = null;
      state.slot_ucode = null;
    },
  },
});

export const {
  requestBookedSeats,
  bookedSeatsSuccess,
  bookedSeatsFailure,
  clearBookedSeats,
} = bookedSlotSlice.actions;

export default bookedSlotSlice.reducer;
