//生产环境配置文件

const { merge } = require("webpack-merge");

const baseWebpackConfig = require("./webpack.base.conf");

const HTMLWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const webpack = require("webpack");

const prodWebpackConfig = merge(baseWebpackConfig, {
  //这里是生产模式对应的配置
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      //生成环境下的接口地址
      API_BASE_URL: JSON.stringify("http://apiprod.example.com"),
    }),
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
    //压缩CSS
    new CssMinimizerPlugin(),
  ],
});

//导出开发配置
module.exports = prodWebpackConfig;
