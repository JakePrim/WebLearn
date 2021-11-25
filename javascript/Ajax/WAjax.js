//封装Ajax
/**
 * method:{string} 请求方法
 * url:{string} 请求地址
 * params:{object} 请求参数
 * callback:{function} 回调函数
 */
(function (window, undefined) {
    function fire(method, url, params, callback) {
        method = method.toUpperCase();//方法全部转换成大写
        const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        //判断是否是get方法
        const pairs = [];
        for (const k in params) {
            pairs.push(k + "=" + params[k]);
        }
        let str = pairs.join("&");//使用&连接成字符串
        if (method === "GET") {
            url += "?" + str;
        }
        xhr.open(method, url);
        let data = null;
        if (method === "POST") {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            data = str;
        }
        xhr.send(data);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && (this.status === 200 || this.status === 201)) {
                callback.onsuccess(JSON.parse(this.responseText));
            } else if (this.readyState === 3 || this.readyState === 2) {
                callback.onload();
            } else {
                callback.onerror(this.status, this.statusText);
            }
        }
    }

    window.fire = fire;
})(window, undefined);