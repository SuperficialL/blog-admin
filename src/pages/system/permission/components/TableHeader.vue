<template>
  <div class="table-header">
    <div class="title">
      <i class="el-icon-menu"></i>
      <span style="margin-left:5px;">权限列表</span>
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
        添加权限
      </el-button>
    </div>
    <el-dialog
      :title="`${model._id ? '编辑' : '新增'}权限`"
      :visible.sync="dialogVisible"
      width="50%"
      top="6vh"
    >
      <el-form :model="model" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="方法" prop="method">
          <el-input v-model="model.method"></el-input>
        </el-form-item>
        <el-form-item label="方法">
          <el-select v-model="model.parent" placeholder="请选择父级权限">
            <el-option
              v-for="item in permissions"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
          <!-- <el-input v-model="model.parent"></el-input> -->
        </el-form-item>
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
import { createPermission, updatePermission } from "@/api/permissions";
export default {
  name: "TableHeader",
  props: {
    placeholder: { type: String, default: "请输入查找内容" },
    size: { type: String, default: "mini" },
    permissions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchVal: "",
      dialogVisible: false,
      model: {},
      rules: {
        name: [
          {
            required: true,
            message: "权限名不可为空~",
            trigger: "blur"
          }
        ],
        method: [
          {
            required: true,
            message: "权限方法不可为空",
            trigger: "blur"
          }
        ]
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
            res = await updatePermission(this.model._id, this.model);
          } else {
            // id不存在,创建数据
            res = await createPermission(this.model);
            this.$parent.fetch();
          }
          if (res.code === 200) {
            this.dialogVisible = false;
            this.$message({
              type: "success",
              message: "保存成功~",
              offset: 0
            });
          }
        } else {
          this.dialogVisible = false;
          this.$message({
            type: "error",
            message: "验证失败~",
            offset: 0
          });
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
