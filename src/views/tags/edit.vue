<template>
  <div>
    <h1>{{id?'编辑':'新建'}}标签</h1>
    <el-form
      :model="model"
      :rules="rules"
      ref="tagForm"
      label-width="80px"
      @submit.native.prevent="save('tagForm')"
    >
      <el-form-item label="名称" prop="title">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getTag, updateTag, createTag } from "@/api/tags";

export default {
  name: "EditTag",
  props: {
    id: {}
  },
  data() {
    return {
      loading: false,
      model: {},
      rules: {
        title: [
          {
            required: true,
            message: "标签名不可为空~",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res;
          if (this.id) {
            // id存在,修改分类
            res = await updateTag(this.id, this.model);
          } else {
            // id不存在,创建分类
            res = await createTag(this.model);
          }
          if (res.code) {
            this.$router.push("/tags/list?refresh=1");
            this.$message({
              type: "success",
              message: "保存成功"
            });
          }
        }
      });
    },
    async fetch() {
      // 获取当前标签
      const res = await getTag(this.id);
      if (res.code === 200) {
        this.model = res.data;
      }
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
  }
}
</style>

