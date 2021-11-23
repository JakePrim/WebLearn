//x y width height color
//所有作用域范围
//自执行函数 IIFE 关在自己的作用域中，但是需要让外部可以调用掉，可以用到Window对象
(function () {
    function Food(parent, options) {
        options = (options instanceof Object) ? options : {};
        //传入的数据可能是数组或者函数 需要进一步判断
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.backgroundColor = options.backgroundColor || "green";
        this.parent = parent;
        this.elements = [];//存储食物元素
    }

    /**
     * 将食物渲染到 画布中
     */
    Food.prototype.render = function () {
        this.ele = document.createElement("div");
        this.parent.appendChild(this.ele);
        //随机获取位置
        this.x = tools.getRandom(0, this.parent.clientWidth / this.width - 1) * this.width;
        this.y = tools.getRandom(0, this.parent.clientHeight / this.height - 1) * this.height;
        this.ele.style.width = this.width + "px";
        this.ele.style.height = this.height + "px";
        this.ele.style.left = this.x + "px";
        this.ele.style.top = this.y + "px";
        this.ele.style.backgroundColor = this.backgroundColor;
        this.elements.push(this.ele);
    };

    /**
     * 食物被吃掉，删除食物，生成新的食物
     */
    Food.prototype.removeFood = function (index) {
        //通过一些方法获取要被删除的食物的下标 删除指定的元素
        this.parent.removeChild(this.elements[index]);
        this.elements.splice(index, 1);
    };
    //利用window对象 暴露Food函数，给外部使用
    window.Food = Food;
})();


