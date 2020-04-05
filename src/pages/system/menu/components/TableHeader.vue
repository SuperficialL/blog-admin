<template>
  <div class="table-header">
    <div class="title">
      <i class="el-icon-menu"></i>
      <span style="margin-left:5px;">菜单列表</span>
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
        添加菜单
      </el-button>
    </div>
    <el-dialog
      :title="`${model._id ? '编辑' : '新增'}菜单`"
      :visible.sync="dialogVisible"
      width="40%"
      top="6vh"
    >
      <el-form :model="model" size="mini" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="是否显示" prop="isShow">
          <el-radio-group v-model="model.isShow">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="model.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-popover placement="bottom-start" width="494.4" trigger="click">
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
          <el-input
            v-model.number="model.ordering"
            placeholder="排序"
          ></el-input>
        </el-form-item>
        <el-form-item label="内部菜单" prop="isMenu">
          <el-radio-group v-model="model.isMenu">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="链接路径">
          <el-input v-model="model.path" placeholder="链接路径"></el-input>
        </el-form-item>
        <el-form-item label="组件路径">
          <el-input
            v-model="model.components"
            placeholder="组件路径"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="父级菜单">
          <el-select v-model="model.parent" placeholder="请选择父级菜单">
            <el-option>
              <el-tree
                :data="menus"
                :props="defaultProps"
                @check-change="handleCheckChange"
              ></el-tree>
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="父级菜单">
          <select-tree
            v-model="model.parent"
            :options="menus"
            style="width: 494.4px;"
            placeholder="请选择父级菜单"
          />
          <!-- <el-tree
            :data="menus"
            :props="defaultProps"
            @check-change="handleCheckChange"
          ></el-tree> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submit('form')">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createMenu, updateMenu } from "@/api/menu";
import IconSelect from "@/components/IconSelect";
import SelectTree from "@/components/SelectTree";
export default {
  name: "TableHeader",
  props: {
    placeholder: { type: String, default: "请输入查找内容" },
    size: { type: String, default: "mini" },
    menus: {
      type: Array,
      required: true
    }
  },
  components: { SelectTree, IconSelect },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name"
      },
      searchVal: "",
      dialogVisible: false,
      model: {},
      rules: {
        name: [
          {
            required: true,
            message: "菜单名不可为空~",
            trigger: "blur"
          }
        ],
        icon: [
          {
            required: true,
            message: "图标不可为空",
            trigger: "blur"
          }
        ],
        isShow: {
          required: true,
          message: "权限方法不可为空",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    search() {},
    selected(icon) {
      this.model.icon = icon;
    },
    updateForm(isNew, row = {}) {
      if (!isNew) {
        this.model = row;
      } else {
        this.model = {
          isShow: true,
          icon: "",
          isMenu: true,
          parent: null
        };
      }
      this.dialogVisible = true;
    },
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res;
          if (this.model._id) {
            // id 存在,修改数据
            res = await updateMenu(this.model._id, this.model);
          } else {
            // id不存在,创建数据
            console.log(this.model, "model");
            res = await createMenu(this.model);
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
