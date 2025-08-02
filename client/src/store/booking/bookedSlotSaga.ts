// store/sagas/bookedSlotSaga.ts

import { call, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  requestBookedSeats,
  bookedSeatsSuccess,
  bookedSeatsFailure,
} from "./bookedSlotReducer";
import utils from "../../utils";

function* handleGetBookedSeats(action: ReturnType<typeof requestBookedSeats>): Generator<any, void, AxiosResponse<any>> {
  try {
    const slot_ucode = action.payload;

    const response: AxiosResponse<any> = yield call(
      axios.get,
      `${utils.endpoint.GetBookedSeatsBySlotAPI}/${slot_ucode}/booked-seats`
    );

    if (response.status === 200 && Array.isArray(response.data.data.bookedSeats)) {
      yield put(bookedSeatsSuccess(response.data.data.bookedSeats));
    } else {
      yield put(bookedSeatsFailure(response.data.message || "Failed to fetch booked seats"));
    }
  } catch (error: any) {
    console.error("Booked Slot Saga Error:", error.response?.data || error.message);
    yield put(bookedSeatsFailure(error.response?.data?.message || "Something went wrong"));
  }
}

export default function* bookedSlotSaga() {
  yield takeEvery(requestBookedSeats.type, handleGetBookedSeats);
}
