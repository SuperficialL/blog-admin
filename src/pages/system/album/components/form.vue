<template>
  <el-dialog
    :title="isAdd ? '新增图片' : '修改图片'"
    :visible.sync="dialog"
    @open="getQiNiuToken"
    width="30%"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      style="text-align:left;"
      label-width="80px"
      size="mini"
    >
      <!-- <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称"></el-input>
      </el-form-item>-->
      <el-form-item label="图片:">
        <el-upload
          class="avatar-uploader"
          action="https://upload.qiniup.com"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="uploadData"
        >
          <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { createPicture, updatePicture } from "@/api/pictures";
import { getToken } from "@/api/qiniu";
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialog: false,
      uploadData: {
        key: "",
        token: ""
      },
      form: {
        imageUrl: "",
        key: "",
        size: 0
      },
      rules: {
        name: [
          {
            required: true,
            message: "分类名不可为空~",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    async getQiNiuToken() {
      const res = await getToken();
      if (res.code) {
        this.uploadData.token = res.result;
      }
    },
    handleAvatarSuccess(res, file) {
      const { _id } = this.form;
      
      const { name, key, hash, size, type } = res;
      this.form = {
        imageUrl: `http://statices.zhangwurui.net/${res.key}`,
        size: `${size / 1000}KB`,
        name,
        key,
        hash,
        type
      };
      if (_id) {
        this.form._id = _id;
      }
    },
    beforeAvatarUpload(file) {
      const { name } = file;
      this.uploadData.key = name;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 重置表单
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        imageUrl: "",
        key: "",
        size: 0
      };
    },

    // 提交表单
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.isAdd) {
            this.add();
          } else {
            this.update();
          }
        } else {
          return false;
        }
      });
    },

    // 添加数据
    async add() {
      const res = await createPicture(this.form);
      if (res.code) {
        this.resetForm();
        this.$message({
          showClose: true,
          type: "success",
          message: res.message,
          duration: 2500
        });
        this.$parent.$parent.fetch();
      } else {
        this.$message({
          showClose: true,
          type: "error",
          message: res.message,
          duration: 2500
        });
      }
    },

    // 修改数据
    async update() {
      const res = await updatePicture(this.form._id, this.form);
      console.log(res, "rs");
      if (res.code) {
        this.resetForm();
        this.$message({
          showClose: true,
          type: "success",
          message: res.message,
          duration: 2500
        });
        this.loading = false;
        this.sup_this.fetch();
      } else {
        this.$message({
          showClose: true,
          type: "error",
          message: res.message,
          duration: 2500
        });
      }
    },

    // 取消表单
    cancel() {
      this.resetForm();
    }
  }
};
</script>

<style>
.el-form-item__content {
  text-align: left;
}
</style>