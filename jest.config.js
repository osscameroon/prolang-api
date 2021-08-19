module.exports = {
  roots: ['.'],
  /*transform: {
    '^.+\\.ts?$': 'ts-jest',
  },*/
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec|test).[jt]s'],
  testEnvironment: 'node',
  clearMocks: true,
  maxWorkers: 1,
};
