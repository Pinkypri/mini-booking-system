import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISlotResponse } from "../../interfaces/slot.interface";

// --- Define filters structure
interface SlotFilters {
  searchText?: string;
  selectedDate?: string | null;
  dateRange?: { start: string | null; end: string | null };
  sortBy?: string;
  filterByAvailability?: string;
}

interface SlotState {
  isLoading: boolean;
  slots: ISlotResponse[];
  error: string | null;
  filters: SlotFilters;
}

const initialState: SlotState = {
  isLoading: false,
  slots: [],
  error: null,
  filters: {}, // default empty filters
};

const slotSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {
    requestSlotData: (state, action: PayloadAction<SlotFilters>) => {
      state.isLoading = true;
      state.error = null;
      state.filters = action.payload;
    },
    slotDataSuccess: (state, action: PayloadAction<ISlotResponse[]>) => {
      state.isLoading = false;
      state.slots = action.payload;
    },
    slotDataFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearSlotState: (state) => {
      state.slots = [];
      state.error = null;
      state.filters = {};
    },
  },
});

export const {
  requestSlotData,
  slotDataSuccess,
  slotDataFailure,
  clearSlotState,
} = slotSlice.actions;

export default slotSlice.reducer;
