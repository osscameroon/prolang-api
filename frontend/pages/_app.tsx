import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ErrorBoundary } from 'react-error-boundary';
import MainLayout from '@components/layout/main';
import { AppError } from '@components/common/app-error';
import { GlobalSeo } from '@components/common/seo';

import 'react-toastify/dist/ReactToastify.css';
import '@styles/globals.css';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

const MyApp = ({ Component, pageProps }: AppProps) => {
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
