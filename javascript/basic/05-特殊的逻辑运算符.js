
/**
 * 隐式转换：
 * FALSE：NaN 、0、“”、null、undefined
 * true:非0 非NaN 非空字符串
 */

console.log(null && "123");//null

console.log(NaN && "123");//NaN

console.log(0 && "123");//0

console.log("" && "123");//""

console.log(undefined && "123");//undefined

if (null || "12") {//返回“12” "12" 隐式转换为 true
    console.log(123);//123
}

//运算顺序：非 与 或
var n = null && undefined || !8;
//优先计算非运算 null || false = false
console.log(n);


var a = 4;

var num = 1 * (2 + 3) && ++a || 5 > 6 && 7 < 8 || !9;

//-> 1 * (5) && 5 || 5 > 6 && 7 < 8 || false
// -> 5 && 5 || false && true || false
// -> 5 || false || false
// -> 5 || false
// -> 5

console.log(num);

//b = 3
//a=5
// 6 + 3
//a = 6 b = 4
//d = 6 + 4 + 9

//a = 4
//5 && 4 || false && true || false
//



var num1 = (324 * (23 + 214) / (568 - 129)) - (11 * (235 - 24))
console.log(num1);

for (var i = 30; i > 5; i -= 7) {
    console.log(i--);
}