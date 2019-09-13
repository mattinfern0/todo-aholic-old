module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'prefer-destructuring': 'off',
    'quotes': 'warn',
    'consistent-return': 'off',
    'no-unused-vars': 'warn',
    'import/newline-after-import': 'off',
    'no-else-return': 'off',
  },
};
