<template>
  <div class="register-component">
    <h1>欢迎来到注册页面</h1>
    <el-form ref="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="passwordConfirm"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="nickname"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="mobile"></el-input>
      </el-form-item>
      <el-form-item label="验证码" class="v-code">
        <el-input v-model="vCode"  @keyup.native.enter="signUp"></el-input>
        <div @click="getCode" v-html="vCodeSvg"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="signUp">立即注册</el-button>
        <router-link to="/signIn">已有账号,返回登入</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      passwordConfirm: "",
      nickname: "",
      mobile: "",
      vCode: "",
      vCodeSvg: ""
    };
  },
  created() {
    this.getCode();
  },
  methods: {
    getCode() {
      this.$http.get("/users/getVCode").then(res => (this.vCodeSvg = res));
    },
    signUp() {
      let {
        username,
        password,
        passwordConfirm,
        nickname,
        mobile,
        vCode
      } = this;
      if (
        !username.trim() ||
        !password.trim() ||
        !passwordConfirm.trim() ||
        !nickname.trim() ||
        !mobile.trim() ||
        !vCode.trim()
      ) {
        return this.$message({
          type: "error",
          message: "以上项目不能输入空"
        });
      }
      if (password !== passwordConfirm) {
        return this.$message({
          type: "error",
          message: "两次密码不相同"
        });
      }
      this.$http
        .post("/users/register", {
          username,
          password,
          nickname,
          mobile,
          vCode
        })
        .then(res => {
          if(res.status === 200){
              this.$message({
                  type:'success',
                  message:res.succMsg
              })
              localStorage.setItem('token',res.data.token)
              localStorage.setItem('userInfo',JSON.stringify(res.data))
              this.$router.push('/')
          }
        });
    }
  }
};
</script>

<style lang="less" >
.register-component {
  margin: 50px auto;
  .v-code {
    .el-form-item__content {
      display: flex;
      justify-content: space-between;
      .el-input {
        width: 120px;
      }
    }
  }
  a {
    text-decoration: none;
    margin-left: 100px;
  }
}
</style>
