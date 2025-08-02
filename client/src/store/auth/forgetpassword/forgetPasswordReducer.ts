import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ForgetPasswordState {
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: ForgetPasswordState = {
  isLoading: false,
  error: null,
  successMessage: null,
};

const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState,
  reducers: {
    requestForgetPassword: (state, action: PayloadAction<{ email: string; newPassword: string }>) => {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    forgetPasswordSuccess: (state, action: PayloadAction<{ message: string }>) => {
      state.isLoading = false;
      state.successMessage = action.payload.message;
      state.error = null;
    },
    forgetPasswordFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.successMessage = null;
    },
    clearForgetPasswordState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const {
  requestForgetPassword,
  forgetPasswordSuccess,
  forgetPasswordFailure,
  clearForgetPasswordState,
} = forgetPasswordSlice.actions;

export default forgetPasswordSlice.reducer;