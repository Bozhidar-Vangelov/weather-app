import { Carousel } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentWeatherSelector } from '../../../CurrentWeather/currentWeatherSlice';
import { fetchHourlyForecast, hourlyForecastSelector } from './hourlySlice';

const Hourly = () => {
  const dispatch = useDispatch();
  const { hourly, hasFetched } = useSelector(hourlyForecastSelector);
  const { currentWeatherInfo } = useSelector(currentWeatherSelector);
  const { lat, lon } = currentWeatherInfo.coord;

  useEffect(() => {
    dispatch(fetchHourlyForecast(lat, lon));
  }, [dispatch, lat, lon]);

  if (!hasFetched) {
    return <div>LOADING</div>;
  }

  const first = hourly.slice(0, 6);
  const second = hourly.slice(6, 12);
  const third = hourly.slice(12, 18);
  const fourth = hourly.slice(18);

  return (
    <Carousel>
      <div>
        {first.map((hour) => (
          <div key={hour.dt}>
            <div>Hour: {hour.dt}</div>
            <div>Temp: {hour.temp}</div>
            <div>Feels Like: {hour.feels_like}</div>
            <div>Main Description: {hour.weather[0].main}</div>
            <div>Wind Speed: {hour.wind_speed} M/S</div>
          </div>
        ))}
      </div>
      <div>
        {second.map((hour) => (
          <div key={hour.dt}>
            <div>Hour: {hour.dt}</div>
            <div>Temp: {hour.temp}</div>
            <div>Feels Like: {hour.feels_like}</div>
            <div>Main Description: {hour.weather[0].main}</div>
            <div>Wind Speed: {hour.wind_speed} M/S</div>
          </div>
        ))}
      </div>
      <div>
        {third.map((hour) => (
          <div key={hour.dt}>
            <div>Hour: {hour.dt}</div>
            <div>Temp: {hour.temp}</div>
            <div>Feels Like: {hour.feels_like}</div>
            <div>Main Description: {hour.weather[0].main}</div>
            <div>Wind Speed: {hour.wind_speed} M/S</div>
          </div>
        ))}
      </div>
      <div>
        {fourth.map((hour) => (
          <div key={hour.dt}>
            <div>Hour: {hour.dt}</div>
            <div>Temp: {hour.temp}</div>
            <div>Feels Like: {hour.feels_like}</div>
            <div>Main Description: {hour.weather[0].main}</div>
            <div>Wind Speed: {hour.wind_speed} M/S</div>
          </div>
        ))}
      </div>
    </Carousel>
  );
};

export default Hourly;
