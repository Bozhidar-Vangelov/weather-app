import { FC, useState } from 'react';
import { Card, Modal, Button } from 'antd';

import { FiveDaysForecast } from './types';

interface FiveDaysDetailsProps {
  day: FiveDaysForecast;
}

const FiveDaysDetails: FC<FiveDaysDetailsProps> = ({ day }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleShow = () => {
    setShowModal(!showModal);
  };

  const handleCancel = () => {
    setShowModal(!showModal);
  };

  return (
    <Button onClick={handleShow}>
      <Modal
        key={day.dt}
        visible={showModal}
        title='Create Post'
        okText='Confirm'
        onCancel={handleCancel}
        footer={null}
      >
        <Card key={day.dt} className='forecast-card'>
          <Card.Meta title={day.dt} />
        </Card>
      </Modal>
      See details
    </Button>
  );
};

export default FiveDaysDetails;
