/**
 * 游戏对象，管理游戏的核心逻辑
 */
(function () {
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
})();