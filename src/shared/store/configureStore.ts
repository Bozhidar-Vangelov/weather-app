import { configureStore } from '@reduxjs/toolkit';
import { currentWeatherReducer } from '../../modules/CurrentWeather/currentWeatherSlice';
import { allCitiesReducer } from '../slices/allCities/allCitiesSlice';
import { searchBarReducer } from '../../modules/SearchBar/searchBarSlice';
import { fiveDaysWeatherReducer } from '../../modules/WeatherOptions/features/fiveDays/fiveDaysSlice';

export const store = configureStore({
  reducer: {
    currentWeather: currentWeatherReducer,
    allCities: allCitiesReducer,
    searchBar: searchBarReducer,
    fiveDays: fiveDaysWeatherReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
