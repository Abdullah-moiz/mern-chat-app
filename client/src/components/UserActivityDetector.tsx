import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserIsOnline } from '../slices/chatSlice';
import { socket } from '../App';

const UserActivityDetector: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Handler for visibility change event
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // User is active
        dispatch(setUserIsOnline(true));
        socket.emit('userActive');
      } else {
        // User is inactive
        dispatch(setUserIsOnline(false));
        socket.emit('userInactive');
      }
    };

    // Add event listener for visibility change
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dispatch]);

  return <></>;
};

export default UserActivityDetector;
