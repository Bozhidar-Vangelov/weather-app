import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, debounce } from 'lodash';

import { useLocationHook } from '../../shared/hooks/useLocationHook';
import {
  currentWeatherSelector,
  fetchCurrentWeather,
} from './currentWeatherSlice';

const CurrentWeather: React.FC = () => {
  const dispatch = useDispatch();
  const { latitude, longitude } = useLocationHook();
  const { loading, error, currentWeatherInfo } = useSelector(
    currentWeatherSelector
  );

  useEffect(() => {
    if (latitude && longitude)
      dispatch(fetchCurrentWeather(undefined, latitude, longitude));
  }, [dispatch, latitude, longitude]);

  const handleSearch = (value: any) => {
    dispatch(fetchCurrentWeather(value));
    console.log('change');
  };

  const delayedHandleChange = useCallback(debounce(handleSearch, 1000), []);

  const handleOnChange = (event: any) => {
    delayedHandleChange(event.target.value);
  };

  if (loading || isEmpty(currentWeatherInfo)) {
    return <div>LOADING</div>;
  }

  if (error) {
    return <div>ERROR</div>;
  }

  return (
    <div>
      <input type='text' name='test' onChange={handleOnChange} />
      <div>City: {currentWeatherInfo.name}</div>
      <div>Feels like: {currentWeatherInfo.main.feels_like}</div>
      <div>Humidity: {currentWeatherInfo.main.humidity}</div>
      <div>Pressure: {currentWeatherInfo.main.pressure}</div>
      <div>Temperature: {currentWeatherInfo.main.temp}</div>
      <div>Sunrise: {currentWeatherInfo.sys.sunrise}</div>
      <div>Main weather: {currentWeatherInfo.weather[0].main}</div>
      <div>
        Main weather description: {currentWeatherInfo.weather[0].description}
      </div>
      <div>Wind Speed: {currentWeatherInfo.wind.speed}</div>
      <div>Wind Degrees: {currentWeatherInfo.wind.deg}</div>
      <div>Clouds %: {currentWeatherInfo.clouds.all}</div>
      <div>Country: {currentWeatherInfo.sys.country}</div>
    </div>
  );
};

export default CurrentWeather;
