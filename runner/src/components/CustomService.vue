<template>
  <div class="container">
    <div class="service">
      <img src="../assets/kf.png" class='logo' alt="">
      <div class="info">联系技术</div>
      <div class="btn">
        <button id="btn" @click="tips()">微信客服</button>
      </div>
    </div>
    <!--公告区-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
    <span>公告</span>
  </div>
        <div class="text item">
          本站提供信息发布，此时此刻你需要别人的帮助都可以下悬赏单!<br>本站抽成仅
          <font color='red'>用于服务器以及其他日常维护动力来源</font><br>
至于开发此套系统，仅缘于热爱~
  </div>
  </el-card>
  <div class="white"></div>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard';
export default {
  data(){
    return {
      clipstatus:0,
      activeNames:['0']
    }
  },
  methods:{
    tips(){
      let Clipboard = new ClipboardJS('#btn',{
        text: function() {
          return '2924401655'
        }
      })
      Clipboard.on('success', () => {
        Clipboard.destroy()
        this.$message({
         type:'success',
          message:'复制成功',
        })
      })
      Clipboard.on('error', () => {
        Clipboard.destroy()
        this.$message({
          type:'error',
          message:'复制失败',
        })
      })
  
}
  },
  mounted(){

  }
}
</script>

<style scoped>
.el-card {
  border-radius: 10px;
  padding: 5px;
  width: 100%;
}
.white{
  width: 100%;
  height: 30px;
  margin-top: 10px;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.service{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin: 5px 5px;
  width: 100%;
  height: 80px; 
  background-color: rgb(255,255,255);
  border-radius: 10px 10px;
}
.service img{
  width: 60px;
  height: 50px;
  margin: 10px;
}
.info {
  font-size: .85rem;
  margin: 0 5px;
  position: relative;
  left: -50px;
}
.btn button {
  color: red;
  margin: 10px;
  border: 1px solid red;
  border-radius: 10px 10px;
  background-color: #fff;
}
</style>