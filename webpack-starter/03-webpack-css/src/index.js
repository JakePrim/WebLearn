import './css/main.css'; // 引入CSS样式文件
import './css/main.less';

// 以模块的方式引入图片
import boy from './image/xph.gif';
// import "@babel/polyfill";//引入polyfill
import homeIcon from './image/icon/home-blue.png';

console.log('hello webpack');

const showMsg = () => {
  console.log('hello');
};

// eslint-disable-next-line
window.showMsg = showMsg;

const p = new Promise((resolve) => {
  setTimeout(() => {
    console.log('promise is working');
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
