// Note: All paths are relative to the directory in which eslint is being run, rather than the directory where this file
// lives

// ESLint config docs: https://eslint.org/docs/user-guide/configuring/

module.exports = {
  extends: ['../../.eslintrc.js'],
  ignorePatterns: ['rollup.config.worker.js'],
  overrides: [
    {
      files: ['worker/**/*.ts'],
      parserOptions: {
        // TODO: figure out if we need a worker-specific tsconfig
        project: ['tsconfig.worker.json'],
      },
    },
    {
      files: ['src/worker/**/*.js'],
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      rules: {
        // TODO (high-prio): Re-enable this after migration
        '@typescript-eslint/explicit-member-accessibility': 'off',
        // TODO (high-prio): Remove this exception from naming convention after migration
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'memberLike',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'memberLike',
            modifiers: ['protected'],
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
        ],
        // TODO (high-prio): Re-enable this after migration
        '@sentry-internal/sdk/no-async-await': 'off',
        // TODO (medium-prio): Re-enable this after migration
        'jsdoc/require-jsdoc': 'off',
      },
    },
    {
      files: ['jest.setup.ts', 'jest.config.ts'],
      parserOptions: {
        project: ['tsconfig.test.json'],
      },
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['test/**/*.ts'],

      rules: {
        // most of these errors come from `new Promise(process.nextTick)`
        '@typescript-eslint/unbound-method': 'off',
        // TODO: decide if we want to enable this again after the migration
        // We can take the freedom to be a bit more lenient with tests
        '@typescript-eslint/no-floating-promises': 'off',
      },
    },
  ],
};