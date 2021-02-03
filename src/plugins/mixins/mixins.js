import moment from "moment";

const mixers = {
    computed: {},
    methods: {
        $stopDef(e) {
            if (process.browser) {
                //防止浏览器默认行为(W3C)
                if (e && e.preventDefault) {
                    e.preventDefault();
                }
                //IE中组织浏览器行为
                else {
                    window.event.returnValue = fale;
                    return false;
                }
            }
        },
        $playScroll() {
            if (process.browser) {
                document.body.style.paddingRight = "";
                document.body.parentElement.style.height = "";
                document.body.parentElement.style.overflow = "";
                document.removeEventListener("mousewheel", this.stopDef, false);
            }
        },
        $stopScroll() {
            if (process.browser) {
                document.body.style.paddingRight = "4px";
                document.body.parentElement.style.height = "100%";
                document.body.parentElement.style.overflow = "hidden";
                document.addEventListener("mousewheel", this.stopDef, false); //禁止页面滑动
            }
        },
        $createRanID() {
            return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
        },
        $throttle(fn,interval){
            let canRun = true;
            return function(){
                if(!canRun) return;
                canRun = false;
                setTimeout(function(){
                    fn.apply(this,arguments);
                    canRun = true;
                },interval||300);
            }
        },
        $isNullOrUndefined(obj){
            return obj===null || obj === undefined
        },
        $isDate(type){
            if(!type) return false;
            type = type.toLowerCase();
            const list = ["date", "datetime", "datetime2", "smalldatetime", "datetimeoffset", "timestamp", "time", "year", "timestamp"];
            return list.indexOf(type) >= 0;
        },
        $dateFormat(date, type="YYYY-MM-DD HH:mm:ss") {
            if (typeof date === "string") {
                date = date.replace(/-/g,"/");
            }
            let time = moment(new Date(date)).format(type);
            return time;
        },
        $RandomColor(){
            let r=Math.floor(Math.random()*256);
            let g=Math.floor(Math.random()*256);
            let b=Math.floor(Math.random()*256);
            return {
                r,g,b
            }
        },
        $RandomColor2() {
            return "hsl(" + 
                Math.round(Math.random() * 360) + "," + 
                Math.round(Math.random() * 100) + '%,' + 
                Math.round(Math.random() * 80) + '%)';
        }
    }
};

export default mixers;
