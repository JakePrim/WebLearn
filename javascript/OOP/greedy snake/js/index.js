//将所有的模块代码按照一定的顺序引入  使用undefined保证就是未定义，在低版本中undefined可能会被更改
(function (window,undefined) {
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
        window.tools = tools;
    })(window,undefined);

//=====================food===============
//x y width height color
//所有作用域范围
//自执行函数 IIFE 关在自己的作用域中，但是需要让外部可以调用掉，可以用到Window对象
(function (window,undefined) {
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
})(window,undefined);

//==================snake===================
/**
 * 蛇对象逻辑
 */
(function (window,undefined) {
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
})(window,undefined);

//=========================game=====================
/**
 * 游戏对象，管理游戏的核心逻辑
 */
(function (window,undefined) {
    let that;

    /**
     *
     * @param parent 画布
     * @constructor
     */
    function Game(parent, options) {
        this.parent = parent;
        this.food = new Food(parent, options);
        this.snake = new Snake(parent, options);
        that = this;
    }

    /**
     * 游戏开始的方法
     */
    Game.prototype.start = function () {
        //TODO 如果蛇渲染的位置和食物渲染的位置重合如何处理?
        //渲染多个食物
        this.food.render();
        this.food.render();
        this.food.render();

        this.snake.render();
        //1. 蛇开始运动起来
        runSnake();
        //2. 通过上下左右按键控制蛇的运动方向
        bindKey();
        //3. 判断蛇头是否和食物碰撞
        //4. 判断是否超出地图范围，游戏结束


    }

    //封装按键逻辑代码
    function bindKey() {
        document.onkeydown = function (ev) {
            //判断按键 37---left   38---top   39---right  40---bottom
            console.log(ev.key);
            switch (ev.keyCode) {
                case 37:
                    that.snake.direction = "left";
                    break;
                case 38:
                    that.snake.direction = "top";
                    break;
                case 39:
                    that.snake.direction = "right";
                    break;
                case 40:
                    that.snake.direction = "bottom";
                    break;
            }
        }
    }

    //封装运动函数
    function runSnake() {
        let timer = setInterval(function () {
            that.snake.run();
            //判断是否到了边界
            //计算份数
            let maxX = that.parent.offsetWidth / that.snake.width;
            let maxY = that.parent.offsetHeight / that.snake.height;


            //找到当前元素蛇头的位置 同理也是份数
            let headX = that.snake.body[0].x;
            let headY = that.snake.body[0].y;
            //每次都要判断蛇是否吃到食物了,吃到了食物增加一节
            // let foodX = that.food.x;
            // let foodY = that.food.y;
            //获取蛇头的像素坐标位置
            let hX = headX * that.snake.width;
            let hY = headY * that.snake.height;
            //判断蛇头是否吃到了食物
            for (let i = 0, len = that.food.elements.length; i < len; i++) {
                //多个食物进行匹配
                let ele = that.food.elements[i];
                if (hX === ele.offsetLeft && hY === ele.offsetTop) {
                    //删除食物
                    that.food.removeFood(i);
                    that.food.render();//随机生成食物
                    //增加一节
                    let last = that.snake.body[that.snake.body.length - 1];
                    that.snake.body.push({
                        x: last.x,
                        y: last.y,
                        color: last.color,
                    })
                    //等下一次重新渲染就会增长
                }
            }

            //判断是否到达了边界
            if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
                clearTimeout(timer);
                alert("Game Over");
            }
        }, 150);
    }

    //对象暴露Game类
    window.Game = Game;
})(window,undefined);

//===================== main==============
(function (window,undefined) {
        //贪吃蛇游戏分析
//蛇对象Snake   食物对象Food   游戏对象Game 管理游戏中的逻辑
        let map = document.getElementById("map");
        let game = new Game(map);
        game.start();
    })(window,undefined);
//传递window避免跳出本层的作用域范围,保证undefined是未定义，因为在低版本浏览器可能会被更改

//注意自执行函数的问题，当自执行函数后面缺少分号就会造成(function(){})()(function(){})().....
//()() return undefined，缺少分号就变成了 undefined(...)()直接报错了