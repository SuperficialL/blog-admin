<template>
  <div class="table-header">
    <div class="title">
      <i class="el-icon-menu"></i>
      <span style="margin-left:5px;">评论列表</span>
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
      <el-button type="danger" size="mini" @click="delMany">删除</el-button>
      <el-button icon="el-icon-plus" size="mini" @click="$refs.form.dialog = true">
        添加评论
      </el-button>
    </div>
    <eForm ref="form" :comments="comments" :articles="articles" :is-add="true"/>
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
    comments: {
      type: Array,
      required: true
    },
    articles: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchVal: ""
    };
  },
  methods: {
    delMany() {
      if (this.$parent.multipleSelection) {
        const count = this.$parent.multipleSelection.length;
        this.$confirm("此操作将删除" + count + "条数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$parent.hadleDelMany();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "删除失败!"
            });
          });
      } else {
        this.$message({
          type: "info",
          message: "请先选择数据"
        });
      }
    }
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
