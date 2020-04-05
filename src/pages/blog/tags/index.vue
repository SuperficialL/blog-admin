<template>
  <div class="app-container">
    <table-header ref="tHeader" @add-tag="appendTag" />
    <div class="content">
      <el-table
        v-loading="loading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column align="center" label="序号" type="index" width="80">
          <template slot-scope="scope">
            <span>
              {{ (listQuery.page - 1) * listQuery.per_page + scope.$index + 1 }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="title"
          width="180px"
          sortable
          align="center"
          label="标签名称"
        ></el-table-column>

        <el-table-column
          prop="desc"
          width="180px"
          sortable
          align="center"
          label="描述"
        ></el-table-column>

        <el-table-column
          width="180px"
          align="center"
          sortable
          prop="created_time"
          label="创建时间"
        >
          <template slot-scope="scope">
            {{ scope.row.created_time | dateFormat }}
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          align="center"
          sortable
          prop="updated_time"
          label="最后修改时间"
        >
          <template slot-scope="scope">
            {{ scope.row.updated_time | dateFormat }}
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="编辑" placement="top">
              <el-button
                circle
                plain
                type="primary"
                size="small"
                icon="el-icon-edit"
                @click="$refs.tHeader.updateForm(false, scope.row)"
              />
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button
                circle
                plain
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="remove(scope.$index, scope.row)"
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
import TableHeader from "./components/TableHeader";
import Pagination from "@/components/Pagination";
import { getTags, deleteTag } from "@/api/tags";

export default {
  components: { TableHeader, Pagination },
  data() {
    return {
      list: [],
      total: 0,
      loading: false,
      listQuery: {
        page: 1,
        per_page: 10
      }
    };
  },
  methods: {
    appendTag(tag) {
      this.total++;
    },
    async fetch() {
      // 获取所有标签数据
      const res = await getTags(this.listQuery);
      if (res.code === 200) {
        this.total = res.data.total;
        this.list = res.data.tags;
      }
    },
    remove(index, row) {
      this.$confirm(`是否确定要删除标签 ${row.title} 吗?`, "提示", {
        confirmButtonText: "确认",
        cancleButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await deleteTag(row._id);
          if (res.code === 200) {
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
  }
};
</script>
