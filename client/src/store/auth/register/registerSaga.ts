import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  requestRegister,
  registerSuccess,
  registerFailure,

} from "./regiterReducer";
import utils from "../../../utils";

function* handleRegister(action: ReturnType<typeof requestRegister>): Generator<any, void, AxiosResponse<any>> {
  try {
   
    const response: AxiosResponse<any> = yield call(axios.post, utils.endpoint.RegisterAPI, action.payload);


    if (response.status === 201 && response.data.success === true) {
      yield put(
        registerSuccess({
          message: "Registration successful! Please verify OTP.",
         
        })
      );
    } else {
      yield put(registerFailure(response.data.message || "Registration failed."));
    }
  } catch (error: any) {
  
    yield put(registerFailure(error.response?.data?.message || "Something went wrong."));
  }
}


export default function* registerSaga() {
  yield takeLatest(requestRegister.type, handleRegister);

}