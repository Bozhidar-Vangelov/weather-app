import { FC } from 'react';
import { Space, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  return (
    <Spin spinning={loading}>
      <Space className='weather-info weather-info-container'>
        {error ? (
          <NotFound />
        ) : (
          <>
            <Space className='weather-info secondary-weather-info'>
              <p>{currentWeatherInfo.weather[0].description}</p>

              <p>Feels like: {currentWeatherInfo.main.feels_like}°C</p>
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
                {currentWeatherInfo.main.temp}°C
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
                <FontAwesomeIcon icon={regular('sun')} /> Sunrise:{' '}
                {currentWeatherInfo.sys.sunrise}
              </p>
              <p>
                <FontAwesomeIcon icon={solid('sun')} /> Sunset:{' '}
                {currentWeatherInfo.sys.sunset}
              </p>
            </Space>
          </>
        )}
      </Space>
    </Spin>
  );
};

export default CurrentWeather;
