const { resolve } = require("path");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//引入模块联邦插件
const Mfp = require("webpack").container.ModuleFederationPlugin;
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3001,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    //模块提供方
    new Mfp({
      //应用名称
      name: 'app1',
      //调用方引入的文件名称
      filename: 'app1.js',
      //暴露模块
      exposes:{
        //指定模块的名称 以及模块对应的代码路径
        './Sitename':'./src/Sitename.js'
      }
    }),
  ],
};
