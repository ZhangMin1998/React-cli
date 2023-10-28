
// 获取处理样式的Loaders
const getStyleLoaders = (proProcessor) => {
  return [
    'style-loader',
    'css-loader',
    {
      // 配合.browserslistrc来指定兼容程度
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      }
    }
  ].filter(Boolean) // 如果没有就过滤掉
}

module.exports = {
  entry: '.src/main.js',
  output: {
    path: undefined,
    filename: 'static/js/[name].js',
    chunkFilename: "static/js/[name].chunk.js",
    assetModuleFilename: "static/js/[hash:8][ext][query]"
  },
  module:{
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: getStyleLoaders()
      },
      {
        test: /\.less$/,
        use: getStyleLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders('sass-loader')
      },
      {
        test: /\.styl$/,
        use: getStyleLoaders('stylus-loader')
      }
      // 处理图片
      // 处理js
    ]
  },
  plugins: []
}