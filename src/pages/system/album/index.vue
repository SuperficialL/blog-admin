<template>
  <div class="app-container">
    <table-header ref="tHeader" />
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

        <el-table-column sortable align="center" label="图片">
          <template slot-scope="scope">
            <img
              :src="'http://statices.zhangwurui.net/'+scope.row.key"
              width="32"
              height="32"
              :alt="scope.row.key"
            />
          </template>
        </el-table-column>

        <el-table-column prop="key" sortable align="center" label="名称"></el-table-column>

        <el-table-column prop="size" sortable align="center" label="文件大小"></el-table-column>

        <el-table-column prop="type" width="180px" sortable align="center" label="文件类型"></el-table-column>

        <el-table-column align="center" sortable label="最后更新时间">
          <template slot-scope="scope">{{ scope.row.created_time|dateFormat }}</template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <edit :sup_this="sup_this" :item="row" />
            <el-button
              plain
              circle
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="remove(scope.$index, scope.row)"
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
import Edit from "./components/edit";
import Pagination from "@/components/Pagination";
import { getPictures, deletePicture } from "@/api/pictures";

export default {
  name: "Album",
  components: { TableHeader,Edit, Pagination },
  data() {
    return {
      list: [],
      total: 0,
      loading: false,
      dialogVisible: false,
      sup_this: this,
      listQuery: {
        page: 1,
        per_page: 10
      }
    };
  },
  methods: {
    async fetch() {
      // 获取所有标签数据
      this.loading = true;
      const res = await getPictures(this.listQuery);
      if (res.code) {
        const {
          result: {
            data,
            pagination: { total }
            // pagination: { page, per_page, total, total_page }
          }
        } = res;
        this.list = data;
        this.total = total;
      }
      this.loading = false;
    },

    updateFrom(flag) {
      // 更新表单，通过判断flag来确定是新增还是修改
    },
    remove(index, row) {
      this.$confirm(`是否确定要删除音乐 ${row.title} 吗?`, "提示", {
        confirmButtonText: "确认",
        cancleButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await deletePicture(row._id);
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
