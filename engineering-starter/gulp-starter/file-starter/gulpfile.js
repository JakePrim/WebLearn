const gulp = require("gulp");
const {src, dest} = require("gulp");//解构对象

//声明gulp任务
const style = () => {
    //流就是异步操作
    return src("src/styles/main.less", {base: "src"})//源文件 base目录结构和src保持一致
        .pipe(dest("dist"));//目标目录
}

module.exports = {
    style
}