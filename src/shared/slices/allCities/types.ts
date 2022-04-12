export interface AllCitiesState {
  loading: boolean;
  error: null | string;
  hasFetched: boolean;
  citiesOptions: SelectOption[];
}

export interface AllCities {
  cities: [string];
  iso2: string;
  iso3: string;
  country: string;
}

export interface SelectOption {
  city: string;
  country: string;
  iso2: string;
}
