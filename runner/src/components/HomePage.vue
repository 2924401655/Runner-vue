<template>
  <!--走马灯-->
  <div class="container">
    <el-carousel height="130px">
      <el-carousel-item v-for="item in 1" :key="item">
        <img src="../assets/runner1.png" alt="" height="100%" width="100%">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/logo1.png" alt="" height="100%" width="100%">
      </el-carousel-item>
    </el-carousel>
   <!--数据统计-->
  <el-row >
    <el-col :span="24"><div class="grid-content bg-white">
      <el-row class="run_statistic">
        <el-col   :span="4" style="margin-top: 3%;"><img src="../assets/tj.jpg" alt="" width="100%" height="100%"></el-col>
        <el-col :span="20" >
          <el-row >
            <el-col :span="24" ><h3 style="color: #000;">数据统计</h3></el-col>
            <el-col :span="24" ><span class="statistic_text">待完成订单:{{ countOrder }} 已完成订单{{ getFinishedOrder }}</span></el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </el-col>
  </el-row>
  <!--业务区-->
  <el-row :gutter="5">
    <el-row :gutter="5">
      <el-col  class='run_item' :span="12">
        <router-link to="/xcj">
        <div class="grid-content bg-purple-dark">
        <el-row class="run_item bg-linear-blue">
          <el-col class='run_text' :span="19">
            <h3> 小吃街跑腿</h3>
            <span>别人顺道帮你代买小吃街商品</span>
          </el-col>
          <el-col :span="5">
          <img src="../assets/icon-001.png"  width='70px'  alt="">
          </el-col>
        </el-row>
      </div>
      </router-link>
    </el-col>
      <el-col class='run_item' :span="12">
        <router-link to="/express">
          <div class="grid-content bg-purple-dark">
        <el-row class='run_item bg-linear-orange'>
          <el-col class='run_text' :span='19'>
            <h3 >快递代取</h3>
            <span>帮你取快递 送到你手中</span>
          </el-col>
          <el-col :span="5">
          <img src="../assets/icon-003.png" width="70px">
          </el-col>
        </el-row>
      </div>
      </router-link>
    </el-col>
</el-row>
<el-row :gutter="5">
      <el-col class="run_item" :span="12">
        <router-link to="/supermarket">
        <div class="grid-content bg-purple-dark">
        <el-row class="run_item bg-linear-purple">
          <el-col :span="19" class="run_text">
            <h3 >超市代购</h3>
            <span>超市代购物到你的目的地~</span>
          </el-col>
          <el-col :span="5">
          <img src="../assets/icon-004.png"  width="70px" alt=""></el-col>
        </el-row>
      </div>
      </router-link>
    </el-col>
      <el-col class="run_item" :span="12">
        <router-link to="/userdefine">
        <div class="grid-content bg-purple-dark">
        <el-row class="run_item bg-linear-blue">
          <el-col class='run_item' :span="19">
          <h3>自定义需求</h3>
          <span>你可以自定义需求与赏金</span>
        </el-col>
          <el-col :span="5">
          <img src="../assets/icon-001.png" width='70px' alt=""></el-col>
        </el-row>
      </div>
      </router-link>
    </el-col>
  </el-row>
</el-row>
<!--客服-->
 <el-row :gutter="5" class="run_kf">
  <el-col :span="20">
  <img src="../assets/icon-title.png" width="150px" alt="">
</el-col>
  <el-col :span="4">
    <el-link type="danger">说明 &gt;&gt;</el-link>
  </el-col>
 </el-row>
 <custom-service></custom-service>
 <BottomTab></BottomTab>
  </div>
</template>

<script>
import CustomService from './CustomService.vue';
import BottomTab from './BottomTab.vue';
import $api from '../api/api.js'
import { orderlist } from './tools/testdata';
export default {
  data(){
    return{
      orderlist:orderlist,
      
    }
  },
  components:{
    CustomService,
    BottomTab,
  },
  methods:{
    getStatisticData(){
      $api.global.getData().then((res)=>{
        this.order = res.order
        this.finish_order = res.order
      })
    }
  },
  mounted(){
    console.log(this.$router.currentRoute.path)
  },
  computed:{
    countOrder(){
      let i =0
      this.orderlist.filter((item)=>{
          if(item.status === '待接单'){
          i++
        }
        
      })
      return i
    },
    getFinishedOrder(){
      let i =0 
      this.orderlist.filter((item)=>{
        
        if(item.status === '已完成'){
          i++
        }
        
      })
      return i
    }
  }
  }

</script>

<style scoped>

.container {
  margin: 0px;
  padding: 0px;
  background-color: rgb(245,245,245);
  box-sizing: border-box;
}
 .el-row {
    margin-bottom: 3px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
    overflow: hidden;
    color: #fff;
    padding: 3px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-white  {
    background: #fff;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .statistic_text {
    color: rgb(145,145,145);
    position: relative;
    bottom: 5px;
  }
  .run_text {
    color: #fff;
  }
  .bg-linear-blue {
    background-image: linear-gradient(to right, #78b7f8, #458cf5);;
  }
  .bg-linear-orange {
    background-image: linear-gradient(to right, #f89460, #f86858);
  }
  .bg-linear-purple {
    background-image: linear-gradient(to right, #a080f8, #7074f8);;
  }
  .run_item {
    border-radius: 5px;
  }
  .run_kf {
    background-color: #fff;
    padding: 5px;
  }
  .service {
    background-color: #fff;
  }

</style>