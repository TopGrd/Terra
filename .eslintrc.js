module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  plugins: [
    "html"
  ],
  rules: {
    "semi": ["error", "never"],
  },
}
