export type EnvironmentName = 'development' | 'test' | 'production';

export type EnhancedLogger = {
  info: (output: unknown) => void;
  error: (output: unknown) => void;
};
