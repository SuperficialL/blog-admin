<template>
  <div>
    <el-button size="small" plain circle type="primary" icon="el-icon-edit" @click="to"></el-button>
    <eForm ref="form" :comments="comments" :articles="articles" :sup_this="sup_this" :is-add="false" />
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
    comments: {
      type: Array,
      required: true
    },
    articles: {
      type: Array,
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
        username: this.item.username,
        email: this.item.email,
        site: this.item.site,
        content: this.item.content,
        ua: this.item.ua,
        article_id: this.item.article_id,
        likes: this.item.likes
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
