<template>
  <div class="container">
    <el-page-header @back="goback()" ></el-page-header>
    <h3> 快递代取业务下单页</h3>  
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" @submit.native.prevent>
      <el-form-item label="代取物件" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="收件码" prop="code">
        <el-input  v-model="ruleForm.code"></el-input>
      </el-form-item>
      
  <el-form-item label="期望收货地">
    <div class="block">
  <span class="demonstration">也可以自行商议接货地</span>
  <el-cascader
    v-model="Cascader.selectedValue"
    :options="options"
   ></el-cascader>
</div>
  </el-form-item>
  <el-form-item label="具体房间号" prop="roomnum">
    <el-input v-model="ruleForm.roomnum"></el-input>
  </el-form-item>
  <el-form-item label="期望送达期" required>
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
  <el-form-item label="悬赏金额" prop="num">
    <el-input-number v-model="ruleForm.num" :precision="2" :step="1" :min="1" :max="10">
  </el-input-number>
</el-form-item>
  <el-form-item label="身份码">
    <el-upload
  class="upload-demo"
  action="/"
  :file-list="fileUpLoad.fileList"
  list-type="picture"
  accept="image/*">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
</el-form-item>
  <el-form-item label="备注信息" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc" placeholder="必要的补充信息需要补充"></el-input>
  </el-form-item>
  <el-form-item>
    <el-card class="text-card">
      <i class="el-icon-s-opportunity"></i>
      <span>收件码与身份码在抢单大厅所有人不可见,仅备注信息所有人可见</span>
    </el-card>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
  <el-form-item>
    <el-link type="warning" href="/agreement">发起订单即代表您同意本条款点此查看</el-link>
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
  <button class="pay_btn" @click="dopay('zfb')"><img  height='70%' width="10%" src="@/assets/alipay.png" alt=""><span>支付宝</span></button>
  <button class="pay_btn" @click="dopay('wx')"><img height='70%' width="10%" src="@/assets/wxpay.png" alt=""><span>微信支付</span></button>
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
import {handlerPay} from './handlerPay.js';
// import axios from 'axios'
export default {
    data() {
      return { 
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
          name:'',
          region: '',
          date: '',
          date2: '',
          type: [],
          resource: '',
          desc: '',
          num:1,
          code:0,
        },
      
        rules: {  //表单验证规则
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
            { required: true, message: '请选择收获地址区域', trigger: 'blur' }
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
          ],
          code:[
            {required:true,message:'收件码格式: 10-10-1010',trigger:'blur'}
          ]
        }
      };
    },

    methods: {  //表单提交
      submitForm(formName) {  // 回调函数包含第一个参数 在验证之后执行 
        this.$refs[formName].validate((valid,ErrMsg) => {
          if (valid) {
            
            if(!this.Cascader.selectedValue) {
              this.$message({
                type: 'error',
                message: '请选择收货地址'
              });
              return false;
            } // 验证通过后执行
            // console.log('你购买了'+this.ruleForm.name+'收获地在'+this.Cascader.selectedValue+'房间号是'+this.ruleForm.roomnum+'期望在'+this.ruleForm.date+'和'+this.ruleForm.time+'金额为'+this.ruleForm.money)
            this.payment = true  // 打开支付窗口
           
       
          } else {
            console.log('error submit!!');
            console.log(ErrMsg)   // 返回一个数组  数组包含出现问题的项
            return false;
          }
        });
      },
      dopay(type){
            handlerPay.dopay(type.this.ruleForm.name,this.totalAmount)
      },
      goback(){
        this.$router.push({name:'home'})
      }
    
},

    computed:{
      totalAmount(){
          return  parseFloat(this.ruleForm.num)
        },
        getTrade(){
        //  return  this.getCurrentDateTime() + this.getRandomNumber(100,999)
        return 111
        }
    },
    watch:{
     
    },
    
  }
</script>

<style>
.text-card {
  margin: 0 auto;
  line-height: 20px;
  color: rgb(18, 150, 219);
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