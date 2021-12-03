//开发环境配置文件

const { merge } = require("webpack-merge");

const baseWebpackConfig = require("./webpack.base.conf");

const HTMLWebpackPlugin = require("html-webpack-plugin");

const webpack = require("webpack");

const devWebpackConfig = merge(baseWebpackConfig, {
  //这里是开发模式对应的配置
  mode: "development",
  plugins: [
    new webpack.DefinePlugin({
      //开发环境下的接口地址 变量后面的值是一段代码片段而不是字符串
      API_BASE_URL: JSON.stringify("http://apidev.example.com"),
    }),
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
  ],
});

//导出开发配置
module.exports = devWebpackConfig;
