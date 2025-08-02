// store.ts
import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './auth/register/regiterReducer'; // adjust path

export const store = configureStore({
  reducer: {
    register: registerReducer,
    // add other reducers here
  },
});

// 👇 Export RootState and AppDispatch for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
