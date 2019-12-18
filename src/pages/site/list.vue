<template>
  <div class="app-container">
    <!--工具条-->
    <tool-bar />
    <div class="content">
      <el-table
        :default-sort="{ prop: 'created_time', order: 'descending' }"
        :data="list"
        v-loading="loading"
        ref="multipleTable"
        border
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column align="center" label="序号" type="index" width="80">
          <template slot-scope="scope">
            <span>{{
              (listQuery.page - 1) * listQuery.per_page + scope.$index + 1
            }}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="140"
          align="center"
          sortable
          prop="username"
          label="昵称"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>

        <el-table-column width="140" align="center" label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" width="45" height="45" />
          </template>
        </el-table-column>

        <el-table-column
          width="180"
          align="center"
          sortable
          prop="email"
          label="邮箱"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          sortable
          prop="created_time"
          label="注册时间"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.created_time | dateFormat }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          sortable
          prop="updated_time"
          label="登录时间"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.updated_time | dateFormat }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="230">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-edit"
                @click="$router.push(`/user/edit/${scope.row._id}`)"
              />
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button
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
      @pagination="getUserList"
    />
  </div>
</template>

<script>
import ToolBar from "@/components/ToolBar";
import Pagination from "@/components/Pagination";
import { getUserList, deleteUser } from "@/api/users";

export default {
  name: "site",
  components: { ToolBar, Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        per_page: 10
      },
      list: [],
      total: 0,
      loading: false
    };
  },
  methods: {
    async getUserList() {
      // 获取用户列表数据
      this.loading = true;
      const res = await getUserList(this.listQuery);
      if (res.code === 200) {
        this.loading = false;
        this.list = res.data.users;
        this.total = res.data.total;
      }
    },
    searchUser() {},
    // 删除
    async handleDel(index, row) {
      this.$confirm(`确认删除用户 ${row.username} 吗?`, "提示", {
        confirmButtonText: "确认",
        cancleButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.loading = true;
          const res = await deleteUser(row._id);
          if (res.code) {
            this.loading = false;
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
    this.getUserList();
  }
};
</script>
