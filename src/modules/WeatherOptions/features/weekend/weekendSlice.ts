import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';

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
    fetchWeekendForecastSuccess(
      state,
      action: PayloadAction<WeekendForecast[]>
    ) {
      state.loading = false;
      state.hasFetched = true;
      state.error = null;
      state.weekendForecast = action.payload
        .map((day: WeekendForecast) => ({
          ...day,
          dt: moment.unix(Number(day.dt)).format('ddd DD.MM.YYYY'),
          pop: Number(day.pop.toString().slice(2)),
          wind_speed: Math.round(day.wind_speed),
          temp: {
            ...day.temp,
            max: Math.round(day.temp.max),
            min: Math.round(day.temp.min),
            day: Math.round(day.temp.day),
            night: Math.round(day.temp.night),
          },
        }))
        .filter((day: WeekendForecast) => {
          return (
            day.dt.startsWith('Fri') ||
            day.dt.startsWith('Sat') ||
            day.dt.startsWith('Sun')
          );
        });
    },
    fetchWeekendForecastFailure(state, action: PayloadAction<string>) {
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

      dispatch(fetchWeekendForecastSuccess(data.daily));
    } catch (error) {
      dispatch(fetchWeekendForecastFailure((error as Error).message));
    }
  };
