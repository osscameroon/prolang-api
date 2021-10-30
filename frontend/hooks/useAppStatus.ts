import { useState, useEffect } from 'react';
import axios from 'axios';
import { noop } from '@utils/common';

const fetchStatus = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/health`).catch(() => noop());

  return response?.status === 200;
};

export const useAppStatus = () => {
  const [status, setStatus] = useState(true);

  const updateStatus = async () => {
    const appStatus = await fetchStatus();

    setStatus(appStatus);
  };

  useEffect(() => {
    updateStatus();

    const id = setInterval(updateStatus, 5000);

    return () => clearInterval(id);
  }, []);

  return status;
};
