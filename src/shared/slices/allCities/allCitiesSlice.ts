import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { config } from '../../utils/config';
import { RootState } from '../../store/configureStore';
import { AllCities, AllCitiesState, SelectOption } from './types';

const { ALL_CITIES_URL } = config;

const initialState: AllCitiesState = {
  loading: false,
  error: null,
  hasFetched: false,
  citiesOptions: [],
};

const allCitiesSlice = createSlice({
  name: 'allCities',
  initialState: initialState,
  reducers: {
    fetchAllCitiesInit(state) {
      state.loading = true;
      state.hasFetched = false;
      state.error = null;
    },
    fetchAllCitiesSuccess(state, action: PayloadAction<AllCities[]>) {
      state.loading = false;
      state.hasFetched = true;
      state.error = null;
      state.citiesOptions = action.payload.flatMap((info) =>
        info.cities.map(
          (city) =>
            ({ city, country: info.country, iso2: info.iso2 } as SelectOption)
        )
      );
    },
    fetchAllCitiesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { reducer: allCitiesReducer } = allCitiesSlice;

const { fetchAllCitiesInit, fetchAllCitiesSuccess, fetchAllCitiesFailure } =
  allCitiesSlice.actions;

export const allCitiesSelector = (state: RootState) => state.allCities;

export const fetchAllCities = () => async (dispatch: Dispatch) => {
  dispatch(fetchAllCitiesInit());

  try {
    const { data } = await axios.get(ALL_CITIES_URL);

    dispatch(fetchAllCitiesSuccess(data.data));
  } catch (error) {
    dispatch(fetchAllCitiesFailure(error));
  }
};
