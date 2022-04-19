import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';

import { config } from '../../../../shared/utils/config';
import { RootState } from '../../../../shared/store/configureStore';
import { SevenDaysForecast, SevenDaysForecastState } from './types';

const { ONE_CALL_WEATHER_URL, API_ID } = config;

const initialState: SevenDaysForecastState = {
  loading: false,
  error: null,
  hasFetched: false,
  sevenDaysForecast: [] as SevenDaysForecast[],
};

const sevenDaysSlice = createSlice({
  name: 'sevenDaysForecast',
  initialState: initialState,
  reducers: {
    fetchSevenDaysForecastInit(state) {
      state.loading = true;
      state.hasFetched = false;
      state.error = null;
    },
    fetchSevenDaysForecastSuccess(
      state,
      action: PayloadAction<SevenDaysForecast[]>
    ) {
      state.loading = false;
      state.hasFetched = true;
      state.error = null;
      state.sevenDaysForecast = action.payload
        .slice(1, 8)
        .map((day: SevenDaysForecast) => ({
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
        }));
    },
    fetchSevenDaysForecastFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetSevenDaysForecastState: () => initialState,
  },
});

export const { reducer: sevenDaysForecastReducer } = sevenDaysSlice;

const {
  fetchSevenDaysForecastInit,
  fetchSevenDaysForecastSuccess,
  fetchSevenDaysForecastFailure,
} = sevenDaysSlice.actions;

export const { resetSevenDaysForecastState } = sevenDaysSlice.actions;

export const sevenDaysForecastSelector = (state: RootState) =>
  state.sevenDaysForecast;

export const fetchSevenDaysForecast =
  (lat: number, lon: number) => async (dispatch: Dispatch) => {
    dispatch(fetchSevenDaysForecastInit());

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

      dispatch(fetchSevenDaysForecastSuccess(data.daily));
    } catch (error) {
      dispatch(fetchSevenDaysForecastFailure((error as Error).message));
    }
  };
