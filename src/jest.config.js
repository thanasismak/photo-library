export default {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts', '!src/environments/**'],
  reporters: ['default'],
};
