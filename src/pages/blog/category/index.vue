<template>
  <div class="app-container">
    <table-header ref="tHeader" :categories="categories" />
    <div class="content">
      <el-table :data="categories" border>
        <el-table-column label="分类名" sortable align="center">
          <template slot-scope="{ row }">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="别名" sortable align="center">
          <template slot-scope="{ row }">
            <span>{{ row.slug }}</span>
          </template>
        </el-table-column>
        <el-table-column label="图标" align="center">
          <template slot-scope="{ row }">
            <i class="iconfont" :class="row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column align="center" label="排序" width="80">
          <template slot-scope="{ row }">
            <span>{{ row.ordering }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" sortable>
          <template slot-scope="{ row }">{{ row.created_time | dateFormat }}</template>
        </el-table-column>
        <el-table-column label="修改时间" align="center" sortable>
          <template slot-scope="{ row }">{{ row.updated_time | dateFormat }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
            <edit :categories="categories" :sup_this="sup_this" :item="row" />
            <el-button
              circle
              plain
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="remove(row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.current_page"
      :limit.sync="listQuery.per_page"
      @pagination="fetch"
    />
  </div>
</template>

<script>
import TableHeader from "./components/header";
import Edit from "./components/edit";
import Pagination from "@/components/Pagination";
import { getCategories, deleteCategory } from "@/api/category";
export default {
  components: {
    TableHeader,
    Edit,
    Pagination
  },
  data() {
    return {
      loading: false,
      categories: [],
      total: 0,
      sup_this: this,
      listQuery: {
        page: 1,
        per_page: 10
      }
    };
  },
  methods: {
    async fetch() {
      this.loading = true;
      // 获取所有分类数据
      const res = await getCategories(this.listQuery);
      if (res.code) {
        const {
          data,
          pagination: { total, page, per_page }
        } = res.result;
        this.total = total;
        this.listQuery = {
          page,
          per_page
        };
        this.categories = data;
        this.loading = false;
      }
    },
    remove(row) {
      this.$confirm(`是否确定要删除分类 ${row.name}?`, "提示", {
        confirmButtonText: "确认",
        cancleButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.loading = true;
          const res = await deleteCategory(row._id);
          if (res.code) {
            this.$message({
              type: "success",
              message: res.message
            });
            this.fetch();
          }
          this.loading = true;
        })
        .catch(() => {
          this.loading = true;
        });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss" scoped>
.content .icon {
  font-size: 23px;
}
</style>
