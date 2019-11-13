<template>
  <div>
    <h1>{{id? '编辑':'新建'}}评论</h1>
    <el-form
      :model="model"
      :rules="rules"
      ref="commentForm"
      label-width="100px"
      @submit.native.prevent="save('commentForm')"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="model.username"></el-input>
      </el-form-item>

      <el-form-item label="所属文章">
        <el-select v-model="model.article_id">
          <el-option
            v-for="article in articles"
            :key="article._id"
            :value="article._id"
            :label="article.title"
          ></el-option>
        </el-select>
        <!-- <el-input v-model="model.article_id"></el-input> -->
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="model.email"></el-input>
      </el-form-item>

      <el-form-item label="评论内容" prop="content">
        <el-input type="textarea" :autosize="{ minRows: 2}" v-model="model.content"></el-input>
      </el-form-item>

      <!-- <el-form-item label="创建时间">
        <el-date-picker v-model="model.created_time" type="datetime" placeholder="选择日期时间" readonly></el-date-picker>
      </el-form-item>
      <el-form-item label="最近修改时间">
        <el-date-picker
          v-model="model.updated_time"
          type="datetime"
          placeholder="选择日期时间"
          align="left"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>-->

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getComment, updateComment, createComment } from "@/api/comments";
import { getArticles } from "@/api/articles";
export default {
  name: "UserDetail",
  props: ["id"],
  data() {
    return {
      model: {},
      articles: [],
      loading: false,
      rules: {
        username: [
          {
            message: "评论用户名不可为空~",
            required: true,
            trigger: "blur"
          }
        ],
        email: [
          {
            message: "评论邮箱不可为空~",
            required: true,
            trigger: "blur"
          },
          {
            type: "email",
            message: "评论邮箱格式不正确~",
            trigger: "blur"
          }
        ],
        content: [
          {
            message: "评论内容不可为空~",
            required: true,
            trigger: "blur"
          }
        ]
      },

      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  methods: {
    // 获取评论数据
    async fetch() {
      const res = await getComment(this.id);
      if (res.code === 200) {
        console.log(res, "res");
        this.model = res.data.comment;
      }
    },

    // 获取文章数据
    async fetchArticles() {
      const res = await getArticles();
      if (res.code === 200) {
        this.articles = res.data.articles;
      }
    },

    // 更新 or 创建评论
    save(formName) {
      this.$refs[formName].validate(async valid => {
        console.log(valid);
        if (valid) {
          let res;
          if (this.id) {
            res = await updateComment(this.id, this.model);
          } else {
            res = await createComment(this.model);
          }
          if (res.code === 200) {
            this.$router.push("/comment/list?refresh=1");
            this.$message({
              type: "success",
              message: res.message
            });
          }
        }
      });
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchArticles();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
  }
}
</style>
