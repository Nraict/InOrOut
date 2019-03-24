<template>
  <div class="sign-in-componment">
    <h1>欢迎来到登录页面</h1>
    <el-form ref="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" @keyup.native.enter="signIn"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="signIn">立即登入</el-button>
        <el-button type="danger" @click="register">立即注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    signIn() {
      let { username, password } = this;
      if (username.trim().length === 0 || password.trim().length === 0) {
        return this.$message.error("用户名和密码不能为空");
      }
      this.$http
        .post("/users/login", { username, password })
        .then(res => {
          this.$message({
            message: res.succMsg,
            type: "success"
          });
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          this.$router.push("/home");
        })
        .catch(err => {
          this.$message.error(err.response.data.errMsg);
        });
    },
    register(){
      this.$router.push('/register')
    }
  }
};
</script>

<style lang="less">
.sign-in-componment,
.register-component {
  margin: 150px auto;
  h1 {
    font-size: 20px;
    color: #e92333;
    text-align: center;
    margin-bottom: 20px;
  }
  .el-form {
    width: 400px;
    margin: 0 auto;
  }
}
</style>
