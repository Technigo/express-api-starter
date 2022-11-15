module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: 'standard',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: true
      }
    ],
    'comma-dangle': ['error', 'never'],
    'consistent-return': 'off',
    curly: 'error',
    'eol-last': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ],

    'no-alert': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-else-return': 'off',
    'no-irregular-whitespace': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1
      }
    ],
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          consistent: true
        },
        ObjectPattern: {
          multiline: true
        }
      }
    ],
    'prefer-template': 'error',
    semi: 'off'
  }
};
