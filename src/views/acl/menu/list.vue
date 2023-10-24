<template>
  <div class="app-container">
    <!-- 权限列表 -->
    <el-table
      :data="menuList"
      style="width: 100%; margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="name" label="名称" sortable width="180"></el-table-column>
      <el-table-column prop="path" label="访问路径" sortable width="180"></el-table-column>
      <el-table-column prop="component" label="组件路径" sortable width="180"></el-table-column>
      <el-table-column prop="permissionValue" label="权限值"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="(scope.row.type === 1) && hasPerm('permission.add')"
            type="text"
            size="mini"
            @click="clickAddMenu(scope.row.id)"
          >
            添加菜单
          </el-button>
          <el-button
            v-if="(scope.row.type === 1) && hasPerm('permission.add')"
            type="text"
            size="mini"
            @click="clickAddPermission(scope.row.id)"
          >
            添加功能
          </el-button>
          <el-button
            v-if="hasPerm('permission.update')"
            type="text"
            size="mini"
            @click="clickUpdate(scope.row)"
          >
            修改
          </el-button>
          <el-button
            v-if="hasPerm('permission.remove')"
            type="text"
            size="mini"
            @click="remove(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加修改菜单的窗口 -->
    <el-dialog :visible.sync="dialogMenuVisible" :title="dialogMenuTitle">
      <el-form ref="menu" :model="menu" :rules="menuValidateRules" label-width="120px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="menu.name" />
        </el-form-item>
        <el-form-item label="访问路径" prop="path">
          <el-input v-model="menu.path" />
        </el-form-item>
        <el-form-item label="组件路径" prop="component">
          <el-input v-model="menu.component" />
        </el-form-item>
        <el-form-item label="排序权重" prop="weight">
          <el-input-number v-model="menu.weight" :min="1" :max="10" />
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon">
          <svg-icon :iconClass="menu.icon" />
          <el-button
            style="margin-left: 5px"
            type="text"
            size="medium"
            @click="dialogMenuIconVisible = true"
          >选择</el-button>
          <el-button
            style="margin-left: 5px"
            type="text"
            size="medium"
            @click="menu.icon = ''"
          >取消</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetData()">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateMenu()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加修改功能的窗口 -->
    <el-dialog :visible.sync="dialogPermissionVisible" :title="dialogPermissionTitle">
      <el-form
        ref="permission"
        :model="permission"
        :rules="permissionValidateRules"
        label-width="120px"
      >
        <el-form-item label="功能名称" prop="name">
          <el-input v-model="permission.name" />
        </el-form-item>
        <el-form-item label="访问路径">
          <el-input v-model="permission.path" />
        </el-form-item>
        <el-form-item label="组件路径">
          <el-input v-model="permission.component" />
        </el-form-item>
        <el-form-item label="功能权限值" prop="permissionValue">
          <el-input v-model="permission.permissionValue" />
        </el-form-item>
        <el-form-item label="排序权重" prop="weight">
          <el-input-number v-model="permission.weight" :min="1" :max="10" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetData()">取 消</el-button>
        <el-button type="primary" @click="addOrUpdatePermission()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改菜单图标窗口 -->
    <el-dialog :visible.sync="dialogMenuIconVisible" title="icon图标">
      <div class="icon-box">
        <span
          v-for="(item, index) in menuIcons"
          :class="{active: currentIndex == index}"
          :key="item"
          @click="selectIcon(index, item)"
        >
          <svg-icon :iconClass="item" />
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMenuIconVisible = false, selectedIcon = ''">取 消</el-button>
        <el-button type="primary" @click="clickIconFormConfirm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionMenuStructure, save, update, batchRemove } from "@/api/acl/menu";
import { resetRouter } from "@/router"

const icons = [
  "bug",
  "chart",
  "clipboard",
  "component",
  "dashboard",
  "documentation",
  "drag",
  "edit",
  "education",
  "email",
  "example",
  "excel",
  "exit-fullscreen",
  "eye-open",
  "eye",
  "form",
  "fullscreen",
  "guide",
  "icon",
  "international",
  "language",
  "link",
  "list",
  "lock",
  "message",
  "money",
  "nested",
  "password",
  "pdf",
  "people",
  "peoples",
  "qq",
  "search",
  "shopping",
  "size",
  "skill",
  "star",
  "tab",
  "table",
  "theme",
  "tree-table",
  "tree",
  "user",
  "wechat",
  "zip"
];
const menuForm = {
  name: "",
  pid: 0,
  path: "",
  component: "",
  weight: 5,
  icon: "",
  type: "1"
};
const perForm = {
  permissionValue: "",
  type: "2",
  name: "",
  path: "",
  component: "",
  weight: 5,
  pid: 0
};

