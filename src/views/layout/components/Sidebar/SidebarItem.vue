<template>
  <div v-if="!item.meta.hidden" class="menu-wrapper">
    <!-- 没有子菜单，只展示一个导航 -->
    <app-link v-if="onlyOneRoute(item)" :to="resolvePath(titleRoute.path)">
      <el-menu-item :index="resolvePath(titleRoute.path)" :class="{'submenu-title-noDropdown' : !isNest}">
        <item v-if="titleRoute.meta" :icon="titleRoute.meta.icon || item.meta.icon" :title="titleRoute.meta.title" />
      </el-menu-item>
    </app-link>

    <!-- 有子菜单 -->
    <el-submenu v-else :index="resolvePath(item.path)">
      <!-- 菜单标题 -->
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>
      
      <!-- 子菜单 -->
      <template v-for="child in item.children">
        <template v-if="!child.meta.hidden">
          <!-- 递归遍历 -->
          <sidebar-item
            v-if="child.children && child.children.length > 0"
            :is-nest="true"
            :item="child"
            :key="child.path"
            :base-path="resolvePath(child.path)"
            class="nest-menu" />
          <!-- 菜单项 -->
          <app-link v-else :to="resolvePath(child.path)" :key="child.name">
            <el-menu-item :index="resolvePath(child.path)">
              <item v-if="child.meta" :icon="child.meta.icon" :title="child.meta.title" />
            </el-menu-item>
          </app-link>
        </template>
      </template>
    </el-submenu>

  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils'
import Item from './Item'
import AppLink from './Link'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      titleRoute: null
    }
  },
  methods: {
    // 判断children只有一个时，是否只显示此child，不显示父级
    onlyOneRoute(route) {
      // 若路由没有children，直接展示该路由
      if (!route.children || route.children.length === 0) {
        this.titleRoute = route
        return true
      }
      // 过滤隐藏的路由
      const showingChildren = route.children.filter(item => {
        if (item.meta.hidden) {
          return false
        } else {
          return true
        }
      })
      // children为空，直接展示该路由
      if (showingChildren.length === 0) {
        this.titleRoute = route
        return true
      }
      // 仅有一个child，并该child设置了要作为标题路由
      if (showingChildren.length === 1 && showingChildren[0].titleRoute) {
        this.titleRoute = showingChildren[0]
        return true
      }
      return false
    },
    // 解析路径，判断是外部连接还是路由
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
