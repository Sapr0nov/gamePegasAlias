export default {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  testEnvironment: 'jsdom',
  transform: {
    'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
  moduleNameMapper: {
    '\\.(css|scss|png|svg|jpg)$': '<rootDir>/style.test.ts',
    '^axios$': '<rootDir>/src/mocks/test.axios.ts',
  },
}
