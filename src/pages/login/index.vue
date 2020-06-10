<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      label-position="left"
      autocomplete="off"
    >
      <div class="title-container">
        <h3 class="title">后台管理系统</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
          autocomplete="off"
        >
          <template slot="prepend">
            <el-icon name="user"></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          show-password
          placeholder="请输入密码"
          autocomplete="off"
          @keyup.enter.native="handleLogin"
        >
          <template slot="prepend">
            <el-icon name="lock"></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          placeholder="请输入验证码"
          autocomplete="off"
          @keyup.enter.native="handleLogin"
        >
          <template slot="append">
            <div class="captcha" v-html="captcha" @click="refresh"></div>
          </template>
        </el-input>
      </el-form-item> -->

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px;"
        @click.native.prevent="handleLogin"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { getCaptcha } from "@/api/captcha";
export default {
  name: "login",
  data() {
    return {
      captcha: "",
      loginForm: {
        username: "",
        password: "",
        code: "",
      },
      loginRules: {
        username: [
          { required: true, message: "用户名不可为空~", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不可为空~", trigger: "blur" },
          { min: 6, message: "密码长度少于6位~", trigger: "blur" },
        ],
        captcha: [{ required: true, message: "验证码不可为空~", trigger: "blur" }],
      },
      loading: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    refresh() {
      this.fetchCaptcha();
    },
    async fetchCaptcha() {
      const res = await getCaptcha();
      if (res.code) {
        this.captcha = res.result;
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("LoginByUsername", this.loginForm)
            .then((res) => {
              this.loading = false;
              this.$router.push({ path: this.redirect || "/" });
              this.$message({
                type: "success",
                message: res.message,
                offset: 0,
              });
            })
            .catch((err) => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
  },
  created() {
    // this.fetchCaptcha();
  },
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #eee;
$cursor: #fff;
.login-container {
  .el-input {
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: $light_gray;
      caret-color: $cursor;
      outline: none;
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        transition-delay: 99999s;
        transition: color 99999s ease-out, background-color 99999s ease-out;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-input-group__append,
  .el-input-group__prepend {
    background: rgba(0, 0, 0, 0.1);
    border: none;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow-y: auto;
  background-color: $bg;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    margin: 50px;
    overflow: hidden;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .captcha {
    height: 36px;
    line-height: 36px;
  }
}
</style>
