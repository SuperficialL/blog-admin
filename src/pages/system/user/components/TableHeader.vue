<template>
  <div class="table-header">
    <div class="title">
      <i class="el-icon-menu"></i>
      <span style="margin-left:5px;">用户列表</span>
    </div>
    <div class="operation">
      <el-input
        :placeholder="placeholder"
        v-model="searchVal"
        :size="size"
        clearable
        style="width:240px;margin-right:10px;"
        prefix-icon="el-icon-search"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button icon="el-icon-plus" :size="size" @click="updateForm(true)">
        添加用户
      </el-button>
    </div>
    <el-dialog
      :title="`${model._id ? '编辑' : '新增'}`"
      :visible.sync="dialogVisible"
      width="50%"
      top="6vh"
    >
      <el-form :model="model" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="昵称" prop="username">
          <el-input
            v-model="model.username"
            :disabled="Boolean(model._id)"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="model.email"
            :disabled="Boolean(model._id)"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否激活">
          <el-radio-group v-model="model.active">
            <el-radio :label="true">激活</el-radio>
            <el-radio :label="false">锁定</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="角色">
          <el-select
            v-model="model.roles"
            multiple
            filterable
            default-first-option
            placeholder="请选择角色"
          >
            <el-option
              v-for="item in roles"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <template v-if="!model._id">
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="model.password"
              show-password
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input
              v-model="model.password2"
              show-password
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('form')">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createUser, updateUser } from "@/api/users";
export default {
  name: "TableHeader",
  props: {
    placeholder: { type: String, default: "请输入查找内容" },
    size: { type: String, default: "mini" },
    roles: {
      type: Array,
      required: true
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.model.password2 !== "") {
          this.$refs.form.validateField("password2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.model.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      searchVal: "",
      dialogVisible: false,
      model: {},
      rules: {
        username: [
          {
            required: true,
            message: "昵称不可为空~",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    search() {},
    updateForm(isNew, row = {}) {
      if (!isNew) {
        this.model = row;
      } else {
        this.model = {};
      }
      this.dialogVisible = true;
    },
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res;
          if (this.model._id) {
            // id 存在,修改数据
            res = await updateUser(this.model._id, this.model);
            if (res.code === 200) {
              this.dialogVisible = false;
              this.$message({
                type: "success",
                message: res.message
              });
            }
          } else {
            // id不存在,创建数据
            res = await createUser(this.model);
            if (res.code === 200) {
              this.$parent.getUserList();
              this.dialogVisible = false;
              this.$message({
                type: "success",
                message: res.message
              });
            }
          }
        } else {
          this.dialogVisible = false;
          this.$message.error("验证失败~");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  .title {
    color: #666;
  }
  .operation {
    .el-dropdown {
      margin-left: 10px;
    }
  }
}
</style>
