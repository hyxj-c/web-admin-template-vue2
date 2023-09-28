import request from "@/utils/request";

const api_name = "/acl/role";

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
 * 获取所有角色
 * @returns
 */
export function getAll() {
  return request({
    url: `${api_name}`,
    method: "get",
  });
}

/**
 * 获取分配的角色id
 * @param {用户id} userId 
 * @returns 
 */
export function getAssignedRoleIds(userId) {
  return request({
    url: `${api_name}/getAssignedRoleIds/${userId}`,
    method: "get",
  });
}

/**
 * 根据id获取角色信息
 * @param {角色id} id 
 * @returns 
 */
export function getById(id) {
  return request({
    url: `${api_name}/${id}`,
    method: "get"
  });
}

/**
 * 新增角色
 * @param {角色对象} role 
 * @returns 
 */
export function save(role) {
  return request({
    url: `${api_name}`,
    method: "post",
    data: role
  });
}

/**
 * 修改角色
 * @param {角色对象} role 
 * @returns 
 */
export function updateById(role) {
  return request({
    url: `${api_name}`,
    method: "put",
    data: role
  });
}

/**
 * 根据id删除角色
 * @param {角色id} id 
 * @returns 
 */
export function removeById(id) {
  return request({
    url: `${api_name}/${id}`,
    method: "delete"
  });
}

/**
 * 根据id批量删除角色
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
