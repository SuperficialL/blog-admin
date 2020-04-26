/*
 * @Author: Superficial
 * @Date: 2020-01-17 15:53:41
 * @LastEditTime : 2020-01-20 20:05:33
 * @Description: 源数据处理
 */
import Vue from "vue";
export default function treeToArray(data, expandAll, parentId = "0", level = null) {
  let tmp = [];
  Array.from(data).forEach((record) => {
    if (record._expanded === undefined) {
      Vue.set(record, "_expanded", expandAll);
    }

    let _level = 1;
    if (level !== undefined && level !== null) {
      _level = level + 1;
    }
    Vue.set(record, "_level", _level);
    // 如果有父元素
    if (parentId) {
      Vue.set(record, "parentId", parentId);
    }
    tmp.push(record);
    if (record.children && record.children.length > 0) {
      const children = treeToArray(record.children, expandAll, record, _level);
      tmp = tmp.concat(children);
    }
  });
  return tmp;
}
