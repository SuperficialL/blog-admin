<template>
  <div>
    <h1>{{id? '编辑':'新建'}}用户</h1>
    <el-form
      :model="model"
      label-width="100px"
      @submit.native.prevent="save"
    >
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="model.email"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="model.created_time"
          type="datetime"
          placeholder="选择日期时间"
          readonly
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="最近修改时间">
        <el-date-picker
          v-model="model.updated_time"
          type="datetime"
          placeholder="选择日期时间"
          align="left"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUser, updateUser, createUser } from "@/api/users";

export default {
    name: "UserDetail",
    props: ["id"],
    data() {
        return {
            model: {},
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
            }
        };
    },
    created() {
        this.id && this.fetch();
    },
    methods: {
        async fetch() {
            const res = await getUser(this.id);
            if (res.code === 200) {
                this.model = res.data.user;
            }
        },
        async save() {
            let res;
            if (this.id) {
                res = await updateUser(this.id, this.model);
            } else {
                res = await createUser(this.model);
            }
            if (res.code === 200) {
                this.$router.push("/user/list?refresh=1");
                this.$message({
                    type: "success",
                    message: res.message
                });
            }
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  .createPost-container {
    position: relative;
    .createPost-main-container {
      padding: 40px 45px 20px 50px;
    }
  }
</style>
