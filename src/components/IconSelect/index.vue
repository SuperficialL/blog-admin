<template>
  <div class="icon-body">
    <el-input
      v-model="icon"
      style="position: relative;"
      clearable
      placeholder="请输入图标名称"
      @clear="filterIcons"
      @input.native="filterIcons"
    >
      <i slot="suffix" class="el-icon-search el-input__icon" />
    </el-input>
    <div class="icon-wrap">
      <div
        class="icon-item"
        v-for="(icon, index) in iconList"
        :key="index"
        @click="selectedIcon(icon)"
      >
        <i class="iconfont" :class="icon"></i>
        <span class="icon-name">{{ icon }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import icons from "./icons";
import icons from "./blog_icons";
export default {
  name: "IconSelect",
  data() {
    return {
      iconList: icons,
      icon: ""
    };
  },
  methods: {
    // 设置icon图标
    selectedIcon(icon) {
      this.$emit("selected", icon);
      document.body.click();
    },
    filterIcons() {
      if (this.icon) {
        this.iconList = this.iconList.filter(item => item.includes(this.icon));
      } else {
        this.iconList = icons;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.icon-body {
  width: 100%;
  padding: 10px;
  .icon-wrap {
    height: 200px;
    overflow-y: scroll;
    .icon-item {
      float: left;
      width: 33%;
      height: 30px;
      margin-bottom: -5px;
      line-height: 30px;
      cursor: pointer;
      .icon,
      .iconfont {
        vertical-align: middle;
        margin-right: 3px;
      }
    }
    span {
      display: inline-block;
      vertical-align: middle;
      fill: currentColor;
      overflow: hidden;
    }
  }
}
</style>
