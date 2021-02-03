import moment from "moment";
import numeral from "numeral";
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export const DateFormat = (date, type="YYYY-MM-DD HH:mm:ss") => {
    if (typeof date === "string") {
        date = date.replace(/-/g,"/");
    }
    let time = moment(new Date(date)).format(type);
    return time;
};

export const DateTimeStamp = date => {
    if (typeof date === "string") {
        date = date.replace(/-/g,"/");
    }
    let timeStamp = moment(new Date(date)).valueOf();
    return timeStamp;
};

export const fomartNum = (val, pattern) => {
    return numeral(val).format(pattern||"0,0");
};

export const MyDateFormat = function (date, fmt) {
    if (!date) {
        return "";
    }
    if (typeof date === "string") {
        if (date.indexOf(".") > -1) {
            // 有些日期接口返回带有.0。
            date = date.substring(0, date.indexOf("."));
        }
        // 解决IOS上无法从dateStr parse 到Date类型问题
        date = date.replace(/-/g, '/');
    }
    const oldTime = new Date(date)
    var o = {
        "M+": oldTime.getMonth() + 1,                 //月份 
        "d+": oldTime.getDate(),                    //日 
        "h+": oldTime.getHours(),                   //小时 
        "m+": oldTime.getMinutes(),                 //分 
        "s+": oldTime.getSeconds(),                 //秒 
        "q+": Math.floor((oldTime.getMonth() + 3) / 3), //季度 
        "S": oldTime.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (oldTime.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
} 
