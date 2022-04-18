import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';

import { config } from '../../../../shared/utils/config';
import { RootState } from '../../../../shared/store/configureStore';
import {
  FiveDaysForecast,
  FiveDaysForecastState,
  FiveDaysHourlyForecast,
} from './types';

const { ONE_CALL_WEATHER_URL, FIVE_DAYS_WEATHER_URL, API_ID } = config;

const initialState: FiveDaysForecastState = {
  loading: false,
  error: null,
  hasFetched: false,
  fiveDaysForecast: [] as FiveDaysForecast[],
};

const fiveDaysSlice = createSlice({
  name: 'fiveDaysForecast',
  initialState: initialState,
  reducers: {
    fetchFiveDaysForecastInit(state) {
      state.loading = true;
      state.hasFetched = false;
      state.error = null;
    },
    fetchFiveDaysForecastSuccess(
      state,
      action: PayloadAction<FiveDaysForecast[]>
    ) {
      state.loading = false;
      state.hasFetched = true;
      state.error = null;
      state.fiveDaysForecast = action.payload
        .slice(0, 5)
        .map((day: FiveDaysForecast) => ({
          ...day,
          dt: moment.unix(Number(day.dt)).format('ddd DD.MM.YYYY'),
          pop: Number(day.pop.toString().slice(2)),
          sunrise: moment.unix(Number(day.sunrise)).format('HH:mm'),
          sunset: moment.unix(Number(day.sunset)).format('HH:mm'),
          temp: {
            ...day.temp,
            max: Math.round(day.temp.max),
            min: Math.round(day.temp.min),
          },
          hourly: day.hourly.map((hour: FiveDaysHourlyForecast) => ({
            ...hour,
            dt: moment.unix(Number(hour.dt)).format('HH:mm'),
            pop: Number(day.pop.toString().slice(2)),
            wind: {
              ...hour.wind,
              speed: Math.round(hour.wind.speed),
            },
            main: {
              ...hour.main,
              feels_like: Math.round(hour.main.feels_like),
              temp: Math.round(hour.main.temp),
            },
          })),
        }));
    },
    fetchFiveDaysForecastFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetFiveDaysForecastState: () => initialState,
  },
});

export const { reducer: fiveDaysForecastReducer } = fiveDaysSlice;

const {
  fetchFiveDaysForecastInit,
  fetchFiveDaysForecastSuccess,
  fetchFiveDaysForecastFailure,
} = fiveDaysSlice.actions;

export const { resetFiveDaysForecastState } = fiveDaysSlice.actions;

export const fiveDaysForecastSelector = (state: RootState) =>
  state.fiveDaysForecast;

export const fetchFiveDaysForecast =
  (lat: number, lon: number) => async (dispatch: Dispatch) => {
    dispatch(fetchFiveDaysForecastInit());

    try {
      const { data: fiveDaysGeneralData } = await axios.get(
        `${ONE_CALL_WEATHER_URL}`,
        {
          params: {
            lat: lat,
            lon: lon,
            exclude: 'current,minutely,hourly,alerts',
            units: 'metric',
            appid: API_ID,
          },
        }
      );

      const { data: fiveDaysHourlyData } = await axios.get(
        FIVE_DAYS_WEATHER_URL,
        {
          params: {
            lat: lat,
            lon: lon,
            exclude: 'current,minutely,hourly,alerts',
            units: 'metric',
            appid: API_ID,
          },
        }
      );

      const fullData = fiveDaysGeneralData.daily.map(
        (day: FiveDaysForecast) => ({
          ...day,
          hourly: fiveDaysHourlyData.list.filter(
            (hour: FiveDaysHourlyForecast) =>
              moment.unix(Number(hour.dt)).format('DD') ===
              moment.unix(Number(day.dt)).format('DD')
          ),
        })
      );

      dispatch(fetchFiveDaysForecastSuccess(fullData));
    } catch (error) {
      dispatch(fetchFiveDaysForecastFailure((error as Error).message));
    }
  };
