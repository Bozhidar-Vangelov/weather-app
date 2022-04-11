import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../shared/store/configureStore';

interface SelectOptions {
  value: string;
  label?: JSX.Element;
  key: string;
}

const initialState: any = [{ value: '', label: undefined, key: '' }];

const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState: initialState,
  reducers: {
    setSearchBarOptions(state, action) {
      state.push(action.payload);
    },
  },
});

const { setSearchBarOptions } = searchBarSlice.actions;

export const searchBarOptions =
  (searchText: any) => (dispatch: Dispatch, getState: () => RootState) => {
    const { allCities } = getState();

    const citiesOptions = allCities.citiesOptions;

    if (searchText.length > 2) {
      const userOptions: any = citiesOptions
        .filter((option) => option.city.startsWith(searchText))
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
    }

    // dispatch(setSearchBarOptions(...userOptions));
  };
