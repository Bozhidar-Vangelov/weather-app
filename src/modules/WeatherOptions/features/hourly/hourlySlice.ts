import { createSlice, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { config } from '../../../../shared/utils/config';
import { RootState } from '../../../../shared/store/configureStore';
import { Hourly, HourlyState } from './types';

const { ONE_CALL_WEATHER_URL, API_ID } = config;

const initialState: HourlyState = {
  loading: false,
  error: null,
  hasFetched: false,
  hourly: [] as Hourly[],
};

const hourlySlice = createSlice({
  name: 'hourly',
  initialState: initialState,
  reducers: {
    fetchHourlyForecastInit(state) {
      state.loading = true;
      state.hasFetched = false;
      state.error = null;
    },
    fetchHourlyForecastSuccess(state, action) {
      state.loading = false;
      state.hasFetched = true;
      state.error = null;
      state.hourly = action.payload;
    },
    fetchHourlyForecastFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { reducer: hourlyReducer } = hourlySlice;

const {
  fetchHourlyForecastInit,
  fetchHourlyForecastSuccess,
  fetchHourlyForecastFailure,
} = hourlySlice.actions;

export const hourlyForecastSelector = (state: RootState) => state.fiveDays;

export const fetchHourlyForecast =
  (lat: number, lon: number) => async (dispatch: Dispatch) => {
    dispatch(fetchHourlyForecastInit());

    try {
      const { data } = await axios.get(`${ONE_CALL_WEATHER_URL}`, {
        params: {
          lat: lat,
          lon: lon,
          exclude: 'current,daily,minutely,alerts',
          units: 'metric',
          appid: API_ID,
        },
      });

      dispatch(fetchHourlyForecastSuccess(data));
    } catch (error) {
      dispatch(fetchHourlyForecastFailure(error));
    }
  };
