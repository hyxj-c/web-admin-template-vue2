import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/* Layout */
import Layout from "../views/layout/Layout";

/**
* titleRoute: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect:                      if redirect: no set, will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    hidden: true                 if `hidden:true` will not show in the sidebar(default is false)
    affix: true                  if `affix:true` will fixed on tab nav
  }
**/

export const constantRoutes = [
  // 首页
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    meta: {title: "Dashboard"},
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        titleRoute: true,
        meta: { title: "Dashboard", icon: "study", affix: true }
      },
      {
        path: "/updatePassword",
        name: "修改密码",
        component: () => import("@/views/acl/user/updatePwdForm"),
        meta: { title: "修改密码", hidden: true },
      }
    ]
  },
  // 登录
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    meta: { hidden: true }
  },
  // 404
  {
    path: "*",
    component: () => import("@/views/404"),
    meta: { hidden: true }
  }
];

const createRouter = () => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes,
})

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // 重置路由
} 

export default router;
