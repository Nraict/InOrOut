<template>
  <div class="all-receiver-component">
    <el-table :data="allReceiver" style="width: 100%">
      <el-table-column prop="id" label="编号" width="50"></el-table-column>
      <el-table-column label="配送信息">
        <el-table-column prop="receiver_name" label="姓名" width="120"></el-table-column>
        <el-table-column label="地址">
          <el-table-column prop="province" label="省份" width="120"></el-table-column>
          <el-table-column prop="city" label="市" width="120"></el-table-column>
          <el-table-column prop="area" label="区" width="120"></el-table-column>
          <el-table-column prop="detailed_address" label="地址" width="300"></el-table-column>
          <el-table-column prop="mobile" label="电话" width="200"></el-table-column>
          <el-table-column prop="postcode" label="邮编" width="120"></el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allReceiver:[]
    };
  },
  created(){
      this.allReceiverInfo()
  },
  methods: {
      allReceiverInfo(){
          let token = localStorage.getItem('token') || ''
          this.$http.get('/users/getReceiverAddress')
          .then(res => {
              this.allReceiver = res.data
          })
      }
  },
};
</script>

<style lang="less" scoped>
.all-receiver-component{
    padding: 50px;
}
</style>
