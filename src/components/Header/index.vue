<template>
  <el-header>
    <el-input placeholder="请输入分类名称" v-model="searchVal" size="small" style="width:300px;">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
    <el-button type="success" icon="el-icon-refresh" size="medium">刷新</el-button>
    <el-button type="danger" icon="el-icon-plus" size="medium">新建</el-button>
    <el-dropdown trigger="click">
      <el-button>
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
    name: "Header",
    data() {
      return {
        searchVal: ""
      };
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