export default {
  data() {
    return {
      menuList: [],
      menu: {...menuForm},
      permission: {...perForm},
      menuIcons: icons,
      selectedIcon: "",
      currentIndex: -1, // selected icon index
      dialogMenuTitle: "添加菜单",
      dialogMenuVisible: false,
      dialogPermissionTitle: "添加功能",
      dialogPermissionVisible: false,
      dialogMenuIconVisible: false,
      menuValidateRules: {
        name: [{ required: true, trigger: "blur", message: "菜单名必须输入" }],
        path: [{ required: true, trigger: "blur", message: "菜单路径必须输入" }],
      },
      permissionValidateRules: {
        name: [{ required: true, trigger: "blur", message: "功能名称必须输入" }],
        permissionValue: [{ required: true, trigger: "blur", message: "功能权限值必须输入" }]
      }
    };
  },
  created() {
    this.fetchPermissionMenuList();
  },
  methods: {
    // 获取权限菜单列表
    fetchPermissionMenuList() {
      getPermissionMenuStructure().then(response => {
        this.menuList = response.data.item;
      }).catch(error => {
      });
    },
    // 删除菜单或权限
    remove(data) {
      // 获取所有要删除的id
      const deleteIdArr = [data.id];
      this.getChildPermissionIds(data, deleteIdArr);

      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return batchRemove(deleteIdArr);
        })
        .then(() => {
          this.remindMessage("success", "删除成功");
          this.resetData();
        })
        .catch(error => {
          if (error === "cancel") {
            this.remindMessage("info", "已取消删除");
          }
        });
    },
    // 递归获取所有子权限id，存入idArray
    getChildPermissionIds(permission, idArray) {
      for (const item of permission.children) {
        idArray.push(item.id);
        this.getChildPermissionIds(item, idArray);
      }
    },
    // 添加或修改功能
    addOrUpdatePermission() {
      this.$refs.permission.validate(async valid => {
        if (valid) {
          if (this.permission.id) {
            // 修改
            await update(this.permission);
            this.remindMessage("success", "修改功能成功");
            this.resetData();
            this.resetRoute();
          } else {
            // 添加
            await save(this.permission);
            this.remindMessage("success", "添加功能成功");
            this.resetData();
          }
        }
      });
    },
    // 添加或修改菜单
    addOrUpdateMenu() {
      this.$refs.menu.validate(async valid => {
        if (valid) {
          if (this.menu.id) {
            // 修改
            await update(this.menu);
            this.remindMessage("success", "修改菜单成功");
            this.resetData();
            this.resetRoute();
          } else {
            // 添加
            await save(this.menu);
            this.remindMessage("success", "添加菜单成功");
            this.resetData();
          }
        }
      });
    },
    // 点击了添加功能
    clickAddPermission(id) {
      this.dialogPermissionVisible = true;
      this.dialogPermissionTitle = "添加功能";
      this.permission.pid = id;
    },
    // 点击了添加菜单
    clickAddMenu(id) {
      this.dialogMenuVisible = true;
      this.dialogMenuTitle = "添加菜单";
      this.menu.pid = id;
    },
    // 点击了修改
    clickUpdate(data) {
      // 判断是修改菜单还是修改功能
      if (data.type === 0 || data.type === 1) {
        // 修改菜单
        this.openUpdateMenuForm(data);
      } else if (data.type === 2) {
        // 修改功能
        this.openUpdatePermissionForm(data);
      }
    },
    // 打开修改功能窗口
    openUpdatePermissionForm(data) {
      this.dialogPermissionVisible = true;
      this.dialogPermissionTitle = "修改功能";
      this.permission = { ...data };
    },
    // 打开修改菜单窗口
    openUpdateMenuForm(data) {
      this.dialogMenuVisible = true;
      this.dialogMenuTitle = "修改菜单";
      this.menu = { ...data };
      if (this.menu.icon === null) {
        this.menu.icon = "";
      }
      this.currentIndex = this.menuIcons.indexOf(this.menu.icon);
    },
    // 点击了IconForm的确定
    clickIconFormConfirm() {
      this.dialogMenuIconVisible = false;
      if (this.selectedIcon) {
        this.menu.icon = this.selectedIcon;
        this.selectedIcon = "";
      }
    },
    // 选择icon图标
    selectIcon(index, value) {
      this.currentIndex = index;
      this.selectedIcon = value;
    },
    // 重置数据
    resetData() {
      // 1.关闭form窗口
      if (this.dialogPermissionVisible) {
        this.dialogPermissionVisible = false;
      }
      if (this.dialogMenuVisible) {
        this.dialogMenuVisible = false;
      }
      // 2.刷新列表数据
      this.fetchPermissionMenuList();
      // 3.清空menu和permission表单
      this.menu = {...menuForm};
      this.permission = {...perForm};
    },
    // 重置路由
    async resetRoute() {
      const accessRoutes = await this.$store.dispatch("permission/generateRoutes", this.$store.getters.id);
      resetRouter();
      for (const route of accessRoutes) {
        this.$router.addRoute(route);
      }
    },
    // elementUI消息提示框
    remindMessage(type, message) {
      this.$message({
        type,
        message
      });
    },
    // 重新加载页面
    reloadPage() {
      location.reload();
    }
  }
};
</script>

<style scoped>
.icon-box > span {
  display: inline-block;
  padding: 11px;
}
.icon-box svg {
  cursor: pointer;
}
.icon-box .active {
  color: #409eff;
}
</style>