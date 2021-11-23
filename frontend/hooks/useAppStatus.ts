import { useState, useEffect } from 'react';

export const useAppStatus = () => {
  const [status, setStatus] = useState(true);

  const changeStatus = (state: boolean) => {
    setStatus(process.env.NEXT_PUBLIC_APP_ENV === 'test' ? true : state);
  };

  useEffect(() => {
    const source = new window.EventSource(`${process.env.NEXT_PUBLIC_API_URL}/health`);

    source.addEventListener('open', () => {
      changeStatus(true);
    });

    source.addEventListener('message', (_e) => {
      changeStatus(true);
    });

    source.addEventListener('error', (_e) => {
      changeStatus(false);
    });

    return () => {
      source.close();
    };
  }, []);

  return status;
};
