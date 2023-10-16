import store from "@/store";

/**
 * 检查登录的角色是否有操作权限
 * @param {Array} value 权限中包含的角色数组(进行操作所具备的角色)
 * @returns {Boolean}
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles;
    const permissionRoles = value;

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role);
    });

    return hasPermission;
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`);
    return false;
  }
}

// 用来控制按钮的显示
export function hasButtonPermission(permission) {
  const permissionButtons = store.getters.buttons;
  return permissionButtons.indexOf(permission) > -1;
}
