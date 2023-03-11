module.exports = {
  roots: ['.'],
  moduleNameMapper: {
    '@test/(.*)': '<rootDir>/test/$1',
    '@api/(.*)': '<rootDir>/src/api/$1',
    '@application/(.*)': '<rootDir>/src/application/$1',
    '@domain/(.*)': '<rootDir>/src/domain/$1',
    '@infra/(.*)': '<rootDir>/src/infra/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  coveragePathIgnorePatterns: ['dist', 'src/infra', 'app.module.ts', 'main.ts'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  coverageReporters: ['json-summary', 'text', 'lcov'],
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 75,
      functions: 75,
      lines: 75,
    },
  },
  collectCoverageFrom: [
    '<rootDir>/src/application/**/*.{js,ts}',
    '<rootDir>/src/api/**/*.{js,ts}',
    '<rootDir>/src/domain/**/*.{js,ts}',
  ],
};
