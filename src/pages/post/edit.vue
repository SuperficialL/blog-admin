<template>
  <div>
    <div>
      <h1>{{ id ? "编辑" : "新建" }}文章</h1>
      <el-form
        ref="form"
        label-width="100px"
        :model="model"
        :rules="rules"
        @submit.native.prevent="save('form')"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="model.title"></el-input>
        </el-form-item>

        <el-form-item label="文章状态">
          <el-tooltip :content="model.status | statusFilter" placement="top">
            <el-switch
              v-model="model.status"
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

        <!-- <el-form-item label="最近修改时间">
          <el-date-picker
            v-model="model.updated_time"
            type="datetime"
            placeholder="选择日期时间"
            align="left"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>-->

        <el-form-item label="作者:" class="postInfo-container-item">
          <el-select
            v-model="model.author"
            value-key="username"
            placeholder="搜索用户"
          >
            <el-option
              v-for="(item, index) in userListOptions"
              :key="index"
              :label="item.username"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="标签:" class="postInfo-container-item">
          <el-select
            v-model="model.tags"
            value-key="title"
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
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类:" class="postInfo-container-item">
          <el-select
            v-model="model.category"
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
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

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
            <img v-if="model.thumbnail" :src="model.thumbnail" class="avatar" />
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="model.thumbnail" />
          </el-dialog>
        </el-form-item>

        <mavon-editor
          v-model="model.content"
          @change="saveMavon"
          @imgAdd="imgAdd"
          @imgDel="imgDel"
        />

        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getArticle, updateArticle, createArticle } from "@/api/articles";
import { getCategories } from "@/api/category";
import { getTags } from "@/api/tags";
import { getUserList } from "@/api/users";
import { uploadImg } from "@/api/upload";
export default {
  name: "PostDetail",
  props: ["id"],
  data() {
    return {
      model: {},
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
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      userListOptions: [],
      tagListOptions: [],
      catListOptions: []
    };
  },

  methods: {
    // 移除封面图片
    handleRemove(file, fileList) {
      window.console.log(file, fileList);
    },
    // 设置封面图片回调地址
    handlePictureCardPreview(file) {
      this.model.thumbnail = file.url;
      // this.$set(this.model, "thumbnail", file.url);
      this.dialogVisible = true;
    },
    // 获取文章
    async fetchArticle() {
      const res = await getArticle(this.id);
      if (res.code === 200) {
        this.model = res.data;
      }
    },
    // 获取分类
    async fetchCategories() {
      const res = await getCategories();
      if (res.code === 200) {
        this.catListOptions = res.data.categories;
      }
    },
    // 获取作者
    async fetchAuthors() {
      const res = await getUserList();
      if (res.code === 200) {
        this.userListOptions = res.data.users;
      }
    },

    // 获取标签
    async fetchTags() {
      const res = await getTags();
      if (res.code === 200) {
        this.tagListOptions = res.data.tags;
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
            res = await updateArticle(this.id, this.model);
          } else {
            // id不存在,创建数据
            res = await createArticle(this.model);
          }
          if (res.code === 200) {
            this.loading = false;
            this.$router.push("/post/list?refresh=1");
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
      this.model.renderContent = html;
    },

    // 文章内容图片上传
    imgAdd(pos, file) {
      // pos:图片位置 file: 文件
      this.imgs[pos] = file;
    },

    // 文章内容图片删除
    imgDel(pos) {
      delete this.imgs[pos];
    },

    // 上传富文本编辑器中的图片
    async uploadRichTextImg() {
      let formData = new FormData();
      for (let key in this.imgs) {
        formData.append(key, this.imgs[key]);
      }
      const res = await uploadImg();
      console.log(res, "res");
      // if (res.code === 200) {

      // }
    },

    UploadSuccess(res) {
      // 设置图片上传后的地址
      this.$set(this.model, "thumbnail", res.url);
      // this.model.img = res
    }
  },
  created() {
    this.id && this.fetchArticle();
    this.fetchCategories();
    this.fetchAuthors();
    this.fetchTags();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
