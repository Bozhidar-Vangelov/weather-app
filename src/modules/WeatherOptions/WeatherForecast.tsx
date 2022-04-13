import { useSelector } from 'react-redux';
import { Tabs } from 'antd';

import { ForecastEnum, ForecastTypes } from '../../shared/types/forecastTypes';
import FiveDays from './features/fiveDays/FiveDays';
import Hourly from './features/hourly/Hourly';
import SevenDays from './features/sevenDays/SevenDays';
import Weekend from './features/weekend/Weekend';
import NotFound from '../../shared/components/NotFound';
import { forecastTabs } from '../../shared/utils/forecastTabs';
import { currentWeatherSelector } from '../CurrentWeather/currentWeatherSlice';

const renderForecast = (forecast: ForecastTypes): JSX.Element => {
  switch (forecast.name) {
    case ForecastEnum.FiveDays:
      return <FiveDays />;
    case ForecastEnum.Hourly:
      return <Hourly />;
    case ForecastEnum.SevenDays:
      return <SevenDays />;
    case ForecastEnum.Weekend:
      return <Weekend />;
    default:
      return <NotFound />;
  }
};

const WeatherForecast: React.FC = () => {
  const { hasFetched } = useSelector(currentWeatherSelector);

  const { TabPane } = Tabs;

  function callback(key: any) {
    console.log(key);
  }

  if (!hasFetched) {
    return <div>LOADING</div>;
  }

  return (
    <Tabs onChange={callback}>
      {forecastTabs.map((forecast) => (
        <TabPane tab={forecast.name} key={forecast.name}>
          {renderForecast(forecast)}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default WeatherForecast;
