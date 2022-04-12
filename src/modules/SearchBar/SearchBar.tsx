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
  const [value, setValue] = useState<string>('');
  const [notFoundContent, setNotFoundContent] = useState<string>('');

  const { options } = useSelector(searchBarOptionsSelector);

  const handleOnSearch = (searchText: string) => {
    if (searchText.length > 2) {
      setNotFoundContent('City not found');
      dispatch(searchBarOptions(searchText));
    } else {
      setNotFoundContent('Please enter at least 3 symbols');
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
        notFoundContent={notFoundContent}
        allowClear
      />
    </Space>
  );
};

export default SearchBar;
