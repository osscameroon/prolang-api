import { useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';

const useRedirectToPath = (path: string) => {
  const router = useRouter();

  useEffect(() => {
    router.push(path);
  }, [path, router]);
};

const Redirect = ({ path }: { path: string }) => {
  useRedirectToPath(path);

  return <></>;
};

export { Redirect };
