<template>
  <div class="app-container">
    <el-form ref="role" :model="role" :rules="validateRules" label-width="120px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="role.name" />
      </el-form-item>
      <el-form-item>
        <router-link style="margin-right: 10px" :to="'/acl/role/list'">
          <el-button size="small">取消</el-button>
        </router-link>
        <el-button size="small" :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {save, getById, updateById} from "@/api/acl/role";

const defaultForm = {
  name: ""
};

export default {
  data() {
    return {
      role: defaultForm,
      saveBtnDisabled: false, // 保存按钮是否禁用,
      validateRules: {
        name: [
          { required: true, trigger: "blur", message: "角色名必须输入" }
        ]
      }
    };
  },
  // 生命周期方法（在路由切换，组件不变的情况下不会被调用）
  created() {
    this.init();
  },
  methods: {
    // 表单初始化
    init() {
      // 根据路由是否携带id判断是新增还是修改
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        this.fetchDataById(id);
      } else {
        // 对象拓展运算符：拷贝对象，而不是赋值对象的引用
        this.role = { ...defaultForm };
      }
    },
    // 根据id查询记录
    fetchDataById(id) {
      getById(id).then(response => {
        this.role = response.data.item;
      });
    },
    // 新增或修改
    saveOrUpdate() {
      this.$refs.role.validate(async valid => {
        if (!valid) {
          return;
        }
        this.saveBtnDisabled = true; // 防止表单重复提交
        try {
          // 根据是否有用户id判断是新增还是修改
          if (this.role.id) {
            await updateById(this.role);
            this.$message({ type: "success", message: "修改成功" });
          } else {
            await save(this.role);
            this.$message({ type: "success", message: "添加成功" });
          }
          this.$router.push({ path: "/acl/role/list" });
        } catch (error) {
          this.saveBtnDisabled = false;
        }
      });
    }
  }
};
</script>
