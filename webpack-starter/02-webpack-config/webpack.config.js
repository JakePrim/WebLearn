const {resolve} = require("path");

module.exports = {
    //环境配置
    mode:"production",
    //入口配置
    entry:"./src/index",
    //出口配置
    output:{
        path: resolve(__dirname,"dist"),
        filename: 'bundle.js'
    },
    //module配置
    module:{
        rules:[
            //规则配置
        ]
    },
    //开发服务器的配置
    devServer: {

    },
    //插件配置
    plugins:[]
}