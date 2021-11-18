function $(id) {
    return document.getElementById(id);
}

/**
 * 兼容绑定事件
 * @param ele 事件源
 * @param type 事件类型
 * @param fn 事件函数
 */
function addEvent(ele, type, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(type, fn);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + type, fn);
    } else {
        throw Error("this is ele not support event listener");
    }
}

/**
 * 兼容解除事件
 * @param ele 事件源
 * @param type 事件类型
 * @param fn 事件函数
 */
function removeEvent(ele, type, fn) {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, fn);
    } else if (ele.detachEvent) {
        ele.detachEvent("on" + type, fn);
    } else {
        throw Error("this is ele not support event listener");
    }
}

/**
 * 节流函数
 */
function throttle(fn,d) {
    let task = null;
    return function () {
        if (!task){
            task = setTimeout(function () {
                task = null;
                fn.apply(this,arguments);
            },d);
        }
    }
}

/**
 * 防抖函数
 */
