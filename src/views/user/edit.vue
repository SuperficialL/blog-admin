<template>
  <div class="createPost-container">
    <el-form ref="userForm" :model="model" class="form-container" @submit.native.prevent="save">

      <sticky class-name='sub-navbar draft'>
        <el-checkbox v-model="model.active">Active</el-checkbox>
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" native-type="submit"> {{ id ? '更新' : '新增' }}
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="model.username" :maxlength="100" name="name" required>
                用户名
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="model.email" :maxlength="100" name="email" required>
                邮箱
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="model.avatar" :maxlength="100" name="avatar" required>
                头像
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="model.password" :maxlength="100" name="password" required>
                密码
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>

  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky'
import { getUser, updateUser, createUser } from '@/api'

export default {
  name: 'UserDetail',
  components: { MDinput, Sticky },
  props: ['id'],
  data() {
    return {
      model: {},
      loading: false,
    }
  },
  created() {
    this.id && this.fetch()
  },
  methods: {
    async fetch() {
      const res = await getUser(this.id)
      this.model = res
    },
    async save() {
      let res;
      if (this.id) {
        res = await updateUser(this.id,this.model)
      } else {
        res = await createUser(this.model)
      }
      if (res.code) {
        this.$router.push('/user/list?refresh=1')
        this.$message({
          type: 'success',
          message: '用户处理成功~'
        })
      }
    },
  }
}
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
