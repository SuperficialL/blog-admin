<template>
  <div class="wrapper" style="margin-top:20px;" @scroll="scroll($event)">
    <el-form
      ref="form"
      label-width="100px"
      :model="article"
      :rules="rules"
      @submit.native.prevent="save('form')"
    >
      <el-row>
        <el-col :span="24"> 
          <el-form-item label="标题" prop="title">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12"> 
          <el-form-item label="分类:" class="postInfo-container-item">
            <el-select
              v-model="article.category"
              value-key="name"
              filterable
              allow-create
              default-first-option
              placeholder="搜索分类"
            >
              <el-option
                v-for="(item, index) in catListOptions"
                :key="index"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12"> 
          <el-form-item label="标签:" class="postInfo-container-item">
            <el-select
              v-model="article.tags"
              value-key="_id"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="搜索标签"
            >
              <el-option
                v-for="(item, index) in tagListOptions"
                :key="index"
                :label="item.title"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"> 
          <el-form-item label="文章状态">
            <el-tooltip :content="article.status | statusFilter" placement="top">
              <el-switch
                v-model="article.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="发表"
                inactive-text="草稿"
                :active-value="1"
                :inactive-value="0"
                size="middle"
              >
              </el-switch>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"> 
          <el-form-item label="缩略图:">
            <el-upload
              list-type="picture-card"
              accept="image/*"
              :headers="getAuthHeaders()"
              :action="uploadUrl"
              :on-preview="handlePictureCardPreview"
              :on-success="UploadSuccess"
              :on-remove="handleRemove"
            >
              <img v-if="article.thumbnail" :src="article.thumbnail" class="avatar" />
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="article.thumbnail" />
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :class="{sticky:active}">
        <el-col :span="24"> 
          <mavon-editor
            ref="md"
            
            v-model="article.content"
            @change="saveMavon"
            @imgAdd="imgAdd"
            @imgDel="imgDel"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getArticle, updateArticle, createArticle } from "@/api/articles";
import { getCategories } from "@/api/category";
import { getTags } from "@/api/tags";
import { uploadImg } from "@/api/upload";
export default {
  name: "PostDetail",
  props: ["id"],
  data() {
    return {
      active: false,
      article: {},
      // 富文本中的图片
      imgs: {},
      rules: {
        title: [
          {
            required: true,
            message: "文章标题不可为空~",
            trigger: "blur"
          }
        ]
      },
      dialogVisible: false,
      loading: false,
      tagListOptions: [],
      catListOptions: []
    };
  },

  methods: {
    // 移除封面图片
    handleRemove(file, fileList) {
    },
    // 设置封面图片回调地址
    handlePictureCardPreview(file) {
      this.article.thumbnail = file.url;
      // this.$set(this.article, "thumbnail", file.url);
      this.dialogVisible = true;
    },
    // 获取文章
    async fetchArticle() {
      const res = await getArticle(this.id);
      if (res.code) {
        this.article = res.result;
      }
    },
    // 获取分类
    async fetchCategories() {
      const res = await getCategories();
      if (res.code) {
        this.catListOptions = res.result.data;
      }
    },

    // 获取标签
    async fetchTags() {
      const res = await getTags();
      if (res.code) {
        this.tagListOptions = res.result.data;
      }
    },

    // 保存，更新数据
    save(formName) {
      this.loading = true;
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res;
          if (this.id) {
            // id 存在,修改数据
            res = await updateArticle(this.id, { article: this.article });
          } else {
            // id不存在,创建数据
            res = await createArticle({ article: this.article });
          }
          if (res.code) {
            this.loading = false;
            this.$router.push("/blog/posts");
            this.$message({
              type: "success",
              message: "保存成功~"
            });
          }
        } else {
          this.$message.error("验证失败~");
        }
      });
    },

    // 获取文章详情文本
    saveMavon(value, html) {
      this.article.renderContent = html;
    },

    // 文章详情中图片上传
    imgAdd(pos, file) {
      // pos:图片位置 file: 文件
      this.imgs[pos] = file;
      this.uploadRichTextImg(pos, file);
    },

    // 文章详情中图片删除
    imgDel(pos) {
      // pos 图片索引
      delete this.imgs[pos];
    },

    // 上传富文本编辑器中的图片
    async uploadRichTextImg(pos, file) {
      let formData = new FormData();
      formData.append("file", file);
      const res = await uploadImg(formData);
      if (res.code) {
        this.$refs.md.$img2Url(pos, res.url);
      }
    },

    UploadSuccess(res) {
      // 设置图片上传后的地址
      this.$set(this.article, "thumbnail", res.url);
      // this.article.img = res
    },

    scroll(e) {
      const top = e.srcElement.scrollTop || e.target.scrollTop;
      const tools = document.getElementsByClassName("v-note-op");
      tools.className = top > 344 ? true : false;
    }
  },
  created() {
    this.id && this.fetchArticle();
    this.fetchCategories();
    this.fetchTags();
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  overflow-y: auto;
}
.sticky {
  position: sticky;
  // position: fixed;
  left: 0;
  // top: 344px;
}
@import "~@/styles/mixin.scss";
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
