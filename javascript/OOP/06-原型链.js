function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Person.prototype.type = "human";
// Person.prototype.sayName = function () {
//     console.log(this.name);
// }
//更简单的原型语法 但是会丢失了constructor
Person.prototype = {
    constructor:Person,//必须要手动设置constructor属性
    type:"human",
    sayName : function () {
        console.log(this.name);
    }
}

//复杂的原型
// Person.prototype.address = {
//     city: "北京",
//     code: 10000,
// }

let p = new Person("jet", 28);
let o = p.__proto__;//指向了Person构造函数的原型对象
//而任何一个对象都有__proto__属性，指向的就是该对象的构造函数的原型对象
let o2 = o.__proto__;
console.log(o2.constructor);//[Function: Object]
console.log(o.constructor);//[Function: Person]

//通过原型链查找到了Object存在该方法，进行调用
console.log(p.valueOf());//Person { name: 'jet', age: 28 }

//通过实例对象添加新的成员，会直接添加到实例上
p.sex = "male";
p.sayAge = function () {
    console.log(this.age);
}
p.sayAge();
console.dir(p);

//通过实例对象更改原型对象的属性和方法
p.type = "person";//直接添加到实例上，而不会更改原型对象
p.sayName = function () {
    console.log(this.name);
}
console.dir(p);

//通过实例对象更改原型对象中复杂的数据类型
// p.address.city = "上海";//并没有在实例对象上新增属性，更改了原型对象
// console.dir(p);


console.dir(Object.prototype);
console.dir(Function.prototype);
console.dir(Array.prototype);
console.dir(String.prototype);
console.dir(Number.prototype);