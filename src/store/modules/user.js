import { login,getUserInfo } from '../../api'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
    state: {
        user: '',
        token: getToken(),
        name: '',
        avatar: '',
        email: ''
    },

    mutations: {
        SET_USER_INFO:(state,userInfo) => {
            state.name = userInfo.username;
            state.avatar = userInfo.avatar;
            state.email = userInfo.email;
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        }
    },

    actions: {
        // 用户名登录
        LoginByUsername({commit}, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(res => {
                    const token = res.results.token;
                    commit('SET_TOKEN', token);
                    setToken(token);
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            })
        },

        // 获取用户信息
        GetUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    const userInfo = res.results;
                    commit('SET_USER_INFO', userInfo);
                    resolve(userInfo);
                }).catch(error => {
                    reject(error);
                })
            })
        },

        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                removeToken();
                resolve()
            })
        }
    }
}

export default user
