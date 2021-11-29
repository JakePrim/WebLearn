const gulp = require("gulp");

//创建gulp任务,所有的任务都是异步任务
const task1 = (done) => {
    console.log("task1 running...");

    done();
}

const task2 = (done) => {
    console.log("task2 running...")
    done();
}

//旧版声明任务的语法
gulp.task("task3", (done) => {
    console.log("task3 running...")
    done();
})

//导出任务
module.exports = {
    task1, //gulp task1
    default: task2 //默认任务：直接运行gulp 可以省略gulp task2
}