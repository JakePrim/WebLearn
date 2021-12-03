//调用app1中的模块
import ("appone/Sitename").then(res => {
   document.body.appendChild(res.default("App2应用App1的模块"));
});
