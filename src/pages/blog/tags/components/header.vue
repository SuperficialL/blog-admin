<template>
  <div class="table-header">
    <div class="title">
      <i class="el-icon-menu"></i>
      <span style="margin-left:5px;">标签列表</span>
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
        添加标签
      </el-button>
    </div>
    <eForm ref="form" :is-add="true"/>
  </div>
</template>

<script>
import eForm from "./form";
export default {
  name: "TableHeader",
  components: {
    eForm
  },
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
