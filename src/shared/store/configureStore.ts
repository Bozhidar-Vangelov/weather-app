import { configureStore } from '@reduxjs/toolkit';
import { currentWeatherReducer } from '../../modules/CurrentWeather/currentWeatherSlice';
import { allCitiesReducer } from '../slices/allCities/allCitiesSlice';
import { searchBarReducer } from '../../modules/SearchBar/searchBarSlice';
import { fiveDaysWeatherReducer } from '../../modules/WeatherOptions/features/fiveDays/fiveDaysSlice';
import { hourlyReducer } from '../../modules/WeatherOptions/features/hourly/hourlySlice';

export const store = configureStore({
  reducer: {
    currentWeather: currentWeatherReducer,
    allCities: allCitiesReducer,
    searchBar: searchBarReducer,
    fiveDays: fiveDaysWeatherReducer,
    hourly: hourlyReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
