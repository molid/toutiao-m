module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'space-before-function-paren': 0,
    'no-useless-escape': 'off',
    // 配置camelcase选项
    camelcase: [0, { properties: 'always' }],
    'no-unused-vars': 'warn',
    'vue/no-unused-vars': 'off'
  }
}
