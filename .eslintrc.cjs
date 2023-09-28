module.exports = {
    env: {
      browser: true,
      es2021: true
    },
    extends: [
      'plugin:vue/essential',
      'standard',
      'prettier' 
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      parser: '@typescript-eslint/parser',
      sourceType: 'module'
    },
    plugins: [
      'vue',
      '@typescript-eslint'
    ],
    rules: {
      'vue/no-multiple-template-root': 0,
      'no-unused-vars': [
        'error',
        // we are only using this rule to check for unused arguments since TS
        // catches unused variables but not args.
        { varsIgnorePattern: '.*', args: 'none' }
      ]
    }
  }
  