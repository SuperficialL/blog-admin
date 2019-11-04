<template>
  <div class="app-container">
    <tool-bar />
    <div class="content">
      <el-table
        :data="categories"
        row-key="_id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <!-- <el-table-column
          align="center"
          label="序号"
          type="index"
          width="80"
        >
          <template slot-scope="scope">
            <span>{{(listQuery.page - 1) * listQuery.per_page + scope.$index + 1}}</span>
          </template>
        </el-table-column>-->
        <el-table-column prop="name" label="分类名称" align="center"></el-table-column>
        <el-table-column prop="path" label="路径" align="center"></el-table-column>
        <el-table-column prop="icon" label="图标" align="center"></el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.created_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="修改时间" align="center">
          <template slot-scope="scope">{{scope.row.created_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="编辑" placement="top">
              <el-button
                type="primary"
                size="small"
                @click="$router.push(`/category/edit/${scope.row._id}`)"
                icon="el-icon-edit"
              />
            </el-tooltip>

            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="remove(scope.row)"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.per_page"
      @pagination="fetch"
    />
  </div>
</template>

<script>
import ToolBar from "@/components/ToolBar";
import Pagination from "@/components/Pagination";
import { getCategories, deleteCategory } from "@/api/category";
import translateToTree from "@/utils/dataToTree";
export default {
  components: {
    ToolBar,
    Pagination
  },
  data() {
    return {
      loading: false,
      total: 0,
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
      if (res.code === 200) {
        const data = res.data.categories;
        this.total = res.data.total;
        this.categories = translateToTree(data);
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


<style lang="scss" scoped>
.app-container {
  overflow: hidden;
  height: calc(100vh - 84px);
  .content {
    height: calc(100% - 60px);
    padding-bottom: 64px;
  }
}
</style>