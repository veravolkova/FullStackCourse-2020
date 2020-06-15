module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    //'airbnb',
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
  settings: {
    "react": {
      "version": "detect"
    }
  },
  rules: {
    'indent': [
        'warn',
        2
    ],    
    'quotes': [
        'warn',
        'single'
    ],
    'semi': [
        'warn',
        'never'
    ],
    'eqeqeq': 'warn',
    'no-trailing-spaces': 'warn',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-console': 0,
    "linebreak-style": 0, 
    "react/prop-types": 0,
    'object-curly-spacing': [
    'warn', 'always'
    ],
    'arrow-spacing': [
    'warn', { 'before': true, 'after': true }
    ],      
  },
};
