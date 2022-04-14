import { createSlice, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';

import { config } from '../../shared/utils/config';
import { RootState } from '../../shared/store/configureStore';
import { CurrentWeatherState, CurrentWeatherInfo } from './types';

const { CURRENT_WEATHER_URL, API_ID } = config;

const initialState: CurrentWeatherState = {
  loading: false,
  error: null,
  hasFetched: false,
  currentWeatherInfo: {} as CurrentWeatherInfo,
};

const currentWeatherSlice = createSlice({
  name: 'currentWeather',
  initialState: initialState,
  reducers: {
    fetchCurrentWeatherInit(state) {
      state.loading = true;
      state.hasFetched = false;
      state.error = null;
    },
    fetchCurrentWeatherSuccess(state, action) {
      state.loading = false;
      state.hasFetched = true;
      state.error = null;
      state.currentWeatherInfo = action.payload;
    },
    fetchCurrentWeatherFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { reducer: currentWeatherReducer } = currentWeatherSlice;

const {
  fetchCurrentWeatherInit,
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherFailure,
} = currentWeatherSlice.actions;

export const currentWeatherSelector = (state: RootState) =>
  state.currentWeather;

export const fetchCurrentWeather =
  (city?: string, latitude?: number, longitude?: number) =>
  async (dispatch: Dispatch) => {
    dispatch(fetchCurrentWeatherInit());

    try {
      const { data } = await axios.get(CURRENT_WEATHER_URL, {
        params: {
          q: city,
          lat: latitude,
          lon: longitude,
          appid: API_ID,
          units: 'metric',
        },
      });

      const currentWeather = {
        ...data,
        sys: {
          ...data.sys,
          sunrise: moment.unix(data.sys.sunrise).format('HH:mm'),
          sunset: moment.unix(data.sys.sunset).format('HH:mm'),
        },

        main: {
          ...data.main,
          feels_like: Math.round(data.main.feels_like),
          temp: Math.round(data.main.temp),
        },
      };

      dispatch(fetchCurrentWeatherSuccess(currentWeather));
    } catch (error) {
      dispatch(fetchCurrentWeatherFailure(error));
    }
  };
