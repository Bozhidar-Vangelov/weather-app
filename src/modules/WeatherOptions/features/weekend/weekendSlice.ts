import { createSlice, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { config } from '../../../../shared/utils/config';
import { RootState } from '../../../../shared/store/configureStore';
import { WeekendForecast, WeekendForecastState } from './types';

const { ONE_CALL_WEATHER_URL, API_ID } = config;

const initialState: WeekendForecastState = {
  loading: false,
  error: null,
  hasFetched: false,
  weekendForecast: [] as WeekendForecast[],
};

const weekendSlice = createSlice({
  name: 'weekendForecast',
  initialState: initialState,
  reducers: {
    fetchWeekendForecastInit(state) {
      state.loading = true;
      state.hasFetched = false;
      state.error = null;
    },
    fetchWeekendForecastSuccess(state, action) {
      state.loading = false;
      state.hasFetched = true;
      state.error = null;
      state.weekendForecast = action.payload;
    },
    fetchWeekendForecastFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetWeekendForecastState: () => initialState,
  },
});

export const { reducer: weekendForecastReducer } = weekendSlice;

const {
  fetchWeekendForecastInit,
  fetchWeekendForecastSuccess,
  fetchWeekendForecastFailure,
} = weekendSlice.actions;

export const { resetWeekendForecastState } = weekendSlice.actions;

export const weekendForecastSelector = (state: RootState) =>
  state.weekendForecast;

export const fetchWeekendForecast =
  (lat: number, lon: number) => async (dispatch: Dispatch) => {
    dispatch(fetchWeekendForecastInit());

    try {
      const { data } = await axios.get(`${ONE_CALL_WEATHER_URL}`, {
        params: {
          lat: lat,
          lon: lon,
          exclude: 'current,minutely,hourly,alerts',
          units: 'metric',
          appid: API_ID,
        },
      });

      const weekendInfo = data.daily.slice(0, 2);

      dispatch(fetchWeekendForecastSuccess(weekendInfo));
    } catch (error) {
      dispatch(fetchWeekendForecastFailure(error));
    }
  };
