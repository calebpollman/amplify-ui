module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['eslint:recommended'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    requireConfigFile: false,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-undef': 'off',
  },
};
