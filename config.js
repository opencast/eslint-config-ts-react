


module.exports = {
  // Use TS parser for everything. Also configure it to get type information
  // from TS as it enables better lints.
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  plugins: ['@typescript-eslint'],

  // Use recommended configs
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],

  'settings': {
    'react': {
      'version': 'detect',
    },
  },

  // Specify rules.
  //
  // Regarding 'warn' vs 'error': we think almost everything here should just
  // be a warning. In many situations (e.g. webpack-dev-server), errors are
  // presented to the dev more directly and annoyingly than warnings. It is
  // important that the linter does not unnecessarily disrupt the dev
  // workflow. For example, an unused variable shouldn't lead to a big popup
  // over your web app every time; unused variables exist temporarily during
  // development all the time. So nothing that can just happen temporarily
  // during development should be an error. We expect all downstream projects
  // to fail CI if any lint warning is produced anyway, and that's the
  // important thing here.
  rules: {
    // ----- Disabling some rules ---------------------------------------------

    // Using emotion.js and a proper config, the JSX factory and the `css` prop
    // just come out of nowhere, so let's tell ESLint not to complain about
    // it.
    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': ['error', { 'ignore': ['css'] }],

    // We don't use prop types, TypeScript fills that role for us.
    'react/prop-types': 'off',

    // Would warn about anonymous functions definining components as React uses
    // that for debugging. But not that important for us.
    'react/display-name': 'off',

    // The reasoning is that empty functions can be a sign of bug and are weird
    // enough to at least warrent a comment. But the comment could be a few
    // lines above and sometimes the purpose of the empty function (usually as
    // default) is evident from context.
    '@typescript-eslint/no-empty-function': 'off',


    // ----- Style rules ------------------------------------------------------

    // Basic style/file properties
    'eol-last': ['warn', 'always'],
    'linebreak-style': ['warn', 'unix'],
    'max-len': ['warn', { 'code': 120, 'ignoreUrls': true }],
    'no-trailing-spaces': 'warn',

    // Indentation
    'no-tabs': 'error',
    'indent': ['warn', 2, { 'SwitchCase': 1, 'MemberExpression': 'off' }],

    // Spacing
    'arrow-spacing': 'warn',
    'block-spacing': ['warn', 'always'],
    'comma-spacing': 'warn',
    'func-call-spacing': ['warn', 'never'],
    'keyword-spacing': 'warn',
    'no-multi-spaces': ['warn', { 'ignoreEOLComments': true }],
    'object-curly-spacing': ['warn', 'always'],
    'react/jsx-curly-spacing': 'warn',
    'semi-spacing': 'warn',
    'space-before-blocks': 'warn',
    'space-before-function-paren': ['warn', 'never'],
    'space-in-parens': 'warn',
    'space-infix-ops': 'warn',

    // Other style
    'arrow-parens': ['warn', 'as-needed'],
    'brace-style': ['warn', '1tbs', { 'allowSingleLine': true }],
    'comma-dangle': ['warn', 'only-multiline'],
    'comma-style': 'warn',
    'curly': 'warn',
    'jsx-quotes': ['warn', 'prefer-double'],
    'quotes': ['warn', 'single', { 'avoidEscape': true }],
    'react/jsx-pascal-case': 'off',
    'semi': ['warn', 'always'],


    // ----- Other rules ------------------------------------------------------
    'no-unused-expressions': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', {
      args: 'all',
      varsIgnorePattern: '^_',
      argsIgnorePattern: '^_',
      caughtErrors: 'all',
      caughtErrorsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    }],
  },
};
