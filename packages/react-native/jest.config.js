const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'react-native',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*{c,C}onstants.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 16,
      functions: 9,
      lines: 16,
      statements: 16,
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  moduleDirectories: [
    'node_modules',
    '<rootDir>/node_modules',
    // TODO: not 100% sure this is needed, but might be when importing from ui-react-core
    '<rootDir>/packages',
  ],
};
