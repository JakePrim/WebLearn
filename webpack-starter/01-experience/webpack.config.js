/**
 * webpack的配置文件
 */
const {resolve} = require("path");

module.exports = {
    //打包模式
    mode: "production",
    //入口文件
    entry: './src/index.js',
    //出口配置
    output: {
        //输出目录
        path: resolve(__dirname, "dist"),
        //输出文件的名称
        filename: 'bundle.js'
    },

    //模块配置
    module: {
        rules: [
            //指定多个配置规则
        ]
    },
    //插件的配置
    plugins: [

    ],

    //开发服务器
    devServer: {

    }
}