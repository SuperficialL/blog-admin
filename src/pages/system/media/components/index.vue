<template>
  <div class="table-header">
    <div class="title">
      <el-icon class="el-icon-menu"></el-icon>
      <span style="margin-left:5px;">列表</span>
    </div>
    <div class="operation">
      <el-input
        :placeholder="placeholder"
        v-model="searchVal"
        :size="size"
        clearable
        style="width:300px;margin-right:10px;"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button
        type="danger"
        icon="el-icon-plus"
        :size="size"
        @click="updateForm(true)"
      >
        新建
      </el-button>
    </div>
    <el-dialog
      :title="`${model._id ? '编辑' : '新增'}`"
      :visible.sync="dialogVisible"
      width="50%"
      top="6vh"
    >
      <el-form
        :model="model"
        :rules="rules"
        ref="tagForm"
        label-width="80px"
        @submit.native.prevent="save('tagForm')"
      >
        <el-form-item label="歌曲名称" prop="title">
          <el-input v-model="model.title"></el-input>
        </el-form-item>

        <el-form-item label="歌曲作者" prop="author">
          <el-input v-model="model.author"></el-input>
        </el-form-item>

        <el-form-item label="歌曲封面" prop="cover">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/qiNiuToken"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="model.cover" :src="model.cover" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="歌曲文件">
          <el-upload
            class="upload-demo"
            action="https://upload.qiniup.com"
            :on-change="handleChange"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传audio/mp3文件，且不超过8M
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadQiNiu, getQiNiuToken } from "@/api/upload";
export default {
  name: "TableHeader",
  props: {
    placeholder: { type: String, default: "请输入查找内容" },
    size: { type: String, default: "mini" }
  },
  data() {
    return {
      searchVal: "",
      dialogVisible: false,
      loading: false,
      model: {},
      uploadData: {
        token: ""
      },
      fileList: [],
      rules: {
        title: [
          {
            required: true,
            message: "歌曲名称不可为空~",
            trigger: "blur"
          }
        ],
        author: [
          {
            required: true,
            message: "歌曲作者不可为空~",
            trigger: "blur"
          }
        ],
        cover: [
          {
            required: true,
            message: "歌曲封面不可为空~",
            trigger: "blur"
          }
        ],
        url: [
          {
            required: true,
            message: "歌曲文件不可为空~",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    search() {},
    refresh() {},
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    updateForm(isNew, row = {}) {
      this.model = {};
      this.dialogVisible = true;
      if (!isNew) {
        this.model = row;
      }
      console.log(this.model, "model");
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    async beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      console.log(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      const res = await getQiNiuToken();
      if (res.code === 200) {
        const token = res.token;
        console.log(token);
        let formData = new FormData();
        formData.append("token", token);
        formData.append("file", file);
        const up = await uploadQiNiu(formData);
        console.log(up, "up");
      } else {
        this.$message({
          type: "error",
          message: "token获取错误~"
        });
      }
      console.log(a, "a");
    }
  }
};
</script>

<style lang="scss" scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  .title {
    color: #666;
  }
  .operation {
    .el-dropdown {
      margin-left: 10px;
    }
  }
}
</style>
