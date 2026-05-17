<template>
  <div class="container">
    <el-page-header @back="goback"></el-page-header>
    <h3>自定义需求页</h3>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-dynamicForm">
      <!-- 需求内容 -->
      <el-form-item label="需求内容" prop="requestname">
        <el-input type="textarea" v-model="ruleForm.requestname"></el-input>
      </el-form-item>
      <!-- 文件上传 -->
      <el-form-item>
        <el-upload
          class="upload-demo"
          action="/upload" 
          :multiple="true"
          :accept="fileUpLoad.acceptFile"
          :file-list="fileUpLoad.fileList"
          list-type="picture"
          :before-upload="handleBeforeUpload">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <!-- 地址选择 -->
      <el-form-item label="期望收货地">
        <div class="block">
          <el-cascader
            v-model="ruleForm.cascaderSelectedValue" 
            :options="options">
          </el-cascader>
        </div>
      </el-form-item>
      <!-- 具体房间号 -->
      <el-form-item label="具体房间号" prop="roomnum">
        <el-input v-model="ruleForm.roomnum"></el-input>
      </el-form-item>
      <!-- 日期和时间选择器 -->
      <el-form-item label="期望收货期" required>
        <el-date-picker
          v-model="ruleForm.date"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-time-picker
          v-model="ruleForm.time"
          placeholder="选择时间"
          prop="time"> <!-- 添加prop属性用于表单验证 -->
        </el-time-picker>
      </el-form-item>
      <!-- 悬赏金额 -->
      <el-form-item label="悬赏金额" prop="num">
        <el-input-number v-model="ruleForm.num" :precision="2" :step="1" :min="1" :max="100"></el-input-number>
      </el-form-item>
      <!-- 表单操作按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即下单</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      <!-- 用户协议链接 -->
      <el-form-item>
        <el-link type="warning" href="/agreement">发起订单即代表您同意本条款点此查看</el-link>
      </el-form-item>
      <!-- 提示信息 -->
      
        <el-card class="text-card">
          <i class="el-icon-s-opportunity text-card"></i>
          <span class="text-card">若距离过长，无人接单 建议增加悬赏金额</span>
        </el-card>
      
    </el-form>
  </div>
</template>


<script>
import dormitoryData from '../tools/RoomNumber.js';

export default {
  data() {
    return {
      // 需求内容的输入绑定
      request: '',
      // 级联选择器的数据源
      options: dormitoryData,
      // 级联选择器的绑定值
      Cascader: {
        SelectedValue: [],
      },
      // 文件上传组件的数据
      fileUpLoad: {
        fileList: [],
        acceptFile: 'image/*',
      },
      // 表单数据绑定
      ruleForm: {
        requestname: '', // 需求内容
        roomnum: '',    // 具体房间号
        date: '',       // 期望收货日期
        time: '',       // 期望收货时间
        num: null,      // 悬赏金额
      },
      // 表单验证规则
      rules: {
        requestname: [
          { required: true, message: '请填写完整需求内容', trigger: 'blur' }
        ],
        roomnum: [
          { required: true, message: '请输入具体房间号', trigger: 'blur' },
          { min: 1, max: 10, message: '房间号长度不符合要求', trigger: 'blur' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择期望收货日期', trigger: 'change' }
        ],
        time: [
          { type: 'date', required: true, message: '请选择期望收货时间', trigger: 'change' }
        ],
        num: [
          { required: true, message: '请输入悬赏金额', trigger: 'blur' },
          { type: 'number', min: 0.01, max: 10000, message: '金额需在0.01至10000之间', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    goback() {
      this.$router.push('/');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 表单提交逻辑
          console.log('表单提交数据：', this.ruleForm);
        } else {
          console.error('表单验证失败!');
          
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleBeforeUpload(file) {
      // 文件上传前的验证逻辑
      const isImage = file.type.startsWith('image/');
      const isLt500kb = file.size / 1024 < 500;

      if (!isImage) {
        this.$message.error('只能上传图片文件!');
      }
      if (!isLt500kb) {
        this.$message.error('上传文件大小不能超过 500kb!');
      }

      return isImage && isLt500kb;
    }
  }
};
</script>

<style>
/* 这里可以添加样式 */
.text-card {
  color: rgb(18, 150, 219);
}
</style>