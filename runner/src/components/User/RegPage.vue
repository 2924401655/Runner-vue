<template>
  <div class="container">
    <el-form :model="Login" :rules="rules" ref="LoginForm" label-width="100px" class="LoginClass">
      <el-form-item><h1>用户后台登陆页面</h1></el-form-item>
      <div class="t-l-c"><el-link type="warning" href="#">暂不开放注册，请选择下方登录方式进行登录</el-link></div>
       
      <!-- <el-form-item label="账号" prop="name">
    <el-input v-model="Login.name" placeholder="暂使用学号进行登录"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input @focus="handlepass(true)" @blur="handlepass(false)" type="password" v-model="Login.pass" show-password></el-input>
  </el-form-item> -->
  <!-- <el-form-item>
   <div id="captcha" style="margin:auto">
    <div id="captcha_text" v-show="captcha_text">
      正在加载验证码
    </div>
   </div>
  </el-form-item> -->
  
  <!-- <el-form-item>
    <el-button type="primary" id="btn"  @click="submitLogin('LoginForm')">登陆</el-button>
    <el-button @click="reset('LoginForm')">重置</el-button>
  </el-form-item> -->
  <el-form-item>
    
  </el-form-item>
</el-form>
<div class="pic_container">
  <img  :src="picurl1" width="100px" height="100px">
  <img  :src="picurl2" width="100px" height="100px">
</div>
  </div>
</template>

<script>
import axios from 'axios';
import api from '@/api/api.js'
import store from '@/store/index.js'
export default {
    data(){
        return{
          captcha_text:true,
          csrf_token:'',
            Login:{
                pass:'',
                name:''
            },
            picurl1:'https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login-v2/img/22_open.4ea5f239.png',
            picurl2:'https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login-v2/img/33_open.f7d7f655.png',
            //表单验证规则
            rules:{
                name:[
                    {required:true,message:'请输入账号',trigger:'blur'},
                    {min:6,max:12,message: '使用6-12位学号登陆', trigger: 'blur' }
                ],
                pass:[
                  {required:true,message:'请输入密码',trigger:'blur'},
                  {min:6,max:10,message:'密码长度在6到10个字符',trigger:'blur'}
                ]
            },
        }
    },
    methods:{
        submitLogin(formname){  // 执行一个表单验证
            this.$refs[formname].validate((valid) =>{
                if(valid) {
                    if(this.captcha_status) {
                    api.user.Login(this.Login.name,this.Login.pass)
                    .then((res) =>{
                      const data = res.data
                      // console.log(res)
                        if(data.code ===200) {
                            this.$message.success('登陆成功' )
                            localStorage.setItem('token',data.user.uid)
                          store.commit('setLoginStatus',data.user)
                            this.$router.push({path:'/user'})
                        }else {
                            this.$message.error(data.msg + '状态不是200')
                        }
                    }).catch((res)=>{
                      if(res){
                        // console.log(res)
                        this.$message.error('登陆失败' + res.message)
                      }
                      
                    }) 
                    
                    }
                  }
            })
        },
        checkLogin(){
          if(localStorage.getItem('token')) {
            store.commit('setLoginStatus', localStorage.getItem('token'))
            this.$router.push({path:'/user'})
          }
        },
        handlepass(type){
          if(type){
          this.picurl1 = 'https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login-v2/img/22_close.9382a5a8.png'
          this.picurl2 = 'https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login-v2/img/33_close.a8c18fc8.png'
          }else {
            this.picurl1 = 'https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login-v2/img/22_open.4ea5f239.png'
            this.picurl2 = 'https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login-v2/img/33_open.f7d7f655.png'
          }
        },
        reset(formname){
            this.$refs[formname].resetFields()
        },
        handlerEmbed(captchaObj) {
          captchaObj.appendTo('#captcha');
          captchaObj.onReady(() => {
            this.captcha_text = false
          }).onSuccess(()=>{
            var result = captchaObj.getValidate()
            if(!result) {
              this.$message.error('验证失败')
            }else {
              this.captcha_status = true
            }
       })
    },
    initGeetest() {
      axios.get("https://www.geetest.com/demo/gt/register-click?t=" + new Date().getTime())
        .then((res) => {
          const {gt,challenge,success} = res.data
          window.initGeetest({
            gt: gt,
            challenge: challenge,
            offline: !success,
            new_captcha: true,
            width:'250px'
          }, this.handlerEmbed);
        })
        .catch((error) => {
          console.error('Error fetching geetest data:', error);
        });
      },
      
},
    mounted(){
      this.checkLogin()
      this.initGeetest();
	},
  watch:{
    
  }
  }
</script>

<style scoped>
.el-form-item::before{
  content: '';
}
.el-form-item::after{
  content: '';
}
.t-l-c {
  text-align: center;
}
.container {
  width: 100%;
  height: 550px;
  box-sizing: border-box;
  background-color: rgb(245,245,245);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}
.LoginClass{
    width: 100%;
    height: auto;
    margin-left: -30px;
    padding: 30px 0;
    overflow: hidden;
}
.pic_container {
  box-sizing: border-box;
}
.pic_container img:nth-child(1) {
  position: absolute;
  bottom: 0;
}
.pic_container img:nth-child(2){
  position: absolute;
  bottom: 0;
  right: 0;
}

</style>