module.exports = {
  extends: [
    '@antfu/eslint-config-vue',
  ],
  overrides: [
    {
      files: ['*.json', '*.json5', '*.jsonc'],
      rules: {
        'quote-props': 'off',
      },
    },
  ],
  rules: {
    'no-console': 'warn',
    'vue/no-unused-components': 'warn',
  },
}
