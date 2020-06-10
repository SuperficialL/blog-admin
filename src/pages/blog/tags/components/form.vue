<template>
  <el-dialog :title="isAdd ? '新增标签':'编辑标签'" :visible.sync="dialog" width="30%">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      style="text-align:left;"
      label-width="80px"
      size="mini"
    >
      <el-form-item label="名称" prop="title">
        <el-input v-model="form.title" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="别名">
        <el-input v-model="form.slug" placeholder="请输入别名"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { createTag, updateTag } from "@/api/tags";
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        title: "",
        slug: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "分类名不可为空~",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 重置表单
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        title: "",
        slug: ""
      };
    },

    // 提交表单
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.isAdd) {
            this.add();
          } else {
            this.update();
          }
        } else {
          return false;
        }
      });
    },

    // 添加数据
    async add() {
      const { ...tag } = this.form;
      const res = await createTag(tag);
      if (res.code) {
        this.resetForm();
        this.$message({
          showClose: true,
          type: "success",
          message: res.message,
          duration: 2500
        });
        this.$parent.$parent.fetch();
      }
      this.loading = false;
    },

    // 修改数据
    async update() {
      const { _id, ...tag } = this.form;
      const res = await updateTag(_id, tag);
      if (res.code) {
        this.resetForm();
        this.$message({
          showClose: true,
          type: "success",
          message: res.message,
          duration: 2500
        });
        this.sup_this.fetch();
      }
      this.loading = false;
    },

    // 取消表单
    cancel() {
      this.resetForm();
    }
  }
};
</script>