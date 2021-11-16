//函数表达式
var foo = function fun(){
    console.log("123");
}
//函数表达式定义的函数不会进行 提升，同时函数名不能调用
foo();//123
// fun(); 报错

function fun(){
    console.log("fun");
}

//函数的数据类型 Function
console.log(typeof(fun));//function
console.log(typeof(foo));//function 函数表达式也是 Function类型

//函数可以作为参数
// setTimeout(foo,1000);
// setTimeout(() => {
//    console.log(1); 
// }, 1000);

//函数可以作为返回值，而内部函数持有了函数的作用域，则形成了闭包
function fn(b){
    var a  = 10;
    return function(){
        console.log(a+b);//持有了fn的作用域，当fn运行完毕后不会进行销毁掉，因为function持有了引用
    }
}

var f = fn(10);
f();

/**
 * arguments 类数组，存储了函数的所有参数
 */
function sum(){
    let result = 0;
    for (let index = 0; index < arguments.length; index++) {
        const element = arguments[index];
        result += element;
    }
    return result;
}

console.log(sum(1,2,3,4));


// var fun11 = "test fun";

// fun11();//fun11 is not a function

// function fun11(){
//     console.log(2);
// }

//预解析过程：
//1. function fun11(){....}   
//2. var fun11  
//3. fun11 = “test fun" 覆盖了fun11(){....}
//4. fun11() 报错


console.log(foo12);//[Function: foo12]

/**
 * 预解析过程：
 * 1. function foo12(){1}
 * 2. function foo12(){2}
 * 3. var foo12
 * 4. foo12() -> 3
 */

foo12(); //3

function foo12() {
    console.log( 1 );
}

var foo12 = function() {
    console.log( 2 );
};

foo12(); //2

function foo12() {
    console.log( 3 );
}




var foo = function(){
    console.log("test");
}();//也可以实现立即执行IIFE 就是将函数矮化成表达式

//例如： + - () ! 都可以将函数矮化成表达式
+function f111(){
    console.log("f111");//f111
}();

-function f112(){
    console.log("f112");
}();

//() 就是IIFE的经典实现 自执行函数
(function(){
    console.log("IIFE");
})();

!function f113(){
    console.log("f113");
}()

for (var index = 0; index < 5; index++) {
    //IIFE 可以实现单独的作用域环境，不会污染外部,同时也会保存传递过来的参数值，不用担心var的问题
    (function(index){
        setTimeout(() => {
            console.log("index:"+index);
        }, index);
    })(index);
}


abc();

var abc = "123"

function abc(){
    console.log("456");
}