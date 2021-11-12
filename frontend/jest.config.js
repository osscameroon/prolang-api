module.exports = {
  'moduleNameMapper': {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^@typings/(.*)$': '<rootDir>/typings/$1',
  },
  'transform': {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  'testMatch': [
    '**/__tests__/ui/**/*.(ts|tsx)'
  ],
  'setupFilesAfterEnv': [
    '<rootDir>/jest.setup.ts'
  ],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    './.next/',
    './node_modules/'
  ],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
};

