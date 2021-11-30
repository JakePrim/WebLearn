const {src, dest, parallel, series, watch} = require("gulp");

const less = require("gulp-less");
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const del = require("del");
const browserSync = require("browser-sync");
const bs = browserSync.create();//创建一个服务

//构建样式
const style = () => {
    return src("src/styles/main.less", {base: 'src'})
        //注意pipe的执行顺序：从上到下按序执行
        .pipe(less())//转换less为css
        .pipe(autoprefixer())//兼容css hack
        .pipe(cleanCss())//压缩css文件
        .pipe(rename({"extname": ".min.css"}))//重命名css文件
        .pipe(dest("dist"))//将文件放到dist目录下
}

//构建脚本任务
const script = () => {
    return src("src/js/main.js", {base: 'src'})//base 保持src下的目录结构
        .pipe(babel({
            presets: ['babel-preset-env']
        }))//babel 转换ES6+语法 如果是babel6 的版本 @babel/env改为babel-preset-env
        .pipe(uglify())//压缩js代码
        .pipe(rename({"extname": ".min.js"}))//重命名js文件
        .pipe(dest("dist"))
}

//构建HTML任务
const html = () => {
    return src("src/index.html", {base: 'src'})
        .pipe(htmlmin({
            collapseWhitespace: true,//折叠空白
            minifyCSS: true,//压缩HTML内的css
            minifyJS: true,//压缩HTML内的js代码
        }))//压缩HTML
        .pipe(dest("dist"))
}

//文件清除任务
const clean = () => {
    return del(['dist']);
}

//声明图片构建任务
const image = () => {
    return src("src/images/**", {base: 'src'})
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),//压缩gif
            imagemin.optipng({optimizationLevel: 5}),//压缩png图片
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            }),//压缩svg
            imagemin.mozjpeg({quality: 75, progressive: true})//压缩JPG图片
        ]))//默认为无损压缩
        .pipe(dest("dist"))
}

//服务发布任务
const serve = () => {
    //监视文件的变化,并执行的任务,当index.html发生变化，会重新构建HTML，这时候dist发生变化，重启服务
    watch("src/index.html", html);
    watch("src/styles/*.less", style);
    watch("src/js/*.js", script);
    //初始化服务
    bs.init({
        notify: false,//禁用浏览器右上角的browserSync提示框
        files: 'dist/**',//监视dist下的文件变化，然后在浏览器上实时更新
        server: {
            baseDir: './dist',//指定服务启动的目录
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    })
}

//组合任务 并行执行
const build = parallel(style, script, html, image);

//串行执行 先清空文件，在构建,然后发布服务
const dev = series(clean, build, serve)


module.exports = {
    build,
    dev,
    serve
}