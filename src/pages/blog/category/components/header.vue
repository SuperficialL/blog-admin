<template>
  <div class="table-header">
    <div class="title">
      <i class="el-icon-menu"></i>
      <span style="margin-left:5px;">分类列表</span>
    </div>
    <div class="operation">
      <el-input
        v-model="searchVal"
        size="mini"
        clearable
        style="width:240px;margin-right:10px;"
        prefix-icon="el-icon-search"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button icon="el-icon-plus" size="mini" @click="$refs.form.dialog = true">
        添加分类
      </el-button>
    </div>
    <eForm ref="form" :categories="categories" :is-add="true"/>
  </div>
</template>

<script>
import eForm from "./form";
export default {
  name: "TableHeader",
  components: {
    eForm
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchVal: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
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
