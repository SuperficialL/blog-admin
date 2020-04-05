<template>
  <el-table :data="formatData" :row-style="rowStyle" v-bind="$attrs">
    <el-table-column
      v-for="(column, index) in columns"
      :key="column.value"
      :label="column.text"
      :width="column.width"
      header-align="center"
      :align="column.align"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        <template v-if="index === 0">
          <span
            v-for="space in scope.row._level"
            :key="space"
            class="ms-tree-space"
          ></span>
        </template>
        <span
          v-if="iconShow(index, scope.row)"
          class="tree-ctrl"
          @click="toggleExpanded(scope.$index)"
        >
          <i v-if="!scope.row._expanded" class="el-icon-plus" />
          <i v-else class="el-icon-minus" />
        </span>
        <span v-if="['created_time', 'updated_time'].includes(column.value)">
          {{ scope.row[column.value] | dateFormat }}
        </span>

        <template v-else-if="'icon' === column.value">
          <i class="iconfont" :class="scope.row[column.value]"></i>
        </template>
        <template v-else-if="['isMenu','isShow'].includes(column.value)">
          {{ scope.row[column.value]?'是':'否' }}
        </template>
         <template v-else>
          {{ scope.row[column.value] }}
        </template>
      </template>
    </el-table-column>
    <slot />
  </el-table>
</template>

<script>
import treeToArray from "./eval";
export default {
  name: "TreeTable",
  props: {
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    expandAll: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "small"
    }
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let tmp;
      if (!Array.isArray(this.data)) {
        tmp = [this.data];
      } else {
        tmp = this.data;
      }
      let arr = treeToArray(tmp, this.expandAll);
      console.log(arr,'arr');
      return arr;
    }
  },
  methods: {
    rowStyle({ row, rowIndex }) {
      const show = row.parent ? row.parent._expanded && row.parent._show : true;
      row._show = show;
      let style;
      if (show) {
        style = {
          animation: "treeTableShow 1s",
          "-webkit-animation": "treeTableShow 1s"
        };
      } else {
        style = {
          display: "none"
        };
      }
      return style;
    },
    // 切换下级是否展开
    toggleExpanded: function(trIndex) {
      const record = this.formatData[trIndex];
      record._expanded = !record._expanded;
    },
    // 图标显示
    iconShow(index, record) {
      return index === 0 && record.children && record.children.length > 0;
    }
  }
};
</script>
<style>
@keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

<style lang="scss" scoped>
$color-blue: #2196f3;
$space-width: 18px;
.ms-tree-space {
  position: relative;
  top: 1px;
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: $space-width;
  height: 14px;
  &::before {
    content: "";
  }
}
.tree-ctrl {
  position: relative;
  cursor: pointer;
  color: $color-blue;
  margin-left: -$space-width;
}
.processContainer {
  width: 100%;
  height: 100%;
}
table td {
  line-height: 26px;
}
</style>
