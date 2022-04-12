import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../shared/store/configureStore';

interface SelectOptions {
  options: [];
}

const initialState: SelectOptions = {
  options: [],
};

const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState: initialState,
  reducers: {
    //TODO: Set action type
    setSearchBarOptions(state, action: PayloadAction<[]>) {
      state.options = action.payload;
    },
    resetSearchBarOptions: () => initialState,
  },
});

export const { reducer: searchBarReducer } = searchBarSlice;

const { setSearchBarOptions } = searchBarSlice.actions;
export const { resetSearchBarOptions } = searchBarSlice.actions;

export const searchBarOptionsSelector = (state: RootState) => state.searchBar;

export const searchBarOptions =
  (searchText: string) => (dispatch: Dispatch, getState: () => RootState) => {
    const { allCities } = getState();

    const citiesOptions = allCities.citiesOptions;

    //TODO: Set type
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

    dispatch(setSearchBarOptions(userOptions));
  };
