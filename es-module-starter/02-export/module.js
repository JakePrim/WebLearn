// export var name = 'foo module';


// export function hello(){
//     console.log("hello");
// }

// export class Person {

// }

var name = 'foo module';


function hello() {
    console.log("hello");
}

class Person {

}

var age = 10;

var obj = { name, age };

//集中导出
// export { name, hello, Person };

//通过as 重命名
export { name as fooName, hello, Person };

//默认导出
export default "default";

// export default { name, age };

setTimeout(() => {
    name = "new";
}, 1000);
