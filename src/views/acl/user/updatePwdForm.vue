<template>
  <div class="app-container">
    <el-form ref="user" :model="user" :rules="validateRules" label-width="120px">
      <el-form-item label="原密码" prop="originalPassword">
        <el-input type="password" v-model="user.originalPassword" />
      </el-form-item>

      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="user.newPassword" />
      </el-form-item>

      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="user.confirmPassword" />
      </el-form-item>

      <el-form-item>
        <router-link style="margin-right: 10px" :to="fromPath">
          <el-button size="small">取消</el-button>
        </router-link>
        <el-button size="small" :disabled="saveBtnDisabled" type="primary" @click="update">确定
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { updatePassword } from "@/api/acl/user";

const defaultForm = {
  originalPassword: "",
  newPassword: "",
  confirmPassword: ""
};

const validatePass = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error("密码不能小于6位"));
  } else {
    callback();
  }
};

export default {
  data() {
    return {
      user: {},
      fromPath: "",
      saveBtnDisabled: false, // 保存按钮是否禁用,
      validateRules: {
        originalPassword: [
          { required: true, trigger: "blur", validator: validatePass }
        ],
        newPassword: [
          { required: true, trigger: "blur", validator: validatePass }
        ],
        confirmPassword: [
          { required: true, trigger: "blur", validator: validatePass }
        ]
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vue => {
      vue.fromPath = from.path;
    });
  },
  created() {
    this.user = { ...defaultForm };
  },
  computed: {
    ...mapGetters(["id"])
  },
  methods: {
    // 进行修改
    update() {
      this.$refs.user.validate(async valid => {
        if (!valid) {
          return;
        }
        if (this.user.newPassword !== this.user.confirmPassword) {
          this.$message({ type: "error", message: "两次输入的密码不一致" });
          return;
        }
        this.saveBtnDisabled = true; // 防止表单重复提交

        try {
          await updatePassword(this.id, this.user.originalPassword, this.user.newPassword)
        } catch (error) {
          this.saveBtnDisabled = false;
          return;
        }

        this.$message({ type: "success", message: "修改成功，请重新登录" });
        await this.$store.dispatch("user/logout");
        this.$router.push({ path: "/login" });
      });
    }
  }
};
</script>
