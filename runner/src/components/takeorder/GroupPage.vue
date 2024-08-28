<template>
  <div class="container">
    <el-page-header @back="goback()" ></el-page-header>
    <h3> 小吃街下单页</h3>  
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" @submit.native.prevent>
  <el-form-item label="代送商品" prop="name">
    <el-input v-model="ruleForm.name" placeholder="需要的商品/店铺id与商品"></el-input>
    <el-link type="success" href="/tools/shop">快捷查看店铺id</el-link>
   
  </el-form-item>
  <el-form-item label="期望收货地" >
    <div class="block">
  <span class="demonstration">也可以自行商议接货地</span>
  <el-cascader
    v-model="Cascader.selectedValue"
    :options="options"
   ></el-cascader>
</div>
  </el-form-item>
  <el-form-item label="具体房间号" prop="roomnum">
    <el-input type='number' v-model="ruleForm.roomnum"></el-input>
  </el-form-item>
  <el-form-item label="期望收货期" required>
    <el-col :span="11">
      <el-form-item prop="date1">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="date2">
        <el-time-picker placeholder="选择时间" v-model="ruleForm.time" style="width: 100%;"></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item label="商品金额" prop="money">
    <el-input  v-model="ruleForm.money"></el-input>
  </el-form-item>
  <el-form-item label="悬赏金额" prop="num">
    <el-input-number v-model="ruleForm.num" :precision="2" :step="1" :min="1" :max="10">
  </el-input-number></el-form-item>

  <el-form-item>
    <el-upload
  class="upload-demo"
  action=""
  :on-remove="handleRemove"
  :file-list="fileUpLoad.fileList"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
</el-form-item>
  <el-form-item label="备注信息">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>
  <el-card class="text-card">
      <i class="
el-icon-s-opportunity"> </i>
<span>麻烦各位同学如实填写以上信息,以便提高订单效率,如果需要更多的要求,请填写在备注信息,对平台有更好建议,欢迎随时骚扰技术，谢谢各位同学 </span>
    </el-card>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
  <el-form-item>
    <el-link type="warning" href="/agreement">发起订单即代表您同意本条款点此查看</el-link>
  </el-form-item>
  <el-form-item>

    </el-form-item>

  <el-dialog
  title="付款方式"
  :visible.sync="payment"
  width="70%"
  center>
  <center>
  <hr>
  <span class="money">￥{{totalAmount}}</span>
   <hr>
  <button class="pay_btn" @click="dopay('alipay')"><img  height='70%' width="10%" src="@/assets/alipay.png" alt=""><span>支付宝</span></button>
  <button class="pay_btn" @click="dopay('wxpay')"><img height='70%' width="10%" src="@/assets/wxpay.png" alt=""><span>微信支付</span></button>
  <p><strong>订单已保存至</strong><a style='text-decoration: none;color: #4C33E5;font-weight: 800' href="/User/orderlist">[订单列表]</a></p>
  <p style="font-weight: 800;color: #E53333;">在被接单后，您的商品款项先行进入接力者账户</p>
  <p style="font-weight: 800;">支付代表您同意：悬赏以及接单属于您与接力者的约定事项，<span style="color:#006600 ;">与本站无关</span></p>
  <p style="font-weight: 800;">本站只作为担保方</p>
    </center>
</el-dialog>
</el-form>
  </div>
  
</template>

<script >

import dormitoryData from '../tools/RoomNumber.js'
import axios from 'axios';
export default {
    data() {
      return { 
        extra:false,
        payment:false,
        value:[],
        options:dormitoryData,
        Cascader:{  // 级联选择器数据
          selectedValue:'',
        },
        fileUpLoad:{  //数组 每个对象为元素
          fileList:[]
          
        },
        ruleForm: {  //表单数据绑定
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          num:1,
          money:0,
          roomnum:0,
        },
        
        rules: {
          num:[
            {required:true,message:'请按照实际情况输入'},
          ],
          name: [
            { required: true, message: '请按照实际情况输入', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          roomnum:[
            {required:true,message:'输入具体房间号例如101',trigger:'blur'},
            {min:3,max:3,trigger:'blur'}
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          time: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: false, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: false, message: '请填写活动形式', trigger: 'blur' }
          ],
          money:[
            {required:true,message:'请输入商品金额',trigger:'blur'},
            {min:1,max:100}
          ]
        },
        trade_no :0
      };
    },
    computed:{  // 计算属性
        totalAmount(){
          return parseFloat(this.ruleForm.money) + parseFloat(this.ruleForm.num)
        },
        getTrade(){
         return  this.getCurrentDateTime() + this.getRandomNumber(100,999)
        }
    },
    methods: { 
      getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要+1
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
},
 getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
},

      handleRemove(file,fileList){
        console.log(file,fileList)
      },
      uploadPreview(file){
        this.uploadImageUrl = file.url;
        this.uploadVisible = true
      },
      dopay(type){
        // 生成唯一订单号
        this.trade_no = this.getTrade
        this.type = type
        //商品名称  this.ruleForm.name
        // 支付方式  
        //支付金额   this.totalAmount
        axios.post('./epayapi.php',{
          trade_no:this.getTrade,
          trade_name:this.ruleForm.name,
          amount:this.totalAmount,
          type:this.type
        })
        .then((res)=>{
         document.write(res.data)
         
        })
        .catch((err)=>{
          console.log(err)

        })  

  

    },
      //表单提交
      submitForm(formName) {  // 回调函数包含第一个参数 在验证之后执行 
        this.$refs[formName].validate((valid,ErrMsg) => {
          if (valid) {  // 验证通过后执行
            this.payment = true
          } else {
            console.log('error submit!!');
            console.log(ErrMsg)   // 返回一个数组  数组包含出现问题的项
            return false;
          }
        });
      },
     
      goback(){
        this.$router.push('/')
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      filePreview(file,fileList){
        console.log(file,fileList)
      }
    },
    
    watch:{
    },
  }
</script>

<style scoped>
.text-card {
  margin: 5px auto;
  width: 80%;
  color:rgb(18, 150, 219);
}
.money {
  font-size: 30px;
  margin: auto;
  font-weight: 600;
}
.pay_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #545454;
  width: 100%;
  height: 36px;
  margin: 10px 0;
  font-weight: 600;
  border: 0.5px solid rgb(225,225,225);
  border-radius: 2px;
  box-sizing: border-box;
}
.pay_btn img {
  margin:0 5px;
}
hr {
  margin-bottom: 10px;
  border-top:0.01px solid #eee;
  height: 0;
  box-sizing: content-box;
}

</style>