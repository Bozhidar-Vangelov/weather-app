import { useEffect, useState } from 'react';

interface Position {
  latitude?: number;
  longitude?: number;
}

export const useLocationHook = () => {
  const [position, setPosition] = useState({} as Position);

  const success: PositionCallback = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;

    setPosition({ latitude, longitude });
  };

  const error: PositionErrorCallback = () => {
    // Set default position to Haskovo
    setPosition({ latitude: 41.9344, longitude: 25.5554 });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return position;
};
