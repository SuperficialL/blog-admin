import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '/admin/',
    timeout: 5000 // request timeout
});

// request interceptor 请求拦截
service.interceptors.request.use(
    config => {
        // Do something before request is sent
        if (store.getters.token) {
            config.headers['authorization'] = `Bearer ${getToken()}`
        }
        return config
    },
    error => {
        // Do something with request error
        console.log(error);// for debug
        return Promise.reject(error)
    }
);

// response interceptor 响应拦截
service.interceptors.response.use(
    response => {
        // return response
        const res = response.data;
        console.log(res);
        if (!res.code) {
            Message({
                message: res.message,
                type: 'error',
                duration: 5 * 1000
            })
        }
        return res
    },
    error => {
        console.log('err' + error); // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error)
    }
);

export default service
