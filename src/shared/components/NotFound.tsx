import { Empty } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const NotFound = () => {
  return (
    <Empty
      image={<FontAwesomeIcon icon={solid('map-location-dot')} />}
      description='Location not found.
    Search must be in the form of "City", "City, State" or "City, Country".'
      className={'not-found'}
    />
  );
};

export default NotFound;
