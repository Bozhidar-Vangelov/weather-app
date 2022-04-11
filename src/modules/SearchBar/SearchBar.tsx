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
  label: JSX.Element;
  key: string;
}

const SearchBar: FC<SearchBarProps> = ({ citiesOptions }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<SelectOptions[]>([]);

  const handleOnSearch = (searchText: string) => {
    if (searchText.length > 2) {
      const userOptions: SelectOptions[] = citiesOptions
        .filter((city) => city.city.startsWith(searchText))
        .map((cityOption, index) => ({
          key: `${index}-${cityOption.city}`,
          value: `${cityOption.city}, ${cityOption.country}, ${cityOption.iso2}`,
          label: (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {cityOption.city}, {cityOption.country}, {cityOption.iso2}
              <span style={{ width: '15px', height: '15px' }}>
                <img
                  src={`https://flagcdn.com/16x12/${cityOption.iso2.toLowerCase()}.png`}
                  alt=''
                  style={{ width: '15px', height: '15px' }}
                />
              </span>
            </div>
          ),
        }));

      console.log(userOptions);

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

  const handleOnSelect = (data: string) => {
    const [city, country, isoCode] = data.split(', ');

    dispatch(fetchCurrentWeather(city));

    setValue(city);

    //sets options to single entry with current selected city
    setOptions([
      {
        value: city,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {city}, {country}, {isoCode}
            <span style={{ width: '15px', height: '15px' }}>
              <img
                src={`https://flagcdn.com/16x12/${isoCode.toLowerCase()}.png`}
                alt=''
                style={{ width: '15px', height: '15px' }}
              />
            </span>
          </div>
        ),
        key: '1',
      },
    ]);
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
