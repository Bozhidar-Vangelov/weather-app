import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';

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
  name: 'hourlyForecast',
  initialState: initialState,
  reducers: {
    fetchHourlyForecastInit(state) {
      state.loading = true;
      state.hasFetched = false;
      state.error = null;
    },
    fetchHourlyForecastSuccess(state, action: PayloadAction<Hourly[]>) {
      state.loading = false;
      state.hasFetched = true;
      state.error = null;
      state.hourly = action.payload.slice(0, 24).map((day: Hourly) => ({
        ...day,
        dt: moment.unix(Number(day.dt)).format('HH:mm'),
        feels_like: Math.round(day.feels_like),
        temp: Math.round(day.temp),
        wind_speed: Math.round(day.wind_speed),
        uvi: Math.round(day.uvi),
      }));
    },
    fetchHourlyForecastFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetHourlyForecastState: () => initialState,
  },
});

export const { reducer: hourlyForecastReducer } = hourlySlice;

const {
  fetchHourlyForecastInit,
  fetchHourlyForecastSuccess,
  fetchHourlyForecastFailure,
} = hourlySlice.actions;

export const { resetHourlyForecastState } = hourlySlice.actions;

export const hourlyForecastSelector = (state: RootState) =>
  state.hourlyForecast;

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

      const twentyFourHoursInfo: Hourly[] = data.hourly;

      dispatch(fetchHourlyForecastSuccess(twentyFourHoursInfo));
    } catch (error) {
      dispatch(fetchHourlyForecastFailure((error as Error).message));
    }
  };
