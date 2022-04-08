import { FC } from 'react';
import { Space, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faCloud } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

import { CurrentWeatherInfo } from './types';
import { useSelector } from 'react-redux';
import { currentWeatherSelector } from './currentWeatherSlice';
import NotFound from '../../shared/components/NotFound';

interface CurrentWeatherProps {
  currentWeatherInfo: CurrentWeatherInfo;
}

const CurrentWeather: FC<CurrentWeatherProps> = ({ currentWeatherInfo }) => {
  const { loading, error } = useSelector(currentWeatherSelector);

  const sunrise: any = dayjs.unix(currentWeatherInfo.sys.sunrise);
  const sunset: any = dayjs.unix(currentWeatherInfo.sys.sunset);
  const temperature: number = Number(currentWeatherInfo.main.temp.toFixed(1));

  return (
    <Spin spinning={loading}>
      <Space
        className='weather-info weather-info-container'
        style={{ border: '3px solid black' }}
      >
        {error ? (
          <NotFound />
        ) : (
          <>
            <Space
              className='weather-info secondary-weather-info'
              style={{ border: '3px solid red' }}
            >
              <p>{currentWeatherInfo.weather[0].description}</p>

              <p>Feels like: {currentWeatherInfo.main.feels_like}</p>
              <p>
                <FontAwesomeIcon icon={faWind} />{' '}
                {currentWeatherInfo.wind.speed} m/s
              </p>
              <p>
                <FontAwesomeIcon icon={faCloud} /> Clouds{' '}
                {currentWeatherInfo.clouds.all}%
              </p>
            </Space>
            <Space
              className='weather-info main-weather-info'
              style={{ border: '3px solid pink' }}
            >
              <p>
                {currentWeatherInfo.name}, {currentWeatherInfo.sys.country}
              </p>
              <p>{currentWeatherInfo.weather[0].main}</p>
              <div>
                <img
                  src={`http://openweathermap.org/img/wn/${currentWeatherInfo.weather[0].icon}@2x.png`}
                  alt='img'
                />
                {temperature}°C
              </div>
            </Space>
            <Space
              className='weather-info secondary-weather-info'
              style={{ border: '3px solid green' }}
            >
              <p>Humidity: {currentWeatherInfo.main.humidity}</p>
              <p>Pressure: {currentWeatherInfo.main.pressure}</p>
              <p>
                Sunrise: {sunrise.$H}:{sunrise.$m}
              </p>
              <p>
                Sunset: {sunset.$H}:{sunset.$m}
              </p>
            </Space>
          </>
        )}
      </Space>
    </Spin>
  );
};

export default CurrentWeather;
