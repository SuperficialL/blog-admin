<template>
  <div class="app-container">
    <table-header ref="tHeader" :permissions="permissions" />
    <tree-table
      :data="permissions"
      :expand-all="false"
      :columns="columns"
      border
      size="small"
    >
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
          </el-tooltip>
        </template>
      </el-table-column>
    </tree-table>
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
import TreeTable from "@/components/TreeTable";
import Pagination from "@/components/Pagination";
import translateToTree from "@/utils/dataToTree";
import { getPermissions, deletePermission } from "@/api/permissions";

export default {
  name: "Permission",
  components: { TableHeader, TreeTable, Pagination },
  data() {
    return {
      permissions: [],
      total: 0,
      loading: false,
      listQuery: {
        page: 1,
        per_page: 10
      },
      columns: [
        {
          text: "权限名称",
          value: "name"
          // align: "center"
        },
        {
          text: "权限方法",
          value: "method",
          align: "center"
        }
      ]
    };
  },
  methods: {
    async fetch() {
      // 获取所有标签数据
      const res = await getPermissions(this.listQuery);
      if (res.code === 200) {
        this.total = res.data.total;
        const data = res.data.permissions;
        this.permissions = translateToTree(data);
      }
    },
    remove(index, row) {
      this.$confirm(`是否确定要删除标签 ${row.title} 吗?`, "提示", {
        confirmButtonText: "确认",
        cancleButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await deletePermission(row._id);
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
