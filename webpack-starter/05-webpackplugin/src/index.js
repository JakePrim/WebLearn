import "./css/main.css"; // 引入CSS样式文件
import "./css/main";

// 以模块的方式引入图片
import boy from "./image/xph.gif";
// import "@babel/polyfill";//引入polyfill
import homeIcon from "./image/icon/home-blue.png";
import about from "./about.md";
import $ from "jquery";

import { add } from "@/math";

import './extend';//没有导出任何成员

console.log((7).pad(3));

console.log("2+4=", add(2, 4));

console.log("hello webpack  123");

const showMsg = () => {
  console.log("hello");
};

// eslint-disable-next-line
window.showMsg = showMsg;

const p = new Promise((resolve) => {
  setTimeout(() => {
    console.log("promise is working");
    resolve();
  }, 1000);
});

p.then((res) => {
  console.log(res);
});

// eslint-disable-next-line
const img = new Image();
img.src = boy;
// eslint-disable-next-line
document.body.append(img);

// eslint-disable-next-line
const img1 = new Image();
img1.src = homeIcon;
// eslint-disable-next-line
document.body.append(img1);

// eslint-disable-next-line
// console.log("接口地址:", API_BASE_URL);

// eslint-disable-next-line
console.log(about);

//给body添加一个页脚 包含备案号
$("body").append("<h3>备案号:xxxxx</h3>");

//验证按需加载
document.getElementById("btn").onclick = function () {
  //动态导入模块 import启动懒加载
  //webpackPrefetch 启动预加载
  //webpackChunkName 指定懒加载的文件名称
  import(/* webpackChunkName: 'desc' */ "./wp").then(({ desc }) => {
    alert(desc());
  });
};
