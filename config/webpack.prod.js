const path = require("path")
const ESLintWebpackPlugin = require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

// 获取处理样式的Loaders
const getStyleLoaders = (proProcessor) => {
  return [
    MiniCssExtractPlugin.loader,
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
    proProcessor
  ].filter(Boolean) // 如果没有就过滤掉
}

module.exports = {
  mode: 'production',// 默认生产模式已经开启了：html 压缩和 js 压缩
  devtool: 'source-map',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js", // 动态导入输出资源命名方式
    assetModuleFilename: 'static/media/[name].[hash:8][ext]', // 图片、字体等资源命名方式（注意用hash）
    clean: true
  },
  module:{
    rules: [
      {
        oneOf: [
          // 处理css
          {
            test: /\.css$/,
            use: getStyleLoaders()
          },
          {
            test: /\.less$/,
            use: getStyleLoaders("less-loader")
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoaders("sass-loader")
          },
          {
            test: /\.styl$/,
            use: getStyleLoaders("stylus-loader")
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
            include: path.resolve(__dirname, '../src'),
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 开启babel编译缓存
              cacheCompression: false, // 缓存文件不要压缩
              // plugins: [
              //   'react-refresh/babel' // 激活js的HMR 
              // ]
              // plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积 react-app内置了
            }
          }
        ]
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
    }),
    // new ReactRefreshWebpackPlugin(), // 激活js的HMR
    new MiniCssExtractPlugin({ // 提取css成单独文件
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
    }),
    // 将public下面的资源复制到dist目录去（除了index.html）
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          toType: "dir",
          noErrorOnMissing: true, // 不生成错误
          globOptions: {
            // 忽略文件
            ignore: ["**/index.html"],
          },
          info: {
            // 跳过terser压缩js
            minimized: true,
          }
        }
      ]
    })
  ],
  optimization: {
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
    },
    // 提取runtime文件 将 hash 值单独保管在一个 runtime 文件中
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`, // runtime文件命名规则
    },
    // 压缩的操作
    minimizer:[
      new CssMinimizerPlugin(),
      new TerserPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        }
      })
    ],
  },
  // webpack解析模块加载选项
  resolve: {
    extensions: [".jsx", ".js", ".json"], // 自动补全文件扩展名，让jsx可以使用
  },
  // 开发服务器 开发环境配置 自动编译
  // devServer: {
  //   host: "localhost", // 启动服务器域名
  //   port: "3001", // 启动服务器端口号
  //   open: true, // 是否自动打开浏览器
  //   hot: true, // HMR
  //   historyApiFallback: true, // 解决前端路由404问题
  // }
}