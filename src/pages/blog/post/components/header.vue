<template>
  <div class="table-header">
    <div class="title">
      <i class="el-icon-menu"></i>
      <span style="margin-left:5px;">文章列表</span>
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
      <el-button icon="el-icon-plus" size="mini" @click="$router.push('posts/create')">
        添加文章
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableHeader",
  data() {
    return {
      searchVal: ""
    };
  },
  methods: {
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
