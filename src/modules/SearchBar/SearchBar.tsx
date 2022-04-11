import { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { Space, AutoComplete } from 'antd';

import { SelectOption } from '../../shared/slices/allCities/types';
import { fetchCurrentWeather } from '../CurrentWeather/currentWeatherSlice';

interface SearchBarProps {
  citiesOptions: SelectOption[];
}

interface SelectOptions {
  value: string;
}

const SearchBar: FC<SearchBarProps> = ({ citiesOptions }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<SelectOptions[]>([]);

  const handleOnSearch = (searchText: string) => {
    if (searchText.length > 2) {
      const userOptions: SelectOptions[] = citiesOptions
        .filter((city) => city.city.startsWith(searchText))
        .map((cityOption) => ({
          value: `${cityOption.city}, ${cityOption.country}, ${cityOption.iso2}`,
        }));

      setOptions([...userOptions]);
    } else {
      setOptions([]);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedHandleChange = useCallback(debounce(handleOnSearch, 650), []);

  const handleOnChange = (value: string) => {
    setValue(value);
    delayedHandleChange(value);
  };

  const handleOnSelect = (city: string) => {
    dispatch(fetchCurrentWeather(city));

    //sets value to city name
    setValue(city.split(', ')[0]);

    //sets options to single entry with current selected city
    setOptions([{ value: city }]);
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
      />
    </Space>
  );
};

export default SearchBar;
