import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Space, Spin } from 'antd';
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
  const { hourly, loading } = useSelector(hourlyForecastSelector);
  const { currentWeatherInfo } = useSelector(currentWeatherSelector);
  const { lat, lon } = currentWeatherInfo.coord;

  useEffect(() => {
    dispatch(fetchHourlyForecast(lat, lon));

    return () => {
      dispatch(resetHourlyForecastState());
    };
  }, [dispatch, lat, lon]);

  return (
    <Spin spinning={loading}>
      <Space className='forecast-container'>
        {hourly.map((hour) => (
          <Card key={hour.dt} className='forecast-card'>
            <Card.Meta title={hour.dt} />
            <Space className='forecast-card-description'>
              <img
                src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt='Icon'
              />
              <Space direction='vertical'>
                {`${hour.weather[0].description} ${hour.temp}°C`}
              </Space>
            </Space>
            <Space className='forecast-card-feels-like'>
              Feels Like {`${hour.feels_like}°C`}
            </Space>
            <Space className='forecast-card-details-container'>
              <Space direction='vertical' className='forecast-card-details'>
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
              </Space>
              <Space direction='vertical' className='forecast-card-details'>
                <Space>
                  <FontAwesomeIcon icon={solid('droplet')} />
                  {`${hour.humidity}%`}
                </Space>
                <Space>
                  <FontAwesomeIcon icon={solid('stopwatch')} />
                  {`${hour.pressure} hPa`}
                </Space>
                <Space>UV index {hour.uvi}</Space>
              </Space>
            </Space>
          </Card>
        ))}
      </Space>
    </Spin>
  );
};

export default Hourly;
