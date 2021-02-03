import moment from 'moment';

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 防抖
 * @param {Function} fn 
 * @param {Number} delay 
 */
export function debounce(fn, delay) {
    // 持久化一个定时器 timer
    let timer = null;
    // 闭包函数可以访问 timer
    return function() {
        // 通过 'this' 和 'arguments'
        // 获得函数的作用域和参数
        let context = this;
        let args = arguments;
        // 如果事件被触发，清除 timer 并重新开始计时
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, delay);
    };
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername (str) {
    const validmap = ['admin', 'editor'];
    return validmap.indexOf(str.trim()) >= 0;
}


/**
 * 是否是windows系统
 */
export const isWindows = () => {
    let agent = navigator.userAgent.toLowerCase();
    let flag = false;
    //let isMac = /macintosh|mac os x/i.test(navigator.userAgent);
    if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0 ||agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
        flag = true;
    }
    return flag;
}

/**
 * 是否为移动端
 */
export const isMobile = () => {
    const ua = navigator.userAgent;
    const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    const isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    const isAndroid = ua.match(/(Android)\s+([\d.]+)/);
    const width = window.innerWidth;
    const isMobile = isIphone || isAndroid || width < 600;
    //判断
    return isMobile;
}

/**
 * 格式化时间
 * @param {String|Number} date 
 * @param {String} type 
 */
export const dateFormat = (date=new Date(), type="YYYY-MM-DD HH:mm:ss")=> {
    if (typeof date === "string") {
        date = date.replace(/-/g,"/");
    }
    let time = moment(new Date(date)).format(type);
    return time;
}

export const randomInt = (min,max) => {
    return Math.ceil(Math.random()*(max-min))+min;
}

export const isNumber = (value) => {
    return typeof value === 'number' && !isNaN(value);
}

export const isNullOrUndefined = (obj) =>{
    return obj===null || obj === undefined
}

export const timeOut = (call,time) => {
    let timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        call()
    }, time);
    return timer;
}

export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export const trim = (s) => {
    return s.replace(/(^\s*)|(\s*$)/g, "");
}

export const getRndCode = () => {
    const codes = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let d = [];
    for (let i = 0; i < 4; i++) {
        d.push(codes.substr(parseInt(String(Math.random()*61)) - 1, 1));
    }
    return d;
}

export const getRandom = (max, min, num=0) => {
    const asciiNum = ~~(Math.random() * (max - min + 1) + min);
    if (!Boolean(num)) {
        return asciiNum;
    }
    const arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(this.getRandom(max, min));
    }
    return arr;
}