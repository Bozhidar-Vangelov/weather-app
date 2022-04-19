import { configureStore } from '@reduxjs/toolkit';
import { currentWeatherReducer } from '../../modules/CurrentWeather/currentWeatherSlice';
import { allCitiesReducer } from '../slices/allCities/allCitiesSlice';
import { searchBarReducer } from '../../modules/SearchBar/searchBarSlice';
import { fiveDaysForecastReducer } from '../../modules/WeatherOptions/features/fiveDays/fiveDaysSlice';
import { hourlyForecastReducer } from '../../modules/WeatherOptions/features/hourly/hourlySlice';
import { sevenDaysForecastReducer } from '../../modules/WeatherOptions/features/sevenDays/sevenDaysSlice';
import { weekendForecastReducer } from '../../modules/WeatherOptions/features/weekend/weekendSlice';
import { themeReducer } from '../components/ThemeProvider/themeProviderSlice';

export const store = configureStore({
  reducer: {
    currentWeather: currentWeatherReducer,
    allCities: allCitiesReducer,
    searchBar: searchBarReducer,
    fiveDaysForecast: fiveDaysForecastReducer,
    hourlyForecast: hourlyForecastReducer,
    sevenDaysForecast: sevenDaysForecastReducer,
    weekendForecast: weekendForecastReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
