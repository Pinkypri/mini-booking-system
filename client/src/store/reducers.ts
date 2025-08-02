import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./auth/login/loginReducer"; // Import the login reducer
import registerReducer from "./auth/register/regiterReducer"
import slotReducer from "./slot/slotReducer";
import bookingReducer from "./booking/bookingReducer";
import bookedSlotReducer from "./booking/bookedSlotReducer";
import forgetPasswordReducer from "./auth/forgetpassword/forgetPasswordReducer";
const rootReducer = combineReducers({
  login: loginReducer, // Add the login reducer here
  register: registerReducer,
  slot: slotReducer,
  booking: bookingReducer,
  bookedSlot: bookedSlotReducer,
  forgetPassword:forgetPasswordReducer 
  // Add other reducers if needed
});

export default rootReducer;