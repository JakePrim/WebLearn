/**
 * 兼容绑定事件
 * @param ele 事件源
 * @param type 事件类型
 * @param fn 事件函数
 */
function addEvent(ele, type, fn) {
    if (type.startsWith("on")) {//以on开头的事件
        ele[type] = fn;
        console.log(ele);
    } else {
        if (ele.addEventListener) {
            ele.addEventListener(type, fn);
        } else if (ele.attachEvent) {
            ele.attachEvent("on" + type, fn);
        } else {
            throw Error("this is ele not support event listener");
        }
    }
}

/**
 * 兼容解除事件
 * @param ele 事件源
 * @param type 事件类型
 * @param fn 事件函数
 */
function removeEvent(ele, type, fn) {
    if (type.startsWith("on")) {
        ele[type] = null;
    } else {
        if (ele.removeEventListener) {
            ele.removeEventListener(type, fn);
        } else if (ele.detachEvent) {
            ele.detachEvent("on" + type, fn);
        } else {
            throw Error("this is ele not support event listener");
        }
    }
}

