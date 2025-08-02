import { call, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  requestForgetPassword,
  forgetPasswordSuccess,
  forgetPasswordFailure,
} from "./forgetPasswordReducer";
import utils from "../../../utils";

function* handleForgetPassword(action: any): Generator<any, void, AxiosResponse<any>> {
  try {
    console.log("Saga received forget password request:", action.payload, utils.endpoint.ForgotPasswordAPI);

    const response: AxiosResponse<any> = yield call(axios.post, utils.endpoint.ForgotPasswordAPI, {
      email: action.payload.email,
      newPassword: action.payload.newPassword
    });

    console.log("Forget Password API Response:", response);

    if (response.status === 200 && response.data.success === true) {
      yield put(forgetPasswordSuccess({ message: response.data.message }));
    } else {
      yield put(forgetPasswordFailure(response.data.message || "Failed to send reset email"));
    }
  } catch (error: any) {
    console.error("Forget Password API Error:", error.response?.data);
    yield put(forgetPasswordFailure(error.response?.data?.message || "Something went wrong"));
  }
}

export default function* forgetPasswordSaga() {
  yield takeEvery(requestForgetPassword.type, handleForgetPassword);
}
