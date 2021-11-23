(
    function () {
        //贪吃蛇游戏分析
//蛇对象Snake   食物对象Food   游戏对象Game 管理游戏中的逻辑
        let map = document.getElementById("map");
        let game = new Game(map);
        game.start();
    }
)();