<template>
  <div>
    <el-button size="small" circle plain type="primary" icon="el-icon-edit" @click="to"></el-button>
    <eForm ref="form" :categories="categories" :is-add="false" />
  </div>
</template>
<script>
import eForm from "./form";
export default {
  components: { eForm },
  props: {
    item: {
      type: Object,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form;
      _this.form = {
        _id: this.item._id, 
        name: this.item.name,
        slug: this.item.slug, 
        icon: this.item.icon, 
        parent: this.item.parent,
        ordering: this.item.ordering,
      };
      _this.dialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
