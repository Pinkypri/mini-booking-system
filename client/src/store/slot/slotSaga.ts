import { call, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  requestSlotData,
  slotDataSuccess,
  slotDataFailure,
} from "./slotReducer";
import utils from "../../utils";

// Define type of filters
interface SlotFilters {
  searchText?: string;
  selectedDate?: string | null;
  dateRange?: { start: string | null; end: string | null };
  sortBy?: string;
  filterByAvailability?: string;
}

function* handleGetSlots(action: ReturnType<typeof requestSlotData>): Generator<any, void, AxiosResponse<any>> {
  try {
    const filters: SlotFilters = action.payload;

    const response: AxiosResponse<any> = yield call(
      axios.post,
      utils.endpoint.AvailableSlotsAPI,
      filters // send filters in body (or change to GET with params if needed)
    );

    if (response.status === 200 && Array.isArray(response.data.data)) {
      yield put(slotDataSuccess(response.data.data));
    } else {
      yield put(slotDataFailure(response.data.message || "Failed to fetch slots"));
    }
  } catch (error: any) {
    console.error("Slot API Error:", error.response?.data || error.message);
    yield put(slotDataFailure(error.response?.data?.message || "Something went wrong"));
  }
}

export default function* slotSaga() {
  yield takeEvery(requestSlotData.type, handleGetSlots);
}
