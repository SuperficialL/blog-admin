<template>
  <div class="app-container">
    <table-header ref="tHeader" />
    <div class="content">
      <el-table
        v-loading="loading"
        :data="tags"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column align="center" label="序号" width="80">
          <template slot-scope="scope">
            <span>{{ (listQuery.page - 1) * listQuery.per_page + scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="title" sortable align="center" label="标签名称"></el-table-column>

        <el-table-column prop="slug" sortable align="center" label="别名"></el-table-column>

        <el-table-column align="center" sortable prop="created_time" label="创建时间">
          <template slot-scope="{ row }">{{ row.created_time | dateFormat }}</template>
        </el-table-column>

        <el-table-column align="center" sortable prop="updated_time" label="最后修改时间">
          <template slot-scope="{ row }">{{ row.updated_time | dateFormat }}</template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="{ row, index }">
            <el-tooltip effect="dark" content="编辑" placement="top">
              <edit :item="row" :sup_this="sup_this" />
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button
                circle
                plain
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="remove(index, row)"
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
import TableHeader from "./components/header";
import Edit from "./components/edit";
import Pagination from "@/components/Pagination";
import { getTags, deleteTag } from "@/api/tags";

export default {
  components: { TableHeader, Edit, Pagination },
  data() {
    return {
      tags: [],
      loading: false,
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
      // 获取所有标签数据
      const res = await getTags(this.listQuery);
      if (res.code) {
        const {
          data,
          pagination: { total, page, per_page }
        } = res.result;
        this.tags = data;
        this.listQuery = {
          page,
          per_page
        };
        this.total = total;
        this.loading = false;
      }
    },
    remove(index, row) {
      this.$confirm(`是否确定要删除标签 ${row.title} 吗?`, "提示", {
        confirmButtonText: "确认",
        cancleButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.loading = true;
          const res = await deleteTag(row._id);
          if (res.code) {
            this.$message({
              type: "success",
              message: res.message
            });
            this.tags.splice(index, 1);
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  },
  created() {
    this.fetch();
  }
};
</script>
