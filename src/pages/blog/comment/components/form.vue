<template>
  <el-dialog :title="isAdd ? '编辑评论' : '新增评论'" :visible.sync="dialog" width="30%">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      style="text-align:left;"
      label-width="100px"
      size="mini"
    >
      <el-form-item label="评论人" prop="username">
        <el-input v-model="form.author.name" placeholder="请输入评论人"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.author.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>

      <el-form-item label="网站">
        <el-input v-model="form.author.site" placeholder="请输入评论人网站"></el-input>
      </el-form-item>

      <el-form-item label="所属文章">
        <el-select v-model="form.article_id">
          <el-option v-for="item in articles" :key="item._id" :label="item.title" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="内容">
        <el-input v-model="form.content" placeholder="请输入评论内容"></el-input>
      </el-form-item>

      <el-form-item label="点赞数">
        <el-input v-model="form.likes" placeholder="请输入评论点赞数"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { createComment, updateComment } from "@/api/comments";
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    comments: {
      type: Array,
      required: true
    },
    articles: {
      type: Array,
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
        author: {
          name: "",
          email: "",
          site: ""
        },
        content: "",
        agent: "",
        likes: 0,
        article_id: ""
      },
      rules: {
        name: [
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
        author: {
          name: "",
          email: "",
          site: ""
        },
        content: "",
        likes: 0,
        article_id: ""
      };
    },

    // 提交表单
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.isAdd) {
            this.add();
          } else this.update();
        } else {
          return false;
        }
      });
    },

    // 添加数据
    async add() {
      this.form.agent = navigator.userAgent;
      const res = await createComment(this.form);
      if (res.code) {
        this.resetForm();
        this.$message({
          showClose: true,
          type: "success",
          message: res.message,
          duration: 2500
        });
        this.loading = false;
        this.$parent.$parent.fetch();
      } else {
        this.loading = false;
      }
    },

    // 修改数据
    async update() {
      const res = await updateComment(this.form._id, { comment: this.form });
      if (res.code) {
        this.resetForm();
        this.$message({
          showClose: true,
          type: "success",
          message: res.message,
          duration: 2500
        });
        this.loading = false;
        this.sup_this.fetch();
      } else {
        this.loading = false;
      }
    },

    // 取消表单
    cancel() {
      this.resetForm();
    }
  }
};
</script>