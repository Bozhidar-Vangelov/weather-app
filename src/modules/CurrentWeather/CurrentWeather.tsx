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

  console.log(currentWeatherInfo);

  return (
    <Spin spinning={loading}>
      <Space className='weather-info-container'>
        {error ? (
          <NotFound />
        ) : (
          <>
            <Space className='weather-info secondary-weather-info'>
              <Space>
                {`Feels like ${currentWeatherInfo.main.feels_like}°C`}
              </Space>
              <Space>
                <FontAwesomeIcon icon={solid('wind')} />
                {`Wind - ${currentWeatherInfo.wind.speed} m/s`}
              </Space>
              <Space>
                <FontAwesomeIcon icon={solid('cloud')} />
                {`Clouds - ${currentWeatherInfo.clouds.all}%`}
              </Space>
            </Space>
            <Space className='weather-info main-weather-info'>
              <Space>
                {`${currentWeatherInfo.name}, ${currentWeatherInfo.sys.country}`}
              </Space>
              <Space>{currentWeatherInfo.weather[0].description}</Space>
              <Space>
                <img
                  src={`http://openweathermap.org/img/wn/${currentWeatherInfo.weather[0].icon}@2x.png`}
                  alt='img'
                />
                {currentWeatherInfo.main.temp}°C
              </Space>
            </Space>
            <Space className='weather-info secondary-weather-info'>
              <Space>
                <Space>
                  <FontAwesomeIcon icon={solid('droplet')} /> Humidity -
                </Space>
                <Space>{`${currentWeatherInfo.main.humidity}%`}</Space>
              </Space>
              <Space>
                <Space>
                  <FontAwesomeIcon icon={solid('stopwatch')} /> Pressure -
                </Space>
                <Space>{`${currentWeatherInfo.main.pressure} hPa`}</Space>
              </Space>
              <Space>
                <FontAwesomeIcon icon={regular('sun')} />
                {`Sunrise - ${currentWeatherInfo.sys.sunrise}`}
              </Space>
              <Space>
                <FontAwesomeIcon icon={solid('sun')} />
                {`Sunset - ${currentWeatherInfo.sys.sunset}`}
              </Space>
            </Space>
          </>
        )}
      </Space>
    </Spin>
  );
};

export default CurrentWeather;
