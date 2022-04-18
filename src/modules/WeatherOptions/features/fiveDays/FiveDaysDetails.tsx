import { FC, useState } from 'react';
import { Card, Modal, Button, Space } from 'antd';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FiveDaysForecast } from './types';

interface FiveDaysDetailsProps {
  day: FiveDaysForecast;
}

const FiveDaysDetails: FC<FiveDaysDetailsProps> = ({ day }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleShow = () => {
    setShowModal(!showModal);

    console.log('show');
  };

  const handleCancel = () => {
    setShowModal(!showModal);

    console.log('cancel');
  };

  return (
    <>
      <Button onClick={handleShow}>See details</Button>
      <Modal
        key={day.dt}
        visible={showModal}
        title={day.dt}
        okText='Confirm'
        onCancel={handleCancel}
        footer={null}
      >
        <Space className='forecast-container'>
          {day.hourly.map((hour) => (
            <Card key={day.dt} className='forecast-card'>
              <Card.Meta title={hour.dt} />
              <Space className='forecast-card-description'>
                <img
                  src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                  alt='Icon'
                />
                <Space direction='vertical'>
                  {`${hour.weather[0].description} ${hour.main.temp}°C`}
                </Space>
              </Space>
              <Space className='forecast-card-feels-like'>
                Feels Like {`${hour.main.feels_like}°C`}
              </Space>
              <Space className='forecast-card-details-container'>
                <Space direction='vertical' className='forecast-card-details'>
                  <Space>
                    <FontAwesomeIcon icon={solid('cloud-rain')} />
                    {`${hour.pop}%`}
                  </Space>
                  <Space>
                    <FontAwesomeIcon icon={solid('wind')} />
                    {`${hour.wind.speed} m/s`}
                  </Space>
                </Space>
                <Space direction='vertical' className='forecast-card-details'>
                  <Space>
                    <FontAwesomeIcon icon={solid('droplet')} />
                    {`${hour.main.humidity}%`}
                  </Space>
                  <Space>
                    <FontAwesomeIcon icon={solid('stopwatch')} />
                    {`${hour.main.pressure} hPa`}
                  </Space>
                </Space>
              </Space>
            </Card>
          ))}
        </Space>
      </Modal>
    </>
  );
};

export default FiveDaysDetails;
