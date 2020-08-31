<template>
  <div class="wrapper" @scroll="scroll($event)">
    <el-form
      ref="form"
      label-width="100px"
      :model="article"
      :rules="rules"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="标题" prop="title">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
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
        <el-col :span="8">
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
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文章状态">
            <el-tooltip
              :content="article.status | statusFilter"
              placement="top"
            >
              <el-switch
                v-model="article.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="发表"
                inactive-text="草稿"
                :active-value="1"
                :inactive-value="0"
                size="middle"
              ></el-switch>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="缩略图:">
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              accept="image/*"
              :headers="getAuthHeaders()"
              :action="uploadUrl"
              :on-preview="handlePictureCardPreview"
              :on-success="UploadSuccess"
              :on-remove="handleRemove"
            >
              <img
                v-if="article.thumbnail"
                :src="article.thumbnail"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="描述:">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入描述内容"
              v-model="article.description"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="关键词:">
            <el-tag
              :key="tag"
              v-for="tag in article.keywords"
              closable
              size="medium"
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="keywords"
              ref="saveTagInput"
              size="mini"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
            >
              + 关键字
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :class="{ sticky: active }">
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
            <el-button type="primary" @click="save('form')">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getArticle, updateArticle, createArticle } from "@/api/articles";
import { getCategories } from "@/api/category";
// import { getPictures } from "@/api/pictures";
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
      catListOptions: [],
      inputVisible: false,
      keywords: ""
    };
  },

  methods: {
    // 删除关键字 keywords
    handleClose(tag) {
      this.article.keywords.splice(this.article.keywords.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let keywords = this.keywords;
      if (keywords) {
        this.article.keywords.push(keywords);
      }
      this.inputVisible = false;
      this.keywords = "";
    },
    // 获取图床
    async fetchPictures() {
      // const res = await getPictures();
    },
    // 移除封面图片
    handleRemove(file, fileList) {},

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
            const { _id, ...article } = this.article;
            res = await updateArticle(_id, article);
          } else {
            // id不存在,创建数据
            const { ...article } = this.article;
            res = await createArticle(article);
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
        const { url } = res.result;
        this.$refs.md.$img2Url(pos, url);
      }
    },

    UploadSuccess(res) {
      if (res.code) {
        // 设置图片上传后的地址
        this.$set(this.article, "thumbnail", res.result.url);
        // this.article.img = res.url
      }
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
@import "~@/styles/mixin.scss";

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 28px;
  line-height: 26px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  vertical-align: bottom;
  margin-left: 10px;
  // height: 28px;
  // line-height: 26px;
  // padding-top: 0;
  // padding-bottom: 0;
}
.wrapper {
  height: 100%;
  padding: 10px 0;
  overflow-y: auto;
  padding: 10px 0;
}
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
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>
