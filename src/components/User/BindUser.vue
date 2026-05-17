<template>
  <div class="binduser">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="form">
      <h2>绑定你的账户:</h2>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
     
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
<el-form-item>

  <el-link type="info">没有账户？点此注册!</el-link>
</el-form-item>

    </el-form>
    


  </div>
</template>

<script>
export default{
  name:"BindUser",
  props:{

  },
  data(){

    var UserValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      }else {
        callback();
      }
    }

    var PassValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }else {
        callback();
      }
    }

    return{
      form:{
        username:"",
        pass:""
      },
      rules:{
        username:[
          {validator: UserValidator,trigger:'blur'}
        ],
        pass:[
          {validator: PassValidator,trigger:'blur'}
        ]
      }

    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) =>{
        if(valid) {
            // submit
        }else {
          return false
        }
      })
  },
  resetForm(formName) {
    this.$refs[formName].resetFields();
  }
},
  created(){

    // 组件加载时 首先判断登录状态，如果已经登录， 则弹出提示
    
  // 如果没有登录， 是否有参数传递 判断参数， 如果参数为空， 跳转到登录页面

  // 参数不为空  判断参数是否合法， 

  // 参数合法 加载组件 
  }
}
</script>

<style lang="scss" scoped>
</style>
