import Vue from 'vue';
import axios from 'axios';

// 设置默认请求头
axios.defaults.headers = {
    'Content-Type': 'application/json'
};
axios.defaults.baseURL = '/api';
// 请求超时的时间限制
axios.defaults.timeout = 20000;
// 开始设置请求 发起的拦截处理 config 代表发起请求的参数的实体
axios
    .interceptors
    .request
    .use((config : any) => {
        config.headers.token = '1234124'
        return config
    }, (error : any) => {
        return Promise.reject(error);
    });

// 请求到结果的拦截处理
axios
    .interceptors
    .response
    .use((config : any) => {

        return config.data;
    }, (error : any) => {
        return Promise.reject(error);
    });
// 将axios 的 post 方法，绑定到 vue 实例上面的 $post
Vue.prototype.$post = (url : any, params : object) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url, {
            ...params
        })
            .then((res : any) => {
                resolve(res);
            })
            .catch((err : any) => {
                reject(err);
            });
    });
};
// 将axios 的 get 方法，绑定到 vue 实例上面的 $get
Vue.prototype.$get = (url : any, params : any) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {params: params})
            .then((res : any) => {
                resolve(res); // 返回请求成功的数据 data
            })
            .catch((err : any) => {
                reject(err);
            });
    });
};