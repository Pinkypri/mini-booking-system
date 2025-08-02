import { call, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  requestLoginDetails,
  loginSuccess,
  failureLoginDetails,
} from "./loginReducer";
import utils from "../../../utils";

function* handleLogin(action: any): Generator<any, void, AxiosResponse<any>> {
  try {
    console.log("Saga received action:", action.payload,utils.endpoint.LoginAPI); // Debugging

    const response: AxiosResponse<any> = yield call(axios.post, utils.endpoint.LoginAPI, {
      email: action.payload.email,
      password: action.payload.password,
    });

    console.log("API Response:", response); // Debugging

 
    if (response.status === 200 && response.data.success === true) {
     
      localStorage.setItem("token", response?.data?.data?.token);
      localStorage.setItem("user", response?.data?.data?.user?.user_ucode);
   
      yield put(loginSuccess({ message: response.data.message })); // Dispatch success action
    } else {
      yield put(failureLoginDetails(response.data.message || "Login failed")); // Dispatch failure action
    }
  } catch (error: any){
    console.error("API Error:", error.response?.data); // Debugging
    yield put(failureLoginDetails(error.response?.data?.message || "Something went wrong"));
  }
}

export default function* loginSaga() {
  yield takeEvery(requestLoginDetails.type, handleLogin);
}