<template>
  <div class="app-container">
    <h1>{{ id ? "编辑" : "新建" }}定时任务</h1>
    <el-form
      :model="model"
      :rules="rules"
      ref="taskForm"
      label-width="80px"
      @submit.native.prevent="save('taskForm')"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model.trim="model.name"></el-input>
      </el-form-item>

      <el-form-item label="提醒内容" prop="content">
        <el-input v-model.trim="model.content"></el-input>
      </el-form-item>

      <el-form-item label="任务状态">
        <el-tooltip :content="model.status ? '开启' : '关闭'" placement="top">
          <el-switch
            v-model="model.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="true"
            :inactive-value="false"
          >
          </el-switch>
        </el-tooltip>
      </el-form-item>

      <el-form-item label="时间">
        <el-date-picker
          v-model="model.time"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getTask, updateTask, createTask } from "@/api/tasks";

export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name: "",
        content: "",
        time: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "分类名不可为空~",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "任务内容不可为空~",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 保存数据
    save(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res;
          if (this.id) {
            // id存在,修改分类
            res = await updateTask(this.id, this.model);
          } else {
            // id不存在,创建分类
            res = await createTask(this.model);
          }
          if (res.code === 200) {
            this.$router.push("/tasks/list");
            this.$message({
              type: "success",
              message: "保存成功"
            });
          }
        }
      });
    },
    async fetch() {
      // 获取当前分类
      const res = await getTask(this.id);
      console.log(res, "res");
      if (res.code === 200) {
        this.model = Object.assign({}, this.model, res.data);
      }
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
