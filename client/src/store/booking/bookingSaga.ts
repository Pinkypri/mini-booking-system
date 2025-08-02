import { call, put, takeEvery } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import {
  createBookingRequest,
  createBookingSuccess,
  createBookingFailure,
  getBookingsRequest,
  getBookingsSuccess,
  getBookingsFailure,
} from './bookingReducer';
import utils from '../../utils'; // assumes utils.endpoint contains URLs

// CREATE BOOKING
function* handleCreateBooking(action: ReturnType<typeof createBookingRequest>): Generator<any, void, AxiosResponse<any>> {
  try {
const headers = yield call(utils.getHeader);
    const postBooking = (payload: any, headers: any) => {
      return axios.post(utils.endpoint.CreateBookingAPI, payload, { headers });
    };

    const response: AxiosResponse<any> = yield call(postBooking, action.payload, headers);


    if (response.status === 201 || response.status === 200) {
      yield put(createBookingSuccess(response.data));
    } else {
      yield put(createBookingFailure(response.data.message || 'Failed to create booking'));
    }
  } catch (error: any) {
    console.error('Create Booking Error:', error.response?.data || error.message);
    yield put(createBookingFailure(error.response?.data?.message || 'Something went wrong'));
  }
}

// GET ALL BOOKINGS
function* handleGetBookings(): Generator<any, void, AxiosResponse<any>> {
  try {
    const headers = yield call(utils.getHeader);
    const user_ucode =localStorage.getItem('user')
    const getBooking = (headers: any) => {
      return axios.post(utils.endpoint.GetBookingsAPI,{user_ucode},{ headers });
    };

     const response: AxiosResponse<any> = yield call(getBooking,  headers);



    if (response.status === 200 && Array.isArray(response.data.data)) {
      yield put(getBookingsSuccess(response.data.data));
    } else {
      yield put(getBookingsFailure(response.data.message || 'Failed to fetch bookings'));
    }
  } catch (error: any) {
    console.error('Get Bookings Error:', error.response?.data || error.message);
    yield put(getBookingsFailure(error.response?.data?.message || 'Something went wrong'));
  }
}

// ROOT BOOKING SAGA
export default function* bookingSaga() {
  yield takeEvery(createBookingRequest.type, handleCreateBooking);
  yield takeEvery(getBookingsRequest.type, handleGetBookings);
}
