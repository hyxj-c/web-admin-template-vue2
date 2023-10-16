import { constantRoutes } from "@/router";
import { getMenu, getRouteMenu } from "@/api/login";
import Layout from "@/views/layout/Layout";

const state = {
  routes: [],
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  }
};

const actions = {
  async generateRoutes({ commit }, userId) {
    // 调用后台接口获取路由
    // const asyncRouter = await getMenu();
    const response = await getRouteMenu(userId);
    return new Promise(resolve => {
      const routeMenu = response.data.item;
      const asyncRoutes = filterAsyncRoute(routeMenu);
      commit("SET_ROUTES", asyncRoutes);
      resolve(asyncRoutes);
    });
  }
};

/**
 * 把路由权限转换为路由对象
 * @param {} asyncRouteTree  路由权限树
 */
function filterAsyncRoute(asyncRouteTree) {
  // 遍历后台传来的路由权限树，转换为组件对象
  const accessedRoutes = asyncRouteTree.filter(route => {
    if (!route.path) {
      return false;
    }

    if (!route.component) {
      // 没有component属性，定义为<router-view />
      route.component = {render: (e) => e("router-view")}
    } else if (route.component === "Layout") {
      // 定义为Layout组件
      route.component = Layout;
    } else {
      const component = route.component;
      route.component = resolve => {
        require(["@/views" + component + ".vue"], resolve);
      };
    }

    if (route.children && route.children.length) {
      filterAsyncRoute(route.children);
    }

    return true;
  });

  return accessedRoutes;
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
