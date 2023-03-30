// import router from '@/router/index.js'
// import {
//     ElMessageBox
// } from 'element-plus'


export default {
    namespaced: true,
    state: {
        token: '',
        userInfo: null,
    },
    mutations: {
        ['changeToken'](state,data){
            state.token = data
        },
        ['changeUserInfo'](state,data){
            state.userInfo = data
        },
    },
    actions: {
        
    },
    getters: {
        token: (state) => state.token,
    }
}