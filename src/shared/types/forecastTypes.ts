export enum ForecastEnum {
  FiveDays = 'FiveDays',
  Hourly = 'Hourly',
  SevenDays = 'SevenDays',
  Weekend = 'Weekend',
}

export interface ForecastTypes {
  name: ForecastEnum;
}
