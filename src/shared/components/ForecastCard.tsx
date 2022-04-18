import { Card, Space } from 'antd';
import { FiveDaysForecast } from '../../modules/WeatherOptions/features/fiveDays/types';
import { SevenDaysForecast } from '../../modules/WeatherOptions/features/sevenDays/types';
import { Hourly } from '../../modules/WeatherOptions/features/hourly/types';
import { WeekendForecast } from '../../modules/WeatherOptions/features/weekend/types';

interface ForecastCardProps {
  info: FiveDaysForecast | SevenDaysForecast | Hourly | WeekendForecast;
  description?: JSX.Element;
  feelsLike?: JSX.Element;
  detailsFirstColumn?: JSX.Element;
  detailsSecondColumn?: JSX.Element;
  detailsModal?: JSX.Element;
}

const ForecastCard: React.FC<ForecastCardProps> = ({
  info,
  description,
  feelsLike,
  detailsFirstColumn,
  detailsSecondColumn,
  detailsModal,
}) => {
  return (
    <Card key={info.dt} className='forecast-card'>
      <Card.Meta title={info.dt} />
      <Space className='forecast-card-description'>
        <img
          src={`http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`}
          alt='Icon'
        />
        <Space direction='vertical'>{description}</Space>
      </Space>
      <Space className='forecast-card-feels-like'>{feelsLike}</Space>
      <Space className='forecast-card-details-container'>
        <Space direction='vertical' className='forecast-card-details'>
          {detailsFirstColumn}
        </Space>
        <Space direction='vertical' className='forecast-card-details'>
          {detailsSecondColumn}
        </Space>
      </Space>
      <Space>{detailsModal}</Space>
    </Card>
  );
};

export default ForecastCard;
