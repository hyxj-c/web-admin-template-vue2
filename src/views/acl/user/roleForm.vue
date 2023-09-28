<template>
  <div class="app-container">
    <el-checkbox
      style="margin-bottom: 15px"
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
    >全选</el-checkbox>
    <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRolesChange">
      <el-checkbox v-for="role in allRoles" :label="role.id" :key="role.id">{{role.name}}</el-checkbox>
    </el-checkbox-group>

    <el-row style="margin-top: 30px">
      <router-link style="margin-right: 10px" :to="'/acl/user/list'">
        <el-button size="small">取消</el-button>
      </router-link>
      <el-button size="small" :disabled="saveBtnDisabled" type="primary" @click="saveAssign">保存</el-button>
    </el-row>
  </div>
</template>

<script>
import { assignRole } from "@/api/acl/user";
import { getAll, getAssignedRoleIds } from "@/api/acl/role";

export default {
  data() {
    return {
      userId: "",
      checkedRoles: [], //已选中
      allRoles: [], //所有的
      checkAll: false,
      isIndeterminate: false, // 表示全选的不确定状态
      saveBtnDisabled: false // 保存按钮是否禁用
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.userId = this.$route.params.id;

        Promise.all([this.getAllRoles(), this.getRoleIdsByUserId(this.userId)]).then(() => {
          this.setCheckBoxState();
        });
      }
    },
    // 获取所有角色
    getAllRoles() {
      return getAll().then(response => {
        this.allRoles = response.data.item;
      });
    },
    // 获取这个用户的所有角色id
    getRoleIdsByUserId(userId) {
      return getAssignedRoleIds(userId).then(response => {
        this.checkedRoles = response.data.item;
      });
    },
    // 设置全选框的状态
    setCheckBoxState() {
      if (this.checkedRoles.length == this.allRoles.length) {
        this.checkAll = true;
      } else if (this.checkedRoles.length != 0) {
        this.isIndeterminate = true;
      }
    },
    // 保存角色分配
    saveAssign() {
      this.saveBtnDisabled = true; // 防止表单重复提交
      const ids = [...this.checkedRoles];
      assignRole(this.userId, ids).then(() => {
        this.$message({ type: "success", message: "保存成功" });
        this.$router.push({ path: "/acl/user/list" });
      }).catch(error => {
        this.saveBtnDisabled = false;
      });
    },
    // 处理全选的点击
    handleCheckAllChange(val) {
      let allRolesId = [];
      if (val) {
        this.allRoles.forEach(e => allRolesId.push(e.id));
      }
      this.checkedRoles = allRolesId;
      this.isIndeterminate = false;
    },
    // 处理点击角色
    handleCheckedRolesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allRoles.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.allRoles.length;
    }
  }
};
</script>
