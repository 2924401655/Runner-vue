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
    <a href="./agreement">《用户协议》</a>和<a href="./agreement">《隐私政策》</a>
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
// import api from '@/api/api.js
// import store from '@/store/index.js'
import axios from 'axios'
import { publicTools } from '../tools/publicTools';
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
      if(this.$route.push !=='/user'){
      location.href = "../api/connect.php"+"?type="+type
      // 调用第三方聚合登录平台可实现QQ WX 等登录效果。
      }
    },
    getUserInfo(){
      const param = new URLSearchParams(location.search)
      if(param.get('code') && param.get('type')){
        axios.get('/api/connect.php',{
          params:{
            code:param.get('code'),
            type:param.get('type')
          }
        })
        .then((res) => {
          if(res.status === 200){
            // 请求成功了
            console.log(res.data)
            console.log('login successful')
            let data = res.data
            localStorage.setItem('avatar', data.faceimg)
            localStorage.setItem('name',data.nickname)
            localStorage.setItem('location',data.location)
            // store.commit('setLoginStatus',data)
            publicTools.Cookie.set('username', data.nickname,7)
            publicTools.Cookie.set('sessionid', 'sessionid',7)
            // this.$store.commit('setLoginStatus', data)
            //
            this.$router.push({name:'user'})

          } else{
            console.log('错误码不是200',res)
          }
          })
        }
    },
    checklogin(){
      // if(localStorage.getItem('avatar')){
      //   this.$router.push({name:'user'})
      // }
      let username = publicTools.Cookie.get('username')
      let sessionid = publicTools.Cookie.get('sessionid')
      if(!username && !sessionid) {
        // this.$router.push({name:'login'})
        
      } else {
        this.$router.push({name:'user'})
      }
    }

  },
mounted(){
    this.checklogin()
    this.getUserInfo()
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