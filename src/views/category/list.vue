<template>
  <div>
    <el-table
      :data="categories"
      row-key="_id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column align="center" label="序号" type="index" width="80">
        <template slot-scope="scope">
          <span>{{(listQuery.page - 1) * listQuery.per_page + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="分类名称" align="center"></el-table-column>
      <el-table-column prop="parent" label="父级分类" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/category/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getCategories, deleteCategory } from "@/api";

  export default {
    data() {
      return {
        loading: false,
        categories: [],
        listQuery: {
          page: 1,
          per_page: 10
        }
      };
    },
    methods: {
      async fetch() {
        // 获取所有分类数据
        const res = await getCategories();
        console.log(res);
        if (res.code === 200) {
          this.categories = res.data.categories;
        }
      },
      async remove(row) {
        this.$confirm(`是否确定要删除分类?"${row.name}"`, "提示", {
          confirmButtonText: "确认",
          cancleButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            const res = await deleteCategory(row._id);
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.fetch();
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除!"
            });
          });
      }
    },
    created() {
      this.fetch();
    }
  };
</script>
