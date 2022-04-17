import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Space } from 'antd';

import { currentWeatherSelector } from '../../../CurrentWeather/currentWeatherSlice';
import {
  fetchFiveDaysForecast,
  fiveDaysForecastSelector,
  resetFiveDaysForecastState,
} from './fiveDaysSlice';

const FiveDays = () => {
  const dispatch = useDispatch();
  const { fiveDaysForecast, hasFetched } = useSelector(
    fiveDaysForecastSelector
  );
  const { currentWeatherInfo } = useSelector(currentWeatherSelector);
  const { lat, lon } = currentWeatherInfo.coord;

  useEffect(() => {
    dispatch(fetchFiveDaysForecast(lat, lon));

    return () => {
      dispatch(resetFiveDaysForecastState());
    };
  }, [dispatch, lat, lon]);

  if (!hasFetched) {
    return <div>LOADING</div>;
  }

  return (
    <Space className='forecast-container'>
      {fiveDaysForecast.map((day) => (
        <Card key={day.dt} className='forecast-card'>
          <Card.Meta title={day.dt} />
          <Space className='forecast-card-description'>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt='Icon'
            />
            <Space direction='vertical'>
              <Space>{day.weather[0].main}</Space>
              <Space>
                <Space align='start'>
                  <FontAwesomeIcon icon={solid('temperature-arrow-down')} />
                  {`${day.temp.min}°C`}
                </Space>
                <Space>
                  <FontAwesomeIcon icon={solid('temperature-arrow-up')} />
                  {`${day.temp.max}°C`}
                </Space>
              </Space>
            </Space>
          </Space>
          <Space className='forecast-card-details-container'>
            <Space direction='vertical' className='forecast-card-details'>
              <Space>
                <FontAwesomeIcon icon={solid('cloud')} />
                {`${day.clouds}%`}
              </Space>
              <Space>
                <FontAwesomeIcon icon={solid('cloud-rain')} />
                {`${day.pop}%`}
              </Space>
            </Space>
            <Space direction='vertical' className='forecast-card-details'>
              <Space>
                <FontAwesomeIcon icon={regular('sun')} />
                {day.sunrise}
              </Space>
              <Space>
                <FontAwesomeIcon icon={solid('sun')} />
                {day.sunset}
              </Space>
            </Space>
          </Space>
        </Card>
      ))}
    </Space>
  );
};

export default FiveDays;
