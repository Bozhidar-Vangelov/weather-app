import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Space, Spin } from 'antd';

import { useLocationHook } from '../../shared/hooks/useLocationHook';
import {
  currentWeatherSelector,
  fetchCurrentWeather,
} from '../CurrentWeather/currentWeatherSlice';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import SearchBar from '../SearchBar/SearchBar';
import { fetchAllCities } from '../../shared/slices/allCities/allCitiesSlice';

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const { latitude, longitude } = useLocationHook();
  const { currentWeatherInfo, loading } = useSelector(currentWeatherSelector);

  useEffect(() => {
    if (latitude && longitude)
      dispatch(fetchCurrentWeather(undefined, latitude, longitude));
  }, [dispatch, latitude, longitude]);

  useEffect(() => {
    dispatch(fetchAllCities());
  }, [dispatch]);

  return (
    <Spin spinning={loading && isEmpty(currentWeatherInfo)}>
      <SearchBar />
      <Space className='main-container' direction='vertical'>
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
