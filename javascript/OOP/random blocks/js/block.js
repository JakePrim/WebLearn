/**
 * 方块对象
 * @param {*} option
 */
function Block(parent, option) {
    //初始化
    option = option || {};
    this.parent = parent;
    this.width = option.width || 20;
    this.height = option.height || 20;
    this.backgroundColor = option.backgroundColor || "red";
    this.x = option.x || 0;
    this.y = option.y || 0;
}

//随机生成方块，并进行渲染
Block.prototype.render = function () {
    // 创建一个新的元素作为方块
    this.ele = document.createElement("div");
    // 添加到指定的父级
    if (this.parent != null) {
        this.parent.appendChild(this.ele);
        this.ele.style.width = this.width + "px";
        this.ele.style.height = this.height + "px";
        this.ele.style.backgroundColor = this.backgroundColor;
        this.ele.style.left = this.x + "px";
        this.ele.style.top = this.y + "px";
    }
}

Block.prototype.positionRandom = function () {
    //获取元素的坐标
    //this.parent.clientWidth / this.width - 1 得到了几份元素
    this.x = tools.getRandom(0, this.parent.clientWidth / this.width - 1) * this.width; //除去边框的宽度
    this.y = tools.getRandom(0, this.parent.clientHeight / this.height - 1) * this.height; //除去边框的宽度
    //赋值给样式
    this.ele.style.left = this.x + "px";
    this.ele.style.top = this.y + "px";
}