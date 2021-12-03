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
    port: 3002,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),

    new Mfp({
      //导入模块
      remotes:{
        //导入别名:'远程应用名称@远程应用地址/远程导出文件的名称'
        appone:'app1@http://localhost:3001/app1.js'
      }
    }),
  ],
};
