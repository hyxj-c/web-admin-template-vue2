import request from "@/utils/request";

const api_name = "/acl/permission";

/**
 * 获取权限的菜单结构列表
 * @returns 
 */
export function getPermissionMenuStructure() {
  return request({
    url: `${api_name}`,
    method: "get"
  });
}

/**
 * 添加权限菜单
 * @param {权限菜单} menu 
 * @returns 
 */
export function save(menu) {
  return request({
    url: `${api_name}`,
    method: "post",
    data: menu
  });
}

/**
 * 修改权限菜单
 * @param {权限菜单} menu 
 * @returns 
 */
export function update(menu) {
  return request({
    url: `${api_name}`,
    method: "put",
    data: menu
  });
}

/**
 * 根据权限id递归删除权限
 * @param {权限id} id 
 * @returns 
 */
export function recursionRemoveById(id) {
  return request({
    url: `${api_name}/recursionRemove/${id}`,
    method: "delete"
  });
}

/**
 * 根据id批量删除权限
 * @param {id数组} idList 
 * @returns 
 */
export function batchRemove(idList) {
  return request({
    url: `${api_name}`,
    method: "delete",
    data: idList
  });
}

/**
 * 根据角色id获取权限树
 * @param {角色id} roleId 
 * @returns 
 */
export function getPermissionTree(roleId) {
  return request({
    url: `${api_name}/${roleId}`,
    method: "get"
  });
}