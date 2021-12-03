const { resolve } = require("path");
const path = require("path");

//引入插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//区分环境配置
module.exports = (env, argv) => {
  const config = {
    mode: "development",
    entry: "./src/index.js",
    output: {
      path: resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    //开发服务器
    devServer: {
      //指定加载内容的路径
      //contentBase 已经弃用了
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true, //启动gzip压缩
      port: 9200, //指定端口号
      //热更新 hot:true webpack4
      //webpack5  liveReload 禁用hot
      liveReload: true,

      //配置代理 解决接口跨域问题
      proxy: {
        "/api": {
          //http://localhost:9200/api/users 实际上访问的是target的接口https://api/github.com/api/users
          //指向的内容
          target: "https://api.github.com",
          pathRewrite: {
            "^/api:": "", //当匹配到/api将/api设置为"" https://api/github.com/api/users -> https://api/github.com/users
          },
          //不能使用localhost:9200作为github的主机名
          changeOrigin: true,
        },
      },
    },
    //配置目标
    target: "web", //热更新只适用于web
    //模块配置
    module: {
      rules: [
        //配置js
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    //运行环境
                    // targets: "defaults", 允许手动指定兼容浏览器的版本
                    targets: {
                      chrome: "58",
                      ie: "9",
                      firefox: "60",
                      safari: "10",
                      edge: "17",
                    },
                    //core-js版本
                    corejs: 3,
                    //按需加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
        },
        //指定多个配置规则
        {
          test: /\.css$/i,
          //use中loader的加载顺序，css-loader:先将css输出到js，style-loader然后将js中的样式挂载到<style>中
          use: [
            // "style-loader",
            // MiniCssExtractPlugin.loader, //将CSS打包到独立的文件中
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: "../", //处理CSS中的图片路径失败的问题
              },
            },
            //2. 将样式文件输出到js中
            // "css-loader",
            {
              loader: "css-loader",
              options: {
                esModule: false,
              },
            },
            //1. 通过postcss-loader给样式属性添加浏览器前缀，css hack
            "postcss-loader",
          ],
        },
        {
          test: /\.less$/i,
          use: [
            // "style-loader",
            //4. 将css打包成独立的文件
            // MiniCssExtractPlugin.loader,
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: "../",
              },
            },
            //3. css样式文件输出到js中
            // "css-loader",
            {
              loader: "css-loader",
              options: {
                esModule: false,
              },
            },
            //2. css hack
            "postcss-loader",
            //1. 将less转成普通的css
            "less-loader",
          ],
        },
        //处理图片
        {
          test: /\.(png|gif|jpe?g)$/i,
          // use: {
          //   loader: "url-loader",
          //   options: {
          //     //指定图片大小 小于该数值的图片会被转成base64
          //     limit: 8 * 1024, //8KB
          //     //设置图片的位置，[name]是图片原来的名称，[ext]是图片原来的后缀名
          //     name: "image/[name].[ext]",
          //     esModule: false,
          //   },
          // },
          type: "asset", //asset可以在asset/resource(文件大于8KB) 和 asset/inline(文件小于8KB) 之间进行选择
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024, //默认是8KB 可以指定大小
            },
          },
          generator: {
            filename: "image/[name][ext]",
          },
        },
        //html-loader
        {
          test: /\.htm|html$/i,
          use: {
            loader: "html-loader",
            //url-loader 默认采用ES Module规范进行解析，但是html-loader引入图片使用的是CommonJS规范
            //关闭url-loader默认的ES Modules规范，强制url-loader使用CommonJS规范进行打包
            options: {
              //如果是webpack4 只需要url-loader配置ESmodules false,webpack5 需要在HTML-loader中也需要进行配置
              esModule: false,
            },
          },
        },
        //处理字体文件
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/i,
          // use: {
          //   loader: "file-loader",
          //   options: {
          //     name: "fonts/[name].[ext]",
          //   },
          // },
          //使用资源模块 处理字体文件
          type: "asset", //asset可以在asset/resource(文件大于8KB) 和 asset/inline(文件小于8KB) 之间进行选择
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024, //默认是8KB 可以指定大小
            },
          },
          generator: {
            filename: "fonts/[name][ext]",
          },
        },
      ],
    },
    plugins: [
      //CSS独立打包
      new MiniCssExtractPlugin({
        filename: "css/[name].css", //将css文件命名或指定文件目录
      }), //实例化插件
      //校验样式格式
      new StyleLintPlugin({
        //指定要校验格式的目标文件
        files: ["src/css/*.{css,less,sass,scss}"],
      }),
      //校验js的格式
      new ESLintWebpackPlugin({
        //自动解决常规的代码格式错误
        fix: true,
      }),
      //压缩CSS
      // new CssMinimizerPlugin(),
      //HTML配置
      new HTMLWebpackPlugin({
        //指定打包后的文件名称
        filename: "index.html",
        //用来指定生成HTML模板 默认使用ejs的模板引擎
        template: "./src/index.ejs",
        //指定一些变量
        title: "Webpack Demo",
      }),
      //打包多个HTML,设置多个plugin
      new HTMLWebpackPlugin({
        filename: "about.html",
        template: "./src/index.ejs",
        title: "关于我们",
      }),
      //直接将src下不需要特殊处理的文件，直接复制到输出目录中
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/public",
            to: "public", //输出目录下的public
          },
        ],
      }),
      //打包之前的清除工作
      new CleanWebpackPlugin(),
    ],
  };

  //判断当前是否是生产环境打包
  if (env.production) {
    config.mode = "production";
    config.plugins = [
      //CSS独立打包
      new MiniCssExtractPlugin({
        filename: "css/[name].css", //将css文件命名或指定文件目录
      }), //实例化插件
      //校验样式格式
      new StyleLintPlugin({
        //指定要校验格式的目标文件
        files: ["src/css/*.{css,less,sass,scss}"],
      }),
      //校验js的格式
      new ESLintWebpackPlugin({
        //自动解决常规的代码格式错误
        fix: true,
      }),
      //压缩CSS
      new CssMinimizerPlugin(),
      //HTML配置
      new HTMLWebpackPlugin({
        //指定打包后的文件名称
        filename: "index.html",
        //用来指定生成HTML模板 默认使用ejs的模板引擎
        template: "./src/index.ejs",
        //指定一些变量
        title: "Webpack Demo",
        minify: {
          collapseWhitespace: true,
          keepClosingSlash: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      }),
      //打包多个HTML,设置多个plugin
      new HTMLWebpackPlugin({
        filename: "about.html",
        template: "./src/index.ejs",
        title: "关于我们",
        //压缩HTML
        minify: {
          collapseWhitespace: true,
          keepClosingSlash: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      }),
      //直接将src下不需要特殊处理的文件，直接复制到输出目录中
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/public",
            to: "public", //输出目录下的public
          },
        ],
      }),
      //打包之前的清除工作
      new CleanWebpackPlugin(),
    ];
  }
  return config;
};
