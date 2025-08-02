import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: LoginState = {
  isLoading: false,
  error: null,
  successMessage: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    requestLoginDetails: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.isLoading = true;
      state.error = null; // Clear previous errors
    },
    loginSuccess: (state, action: PayloadAction<{ message: string }>) => {
      state.isLoading = false;
      state.successMessage = action.payload.message;
      state.error = null;
    },
    failureLoginDetails: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.successMessage = null;
      state.error = action.payload; // Set the error message
    },
    clearLoginState: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },

});

export const { requestLoginDetails, loginSuccess, failureLoginDetails,clearLoginState } = loginSlice.actions;

export default loginSlice.reducer;