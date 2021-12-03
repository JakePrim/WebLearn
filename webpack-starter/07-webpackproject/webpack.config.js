/**
 * Webpack 的配置文件
 */
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// 通用的样式 loader
const commonStyleLoader = [
  {
    //将CSS单独打包到一个文件
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../'
    }
  },

  'css-loader',
  {
    // Run postcss actions
    loader: 'postcss-loader',
    options: {
      // `postcssOptions` is needed for postcss 8.x;
      // if you use postcss 7.x skip the key
      postcssOptions: {
        // postcss plugins, can be exported to postcss.config.js
        plugins: function () {
          return [
            require('autoprefixer')
          ];
        }
      }
    }
  },
]

// webpack 配置
module.exports = {
  // 打包模式
  mode: 'development',

  // 入口文件
  // entry: './src/index.js',
  // 多入口打包
  entry: {
    'index': './src/index.js',
    'about': './src/about.js'
  },

  // 出口配置
  output: {
    // 输出目录（输出目录必须是绝对路径）
    path: resolve(__dirname, 'output'),
    // 输出文件名称
    filename: '[name].[contenthash:8].js'
  },

  // Tree Shaking 仅支持 source-map | inline-source-map | hidden-source-map | nosources-source-map
  devtool: 'source-map',

  // 模块的解析规则
  resolve: {
    alias: {
      // 指定路径的别名
      '@': resolve('src')
    },
    // 指定引入文件的后缀名（指定之后，在引入文件时，后缀名可以省略）
    extensions: ['.js', '.json', '.less'],
    // 指定模块默认加载的路径
    modules: [resolve(__dirname, './node_modules'), 'node_modules']
  },

  // 排除打包依赖项
  externals: {
    'jquery': 'jQuery'
  },

  // 优化策略
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
  },

  // 模块配置
  module: {
    rules: [
      // 指定多个配置规则
      {
        test: /\.css$/i,
        // use 中 loader 的加载顺序：先下后上
        use: commonStyleLoader
      },

      {
        test: /\.less$/i,
        // use 中 loader 的加载顺序：先下后上
        use: [...commonStyleLoader, 'less-loader']
      },

      {
        test: /\.scss$/i,
        // use 中 loader 的加载顺序：先下后上
        use: [...commonStyleLoader, 'sass-loader']
      },

      // 处理图片
      {
        test: /\.(png|gif|jpe?g)$/i,
        // 使用资源模块
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        },
        generator: {
          filename: "image/[name][ext]"
        }
      },

      // {
      //   test: /\.(htm|html)$/i,
      //   use: {
      //     loader: 'html-loader',
      //     options: {
      //       // Webpack 4 中只需要在 url-loader 配置 esModule: false
      //       // Webpack 5 需要 html-loader 中，也配置 esModule: false
      //       esModule: false
      //     }
      //   }
      // },

      // 匹配字体文件
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        },
        generator: {
          filename: "fonts/[name][ext]"
        }
      },

      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // 第二次构建时，会读取之前的缓存
            cacheDirectory: true,
            presets: [
              [
                '@babel/preset-env', 
                { 
                  modules: false,
                  // 按需加载
                  useBuiltIns: 'usage',
                  // core-js 的版本
                  corejs: 3,
                  // targets: "defaults" 
                  // 指定兼容浏览器的版本
                  targets: {
                    chrome: '58',
                    ie: '9',
                    firefox: '60',
                    safari: '10',
                    edge: '17'
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  },

  // 开发服务器
  devServer: {
    // 指定加载内容的路径
    contentBase: resolve(__dirname, 'output'),

    // 启用 gzip 压缩
    compress: true,

    // 端口号
    port: 9527,

    // 启动自动更新（禁用 hot）
    liveReload: true,
  },

  // 配置目标
  target: "web",

  // 插件配置
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),

    // Html 的配置
    new HtmlWebpackPlugin({
      // 指定打包后的文件名称
      filename: 'index.html',

      // 用来指定，生成 HTML 的模板
      template: './src/index.ejs',
      // 指定 HTML 中使用的变量
      title: "Webpack Demo",
      // 指定要加载的打包文件
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      // 指定打包后的文件名称
      filename: 'about.html',
      // 用来指定，生成 HTML 的模板
      template: './src/index.ejs',
      // 指定 HTML 中使用的变量
      title: "关于我们",
      chunks: ['about']
    }),
    // new ESLintPlugin({
    //   // 自动解决常规的代码格式报错
    //   fix: true
    // }),
    // 直接将 src 下，不需要特殊处理的文件，直接复制到输出目录中
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/public",
          to: "public"
        }
      ]
    }),

    // 打包之前，先删除历史文件
    new CleanWebpackPlugin(),
  ]
}
