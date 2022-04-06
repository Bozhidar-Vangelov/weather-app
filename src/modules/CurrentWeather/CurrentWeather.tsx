import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { useLocationHook } from '../../shared/hooks/useLocationHook';
import {
  currentWeatherSelector,
  fetchCurrentWeather,
} from './currentWeatherSlice';

const CurrentWeather = () => {
  const dispatch = useDispatch();
  const { latitude, longitude } = useLocationHook();
  const { loading, error, currentWeatherInfo } = useSelector(
    currentWeatherSelector
  );

  useEffect(() => {
    if (latitude && longitude)
      dispatch(fetchCurrentWeather(latitude, longitude));
  }, [dispatch, latitude, longitude]);

  if (loading || isEmpty(currentWeatherInfo)) {
    return <div>LOADING</div>;
  }

  if (error) {
    return <div>ERROR</div>;
  }

  console.log(currentWeatherInfo);

  return (
    <div>
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
