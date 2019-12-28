<template>
  <div class="app-container">
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <el-form
      :model="model"
      :rules="rules"
      ref="categoryForm"
      label-width="80px"
      @submit.native.prevent="save('categoryForm')"
    >
      <el-form-item label="父级分类">
        <el-select v-model="model.parent">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model.trim="model.name"></el-input>
      </el-form-item>
      <el-form-item label="路径">
        <el-input v-model="model.path"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="model.icon"></el-input>
        <Icon @icon="getIcon" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model.number="model.ordering"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Icon from "@/components/Icons";
import {
  getCategory,
  getCategories,
  updateCategory,
  createCategory
} from "@/api/category";

export default {
  components: { Icon },
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        icon: ""
      },
      parents: [],
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
    // 获取Icon
    getIcon(icon) {
      this.model.icon = icon;
    },
    // 保存数据
    save(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res;
          if (this.id) {
            // id存在,修改分类
            res = await updateCategory(this.id, this.model);
          } else {
            // id不存在,创建分类
            res = await createCategory(this.model);
          }
          if (res.code === 200) {
            this.$router.push("/category/list?refresh=1");
            this.$message({
              type: "success",
              message: "保存成功"
            });
          }
        }
      });
    },
    async fetch() {
      // 获取当前分类
      const res = await getCategory(this.id);
      if (res.code === 200) {
        this.model = Object.assign({}, this.model, res.data);
      }
    },
    async fetchParents() {
      // 获取父级分类选项
      const res = await getCategories();
      if (res.code === 200) {
        this.parents = res.data.categories;
      }
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchParents();
  }
};
</script>
