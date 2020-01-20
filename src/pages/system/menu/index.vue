<template>
  <div class="app-container">
    <table-header></table-header>
    <tree-table
      :data="categories"
      :expand-all="false"
      :columns="columns"
      border
      size="small"
    >
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
import TableHeader from "@/components/TableHeader";
import treeTable from "@/components/TreeTable";
import Pagination from "@/components/Pagination";
import translateToTree from "@/utils/dataToTree";
import { getCategories } from "@/api/category";
export default {
  components: { TableHeader, treeTable, Pagination },
  data() {
    return {
      columns: [
        {
          text: "分类名称",
          value: "name",
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
          text: "创建时间",
          value: "created_time",
          align: "center"
        },
        {
          text: "修改时间",
          value: "updated_time",
          align: "center"
        },
        {
          text: "操作",
          value: "action",
          align: "center"
        }
      ],
      delLoading: false,
      categories: [],
      total: 0,
      listQuery: {
        page: 1,
        per_page: 10
      }
    };
  },
  methods: {
    async fetch() {
      const res = await getCategories();
      if (res.code === 200) {
        const data = res.data.categories;
        this.total = res.data.total;
        this.categories = translateToTree(data);
      }
    }
  },
  created() {
    this.fetch();
  }
};
</script>
