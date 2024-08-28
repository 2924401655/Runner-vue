<template>
  <div class="containr">
    <el-empty  description="暂无订单,要不你刷新试试？" v-if="hasOrder"></el-empty>
   
    <el-tabs tab-position="top"  v-model="activeName" @tab-click="handleClick" v-if="!hasOrder" stretch >
    <el-tab-pane label="正在悬赏" name="first">
      <NoticeTab></NoticeTab>
      <div class="item" v-for="(item,index) in orderlist" :key="index" @click="toOrderDetail">
        <div class="header">
          <img src="../assets/alipay.png" width="40px" height="40px" alt="">
          <div class="font-box"><h3>{{ item.type }}</h3>
            <div class="font">{{ item.issue }} | {{ item.date }}</div></div>
          
          <div :class="{status:true, ongoing:item.status==='悬赏中',completed:item.status==='已完成', pending:item.status==='待接单'}">
            <h3>{{item.status}}</h3>
          </div>
        </div>  
        
          <div class="content">
            <h4>{{ item.description }}</h4>
            <div>{{ item.notice }}</div>
          </div>
          <div class="bottom">
            <div class="prize">
            <h3>赏金￥{{ item.prize }}</h3>

            </div>
          </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="我发出的" name="second" >
      <NoticeTab></NoticeTab>
      <el-empty description="这里空空哒,快去发布订单吧!" v-if="!submitOrder.length"></el-empty>
      
    </el-tab-pane>
    <el-tab-pane label="我帮助的" name="third">
      <NoticeTab></NoticeTab>
      <el-empty description="这里空空哒,快去接单吧!" v-if="!helpOrder.length"></el-empty>
     
    </el-tab-pane>
    
  </el-tabs>
    <BottomTab></BottomTab>
  </div>
</template>

<script>
import BottomTab from './BottomTab.vue';
import {orderlist} from '../components/tools/testdata';
import NoticeTab from '../components/tools/noticeTab'
export default {
  components:{
    BottomTab,
    NoticeTab,
  },
  data() {
    return {
      hasOrder: false ,
      activeName:'first',
      orderlist:orderlist,
      submitOrder:[],
      helpOrder:[],
      
    }
  },
  methods:{
    handleClick(){
      console.log('click');
    },
    toOrderDetail(){

    }
  },
  mounted(){
     
}
}
</script>

<style  scoped>
.containr {
  background-color: rgb(249,249,249);
}

.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.item { 
  position: relative;
  margin: 5px;
  padding: 5px;
  height: auto;
  /* box-shadow: 0 0 20px rgba(0, 123, 255, 0.3); */
  box-shadow:
    0 0 10px rgba(0, 123, 255, 0.1),
    0 0 20px rgba(0, 123, 255, 0.05),
    0 0 30px rgba(0, 123, 255, 0.025);
  overflow: hidden;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #fff;

}
.header {
  display: flex;
  flex-direction: row;
  padding: 5px;
}
.header img {
  border-radius: 50%;
}
.font-box {
  margin-left: 10px;
}
.font {
  color: rgb(185, 185, 185);
}
.status {
  width: 80px;
  height: auto;
  text-align: center;

  font-size: 16px;
  position: absolute;
  right: 10px;
  top: 0;
  margin: 15px;
}
.ongoing{
  color: #FF9800;
  background-color: #FFEB3B;
}
.completed {
  color: #4CAF50 ;
  background-color:  #E8F5E9;
}
.pending {
  color: #2196F3;
  background-color: #BBDEFB;
}
.content {
  height: 100px;
  line-height: 1.5;
  margin-left: 55px;
}
.content div {
  color: #9C27B0;
  /* background-color:  #E8F5E9; */
}
.bottom {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.bottom .prize {
  width: 100px;
  height: auto;
  text-align: center;
  /* background-color: rgb(254, 242, 244);
  color: rgb(195, 156, 155); */
  color: #FFFF00;
  background-color: #1A1A1A ;
  position: absolute;
  bottom: 10px;
  right: 20px;
  margin-bottom: 5px;
}
</style>