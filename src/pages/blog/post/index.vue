<template>
  <div class="app-container">
    <table-header ref="tHeader" :categories="categories" />
    <div class="content">
      <el-table v-loading="loading" ref="multipleTable" :data="articles" border>
        <el-table-column align="center" label="序号" width="60">
          <template slot-scope="{ row, $index }">
            <span>
              {{ (listQuery.page - 1) * listQuery.per_page + $index + 1 }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          width="200px"
          show-overflow-tooltip
          align="center"
          label="标题"
        >
          <template slot-scope="{ row }">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="分类">
          <template slot-scope="{ row }">
            <span>{{ row.category?row.category.name:"" }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="标签">
          <template slot-scope="{ row }">
            <el-tag size="small" v-for="(tag, index) in row.tags" :key="index">
              {{ tag.title }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="状态">
          <template slot-scope="{ row }">
            <el-tag
              size="small"
              effect="dark"
              :type="row.status ? 'success' : 'danger'"
            >
              {{ row.status | statusFilter }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="访问量">
          <template slot-scope="{ row }">
            <span>{{ row.views }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="点赞数">
          <template slot-scope="{ row }">
            <span>{{ row.likes }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="评论数">
          <template slot-scope="{ row }">
            <span>{{ row.comments }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作">
          <template slot-scope="{ row }">
            <el-tooltip effect="dark" content="编辑" placement="top">
              <el-button
                circle
                plain
                type="primary"
                size="small"
                icon="el-icon-edit"
                class="del-btn"
                @click="$router.push(`posts/edit/${row._id}`)"
              />
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button
                circle
                plain
                type="danger"
                size="small"
                icon="el-icon-delete"
                class="del-btn"
                @click="handleDel(scope.$index, scope.row)"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.per_page"
      @pagination="fetch"
    />
  </div>
</template>

<script>
import { getArticles, deleteArticle } from "@/api/articles";
import { getCategories } from "@/api/category";
import Pagination from "@/components/Pagination";
import TableHeader from "./components/header";

export default {
  name: "PostList",
  components: { TableHeader, Pagination },
  data() {
    return {
      articles: [],
      categories: [],
      total: 0,
      loading: false,
      listQuery: {
        page: 1,
        per_page: 10
      },
      SearchVal: ""
    };
  },
  methods: {
    async fetch() {
      this.loading = true;
      const res = await getArticles(this.listQuery);
      if (res.code) {
        const { data, pagination: { total,page,per_page } } = res.result;
        this.articles = data;
        this.listQuery = {
          page,
          per_page
        };
        this.total = total;
        this.loading = false;
      }
    },

    async fetchCategories() {
      this.loading = true;
      const res = await getCategories();
      if (res.code) {
        const { data } = res.result;
        this.categories = data;
        this.loading = false;
      }
    },

    async handleDel(index, row) {
      this.$confirm(`此操作将永久删除 ${row.title} 这篇文章?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "danger"
      })
        .then(async () => {
          this.loading = true;
          const res = await deleteArticle(row._id);
          if (res.code === 200) {
            this.loading = false;
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.list.splice(index, 1);
          }
        })
        .catch(() => {
          this.loading = false;
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
