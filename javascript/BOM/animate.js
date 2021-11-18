/**
 *
 * @param el 元素对象
 * @param property 结束位置以对象数据方式传递
 * @param duration 总时间
 */
function animate(el, property, duration) {
    //拿到某个元素的样式的初始属性
    let start = {};
    //通过property拿到初始属性
    for (const key in property) {
        //key样式的属性名,然后将属性值进行设置 一般属性值是数字
        start[key] = parseFloat(window.getComputedStyle(el)[key]);
    }
    // console.log(start);
    //时间间隔
    let interval = 50;
    //总次数
    let maxCount = duration / interval;
    //次数累加器
    let count = 0;
    //计算每个属性的步长，需要放到一个对象中
    let step = {};
    for (const key in start) {
        step[key] = (property[key] - start[key]) / maxCount;
    }
    console.log(step);
    let timer = null;//定时器引用
    timer = setInterval(function () {
        count++;
        //累加start
        for (const key in start) {
            start[key] += step[key];
        }
        if (count >= maxCount) {
            //拉终停表
            for (const startKey in start) {
                start[startKey] = property[startKey];
            }
            clearInterval(timer);
        }
        //赋值对应的属性
        for (const startKey in start) {
            //如果是不透明度属性不要加px单位
            if (startKey === "opacity") {
                el.style[startKey] = start[startKey];
            } else {
                el.style[startKey] = start[startKey] + "px";
            }
        }
    }, interval);
}