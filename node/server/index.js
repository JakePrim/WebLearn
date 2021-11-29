//webserver
const http = require("http");

//创建webserver
const server = http.createServer(function (req, res) {
    //req 请求对象，包含请求信息
    //res 响应对象，用于对请求进行响应
    if (req.url === "/") {
        res.write("hello node js");
        res.end();
    }
    if (req.url === "/api/course") {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
})

//端口设置
server.listen(3000);

console.log("web server is running");