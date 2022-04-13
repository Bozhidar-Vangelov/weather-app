import { createSlice, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { config } from '../../../../shared/utils/config';
import { RootState } from '../../../../shared/store/configureStore';
import { FiveDaysForecast, FiveDaysForecastState } from './types';

const { ONE_CALL_WEATHER_URL, API_ID } = config;

const initialState: FiveDaysForecastState = {
  loading: false,
  error: null,
  hasFetched: false,
  fiveDaysForecast: [] as FiveDaysForecast[],
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

export const fiveDaysForecastSelector = (state: RootState) => state.fiveDays;

export const fetchFiveDaysForecast =
  (lat: number, lon: number) => async (dispatch: Dispatch) => {
    dispatch(fetchFiveDaysForecastInit());

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

      const fiveDaysInfo = data.daily.slice(0, 5);

      dispatch(fetchFiveDaysForecastSuccess(fiveDaysInfo));
    } catch (error) {
      dispatch(fetchFiveDaysForecastFailure(error));
    }
  };
