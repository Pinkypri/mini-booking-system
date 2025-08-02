import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterState {
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;

}

const initialState: RegisterState = {
  isLoading: false,
  error: null,
  successMessage: null


};
const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    requestRegister: (
      state,
      action: PayloadAction<{ email: string; name: string; password: string }>
    ) => {
     
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<{ message: string }>) => {
      state.isLoading = false;
      state.successMessage = action.payload.message;
      state.error = null;

    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.successMessage = null;
    },

    clearRegisterState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.successMessage = null;
  
    },
  },
});

export const {
  requestRegister,
  registerSuccess,
  registerFailure,
  clearRegisterState,
} = registerSlice.actions;

export default registerSlice.reducer;