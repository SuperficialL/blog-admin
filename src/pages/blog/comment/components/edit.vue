<!--
 * @Author: SuperficialL
 * @Date: 2020-04-26 23:09:14
 * @LastEditTime: 2020-06-04 23:25:42
 * @Description: 
 * @FilePath: \blog\blog-admin\src\pages\blog\comment\components\edit.vue
 * @可以输入预定的版权声明、个性签名、空行等
--> 
<template>
  <div>
    <el-button size="small" plain circle type="primary" icon="el-icon-edit" @click="to"></el-button>
    <eForm
      ref="form"
      :comments="comments"
      :articles="articles"
      :sup_this="sup_this"
      :is-add="false"
    />
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
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form;
      _this.form = {
        _id: this.item._id,
        author: {
          name: this.item.author.name,
          email: this.item.author.email,
          site: this.item.author.site
        },
        content: this.item.content,
        agent: this.item.agent,
        article_id: this.item.article_id,
        likes: this.item.likes
      };
      _this.dialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  display: inline-block;
  margin-right: 3px;
}
</style>
