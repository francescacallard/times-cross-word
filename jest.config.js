
module.exports = {
  clearMocks: true,
  verbose: true,
  roots: ['<rootDir>/src'],
  testPathIgnorePatterns: [
    '<rootDir>/dist/',
    'fixture',
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '!<rootDir>/src/index.ts',
  ],
  coverageThreshold: {
    // update these thresholds when we create more tests
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts)$",
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  preset: 'ts-jest',
  moduleNameMapper: {
    "#@/(.*)": "<rootDir>/src/$1"
  }
}