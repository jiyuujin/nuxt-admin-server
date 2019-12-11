module.exports = {
  root: true,
  env: { node: true, es6: true },
  extends: ['@nekohack/eslint-config'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  }
}
