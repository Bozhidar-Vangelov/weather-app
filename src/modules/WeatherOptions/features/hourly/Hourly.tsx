import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { currentWeatherSelector } from '../../../CurrentWeather/currentWeatherSlice';
import {
  fetchHourlyForecast,
  hourlyForecastSelector,
  resetHourlyForecastState,
} from './hourlySlice';

const Hourly = () => {
  const dispatch = useDispatch();
  const { hourly, hasFetched } = useSelector(hourlyForecastSelector);
  const { currentWeatherInfo } = useSelector(currentWeatherSelector);
  const { lat, lon } = currentWeatherInfo.coord;

  useEffect(() => {
    dispatch(fetchHourlyForecast(lat, lon));

    return () => {
      dispatch(resetHourlyForecastState());
    };
  }, [dispatch, lat, lon]);

  if (!hasFetched) {
    return <div>LOADING</div>;
  }

  return (
    <div className='hourly-container'>
      {hourly.map((hour) => (
        <Card key={hour.dt} className='hourly-card'>
          <Card.Meta title={hour.dt} />
          <Space className='hourly-card-description'>
            <img
              src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
              alt='Icon'
            />
            <Space direction='vertical'>
              <Space>{hour.weather[0].description}</Space>
              <Space>{hour.temp}°C</Space>
            </Space>
          </Space>
          <Space direction='vertical'>
            <Space>Feels Like: {hour.feels_like}</Space>
            <Space>
              <FontAwesomeIcon icon={solid('cloud')} />
              {`${hour.clouds}%`}
            </Space>
            <Space>
              <FontAwesomeIcon icon={solid('cloud-rain')} />
              {`${hour.pop}%`}
            </Space>
            <Space>
              <FontAwesomeIcon icon={solid('wind')} />
              {`${hour.wind_speed} m/s`}
            </Space>
            <Space>
              <FontAwesomeIcon icon={solid('droplet')} /> {hour.humidity}
            </Space>
            <Space>
              <FontAwesomeIcon icon={solid('stopwatch')} />
              {`${hour.pressure} hPa`}
            </Space>
            <Space>UV {hour.uvi}</Space>
          </Space>
        </Card>
      ))}
    </div>
  );
};

export default Hourly;
