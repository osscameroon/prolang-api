import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ErrorBoundary } from 'react-error-boundary';

import MainLayout from '@components/layout/main';
import { AppError } from '@components/common/app-error';
import { GlobalSeo } from '@components/common/seo';
import { useTrackPageView } from '@utils/gtag';

import 'react-toastify/dist/ReactToastify.css';
import '@styles/globals.css';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

if (process.env.NEXT_PUBLIC_APP_ENV === 'test' && Boolean(process.browser)) {
  const { worker } = require('../__tests__/mocks/browser');

  worker.start();
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  useTrackPageView();

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={AppError}>
          <MainLayout>
            <GlobalSeo />
            <Component {...pageProps} />
          </MainLayout>
        </ErrorBoundary>
        {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen />}
      </QueryClientProvider>
    </CookiesProvider>
  );
};

export default MyApp;
