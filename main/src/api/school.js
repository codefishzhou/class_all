import { startHttp } from "./index";
import request from './request'
import axios from 'axios'
const baseUrl = 'https://pocketuni.net'
export const loginFn = (data)=>{
  return axios({
    url: baseUrl+ '/index.php?app=home&mod=Public&act=doLogin',
    methods: 'post',
    data,
  })
}
export function getAllSchool(){
     return request({
        url: '/index.php?app=api&mod=Sitelist&act=getSchools',
        methods: 'post',
     })
}
//登录
export const login = async (parms) => {
  return await startHttp.post('/index.php?app=home&mod=Public&act=doLogin', parms);
};
//注册
export const sign = async (parms) => {
  return await startHttp.post('/user/sign_in', parms);
};
//登出
export const signOut = async (parms) => {
  return await startHttp.post('/user/sign_in', parms);
};