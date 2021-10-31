import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ErrorBoundary } from 'react-error-boundary';

import MainLayout from '@components/layout/main';
import { AppError } from '@components/common/app-error';
import { GlobalSeo } from '@components/common/seo';
import { pageView } from '@utils/gtag';

import 'react-toastify/dist/ReactToastify.css';
import '@styles/globals.css';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

if (process.env.NODE_ENV === 'development' && Boolean(process.browser)) {
  const { worker } = require('../cypress/mocks/browser');

  worker.start();
}

const MyApp = ({ Component, pageProps }: AppProps) => {
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

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={AppError}>
          <MainLayout>
            <GlobalSeo />
            <Component {...pageProps} />
          </MainLayout>
        </ErrorBoundary>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </CookiesProvider>
  );
};

export default MyApp;
