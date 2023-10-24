import request from "@/utils/request";

/**
 * 用户登录
 * @param {用户名} username 
 * @param {密码} password 
 * @returns 
 */
export function login(username, password) {
  return request({
    url: "/security/login", // 此路径是在spring_security的UserLoginFilter类下
    method: "post",
    data: {
      username,
      password
    }
  });
}

/**
 * 获取用户信息
 * @returns 
 */
export function getUserInfo() {
  return request({
    url: `/acl/user/getUserInfo`,
    method: "get"
  });
}

/**
 * 根据用户id获取路由菜单
 * @param {用户id} userId 
 * @returns 
 */
export function getRouteMenu(userId) {
  return request({
    url: `/acl/user/getRouteMenu/${userId}`,
    method: "get"
  });
}

/**
 * 登出
 * @returns 
 */
export function logout() {
  return request({
    url: "/security/logout",
    method: "post"
  });
}