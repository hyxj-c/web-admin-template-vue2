import request from "@/utils/request";

// 登录
export function login(username, password) {
  return request({
    // url: "/admin/acl/login", // 此路径是在spring_security的TokenLoginFilter类下
    url: "/acl/user/login",
    method: "post",
    data: {
      username,
      password
    }
  });
}

// 获取用户信息
export function getInfo() {
  return request({
    url: "/admin/acl/index/info",
    method: "get"
  });
}

// 修改密码
export function updatePassword(userId, originalPassword, newPassword) {
  return request({
    url: "/admin/acl/user/updatePassword",
    method: "put",
    data: {
      userId,
      originalPassword,
      newPassword
    }
  });
}

// 登出
export function logout() {
  return request({
    url: "/admin/acl/index/logout",
    method: "post"
  });
}

// 获取菜单数据
export function getMenu() {
  return request({
    url: "/admin/acl/index/menu",
    method: "get"
  });
}

/**
 * 根据用户id获取用户信息
 * @param {用户id} userId 
 * @returns 
 */
export function getUserInfo(userId) {
  return request({
    url: `/acl/user/getUserInfo/${userId}`,
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
    url: `/acl/user/getPermissionRoute/${userId}`,
    method: "get"
  });
}