export type EnvironmentName = 'development' | 'test' | 'production';

export type EnhancedLogger = {
  error: (output: unknown, logToSentry?: boolean) => void;
  info: (output: unknown) => void;
};
