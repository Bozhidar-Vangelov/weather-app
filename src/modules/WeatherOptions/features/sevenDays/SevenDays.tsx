import { Space } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentWeatherSelector } from '../../../CurrentWeather/currentWeatherSlice';
import {
  fetchSevenDaysForecast,
  resetSevenDaysForecastState,
  sevenDaysForecastSelector,
} from './sevenDaysSlice';

const SevenDays = () => {
  const dispatch = useDispatch();
  const { sevenDaysForecast, hasFetched } = useSelector(
    sevenDaysForecastSelector
  );
  const { currentWeatherInfo } = useSelector(currentWeatherSelector);
  const { lat, lon } = currentWeatherInfo.coord;

  useEffect(() => {
    dispatch(fetchSevenDaysForecast(lat, lon));

    return () => {
      dispatch(resetSevenDaysForecastState());
    };
  }, [dispatch, lat, lon]);

  if (!hasFetched) {
    return <div>LOADING</div>;
  }

  return (
    <Space>
      {sevenDaysForecast.map((day) => (
        <div key={day.dt}>
          <div>Day: {day.dt}</div>
          <div>Min Temp: {day.temp.min}</div>
          <div>Max Temp: {day.temp.max}</div>
          <div>Clouds: {day.clouds}</div>
          <div>Pop: {day.pop}</div>
          <div>Main Description: {day.weather[0].main}</div>
          <div>Sunrise: {day.sunrise} M/S</div>
          <div>Sunset: {day.sunset} M/S</div>
          <div>
            Icon:
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt='Icon'
            />
          </div>
        </div>
      ))}
    </Space>
  );
};

export default SevenDays;
