<template>
  <div>
    <el-button size="small" circle plain type="primary" icon="el-icon-edit" @click="to"></el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false" />
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
    },
  },
  methods: {
    to() {
      const _this = this.$refs.form;
      _this.form = {
        _id: this.item._id, 
        name: this.item.name,
        imageUrl: this.item.imageUrl, 
        size: this.item.size,
        type: this.item.type,
        key: this.item.key,
        hash: this.item.hash
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
