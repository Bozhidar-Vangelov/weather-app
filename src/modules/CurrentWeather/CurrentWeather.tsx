import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, debounce } from 'lodash';
import { Space, Input, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWind,
  faMagnifyingGlass,
  faCloud,
} from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

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
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedHandleChange = useCallback(debounce(handleSearch, 650), []);

  const handleOnChange = (event: any) => {
    delayedHandleChange(event.target.value);
  };

  if (loading || isEmpty(currentWeatherInfo)) {
    return <p>LOADING</p>;
  }

  if (error) {
    return <p>ERROR</p>;
  }

  console.log(currentWeatherInfo);

  const sunrise: any = dayjs.unix(currentWeatherInfo.sys.sunrise);
  const sunset: any = dayjs.unix(currentWeatherInfo.sys.sunset);
  const temperature: string = currentWeatherInfo.main.temp.toFixed(1);

  return (
    <Space className='weather' direction='vertical'>
      <Space className='search-input-container'>
        <Input
          type='text'
          name='city'
          prefix={
            <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} />
          }
          size='large'
          placeholder='Enter a city name'
          onChange={handleOnChange}
          className='search-input'
        />
      </Space>
      <Spin spinning={false}>
        <Space
          className='weather-info weather-info-container'
          style={{ border: '3px solid black' }}
        >
          <Space
            className='weather-info main-weather-info'
            style={{ border: '3px solid red' }}
          >
            <p>{currentWeatherInfo.weather[0].description}</p>

            <p>Feels like: {currentWeatherInfo.main.feels_like}</p>
            <p>
              <FontAwesomeIcon icon={faWind} /> {currentWeatherInfo.wind.speed}{' '}
              m/s
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
        </Space>
      </Spin>
    </Space>
  );
};

export default CurrentWeather;
