/**
 * 数组对象内置的API使用
 */

//push pop unshift shift
var arr = [1,2,3,4];

var len = arr.push(6)//末尾插入数据，返回数组的长度
console.log(len);//5
// arr.push([6,7,8]);
console.log(arr);

var value = arr.pop();//删除末尾数据，返回删除的数据
console.log(value);//6
console.log(arr);//[1,2,3,4]

//头部插入
var l = arr.unshift(0);//返回数组的长度
console.log(l,arr);//5 [ 0, 1, 2, 3, 4 ]

//删除头部
var v = arr.shift();//返回删除的数据
console.log(arr);//[ 1, 2, 3, 4 ]

//push 和 pop 可以组成栈的数据结构 ： 后进先出
//push 和 shift 可以组成队列的数据结构 ： 先进先出
var queue = [];
//插入队列
queue.push(1);
queue.push(2);
queue.push(3);
//移除队列
queue.shift();
console.log(queue)//[ 2, 3 ]

var stack = [];//栈的结构
//进栈
stack.push(1);
stack.push(2);
stack.push(3);
//出栈
stack.pop();
console.log(stack);//[ 1, 2 ]

//将数组进行反转
var arr2 = [1,2,3,4];
//暴力法
var news = [];
var ll = arr2.length;
for (let i = 0; i < ll; i++) {
    news.push(arr2.pop());
}
console.log(news);

//reverse 会改变原来的数组
// console.log(arr2.reverse(),arr2);

//数组的合并 concat 原数组不受影响，形成一个新数组
var arr3 = [1,2,3,4];
// var arr4 = arr3.concat([5,6,7]);
var arr4 = arr3.concat(11,12,13);
console.log(arr3,arr4);