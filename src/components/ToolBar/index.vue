<template>
  <el-header>
    <el-input
      :placeholder="placeholder"
      v-model="searchVal"
      :size="size"
      style="width:300px;margin-right:10px;"
    >
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-button type="primary" icon="el-icon-search" :size="size" @click="search">查询</el-button>
    <el-button type="success" icon="el-icon-refresh" :size="size" @click="refresh">刷新</el-button>
    <el-button type="danger" icon="el-icon-plus" :size="size" @click="create">新建</el-button>
    <el-dropdown trigger="click">
      <el-button size="small">
        更多
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>测试1</el-dropdown-item>
        <el-dropdown-item>测试2</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script>
export default {
  name: "ToolBar",
  props: {
    placeholder: { type: String, default: "请输入查找内容" },
    size: { type: String, default: "small" }
  },
  data() {
    return {
      searchVal: ""
    };
  },
  methods: {
    search() {},
    refresh() {},
    create() {}
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  //   padding: 10px;
  line-height: 60px;
  text-align: right;
  .el-dropdown {
    margin-left: 10px;
  }
}
</style>