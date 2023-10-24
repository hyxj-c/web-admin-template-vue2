import axios from "axios";
import store from "@/store";
import router from "@/router";
import { getToken } from "@/utils/auth";
import { Message } from "element-ui";

// 不同环境不同地址
const apis = {
  development: 'http://localhost:8081', // 本地 (开发环境)
  production: 'http://123.57.25.196:8000', // 线上 (生产环境)
}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? apis.production : apis.development, // api 的 base_url
  // baseURL: apis.production, // api 的 base_url
  // baseURL: '/api',
  timeout: 50000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["token"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非2000是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    if (res.code !== 2000) {
      Message({
        message: res.message,
        type: "error",
        duration: 5 * 1000
      });
      // token认证失败，并且是登录状态
      if (res.code === 4001 && store.getters.token) {
        store.dispatch("user/logoutFrontEndDate");
        router.push({ path: "/login" });
      }
      return Promise.reject(res);
    } else {
      return response.data;
    }
  },
  error => {
    console.log("err", error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
