import { all } from "redux-saga/effects";
import loginSaga from "./auth/login/loginSaga"; 
import registerSaga from "./auth/register/registerSaga";
import slotSaga from "./slot/slotSaga";
import bookingSaga from "./booking/bookingSaga";
import bookedSlotSaga from "./booking/bookedSlotSaga";
import forgetPasswordSaga from "./auth/forgetpassword/forgetPasswordSaga"
export default function* rootSaga() {
  yield all([loginSaga(),
  slotSaga(),
  registerSaga(),
  bookingSaga(),
  bookedSlotSaga(),
  forgetPasswordSaga()]); 
}