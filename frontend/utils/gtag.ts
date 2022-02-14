import { isProduction } from '@utils/common';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

const TRACKABLE_PATH: string[] = ['/', '/documentation', '/playground', '/error', '/login'];

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url: string) => {
  if (!GA_TRACKING_ID) {
    return;
  }

  const canLogAnalytic = isProduction() && TRACKABLE_PATH.includes(url);

  if (!canLogAnalytic) {
    return;
  }

  // @ts-ignore
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const useTrackPageView = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};
