import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, debounce } from 'lodash';
import { Space, Input, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import { useLocationHook } from '../../shared/hooks/useLocationHook';
import {
  currentWeatherSelector,
  fetchCurrentWeather,
} from '../CurrentWeather/currentWeatherSlice';
import CurrentWeather from '../CurrentWeather/CurrentWeather';

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const { latitude, longitude } = useLocationHook();
  const { loading, currentWeatherInfo } = useSelector(currentWeatherSelector);

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

  console.log(currentWeatherInfo);

  return (
    <Spin spinning={loading}>
      <Space className='main-container' direction='vertical'>
        <Space className='search-input-container'>
          <Input
            type='text'
            name='city'
            prefix={
              <FontAwesomeIcon className='search-icon' icon={faLocationDot} />
            }
            size='large'
            placeholder='Enter a city name'
            onChange={handleOnChange}
            className='search-input'
          />
        </Space>
        {!isEmpty(currentWeatherInfo) ? (
          <CurrentWeather currentWeatherInfo={currentWeatherInfo} />
        ) : (
          <></>
        )}
      </Space>
    </Spin>
  );
};

export default MainPage;
