<template>
  <div class="app-container">
    <table-header ref="tHeader" />
    <!--

    <el-button type="text" @click="dialogVisible = true">
      点击打开 Dialog
    </el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog> -->

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
          label="音乐名"
        ></el-table-column>

        <el-table-column
          prop="author"
          width="180px"
          sortable
          align="center"
          label="作者"
        ></el-table-column>

        <el-table-column
          prop="cover"
          width="180px"
          sortable
          align="center"
          label="封面"
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
              <!-- <el-button
                type="primary"
                size="small"
                icon="el-icon-edit"
                @click="$router.push(`/tags/edit/${scope.row._id}`)"
              /> -->
              <el-button
                type="primary"
                size="small"
                icon="el-icon-edit"
                @click="$refs.tHeader.updateForm(false, scope.row)"
              />
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button
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
import TableHeader from "./components/index";
import Pagination from "@/components/Pagination";
import { getMusics, deleteMusic } from "@/api/music";

export default {
  components: { TableHeader, Pagination },
  data() {
    return {
      list: [{ title: "title" }],
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
      const res = await getMusics(this.listQuery);
      if (res.code === 200) {
        // this.total = res.data.total;
        // this.list = res.data.musics;
      }
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
