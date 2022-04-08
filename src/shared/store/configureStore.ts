import { configureStore } from '@reduxjs/toolkit';
import { currentWeatherReducer } from '../../modules/CurrentWeather/currentWeatherSlice';
import { allCitiesReducer } from '../slices/allCities/allCitiesSlice';

export const store = configureStore({
  reducer: {
    currentWeather: currentWeatherReducer,
    allCities: allCitiesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
