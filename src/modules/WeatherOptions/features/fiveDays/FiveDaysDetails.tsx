import { FC, useState } from 'react';
import { Modal, Button, Space } from 'antd';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FiveDaysForecast } from './types';
import ForecastCard from '../../../../shared/components/ForecastCard';

interface FiveDaysDetailsProps {
  day: FiveDaysForecast;
}

const FiveDaysDetails: FC<FiveDaysDetailsProps> = ({ day }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleShow = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button onClick={handleShow} className='show-modal-button'>
        <Space>
          <FontAwesomeIcon icon={solid('cloud-sun')} />
        </Space>
        See details
      </Button>
      <Modal
        key={day.dt}
        visible={showModal}
        title={day.dt}
        okText='Confirm'
        onCancel={handleShow}
        footer={null}
      >
        <Space className='forecast-container'>
          {day.hourly.map((hour) => (
            <ForecastCard
              info={hour}
              description={
                <Space direction='vertical'>
                  {`${hour.weather[0].description} ${hour.main.temp}°C`}
                </Space>
              }
              feelsLike={
                <Space className='forecast-card-feels-like'>
                  Feels Like {`${hour.main.feels_like}°C`}
                </Space>
              }
              detailsFirstColumn={
                <>
                  <Space>
                    <FontAwesomeIcon icon={solid('cloud-rain')} />
                    {`${hour.pop}%`}
                  </Space>
                  <Space>
                    <FontAwesomeIcon icon={solid('wind')} />
                    {`${hour.wind.speed} m/s`}
                  </Space>
                </>
              }
              detailsSecondColumn={
                <>
                  <Space>
                    <FontAwesomeIcon icon={solid('droplet')} />
                    {`${hour.main.humidity}%`}
                  </Space>
                  <Space>
                    <FontAwesomeIcon icon={solid('stopwatch')} />
                    {`${hour.main.pressure} hPa`}
                  </Space>
                </>
              }
            />
          ))}
        </Space>
      </Modal>
    </>
  );
};

export default FiveDaysDetails;
