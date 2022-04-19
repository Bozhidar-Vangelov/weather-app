import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

import { currentWeatherSelector } from '../../../CurrentWeather/currentWeatherSlice';
import {
  fetchSevenDaysForecast,
  resetSevenDaysForecastState,
  sevenDaysForecastSelector,
} from './sevenDaysSlice';
import ForecastCard from '../../../../shared/components/ForecastCard';

const SevenDays = () => {
  const dispatch = useDispatch();
  const { sevenDaysForecast, loading } = useSelector(sevenDaysForecastSelector);
  const { currentWeatherInfo } = useSelector(currentWeatherSelector);
  const { lat, lon } = currentWeatherInfo.coord;

  useEffect(() => {
    dispatch(fetchSevenDaysForecast(lat, lon));

    return () => {
      dispatch(resetSevenDaysForecastState());
    };
  }, [dispatch, lat, lon]);

  return (
    <Spin spinning={loading}>
      <Space className='forecast-container'>
        {sevenDaysForecast.map((day) => (
          <ForecastCard
            key={day.dt}
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
                  <FontAwesomeIcon icon={regular('sun')} />
                  {day.sunrise}
                </Space>
                <Space>
                  <FontAwesomeIcon icon={solid('sun')} />
                  {day.sunset}
                </Space>
              </>
            }
          />
        ))}
      </Space>
    </Spin>
  );
};

export default SevenDays;
