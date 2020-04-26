<template>
  <div class="app-container">
    <!--工具条-->
    <table-header ref="tHeader" :roles="roles" />
    <div class="content">
      <el-table
        :data="users"
        v-loading="loading"
        ref="multipleTable"
        border
        highlight-current-row
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="55">
        </el-table-column>
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

        <el-table-column width="80" align="center" label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" width="45" height="45" />
          </template>
        </el-table-column>

        <el-table-column width="180" align="center" sortable label="角色">
          <template slot-scope="scope">
            <template v-for="(role, index) in roles">
              <el-tag v-if="scope.row.roles.includes(role._id)" :key="index">
                {{ role.name }}
              </el-tag>
            </template>
          </template>
        </el-table-column>

        <el-table-column width="180" align="center" sortable label="邮箱">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="130"
          align="center"
          sortable
          prop="email"
          label="是否激活"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.active ? 'success' : 'danger'">
              {{ scope.row.active ? "激活" : "锁定" }}
            </el-tag>
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

        <el-table-column label="操作" align="center" width="140">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="编辑" placement="top">
              <el-button
                circle
                plain
                size="small"
                icon="el-icon-edit"
                @click="$refs.tHeader.updateForm(false, scope.row)"
              />
              <!-- :disabled="scope.row.email === '347106739@qq.com'" -->
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
              <!-- :disabled="scope.row.email === '347106739@qq.com'" -->
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 20px">
      <el-button size="small" @click="deleteUsers">删除</el-button>
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
import TableHeader from "./components/TableHeader";
import Pagination from "@/components/Pagination";
import { getUsers, deleteUser } from "@/api/users";
import { getRoles } from "@/api/roles";

export default {
  name: "UserList",
  components: { TableHeader, Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        per_page: 10
      },
      users: [],
      roles: [],
      total: 0,
      loading: false,
      multipleSelection: []
    };
  },
  methods: {
    deleteUsers() {
      const arr = [];
      this.multipleSelection.forEach(item => {
        const { _id } = item;
        arr.push(_id);
      });
    },
    handleSelectionChange(arr) {
      this.multipleSelection = arr;
    },
    async getUserList() {
      // 获取用户列表数据
      this.loading = true;
      const res = await getUsers(this.listQuery);
      if (res.code === 200) {
        this.loading = false;
        this.users = res.data.users;
        this.total = res.data.total;
      }
    },
    async getRoleList() {
      // 获取用户列表数据
      this.loading = true;
      const res = await getRoles(this.listQuery);
      if (res.code === 200) {
        this.roles = res.data.roles;
      }
    },
    searchUser(arr) {
    },
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
    this.getRoleList();
  }
};
</script>
