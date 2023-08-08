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
    'slintvue/no-deprecated-v-bind-sync': 'off',

    'no-console': 'warn',
    'vue/no-unused-components': 'warn',
  },
}
