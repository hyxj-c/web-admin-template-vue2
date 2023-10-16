import { resetRouter } from "@/router";
import { login, logout, getInfo, getUserInfo } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";

const state = {
  token: getToken(),
  id: "",
  name: "",
  avatar: "",
  buttons: [],
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ID: (state, id) => {
    state.id = id;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_BUTTONS: (state, buttons) => {
    state.buttons = buttons;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
}

const actions = {
  // 登录
  login({ commit }, userInfo) {
    const username = userInfo.username.trim();
    return new Promise((resolve, reject) => {
      login(username, userInfo.password)
        .then(response => {
          const data = response.data;
          // 把token存入cookie
          // setToken(data.token);
          setToken(data.item.id);
          commit("SET_TOKEN", data.token);
          commit("SET_ID", data.item.id);
          resolve();
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  },
  // 获取用户信息
  getInfo({ commit }, userId) {
    return new Promise((resolve, reject) => {
      getUserInfo(userId)
        .then(response => {
          const data = response.data;
          console.log("getInfo - data", data);

          // 验证该用户是否分配了角色，未分配角色则返回错误状态
          if (data.roles && data.roles.length > 0) {
            commit("SET_ROLES", data.roles);
          } else {
            reject({message:"该用户未分配角色，请用分配了角色的用户登录！"});
          }

          commit("SET_ID", data.id);
          commit("SET_NAME", data.username);
          commit("SET_AVATAR", data.avatar);
          commit("SET_BUTTONS", data.buttonPermissionList);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 登出
  logout() {
    return new Promise((resolve, reject) => {
      // logout()
      //   .then(() => {
      //     this.dispatch("user/logoutFrontEndDate");
      //     resolve();
      //   })
      //   .catch(error => {
      //     reject(error);
      //   });
      this.dispatch("user/logoutFrontEndDate");
      resolve();
    });
  },
  // 登出前端数据
  logoutFrontEndDate({ commit }) {
    // 重置router
    resetRouter();
    // 清空前端vuex中存储的数据
    commit("SET_TOKEN", "");
    commit("SET_ID", "");
    commit("SET_NAME", "");
    commit("SET_AVATAR", "");
    commit("SET_ROLES", []);
    commit("SET_BUTTONS", []);
    // 清空cookie
    removeToken(); 
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
