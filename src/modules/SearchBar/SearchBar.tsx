import { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { Space, AutoComplete } from 'antd';

import {
  resetSearchBarOptions,
  searchBarOptions,
  searchBarOptionsSelector,
} from './searchBarSlice';
import { fetchCurrentWeather } from '../CurrentWeather/currentWeatherSlice';

const SearchBar: FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const { options } = useSelector(searchBarOptionsSelector);

  const handleOnSearch = (searchText: string) => {
    if (searchText.length > 2) {
      dispatch(searchBarOptions(searchText));
    } else {
      dispatch(resetSearchBarOptions());
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedHandleChange = useCallback(debounce(handleOnSearch, 650), []);

  const handleOnChange = (value: string) => {
    setValue(value);
    delayedHandleChange(value);
  };

  const handleOnSelect = (data: string) => {
    const [city] = data.split(', ');
    dispatch(fetchCurrentWeather(city));
    dispatch(searchBarOptions(city));
    setValue(city);
  };

  return (
    <Space className='search-bar-container'>
      <AutoComplete
        options={options}
        size={'large'}
        onSelect={handleOnSelect}
        onSearch={handleOnChange}
        placeholder='Enter a city name...'
        value={value}
        className='search-bar'
        notFoundContent='City not found'
        allowClear
      />
    </Space>
  );
};

export default SearchBar;
