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
      .filter((option) =>
        option.city.toLowerCase().startsWith(searchText.toLowerCase())
      )
      .map((cityOption, index) => ({
        key: `${index}-${cityOption.city}`,
        value: `${cityOption.city}, ${cityOption.country}, ${cityOption.iso2}`,
        label: (
          <div className='search-bar-options-container'>
            {cityOption.city}, {cityOption.country}, {cityOption.iso2}
            <span>
              <img
                src={`https://flagcdn.com/16x12/${cityOption.iso2.toLowerCase()}.png`}
                alt='flag'
              />
            </span>
          </div>
        ),
      }));

    dispatch(setSearchBarOptions(userOptions));
  };
