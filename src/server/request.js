import axios from "axios";
import { message } from 'ant-design-vue';
import store from '@/store/index';
import router from "@/router/index";
import { jumpLogin } from "@/router/permission";

const token = () => {
    let userInfo = window.localStorage.getItem("userBasic") || "";
    userInfo = userInfo ? JSON.parse(userInfo) : {};
    return userInfo.userId ? `Bearer ${userInfo.access_token}` : "";
};

let service = axios.create({
    //baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest"
    }
    //timeout: 10000
});

service.interceptors.request.use(
    config => {
        store.commit('utils/changeState', {key: 'loading', value: true});
        let accessToken = token();
        config = accessToken&&!config.noToken ? 
            {
                ...config,
                headers: {
                    ...config.headers,
                    Authorization: accessToken
                }
            } : config;
        if(config.reqType == 1) {
            config.headers = {
                ...config.headers,
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }

        if(config.reqType == 2) {
            config.headers = {
                ...config.headers,
                "Content-Type": "multipart/form-data",
            }
        }
        return config;
    },
    error => {
        store.commit('utils/changeState', {key: 'loading', value: false});
        return Promise.reject(error);
    }
);

const codeMessage = {
    200: "服务器成功返回请求的数据。",
    201: "新建或修改数据成功。",
    202: "一个请求已经进入后台排队（异步任务）。",
    204: "删除数据成功。",
    400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
    401: "用户没有权限（令牌、用户名、密码错误）。",
    403: "用户得到授权，但是访问是被禁止的。",
    404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
    406: "请求的格式不可得。",
    410: "请求的资源被永久删除，且不会再得到的。",
    422: "当创建一个对象时，发生一个验证错误。",
    500: "服务器发生错误，请检查服务器。",
    502: "网关错误。",
    503: "服务不可用，服务器暂时过载或维护。",
    504: "网关超时。"
};
// 返回结果处理
service.interceptors.response.use(
    res => {
        store.commit('utils/changeState', {key: 'loading', value: false});
        // if (res.data.code != '00000000') {
        //     if (res.data.code == 500||res.data.code == 401) {
        //         window.localStorage.removeItem("userBasic");
        //         let path = window.location.pathname;
        //         if (document.getElementsByClassName('el-message').length===0&&path.indexOf("/login")<0) {
        //             message.error({
        //                 content: res.data.message||"登录已过期或者权限不足",
        //                 duration: 1,
        //                 onClose: () => {
        //                     jumpLogin( router, { path }, "router" )
        //                 }
        //             });
        //         }
        //     } else {
        //         if(res.config.url.indexOf('/oauth/login')<0||(res.config.url.indexOf('/oauth/login')>=0&&res.data.error)) {
        //             if (document.getElementsByClassName('el-message').length === 0) {
        //                 message.error({
        //                     duration: 2,
        //                     content: res.data.msg||res.data.error||res.data.message,
        //                     onClose: () => {}
        //                 });
        //             }
        //         }
        //     }
        // }
        return res.data;
    },
    error => {
        store.commit('utils/changeState', {key: 'loading', value: false});
        let errortext = error;
        if (error.response && error.response.status) {
            errortext =
                codeMessage[error.response.status] || response.statusText;
            if (error.response.status == 401) {
                if (!process.browser) return;
                window.localStorage.removeItem("userBasic");
                errortext = "登录已过期";
            }
        }

        message.error({
            content: errortext,
            onClose: () => {
                //window.location.reload();
            }
        });
        return Promise.reject(error);
    }
);

/**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}, option = {}) {
    return new Promise((resolve, reject) => {
        service
            .get(url, {
                params: params,
                ...option
            })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}, option = {}) {
    return new Promise((resolve, reject) => {
        service.post(url, data, { ...option }).then(
            response => {
                resolve(response);
            },
            err => {
                reject(err);
            }
        );
    });
}

/**
 * delete 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function del(url, data = {}, option = {}) {
    return new Promise((resolve, reject) => {
        service.delete(url, { data, ...option }).then(
            response => {
                resolve(response);
            },
            err => {
                reject(err);
            }
        );
    });
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}, option = {}) {
    return new Promise((resolve, reject) => {
        service.put(url, data, { ...option }).then(
            response => {
                resolve(response);
            },
            err => {
                reject(err);
            }
        );
    });
}

/**
 * all 并发请求封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function all(arr) {
    const _arr = arr.map((item, i) => {
        if (typeof item === "string") {
            return service.get(item);
        } else {
            if (item.method) {
                return service[item.method](item.url);
            }
        }
    });
    return new Promise((resolve, reject) => {
        axios
            .all(_arr)
            .then(
                axios.spread(function() {
                    const resultArr = [...arguments];
                    resolve(resultArr);
                })
            )
            .catch(err => {
                reject(err);
            });
    });
}

export default {
    get,
    post,
    put,
    delete: del,
    all
};
