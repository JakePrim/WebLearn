/**
 * 蛇对象逻辑
 */
(function () {
    let ps = "absolute";

    function Snake(parent, options) {
        //x = 3 * w   y = 2 * h 蛇初始位置
        //通过数组存储蛇的数据
        //方向
        this.parent = parent;
        options = options instanceof Object ? options : {};
        //设置蛇节的宽度和高度属性
        this.width = options.width || 20;
        this.height = options.height || 20;
        //设置蛇身的数据 需要用数组进行设置保存每个蛇节的对象属性
        this.body = [
            //数组第一项为蛇头的数据
            {
                x: 3, y: 2, color: "red"
            },
            //每个蛇节的数据
            {
                x: 2, y: 2, color: "blue"
            },
            {
                x: 1, y: 2, color: "blue"
            },
        ];
        //设置蛇的移动方向 right left top bottom
        this.direction = "right";
        //记录所有生成的div元素
        this.elements = [];
    }

    /**
     * 渲染蛇到画布上
     * x=3 y = 2
     * x=2 y = 2
     * x=1 y = 1
     */
    Snake.prototype.render = function () {
        //生成对应的元素 遍历body
        for (let i = 0, len = this.body.length; i < len; i++) {
            let ele = document.createElement("div");
            this.parent.appendChild(ele);
            let piece = this.body[i];
            ele.style.width = this.width + "px";
            ele.style.height = this.height + "px";
            ele.style.backgroundColor = piece.color;
            ele.style.left = piece.x * this.width + "px";
            ele.style.top = piece.y * this.height + "px";
            ele.style.position = ps;
            this.elements.push(ele);
        }
    }

    /**
     * 让蛇运动起来
     * x=3 y = 2
     * x=2 y = 2
     * x=1 y = 1
     *
     * right:
     * x=4
     * x=3
     * x=2
     * left:
     * x=3
     * x=4
     * x=3
     * left:
     * x=2
     * x=3
     * x=4
     */
    Snake.prototype.run = function () {
        //第二节移动到蛇头的位置，第三节移动到第二节的位置，依次类推
        //蛇身每一节先进行变化，最后在根据方向改变蛇头
        for (let i = this.body.length - 1; i >= 1; i--) {
            //从最后一项开始
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        let head = this.body[0];
        //改变蛇头
        switch (this.direction) {
            case "right":
                head.x++;
                break;
            case "left":
                head.x--;
                break;
            case "top":
                head.y--;
                break;
            case "bottom":
                head.y++;
                break
        }
        this.remove();
        this.render();
    }

    /**
     * 蛇运动后调用render重新创建了元素，但是之前的元素并没有删除，需要进行删除
     */
    Snake.prototype.remove = function () {
        for (let i = 0, len = this.elements.length; i < len; i++) {
            this.parent.removeChild(this.elements[i]);
        }
        this.elements = [];
    }

    //对外暴露Snake类
    window.Snake = Snake;
})();