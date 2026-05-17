<template>
  <div>
    <el-dialog
  title="账号登录"
  :visible.sync="dialogVisible"
  width="100%"
 :show-close="false" :close-on-click-modal="false" :center="true">
 <div class="login_btn_wrapper"> 
  <button class="login wx" @click.prevent="dologin('wx')">
  <img src="../../assets/wxlogin.png" width="50px" height="50px" alt>
  <span>微信登录</span>
 </button>
 <button class="login qq" @click.prevent="dologin('qq')
 ">
  <img src="../../assets/qqlogin.png" width="50px" height="50px" alt>
  <span>QQ登录</span>
 </button> </div>
  <div class="agreement">
    <el-checkbox v-model="checked">我已阅读并同意</el-checkbox>
    <a href="#">《用户协议》</a>和<a href="#">《隐私政策》</a>
    <div class="tip" v-show="ischecked">
      请阅读并勾选协议
    </div>
  </div>
 <span slot="footer" class="dialog-footer">

    <el-button type="primary" @click="goback()">再看看</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script >
import api from '@/api/api.js'
export default {
  data() {
    return {
      dialogVisible: true,
      checked: false,
      ischecked: false,
    }
  },
  methods:{
    goback(){
      this.dialogVisible = false
      this.$router.push({name:'home'})
    },
    dologin(type){
      if(!this.checked) {
        this.ischecked = true
        return
      }
      api.user.Login(type)
      .then(res=>{
        //登录成功 会返回用户数据  存入localstorage 
        //并且跳转到用户个人页面  判断个人信息完善情况进行提示
        if(res.data.code == 0){
          localStorage.setItem('Token',JSON.stringify(res.data))
          this.$router.push({name:'user'})
        }
      })
      .catch((res) =>{
        console.log("发生错误了"+ res)
        this.$message.error('登录失败，请稍后再试')
      })
      
    }
  },
  created(){
    console.log(this.$route.query)
    if(this.$route.query.type){
      // 请求用户数据
      api.user.getUserInfo('',this.$route.query.type,this.$route.query.code)
      .then(res=>{
        if(res.data.code === 200) {
          //登录成功 会返回用户数据  存入localstorage  标识聚合登录用户的唯一id 
          localStorage.setItem('Userid',this.$route.query.code)
          localStorage.setItem('name',res.data.nickname)
          localStorage.setItem('avatar',res.data.faceimg)

          //并且跳转到用户个人页面  判断个人信息完善情况进行提示
          this.$router.push({name:'user'})
          if(res.data.code === 400){
            // 没有数据
            this.$message.error('网络错误，请稍后再试')
          }
        }
      })
  }
}
}
</script>

<style scoped>

.login_btn_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  /* height: 52px; */
  
}
.login {
  background-color: #fff;
  width: 80%;
  margin-top: 20px;
  height: 52px;
  border-radius: 50px;
  color: #fff;
  border: none;
}
.login span {
  font-size: 16px;
  vertical-align: middle;
}
.wx{
  background-color: #2dd192;
}
.qq {
  background-color: #41c2f7;
}
.login img {
  vertical-align: middle;
}
.agreement {
  text-align: center;
  margin: 20px 0;
  color: #a0a8b0;
}
.agreement a {
  color: #41c2f7;
  text-decoration: none
}

.tip {
  box-sizing: border-box;
    position: relative;
    height: 30px;
    background-color: rgb(48, 49, 51);
    color: #fff;
    border-radius: 5px;
    width: 130px;
    top: 15px;
    left: -20px;
    line-height: 30px;
}
.tip::after, .tip::before {
    position: absolute;
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    pointer-events: none;
}

.tip::after {
    border-color: transparent;
    border-bottom-color: rgb(48, 49, 51);
    border-width: 12px;
    margin-left: -12px;
}
.tip::before {
    border-color: transparent;
    border-bottom-color: rgb(48, 49, 51);
    border-width: 15px;
    margin-left: -15px;
}
</style>