import { useState, useEffect } from 'react';

export const useAppStatus = () => {
  const [status, setStatus] = useState(true);

  useEffect(() => {
    const source = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/health`);

    source.addEventListener('open', () => {
      setStatus(true);
    });

    source.addEventListener('message', (_e) => {
      setStatus(true);
    });

    source.addEventListener('error', (_e) => {
      setStatus(false);
    });

    return () => {
      source.close();
    };
  }, []);

  return status;
};
