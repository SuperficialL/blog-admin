<template>
  <div class="table-header">
    <div class="title">
      <i class="el-icon-menu"></i>
      <span style="margin-left:5px;">博文列表</span>
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
      <el-button
        icon="el-icon-plus"
        :size="size"
        @click="$router.push('/blog/post/create')"
      >
        添加博文
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableHeader",
  props: {
    placeholder: { type: String, default: "请输入查找内容" },
    size: { type: String, default: "mini" }
  },
  data() {
    return {
      searchVal: "",
      dialogVisible: false,
      loading: false
    };
  },
  methods: {
    search() {}
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
