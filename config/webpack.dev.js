const path = require("path")
const ESLintWebpackPlugin = require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

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
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: '.src/main.js',
  output: {
    path: undefined,
    filename: 'static/js/[name].js',
    chunkFilename: "static/js/[name].chunk.js", // 动态导入输出资源命名方式
    assetModuleFilename: 'static/media/[name].[hash:8][ext]', // 图片、字体等资源命名方式（注意用hash）
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
      },
      // 处理图片
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
          }
        }
      },
      // 处理字体图标资源等其他资源
      {
        test: /\.(ttf|woff2?|map4|map3|avi)$/,
        type: "asset/resource",
        // generator: {
        //   filename: "static/media/[hash:8][ext][query]",
        // },
      },
      // 处理js
      {
        test: /\.jsx?$/, // js jsx
        // exclude: /node_modules/, // 排除node_modules代码不编译
        include: path(__dirname, '../src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true, // 开启babel编译缓存
          cacheCompression: false, // 缓存文件不要压缩
          // plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积 react-app内置了
        }
      }
    ]
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, '../src'),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      )
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    })
  ]
}