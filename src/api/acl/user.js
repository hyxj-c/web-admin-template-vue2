import request from "@/utils/request";

const api_name = "/acl/user";

/**
 * 获取某页数据
 * @param {当前页} page 
 * @param {每页显示多少条数据} limit 
 * @param {模糊查询的对象} searchObj 
 * @returns 
 */
export function getPageList(page, limit, searchObj) {
  return request({
    url: `${api_name}/${page}/${limit}`,
    method: "get",
    params: searchObj // url查询字符串或表单键值对
  });
}

/**
 * 根据id获取用户信息
 * @param {用户id} id 
 * @returns 
 */
export function getById(id) {
  return request({
    url: `${api_name}/${id}`,
    method: "get"
  });
}

/**
 * 新增用户
 * @param {用户对象} user 
 * @returns 
 */
export function save(user) {
  return request({
    url: `${api_name}`,
    method: "post",
    data: user
  });
}

/**
 * 修改用户
 * @param {用户对象} user 
 * @returns 
 */
export function updateById(user) {
  return request({
    url: `${api_name}`,
    method: "put",
    data: user
  });
}

/**
 * 修改用户密码
 * @param {用户id} userId 
 * @param {原密码} originalPassword 
 * @param {新密码} newPassword 
 * @returns 
 */
export function updatePassword(userId, originalPassword, newPassword) {
  return request({
    url: `${api_name}/updatePassword`,
    method: "put",
    data: {
      userId,
      originalPassword,
      newPassword
    }
  });
}

/**
 * 根据id删除用户
 * @param {用户id} id 
 * @returns 
 */
export function removeById(id) {
  return request({
    url: `${api_name}/${id}`,
    method: "delete"
  });
}

/**
 * 根据id批量删除用户
 * @param {id数组} idList 
 * @returns 
 */
export function removeRows(idList) {
  return request({
    url: `${api_name}`,
    method: "delete",
    data: idList
  });
}

/**
 * 为用户分配角色
 * @param {用户id} userId 
 * @param {角色id数组} roleIdList
 * @returns 
 */
export function assignRole(userId, roleIdList) {
  return request({
    url: `${api_name}/assignRole`,
    method: "post",
    params: { userId },
    data: roleIdList
  });
}

