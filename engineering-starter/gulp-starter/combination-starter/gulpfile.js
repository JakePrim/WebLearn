//引入gulp
const gulp = require("gulp");

const task1 = (done) => {
    setTimeout(() => {
        console.log("Task1 is running...");
        done();//任务结束的回调
    }, 1000);
}

const task2 = (done) => {
    setTimeout(() => {
        console.log("Task2 is running...");
        done();//任务结束的回调
    }, 1000);
}

const task3 = (done) => {
    setTimeout(() => {
        console.log("Task3 is running...");
        done();//任务结束的回调
    }, 1000);
}

//任务并行执
exports.p = gulp.parallel(task1, task2, task3);
exports.s = gulp.series(task2, gulp.parallel(task1, task3));