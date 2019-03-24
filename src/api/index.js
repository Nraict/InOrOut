//引用vue是挂载axios,相当于全局注册
import Vue from 'vue'
//引用router进行跳转
import router from '../router'

//引入axios
import axios from 'axios'
//vue原型对象上面挂载$http只向axios,这是全局的,所以不用到处引用
Vue.prototype.$http = axios
// //设置公共头部
// axios.defaults.baseURL = 'http://www.litc.pro:9999/v1';
// //设置跨域携带cookie,验证身份
// axios.defaults.withCredentials = true;

import config from './config'
for(const k in config){
  axios.defaults[k] = config[k]
}




//axios拦截器
//请求拦截器
axios.interceptors.request.use(function (config) {
  // 添加一个请求头
  let token = localStorage.getItem('token')
  config.headers.Authorization = token
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  response = response.data
  return response;
}, function (error) {

  Vue.prototype.$message({
    message: error.response.data.errMsg,
    type: 'warning'
  });
  if (error.response.data.status === 401) {
    // 跳转到登录页
    // console.log('走你')
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    router.push('/')
  }

  return Promise.reject(error);
});

export default axios