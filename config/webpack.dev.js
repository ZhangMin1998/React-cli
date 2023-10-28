

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
        use: [
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
        ]
      },
      {
        test: /\.less$/,
        use: [
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
          },
          'less-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
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
          },
          'sass-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
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
          },
          'stylus-loader'
        ]
      }
      // 处理图片
      // 处理js
    ]
  },
  plugins: []
}