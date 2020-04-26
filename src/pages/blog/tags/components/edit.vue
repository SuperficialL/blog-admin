<template>
  <div>
    <el-button size="small" plain circle type="primary" icon="el-icon-edit" @click="to"></el-button>
    <eForm ref="form" :is-add="false" :sup_this="sup_this" />
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
    sup_this: {
      type: Object,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form;
      _this.form = {
        _id: this.item._id, 
        title: this.item.title,
        slug: this.item.slug,
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
