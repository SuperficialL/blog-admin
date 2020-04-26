<template>
  <div class="app-container">
    <table-header ref="tHeader" :permissions="permissions" />
    <div class="content">
      <el-row :gutter="28">
        <el-col :span="span">
          <!--表格渲染-->
          <el-table
            v-loading="loading"
            :data="roles"
            size="small"
            border
            style="width: 100%;"
            @current-change="handleCurrentChange"
          >
            <el-table-column label="序号" width="60" align="center">
              <template slot-scope="scope">
                <div>{{ scope.$index + 1 }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="名称" />
            <el-table-column v-if="table_show" prop="desc" label="描述" />
            <!-- <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <edit
                  v-if="checkPermission(['admin', 'role_all', 'role_edit'])"
                  :data="scope.row"
                  :sup_this="sup_this"
                />
                <el-popover
                  v-if="checkPermission(['admin', 'role_all', 'role_delete'])"
                  :ref="scope.row.id"
                  placement="top"
                  width="180"
                >
                  <p>确定删除本条数据吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button
                      size="mini"
                      type="text"
                      @click="$refs[scope.row.id].doClose()"
                      >取消</el-button
                    >
                    <el-button
                      :loading="Loading"
                      type="primary"
                      size="mini"
                      @click="subDelete(scope.row.id)"
                      >确定</el-button
                    >
                  </div>
                  <el-button
                    slot="reference"
                    :disabled="scope.row.id === 1"
                    type="danger"
                    size="mini"
                    >删除</el-button
                  >
                </el-popover>
              </template>
            </el-table-column> -->
          </el-table>
        </el-col>
        <el-col :span="8">
          <!-- v-if="show && checkPermission(['admin', 'role_all', 'role_edit'])" -->
          <el-card class="box-card">
            <!-- <div slot="header" class="clearfix">
              <span>菜单分配-{{ row_data.name }}</span>
              <el-button
                :loading="Loading"
                icon="el-icon-check"
                size="mini"
                type="success"
                style="float: right; padding: 4px 8px"
                @click="toSave"
                >保存</el-button
              >
            </div>
            <el-tree
              ref="menu"
              :data="menu_list"
              :default-checked-keys="menuIds"
              check-strictly
              show-checkbox
              accordion
              node-key="id"
              highlight-current
            >
            </el-tree> -->
          </el-card>
        </el-col>
        <el-col :span="8">
          <!-- v-if="show && checkPermission(['admin', 'role_all', 'role_edit'])" -->
          <el-card class="box-card">
            <!-- <div slot="header" class="clearfix">
              <span>权限分配-{{ row_data.name }}</span>
              <el-button
                :loading="Loading"
                icon="el-icon-check"
                size="mini"
                type="success"
                style="float: right; padding: 4px 8px"
                @click="
                  is_permissions = true;
                  toSave();
                "
                >保存</el-button
              >
            </div>
            <el-tree
              ref="permission"
              :data="permission_list"
              :default-checked-keys="permissionIds"
              show-checkbox
              accordion
              node-key="id"
              highlight-current
            >
            </el-tree> -->
          </el-card>
        </el-col>
      </el-row>
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
// import checkPermission from "@/utils/permission";
import Pagination from "@/components/Pagination";
import { getRoles, deleteRole } from "@/api/roles";
import { getPermissions } from "@/api/permissions";
import TableHeader from "./components/TableHeader";
// import edit from "./components/edit";

export default {
  name: "Permission",
  components: { TableHeader, Pagination },
  data() {
    return {
      roles: [],
      permissions: [],
      total: 0,
      loading: false,
      listQuery: {
        page: 1,
        per_page: 10
      },
      row_data: null,
      span: 24,
      show: false,
      is_permissions: false,
      table_show: true,
      Loading: false,
      sup_this: this,
      permission_list: [],
      menu_list: [],
      permissionIds: [],
      menuIds: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleCurrentChange(item) {
      // if (item.id !== 1) {
      if (this.show) {
        // 清空选中状态
        this.$refs.permission.setCheckedKeys([]);
        this.$refs.menu.setCheckedKeys([]);
      }
      this.span = 8;
      this.table_show = false;
      this.show = true;
      this.row_data = item;
      if (this.row_data) {
        this.permissionIds = this.row_data.permissions;
        this.menuIds = this.row_data.menus;
      }
      // } else {
      //   this.$message({
      //     showClose: true,
      //     type: "error",
      //     message: "默认管理员不可修改!",
      //     duration: 2500
      //   });
      // }
    },
    async fetch() {
      // 获取所有标签数据
      const res = await getRoles(this.listQuery);
      if (res.code === 200) {
        this.total = res.data.total;
        this.roles = res.data.roles;
      }
    },
    async fetchPermissions() {
      // 获取所有标签数据
      const res = await getPermissions(this.listQuery);
      if (res.code === 200) {
        this.permissions = res.data.permissions;
      }
    },
    remove(index, row) {
      this.$confirm(`是否确定要删除标签 ${row.title} 吗?`, "提示", {
        confirmButtonText: "确认",
        cancleButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await deleteRole(row._id);
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
    this.fetchPermissions();
  }
};
</script>
