const {src, dest} = require("gulp");

const less = require("gulp-less");
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");

const style = () => {
    return src("src/styles/main.less", {base: 'src'})
        //注意pipe的执行顺序：从上到下按序执行
        .pipe(less())//转换less为css
        .pipe(autoprefixer())//兼容css hack
        .pipe(cleanCss())//压缩css文件
        .pipe(rename({"extname": ".min.css"}))//重命名css文件
        .pipe(dest("dist"))//将文件放到dist目录下
}

module.exports = {
    style
}