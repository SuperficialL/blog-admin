<template>
  <div class="app-container">
    <!--工具条-->
    <table-header ref="tHeader" :comments="comments" :articles="articles" />
    <div class="content">
      <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="comments"
        border
        highlight-current-row
        style="width:100%;"
      >
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" label="序号" type="index" width="80">
          <template slot-scope="scope">
            <span>{{ (listQuery.page - 1) * listQuery.per_page + scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="头像">
          <template slot-scope="{ row }">
            <img :src="row.author.email | buildAvatar" width="32" height="32" />
          </template>
        </el-table-column>

        <el-table-column align="center" sortable label="昵称">
          <template slot-scope="{ row }">{{row.author.name}}</template>
        </el-table-column>

        <el-table-column sortable align="center" label="邮箱">
          <template slot-scope="{ row }">{{row.author.email}}</template>
        </el-table-column>

        <el-table-column align="center" sortable label="状态">
          <template slot-scope="{ row }">
            <el-tag
              effect="dark"
              :type="row.status ? 'success' : 'danger'"
            >{{ row.status | statusFilter }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" sortable prop="created_time" label="评论时间">
          <template slot-scope="{ row }">
            <span>{{ row.created_time | dateFormat }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="230">
          <template slot-scope="{ row }">
            <el-tooltip effect="dark" content="编辑" placement="top">
              <edit :comments="comments" :articles="articles" :item="row" :sup_this="sup_this" />
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button
                type="danger"
                size="small"
                circle
                plain
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
    ></pagination>
  </div>
</template>

<script>
import TableHeader from "./components/header";
import Edit from "./components/edit";
import Pagination from "@/components/Pagination";
import { getComments, deleteComment } from "@/api/comments";
import { getArticles } from "@/api/articles";
import gravatar from "gravatar";

export default {
  name: "CommentList",
  components: { TableHeader, Edit, Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        per_page: 10
      },
      sup_this: this,
      comments: [],
      articles: [],
      total: 0,
      loading: false
    };
  },

  filters: {
    buildAvatar(email) {
      return gravatar.url(email, { s: "32", r: "x", d: "retro" }, false);
    }
  },

  methods: {
    // 获取评论
    async fetch() {
      this.loading = true;
      const res = await getComments(this.listQuery);
      if (res.code) {
        const {
          data,
          pagination: { total, page, per_page }
        } = res.result;
        this.comments = data;
        this.listQuery = {
          page,
          per_page
        };
        this.total = total;
        this.loading = false;
      }
    },

    async fetchArticles() {
      // 获取文章列表数据
      this.loading = true;
      const res = await getArticles();
      if (res.code) {
        const { data } = res.result;
        this.articles = data;
        this.loading = false;
      }
    },

    // 删除
    async handleDel(index, row) {
      this.$confirm(`确认删除用户 ${row.username} 的评论吗?`, "提示", {
        confirmButtonText: "确认",
        cancleButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.loading = true;
          const res = await deleteComment(row._id);
          if (res.code) {
            this.loading = false;
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.list.splice(index, 1);
            this.total--;
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
    this.fetchArticles();
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  overflow-y: auto;
}
</style>