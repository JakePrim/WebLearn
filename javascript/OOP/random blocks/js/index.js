console.log(tools.getColor());
let stage = document.getElementById("stage");
let arr = [];
//随机添加10个方块到页面上
for (let i = 0; i < 10; i++) {
    let block = new Block(stage, {
        backgroundColor: tools.getColor(),
    });
    block.render()
    block.positionRandom();
    arr.push(block);
}
//每隔一段时间位置随机发生变化
setInterval(function () {
    for (let i = 0; i < arr.length; i++) {
        arr[i].positionRandom();
    }
}, 1000);