import { Space } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentWeatherSelector } from '../../../CurrentWeather/currentWeatherSlice';
import {
  fetchWeekendForecast,
  resetWeekendForecastState,
  weekendForecastSelector,
} from './weekendSlice';

const Weekend = () => {
  const dispatch = useDispatch();
  const { weekendForecast, hasFetched } = useSelector(weekendForecastSelector);
  const { currentWeatherInfo } = useSelector(currentWeatherSelector);
  const { lat, lon } = currentWeatherInfo.coord;

  useEffect(() => {
    dispatch(fetchWeekendForecast(lat, lon));

    return () => {
      dispatch(resetWeekendForecastState());
    };
  }, [dispatch, lat, lon]);

  if (!hasFetched) {
    return <div>LOADING</div>;
  }

  return (
    <Space>
      {weekendForecast.map((day) => (
        <div key={day.dt}>
          <div>Day: {day.dt}</div>
          <div>Min Temp: {day.temp.min}</div>
          <div>Max Temp: {day.temp.max}</div>
          <div>Main Description: {day.weather[0].main}</div>
          <div>Wind Speed: {day.wind_speed} m/s</div>
          <div>Pop: {day.pop} %</div>
          <div>Clouds: {day.clouds} %</div>
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

export default Weekend;
