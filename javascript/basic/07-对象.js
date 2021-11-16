//在js中对象，是一个键值对
//对象字面量
var person1 = {
    name:"zs",
    age:18,
    say:function () {
        console.log(this.name,this.age);
    }
};
person1.say();
person1.new = "new provite";//添加新属性
console.log(person1.new);

//new Object创建对象
var p = new Object();
p.name = "lisi";

//工厂函数创建对象
function createObj(name,age){
    var obj = new Object();
    obj.name = name;
    obj.age = age;
    return obj;
}
var o = createObj("lisi",18);

//自定义构造函数创建对象
function Person(name,age){
    this.name = name;
    this.age = age;
}

var person = new Person("lisi",18);

//遍历对象
for (const personKey in person) {
    console.log(person[personKey]);
}

//引用类型 赋值
var p1 = person;//将person的地址，给了p1 如果p1改变，person也会改变
p1.age = 19;
console.log(person.age);

var arr = [1,2,3,4];
var arr2 = arr;
arr2[2] = 5;
console.log(arr[2])

console.log(arr instanceof Array);//true instanceof 检测对象是否属于某个类型

function fun(){

}

console.log(fun instanceof Function);//true

//基本类型：number string boolean null undefined
//但是注意null有时被看做对象类型,实际上null本身是基本类型
console.log(typeof(null));//object
//在JavaScript中二进制前三位都为0的话会被判断为object类型，null的二进制表示是全0，自然前三位也是0，所以执行typeof时会返回“object”
console.log(person.toString(2));


//内置对象
//String
// Number
// Boolean
// Object
// Function
// Array
// Date
// RegExp
// Error