import { FC } from 'react';
import { Space, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import dayjs from 'dayjs';

import { CurrentWeatherInfo } from './types';
import { useSelector } from 'react-redux';
import { currentWeatherSelector } from './currentWeatherSlice';
import NotFound from '../../shared/components/NotFound';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

interface CurrentWeatherProps {
  currentWeatherInfo: CurrentWeatherInfo;
}

const CurrentWeather: FC<CurrentWeatherProps> = ({ currentWeatherInfo }) => {
  const { loading, error } = useSelector(currentWeatherSelector);

  const sunrise: any = dayjs.unix(currentWeatherInfo.sys.sunrise);
  const sunset: any = dayjs.unix(currentWeatherInfo.sys.sunset);
  const temperature: number = Number(currentWeatherInfo.main.temp.toFixed(1));
  const feelsLike: number = Number(
    currentWeatherInfo.main.feels_like.toFixed(1)
  );

  return (
    <Spin spinning={loading}>
      <Space className='weather-info weather-info-container'>
        {error ? (
          <NotFound />
        ) : (
          <>
            <Space className='weather-info secondary-weather-info'>
              <p>{currentWeatherInfo.weather[0].description}</p>

              <p>Feels like: {feelsLike}°C</p>
              <p>
                <FontAwesomeIcon icon={solid('wind')} />{' '}
                {currentWeatherInfo.wind.speed} m/s
              </p>
              <p>
                <FontAwesomeIcon icon={solid('cloud')} /> Clouds{' '}
                {currentWeatherInfo.clouds.all}%
              </p>
            </Space>
            <Space className='weather-info main-weather-info'>
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
            <Space className='weather-info secondary-weather-info'>
              <p>
                <FontAwesomeIcon icon={solid('droplet')} /> Humidity:{' '}
                {currentWeatherInfo.main.humidity}
              </p>
              <p>
                <FontAwesomeIcon icon={solid('stopwatch')} /> Pressure:{' '}
                {currentWeatherInfo.main.pressure}
              </p>
              <p>
                <FontAwesomeIcon icon={regular('sun')} /> Sunrise: {sunrise.$H}:
                {sunrise.$m}
              </p>
              <p>
                <FontAwesomeIcon icon={solid('sun')} /> Sunrise: {sunset.$H}:
                {sunset.$m}
              </p>
            </Space>
          </>
        )}
      </Space>
    </Spin>
  );
};

export default CurrentWeather;
