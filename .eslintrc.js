module.exports = {
  root: true,
  env: { node: true },
  extends: ['plugin:vue/essential'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: ['error', 4],
    quotes: [2, 'single'],
    'linebreak-style': [2, 'unix'],
    semi: [0, 'never'],
    'no-unused-vars': 0
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
