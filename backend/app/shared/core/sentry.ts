import * as Sentry from '@sentry/node';
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Tracing from '@sentry/tracing';
import { SENTRY_DSN } from './config';

Sentry.init({
  dsn: SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const logErrorToSentry = (e: any) => {
  Sentry.captureException(e);
};

export { Sentry, logErrorToSentry };
