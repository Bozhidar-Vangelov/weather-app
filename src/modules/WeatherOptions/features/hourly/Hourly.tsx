import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { currentWeatherSelector } from '../../../CurrentWeather/currentWeatherSlice';
import {
  fetchHourlyForecast,
  hourlyForecastSelector,
  resetHourlyForecastState,
} from './hourlySlice';
import ForecastCard from '../../../../shared/components/ForecastCard';

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
          <ForecastCard
            key={hour.dt}
            info={hour}
            description={
              <Space direction='vertical'>
                <Space>{hour.weather[0].description}</Space>
                <Space>{`${hour.temp}°C`}</Space>
              </Space>
            }
            feelsLike={
              <Space className='forecast-card-feels-like'>
                Feels Like {`${hour.feels_like}°C`}
              </Space>
            }
            detailsFirstColumn={
              <>
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
              </>
            }
            detailsSecondColumn={
              <>
                <Space>
                  <FontAwesomeIcon icon={solid('droplet')} />
                  {`${hour.humidity}%`}
                </Space>
                <Space>
                  <FontAwesomeIcon icon={solid('stopwatch')} />
                  {`${hour.pressure} hPa`}
                </Space>
                <Space>UV index {hour.uvi}</Space>
              </>
            }
          />
        ))}
      </Space>
    </Spin>
  );
};

export default Hourly;
