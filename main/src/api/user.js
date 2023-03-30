import { startHttp } from "./index";
import request from './request'
export function login(data){
  return request({
    url: '/index.php?app=home&mod=Public&act=doLogin',
    methods: 'post',
    data,
  })
}
export function loginfn({email,password}){
  return request({
    url:'https://pocketuni.com.cn/index.php?app=api&mod=Sitelist&act=login&email=' + email +'&password=' + password,
    method:'post',
  })
}
//登录
// export const login = async (parms) => {
//   return await startHttp.post('/index.php?app=home&mod=Public&act=doLogin', parms);
// };
//注册
export const sign = async (parms) => {
  return await startHttp.post('/user/sign_in', parms);
};
//登出
export const signOut = async (parms) => {
  return await startHttp.post('/user/sign_in', parms);
};