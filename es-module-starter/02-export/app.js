import { fooName, hello } from "./module.js";

setTimeout(() => {
    console.log(`app.js ${fooName}`);
}, 1500);

//不能修改导入的成员，只读的

hello();

//一下都是不可以的
// val modulePath = "./module.js";

// import {name} from modulePath;

// if(true){
//     import {name } from "./module.js";
// }

//动态加载一个模块
// import('./module.js').then((module)=>{
//     console.log(module);
// })


// //命名成员和默认成员导出
// import { fooName,default as title } from "./module.js";

// //简写，逗号左边是默认成员，逗号右边是命名成员
// import title,{ fooName} from "./module.js";

//直接导出其他的模块，但是当前模块不能访问模块的成员了
import { Button, Avatar } from "./index.js";

console.log(Button,Avatar);//Button Avatar