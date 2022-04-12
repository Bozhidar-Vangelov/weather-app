import { createSlice, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { FiveDaysForecast, FiveDaysForecastState } from './types';

const initialState: FiveDaysForecastState = {
  loading: false,
  error: null,
  hasFetched: false,
  fiveDaysForecast: {} as FiveDaysForecast,
};

const fiveDaysSlice = createSlice({
  name: 'fiveDaysWeather',
  initialState: initialState,
  reducers: {
    fetchFiveDaysForecastInit(state) {
      state.loading = true;
      state.hasFetched = false;
      state.error = null;
    },
    fetchFiveDaysForecastSuccess(state, action) {
      state.loading = false;
      state.hasFetched = true;
      state.error = null;
      state.fiveDaysForecast = action.payload;
    },
    fetchFiveDaysForecastFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { reducer: fiveDaysWeatherReducer } = fiveDaysSlice;

const {
  fetchFiveDaysForecastInit,
  fetchFiveDaysForecastSuccess,
  fetchFiveDaysForecastFailure,
} = fiveDaysSlice.actions;
