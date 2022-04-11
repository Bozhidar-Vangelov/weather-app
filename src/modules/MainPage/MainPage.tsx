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
import {
  allCitiesSelector,
  fetchAllCities,
} from '../../shared/slices/allCities/allCitiesSlice';
import SearchBar from '../SearchBar/SearchBar';

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const { latitude, longitude } = useLocationHook();
  const { currentWeatherInfo } = useSelector(currentWeatherSelector);
  const { citiesOptions, loading } = useSelector(allCitiesSelector);

  useEffect(() => {
    if (latitude && longitude)
      dispatch(fetchCurrentWeather(undefined, latitude, longitude));
    dispatch(fetchAllCities());
  }, [dispatch, latitude, longitude]);

  return (
    <Spin spinning={loading && isEmpty(currentWeatherInfo)}>
      <SearchBar citiesOptions={citiesOptions} />
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
