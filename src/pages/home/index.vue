<template>
  <div class="home-component">
    <el-row class="tac">
      <el-col :span="4">
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          @select="handleSelect"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户中心</span>
            </template>
            <el-menu-item-group>
              <template slot="title">收货人信息</template>
              <el-menu-item index="1-1">所有收货人信息</el-menu-item>
              <el-menu-item index="1-2">武汉收货人信息</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="用户安全">
              <el-menu-item index="1-3">修改密码</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
         

         <!-- 第二个测试 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户中心</span>
            </template>
            <el-menu-item-group>
              <template slot="title">收货人信息</template>
              <el-menu-item index="2-1">所有收货人信息</el-menu-item>
              <el-menu-item index="2-2">武汉收货人信息</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="用户安全">
              <el-menu-item index="2-3">修改密码</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20">
          <div class="home-component-subtitle">
            <p>管理员名称:{{ info.nickname }}</p>
            <el-button @click="signOut" type="danger">退出登录</el-button>
          </div>
         <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return{
      info:JSON.parse(localStorage.getItem('userInfo'|| ''))
    }
  },

  methods: {
    handleSelect(key, keyPath){
        switch(key){
            case '1-1':
            this.$router.push('/home/allReceiver')
            break;
            case '1-2':
            this.$router.push('/home/wuhanReceiver')
            break;

        }
    },
    signOut(){
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      this.$message({
          message: '退出成功!!',
          type: 'warning'
        });
      this.$router.push('/signIn')
    }
  }
};
</script>

<style lang="less" scoped>
.home-component{
    .el-menu{
        border: none;
    }
    .home-component-subtitle{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
}
</style>
