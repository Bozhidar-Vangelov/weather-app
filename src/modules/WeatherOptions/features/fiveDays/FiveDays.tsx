import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Space, Spin } from 'antd';

import { currentWeatherSelector } from '../../../CurrentWeather/currentWeatherSlice';
import {
  fetchFiveDaysForecast,
  fiveDaysForecastSelector,
  resetFiveDaysForecastState,
} from './fiveDaysSlice';
import FiveDaysDetails from './FiveDaysDetails';
import ForecastCard from '../../../../shared/components/ForecastCard';

const FiveDays = () => {
  const dispatch = useDispatch();
  const { fiveDaysForecast, loading } = useSelector(fiveDaysForecastSelector);
  const { currentWeatherInfo } = useSelector(currentWeatherSelector);
  const { lat, lon } = currentWeatherInfo.coord;

  useEffect(() => {
    dispatch(fetchFiveDaysForecast(lat, lon));

    return () => {
      dispatch(resetFiveDaysForecastState());
    };
  }, [dispatch, lat, lon]);

  return (
    <Spin spinning={loading}>
      <Space className='forecast-container'>
        {fiveDaysForecast.map((day) => (
          <ForecastCard
            info={day}
            description={
              <Space direction='vertical'>
                <Space>{day.weather[0].main}</Space>
                <Space direction='vertical'>
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
              <Space direction='vertical' className='forecast-card-details'>
                <Space>
                  <FontAwesomeIcon icon={solid('cloud')} />
                  {`${day.clouds}%`}
                </Space>
                <Space>
                  <FontAwesomeIcon icon={solid('cloud-rain')} />
                  {`${day.pop}%`}
                </Space>
                <Space>
                  <FontAwesomeIcon icon={solid('wind')} />
                  {`${day.wind_speed} m/s`}
                </Space>
              </Space>
            }
            detailsSecondColumn={
              <Space direction='vertical' className='forecast-card-details'>
                <Space>
                  <FontAwesomeIcon icon={regular('sun')} />
                  {day.sunrise}
                </Space>
                <Space>
                  <FontAwesomeIcon icon={solid('sun')} />
                  {day.sunset}
                </Space>
                <Space>
                  <FontAwesomeIcon icon={solid('stopwatch')} />
                  {`${day.pressure} hPa`}
                </Space>
              </Space>
            }
            detailsModal={<FiveDaysDetails day={day} />}
          />
        ))}
      </Space>
    </Spin>
  );
};

export default FiveDays;
