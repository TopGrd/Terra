module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  plugins: [
    "html"
  ],
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/vue.config.js'
      }
    }
  },
  rules: {
    "semi": ["error", "never"],
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
}
