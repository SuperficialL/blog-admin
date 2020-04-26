<template>
  <el-dialog :title="isAdd ? '编辑文章' : '新增文章'" :visible.sync="dialog" width="30%">
    <el-form :model="form" :rules="rules" ref="form" style="text-align:left;" label-width="80px" size="mini">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="别名">
        <el-input v-model="form.slug" placeholder="请输入别名"></el-input>
      </el-form-item>
      <el-form-item label="父级分类">
        <el-select v-model="form.parent">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图标">
        <el-popover placement="bottom-start" width="456" trigger="click">
          <icon-select ref="iconSelect" @selected="selected" />
          <el-input slot="reference" v-model="form.icon" placeholder="点击选择图标" readonly>
            <i
              v-if="form.icon"
              slot="prefix"
              :class="form.icon"
              class="el-input__icon iconfont"
            />
            <i v-else slot="prefix" class="el-icon-search el-input__icon" />
          </el-input>
        </el-popover>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.ordering"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import IconSelect from "@/components/IconSelect";
import {
  createCategory,
  updateCategory
} from "@/api/category";
export default {
  components: {
    IconSelect
  },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        name: "",
        slug: "",
        parent: null,
        icon: "",
        ordering: 100
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
    // 获取Icon
    selected(icon) {
      this.form.icon = icon;
    },

    // 重置表单
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        name: "",
        slug: "",
        parent:null,
        icon: "",
        ordering: 100
      };
    },

    // 提交表单
    submit() {
      this.$refs["form"].validate((valid) => {
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
      const res = await createCategory({category: this.form });
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
      const res = await updateCategory(this.form._id, { category: this.form });
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

    // 取消表单
    cancel() {
      this.resetForm();
    }
  }
};
</script>

<style>
  .el-form-item__content {
    text-align: left;
  }
</style>