<template>
  <div class="table-header">
    <div class="title">
      <i class="el-icon-menu"></i>
      <span style="margin-left:5px;">分类列表</span>
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
        添加分类
      </el-button>
    </div>
    <el-dialog
      :title="`${model._id ? '编辑' : '新增'}分类`"
      :visible.sync="dialogVisible"
      width="50%"
      top="6vh"
    >
      <el-form
        :model="model"
        :rules="rules"
        ref="categoryForm"
        label-width="80px"
      >
        <el-form-item label="父级分类">
          <el-select v-model="model.parent" value-key="name">
            <el-option
              v-for="item in parents"
              :key="item._id"
              :label="item.name"
              :value="item"
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
          <el-popover placement="bottom-start" width="560.5" trigger="click">
            <icon-select ref="iconSelect" @selected="selected" />
            <el-input
              slot="reference"
              v-model="model.icon"
              placeholder="点击选择图标"
              readonly
            >
              <i
                v-if="model.icon"
                slot="prefix"
                :class="model.icon"
                class="el-input__icon iconfont"
              />
              <i v-else slot="prefix" class="el-icon-search el-input__icon" />
            </el-input>
          </el-popover>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model.number="model.ordering"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('categoryForm')">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import IconSelect from "@/components/IconSelect";
import {
  getCategory,
  getCategories,
  updateCategory,
  createCategory
} from "@/api/category";
export default {
  name: "TableHeader",
  components: {
    IconSelect
  },
  props: {
    placeholder: { type: String, default: "请输入查找内容" },
    size: { type: String, default: "mini" }
  },
  data() {
    return {
      searchVal: "",
      dialogVisible: false,
      loading: false,
      listQuery: {
        page: 1,
        per_page: 10
      },
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
    updateForm(isNew, row = {}) {
      if (!isNew) {
        this.model = row;
      } else {
        this.model = {
          icon: ""
        };
      }
      this.dialogVisible = true;
    },
    // 获取Icon
    selected(icon) {
      this.model.icon = icon;
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
    },
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res;
          if (this.model._id) {
            // id 存在,修改数据
            res = await updateCategory(this.model._id, this.model);
          } else {
            // id不存在,创建数据
            res = await createCategory(this.model);
            this.$emit("add-category", res.data);
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
    this.fetchParents();
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
