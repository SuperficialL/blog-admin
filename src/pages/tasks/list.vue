<template>
  <div class="app-container">
    <tool-bar />
    <div class="content">
      <el-table :data="tasks" border>
        <el-table-column label="任务名称" sortable align="center">
          <template slot-scope="{ row }">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="任务时间" sortable align="center">
          <template slot-scope="{ row }">
            <span>{{ row.time | dateFormat }}</span>
          </template>
        </el-table-column>

        <el-table-column label="任务状态" sortable align="center">
          <template slot-scope="{ row }">
            <!-- <el-tooltip :content="row.status ? '开启' : '关闭'" placement="top">
              <el-switch
                v-model="row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="true"
                :inactive-value="false"
              >
              </el-switch>
            </el-tooltip> -->
            <el-tag effect="dark" :type="row.status ? 'success' : 'danger'">
              {{ row.status ? "开启" : "关闭" }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="创建时间" align="center" sortable>
          <template slot-scope="{ row }">
            {{ row.created_time | dateFormat }}
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
            <el-tooltip effect="dark" content="编辑" placement="top">
              <el-button
                type="primary"
                size="small"
                @click="$router.push(`/tasks/edit/${row._id}`)"
                icon="el-icon-edit"
              />
            </el-tooltip>

            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="remove(row)"
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
import ToolBar from "@/components/ToolBar";
import Pagination from "@/components/Pagination";
import { getTasks, deleteTask } from "@/api/tasks";
export default {
  components: {
    ToolBar,
    Pagination
  },
  data() {
    return {
      loading: false,
      total: 0,
      tasks: [],
      listQuery: {
        page: 1,
        per_page: 10
      }
    };
  },
  methods: {
    async fetch() {
      // 获取所有分类数据
      const res = await getTasks(this.listQuery);
      if (res.code === 200) {
        this.tasks = res.data.timetasks;
        this.total = res.data.total;
      }
    },
    async remove(row) {
      this.$confirm(`是否确定要删除任务?"${row.name}"`, "提示", {
        confirmButtonText: "确认",
        cancleButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await deleteTask(row._id);
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.fetch();
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
