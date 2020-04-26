<template>
  <div class="app-container">
    <table-header ref="tHeader" :menus="menus" />
    <tree-table
      :data="menus"
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
import treeTable from "@/components/TreeTable";
import Pagination from "@/components/Pagination";
// import translateToTree from "@/utils/dataToTree";
import { getMenus, deleteMenu } from "@/api/menu";
export default {
  components: { TableHeader, treeTable, Pagination },
  data() {
    return {
      columns: [
        {
          text: "名称",
          value: "title",
          align: "center"
        },
        {
          text: "图标",
          value: "icon",
          align: "center"
        },
        {
          text: "路径",
          value: "path",
          align: "center"
        },
        {
          text: "内部菜单",
          value: "isMenu",
          align: "center"
        },
        {
          text: "是否显示",
          value: "isShow",
          align: "center"
        }
      ],
      delLoading: false,
      menus: [],
      total: 0,
      listQuery: {
        page: 1,
        per_page: 10
      }
    };
  },
  methods: {
    async fetch() {
      const res = await getMenus();
      if (res.code === 200) {
        const { menus,total } = res.data;
        this.menus = menus;
        this.total = total;
        // this.menus = translateToTree(data);
      }
    },
    // 删除
    async handleDel(index, row) {
      this.$confirm(`确认删除菜单 ${row.name} 吗?`, "提示", {
        confirmButtonText: "确认",
        cancleButtonText: "取消",
        type: "warning"
      }).then(async () => {
        this.loading = true;
        const res = await deleteMenu(row._id);
        if (res.code) {
          this.loading = false;
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.list.splice(index, 1);
        }
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>
