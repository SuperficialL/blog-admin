<template>
  <div class="app-container">
    <!-- <table-header ref="tHeader" /> -->
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
            <span>{{ (listQuery.page - 1) * listQuery.per_page + scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="key" sortable align="center" label="音乐名"></el-table-column>

        <el-table-column sortable align="center" label="文件大小">
          <template slot-scope="scope">{{ (scope.row.fsize / 1000 / 1000).toFixed(1) + "M" }}</template>
        </el-table-column>

        <el-table-column prop="mimeType" width="180px" sortable align="center" label="文件类型"></el-table-column>

        <el-table-column align="center" sortable label="最后更新时间">
          <template
            slot-scope="scope"
          >{{ Number(scope.row.putTime / (1000 * 1000 * 1000)) | dateFormat }}</template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="{ $index, row }">
            <!-- <edit :categories="categories" :sup_this="sup_this" :item="row" /> -->
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
      :page.sync="listQuery.page"
      :limit.sync="listQuery.per_page"
      @pagination="fetch"
    />
  </div>
</template>

<script>
import TableHeader from "./components/header";
import Pagination from "@/components/Pagination";
import { getMusices, deleteMusic } from "@/api/music";

export default {
  components: { TableHeader, Pagination },
  data() {
    return {
      list: [],
      total: 0,
      loading: false,
      dialogVisible: false,
      listQuery: {
        page: 1,
        per_page: 10
      }
    };
  },
  methods: {
    async fetch() {
      // 获取所有标签数据
      const res = await getMusices(this.listQuery);
      if (res.code) {
        // this.total = res.data.total;
        this.list = res.result;
      }
    },

    updateFrom(flag) {
      // 更新表单，通过判断flag来确定是新增还是修改
    },
    remove(index, row) {
      console.log(row,'row');
      this.$confirm(`是否确定要删除音乐 ${row.key} 吗?`, "提示", {
        confirmButtonText: "确认",
        cancleButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await deleteMusic(row._id);
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.list.splice(index, 1);
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
