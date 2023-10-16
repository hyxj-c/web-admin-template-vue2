<template>
  <div style="margin: 20px 20px">
    <el-tree
      :data="data"
      show-checkbox
      :default-checked-keys="checkedKey"
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps"
    ></el-tree>

    <el-row style="margin: 20px">
      <router-link style="margin-right: 10px" :to="'/acl/role/list'">
        <el-button size="small">取消</el-button>
      </router-link>
      <el-button size="small" :disabled="saveBtnDisabled" type="primary" @click="save" v-if="hasPerm('role.assignPermission')">保存</el-button>
    </el-row>
  </div>
</template>

<script>
import { getPermissionTree } from "@/api/acl/menu";
import { doAssignPermission } from "@/api/acl/role";

export default {
  data() {
    return {
      saveBtnDisabled: false,
      data: [],
      checkedKey: [],
      roleId: "",
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.roleId = this.$route.params.id;
        this.fetchDataById(this.roleId);
      }
    },
    // 根据角色id查询权限数据
    fetchDataById(roleId) {
      getPermissionTree(roleId).then(response => {
        this.data = response.data.item;
        this.setCheckedKey(this.data);
      });
    },
    // 设置选中的key
    setCheckedKey(treeList) {
      for (const item of treeList) {
        // 只把最低的子级添加到选中的key里面，不添加父级，若添加了父级，tree组件则会把所有的子级都选中
        if (item.selected && item.children.length === 0) {
          this.checkedKey.push(item.id);
        }
        if (item.children) {
          this.setCheckedKey(item.children);
        }
      }
    },
    // 调用接口进行保存
    save() {
      this.saveBtnDisabled = true;
      const keys = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
        
      doAssignPermission(this.roleId, keys).then(response => {
        this.$message({ type: "success", message: "保存成功" });
        this.$router.push({ path: "/acl/role/list" });
      }).catch(error => {
        this.saveBtnDisabled = false;
      });
    }
  }
};
</script>
