// 制作一个工具对象内部添加多种工具方法
let tools = {
    // 获取返回的随机整数
    getRandom: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;//含最大值、最小值
    },
    //获取随机颜色
    getColor: function () {
        //r g b 三个色值的颜色随机获取0-255
        let r = this.getRandom(0, 255);
        let g = this.getRandom(0, 255);
        let b = this.getRandom(0, 255);
        //返回一个颜色值
        return `rgb(${r},${g},${b})`;
    }
}