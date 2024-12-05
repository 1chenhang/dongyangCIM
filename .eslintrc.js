module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    Cesium: true, // 这里添加变量名称不会报错
    config: true,
    viewer: true,
    Sketch: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'dot-notation': 'off', // 对象命名规则
    'vue/multi-word-component-names': 'off' // 关闭组件命名规则
  }
}
