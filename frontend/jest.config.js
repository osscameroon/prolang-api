module.exports = {
  'moduleNameMapper': {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },
  'transform': {
    // '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  'testMatch': [
    '**/__tests__/ui/*.(ts|tsx)'
  ],
  'setupFilesAfterEnv': [
    '<rootDir>/jest.setup.js'
  ],
  testEnvironment: 'jsdom',
  'testPathIgnorePatterns': [
    './.next/',
    './node_modules/'
  ],
  'globals': {
    'ts-jest': {
      'tsconfig': 'tsconfig.jest.json'
    }
  }
};

