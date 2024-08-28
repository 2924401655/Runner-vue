<template>
  <div class="container">
    <el-card>以下是各项服务的手续费用,为保证平台日常运营维护而设立之</el-card>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="service"
      label="服务项"
      width="100">
    </el-table-column>
    <el-table-column
      prop="plat"
      label="平台"
      width="100">
    </el-table-column>
    <el-table-column
      prop="runner"
      label="接单员"
      >
    </el-table-column>
  </el-table>
  <center>
  <el-button type="primary" round @click="dialog = true">下一步</el-button>
</center>
<el-dialog title="申请表" :visible.sync="dialog" width="100%">
  <el-form :model="form" :rules="rule">
    <el-form-item label="姓名" prop="name">
     <span>{{this.form.name}}</span>
    </el-form-item>
    <el-form-item label="学号" prop="stunum">
      {{this.form.stunum}}
    </el-form-item >
    <el-form-item label="学生证">
      <el-upload
  class="upload-demo"
  drag
  action="https://jsonplaceholder.typicode.com/posts/"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只可上传图片，能证明学籍即可 此项只作为验证 不会长期保存</div>
</el-upload>
    </el-form-item>
    <el-form-item label="电子协议">
        <el-switch
    v-model="form.switch"
    active-color="#13ce66"
    inactive-color="#ff4949">
  </el-switch>
  <el-link type="danger" href="/Agreement">开启表示同意此协议</el-link>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialog = false">取 消</el-button>
    <el-button type="primary" @click="submit()">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      tableData:[
        {
        service:'小吃街跑腿',
        plat:'10%',
        runner:'90%'
        },
        {
        service:'快递代取',
        plat:'10%',
        runner:'90%'
        }
        ,{
        service:'超市代购',
        plat:'10%',
        runner:'90%'
        },
        {
        service:'自定义需求',
        plat:'10%',
        runner:'90%'
        }
      ],
      dialog:false,
      form:{
        switch:false,
        name:'测试',
        stunum:0
      },
      rule:{
        name:[
          {require:true,message:'请填写完整',trigger:'blur'},
          {
            min:3,max:4,message:'长度为3-4'
          }
        ],
        stunum:[
          {require:true,message:"请填写完整",trigger:'blur'}
          ,{
            min:12,max:12
          }
        ]
      }
    }
  },
  methods:{
    submit(){
      this.dialog = false
      console.log(this.form.switch)
      axios.post('')
    }
  },
  mounted(){
    //获取个人信息
    //自动绑定部分数据。
  }
}
</script>

<style>

</style>