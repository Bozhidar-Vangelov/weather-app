import { configureStore } from '@reduxjs/toolkit';
import { currentWeatherReducer } from '../../modules/CurrentWeather/currentWeatherSlice';
import { allCitiesReducer } from '../slices/allCities/allCitiesSlice';
import { searchBarReducer } from '../../modules/SearchBar/searchBarSlice';
import { fiveDaysForecastReducer } from '../../modules/WeatherOptions/features/fiveDays/fiveDaysSlice';
import { hourlyForecastReducer } from '../../modules/WeatherOptions/features/hourly/hourlySlice';

export const store = configureStore({
  reducer: {
    currentWeather: currentWeatherReducer,
    allCities: allCitiesReducer,
    searchBar: searchBarReducer,
    fiveDaysForecast: fiveDaysForecastReducer,
    hourlyForecast: hourlyForecastReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
