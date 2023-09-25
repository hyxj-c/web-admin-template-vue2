import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/* Layout */
import Layout from "../views/layout/Layout";

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

export const constantRoutes = [
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
        meta: { title: "Dashboard", icon: "study", affix: true }
      }
    ]
  },

  // 权限管理
  {
    path: "/acl",
    component: Layout,
    redirect: "/acl/user/list",
    name: "权限管理",
    meta: { title: "权限管理", icon: "chart" },
    children: [
      {
        path: "user/list",
        name: "用户管理",
        component: () => import("@/views/acl/user/list"),
        meta: { title: "用户管理" }
      },
      {
        path: "user/add",
        name: "用户添加",
        component: () => import("@/views/acl/user/form"),
        meta: { title: "用户添加", hidden: true },
      },
      {
        path: "user/update/:id",
        name: "用户修改",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "用户修改", hidden: true },
      },
      {
        path: "user/role/:id",
        name: "用户角色",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "用户角色", hidden: true },
      },
      {
        path: "role/list",
        name: "角色管理",
        component: () => import("@/views/acl/role/list"),
        meta: { title: "角色管理" }
      },
      {
        path: "role/add",
        name: "角色添加",
        component: () => import("@/views/acl/role/form"),
        meta: { title: "角色添加", hidden: true },
      },
      {
        path: "role/update/:id",
        name: "角色修改",
        component: () => import("@/views/acl/role/form"),
        meta: { title: "角色修改", hidden: true },
      },
      {
        path: "role/distribution/:id",
        name: "角色权限",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "角色权限", hidden: true },
      },
      {
        path: "menu/list",
        name: "菜单管理",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "菜单管理" }
      }
    ]
  },

  {
    path: "/teacher",
    component: Layout,
    redirect: "/teacher/list",
    name: "讲师管理",
    meta: { title: "讲师管理", icon: "people" },
    children: [
      {
        path: "list",
        name: "讲师列表",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "讲师列表", icon: "list" }
      },
      {
        path: "save",
        name: "添加讲师",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "添加讲师", icon: "tree" }
      },
      {
        path: "edit/:id",
        name: "EduTeacherEdit",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "编辑讲师", noCache: true },
        hidden: true
      }
    ]
  },

  // 课程分类管理导航
  {
    path: "/subject",
    component: Layout,
    redirect: "/subject/list",
    name: "课程分类管理",
    meta: { title: "课程分类管理", icon: "example" },
    children: [
      {
        path: "list",
        name: "课程分类列表",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "课程分类列表", icon: "table" }
      },
      {
        path: "save",
        name: "添加课程分类",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "添加课程分类", icon: "tree" }
      }
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes,
});

export default router;
