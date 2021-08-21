export type EnvironmentName = 'development' | 'test' | 'production';

export type EnhancedLogger = {
  error: (output: unknown) => void;
  info: (output: unknown) => void;
};
