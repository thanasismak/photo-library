export default {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transform: {
    '^.+\\.(ts|js|html)$': [
      'jest-preset-angular',
      {
        stringifyContentPathRegex: '\\.html$',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  testEnvironment: 'jsdom',
};
