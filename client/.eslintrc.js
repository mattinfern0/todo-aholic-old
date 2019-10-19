module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-else-return': 'off',
    'prefer-destructuring': 'off',
    'quotes': 'warn',
    'consistent-return': 'off',
    'no-unused-vars': 'warn',
    'import/newline-after-import': 'off',
    'object-curly-spacing': 'off',
    'space-before-blocks': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'import/prefer-default-export': 'warn',
    'no-trailing-spaces': 'warn',
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'import/named': 'off',

    'react/jsx-filename-extension': 'off',
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'warn',
    'react/sort-comp': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-curly-newline': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
  },
};
