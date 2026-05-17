<template>
  <div class="orderlist">
    <el-page-header @back="goback()" ></el-page-header>
    <h1>您的订单列表页面</h1>
    <el-empty description="您没有订单,有时候要多想想自己的原因!"></el-empty>
  </div>
 
</template>

<script>
import api from '@/api/global.js'
export default {
  
  data() {
    return {
      orderdata :[]
    }
  },
  methods:{
    goback(){
      this.$router.push('/user/')
    },
    getOrder(){
      api.post().then((res)=>{
        this.orderdata = res
      });
    }
  }
}
</script>

<style>

</style>