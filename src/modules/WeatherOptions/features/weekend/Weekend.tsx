import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Space, Spin } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ForecastCard from '../../../../shared/components/ForecastCard';
import { currentWeatherSelector } from '../../../CurrentWeather/currentWeatherSlice';
import {
  fetchWeekendForecast,
  resetWeekendForecastState,
  weekendForecastSelector,
} from './weekendSlice';

const Weekend = () => {
  const dispatch = useDispatch();
  const { weekendForecast, loading } = useSelector(weekendForecastSelector);
  const { currentWeatherInfo } = useSelector(currentWeatherSelector);
  const { lat, lon } = currentWeatherInfo.coord;

  useEffect(() => {
    dispatch(fetchWeekendForecast(lat, lon));

    return () => {
      dispatch(resetWeekendForecastState());
    };
  }, [dispatch, lat, lon]);

  return (
    <Spin spinning={loading}>
      <Space className='forecast-container weekend-container'>
        {weekendForecast.map((day) => (
          <ForecastCard
            info={day}
            description={
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
            }
            detailsFirstColumn={
              <>
                <Space>
                  <FontAwesomeIcon icon={solid('cloud')} />
                  {`${day.clouds}%`}
                </Space>
                <Space>
                  <FontAwesomeIcon icon={solid('cloud-rain')} />
                  {`${day.pop}%`}
                </Space>
              </>
            }
            detailsSecondColumn={
              <>
                <Space>
                  <FontAwesomeIcon icon={solid('wind')} />
                  {`${day.wind_speed} m/s`}
                </Space>
                <Space>
                  <FontAwesomeIcon icon={solid('droplet')} />
                  {`${day.humidity} hPa`}
                </Space>
              </>
            }
          />
        ))}
      </Space>
    </Spin>
  );
};

export default Weekend;
