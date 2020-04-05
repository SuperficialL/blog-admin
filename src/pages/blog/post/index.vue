<template>
  <div class="app-container">
    <table-header ref="tHeader" />
    <div class="content">
      <el-table v-loading="loading" ref="multipleTable" :data="list" border>
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

        <el-table-column width="100px" align="center" label="作者">
          <template slot-scope="{ row }">
            <span>{{ row.author.username }}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="center" label="分类">
          <template slot-scope="{ row }">
            <span>{{ row.category.name }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="标签">
          <template slot-scope="{ row }">
            <el-tag size="small" v-for="(tag, index) in row.tags" :key="index">
              {{ tag.title }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column width="80px" align="center" label="状态">
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

        <el-table-column width="80px" align="center" label="访问量">
          <template slot-scope="{ row }">
            <span>{{ row.views }}</span>
          </template>
        </el-table-column>

        <el-table-column width="80px" align="center" label="点赞数">
          <template slot-scope="{ row }">
            <span>{{ row.likes }}</span>
          </template>
        </el-table-column>

        <el-table-column width="80px" align="center" label="评论数">
          <template slot-scope="{ row }">
            <span>{{ row.comments }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="编辑" placement="top">
              <el-button
                circle
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="$router.push(`/blog/post/edit/${scope.row._id}`)"
              />
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button
                circle
                type="danger"
                size="mini"
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
      @pagination="getList"
    />
  </div>
</template>

<script>
import { getArticles, deleteArticle } from "@/api/articles";
import Pagination from "@/components/Pagination";
import TableHeader from "./components/TableHeader";

export default {
  name: "PostList",
  components: { TableHeader, Pagination },
  data() {
    return {
      list: null,
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
    async getList() {
      this.loading = true;
      const res = await getArticles(this.listQuery);
      this.loading = false;
      if (res.code === 200) {
        this.list = res.data.articles;
        this.total = res.data.total;
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
    this.getList();
  }
};
</script>