<template>
  <div class="table-header">
    <div class="title">
      <i class="el-icon-menu"></i>
      <span style="margin-left:5px;">标签列表</span>
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
        添加评论
      </el-button>
    </div>
    <el-dialog
      :title="`${model._id ? '编辑' : '新增'}评论`"
      :visible.sync="dialogVisible"
      width="50%"
      top="6vh"
    >
      <el-form :model="model" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="作者" prop="username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="model.email"></el-input>
        </el-form-item>
        <el-form-item label="文章" prop="article_id">
          <el-select v-model="model.article_id">
            <el-option
              v-for="article in articles"
              :key="article._id"
              :value="article._id"
              :label="article.title"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="model.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="true"
            active-text="发表"
            inactive-text="草稿"
            :inactive-value="false"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="model.content"></el-input>
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
import { createComment, updateComment } from "@/api/comments";
import { getArticles } from "@/api/articles";
export default {
  name: "TableHeader",
  props: {
    placeholder: { type: String, default: "请输入查找内容" },
    size: { type: String, default: "mini" }
  },
  data() {
    return {
      searchVal: "",
      dialogVisible: false,
      loading: false,
      articles: [],
      listQuery: {
        page: 1,
        per_page: 10
      },
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
          {
            required: true,
            message: "邮箱不可为空~",
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
    async getArticleList() {
      this.loading = true;
      const res = await getArticles(this.listQuery);
      this.loading = false;
      if (res.code === 200) {
        this.articles = res.data.articles;
        this.total = res.data.total;
        this.loading = false;
      }
    },
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res;
          if (this.model._id) {
            // id 存在,修改数据
            res = await updateComment(this.model._id, this.model);
          } else {
            // id不存在,创建数据
            res = await createComment(this.model);
            this.$emit("add-comment", res.data);
          }
          if (res.code === 200) {
            this.dialogVisible = false;
            this.loading = false;
            this.$message({
              type: "success",
              message: "保存成功~"
            });
          }
        } else {
          this.dialogVisible = false;
          this.$message.error("验证失败~");
        }
      });
    }
  },
  created() {
    this.getArticleList();
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

.article-body {
  width: 100%;
  padding: 10px;
  .article-wrap {
    height: 200px;
    overflow-y: scroll;
    .article-item {
      height: 30px;
      line-height: 30px;
      cursor: pointer;
    }
  }
}
</style>
