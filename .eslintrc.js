module.exports = {
  root: true,
  env: { node: true },
  extends: ['@nekohack/eslint-config', 'plugin:vue/essential'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
