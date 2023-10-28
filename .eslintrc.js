module.exports = {
  // 继承 Eslint 规则
  extends: [
    "react-app", // 继承 react 官方规则
    // "eslint:recommended"
  ],
  // env: {
  //   node: true, // 启用node中全局变量
  //   browser: true, // 启用浏览器中全局变量
  // },
  // 解析选项
  parserOptions: {
    babelOptions: {
      presets: [
        // 解决页面报错问题
        ["babel-preset-react-app", false],
        "babel-preset-react-app/prod",
      ],
    },
    // ecmaVersion: 6, // es6
    // sourceType: "module", // es module
  },
  // 具体检查规则
  //  "off" 或 0 - 关闭规则
  // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  rules: {
    "no-var": 2, // 不能使用 var 定义变量
    semi: ['error', 'never']
  }
}
