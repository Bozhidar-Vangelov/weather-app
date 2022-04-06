import { configureStore } from '@reduxjs/toolkit';
import { currentWeatherReducer } from '../../modules/CurrentWeather/currentWeatherSlice';

export const store = configureStore({
  reducer: {
    currentWeather: currentWeatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
