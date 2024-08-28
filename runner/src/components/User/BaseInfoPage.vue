<template>
    <div class="container">
  <el-descriptions title="用户信息" :border='true' :column="2" >
    <el-descriptions-item label="平台id">{{ userinfo.id }}</el-descriptions-item>
    <el-descriptions-item label="用户名">{{ userinfo.username }}</el-descriptions-item>
    <el-descriptions-item label="个人姓名">{{ userinfo.name }}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{userinfo.phonenum}}</el-descriptions-item>
    <el-descriptions-item label="宿舍号">{{userinfo.roomnum}}</el-descriptions-item>
    <el-descriptions-item label="专业名称">{{userinfo.majorname}}</el-descriptions-item>
    <el-descriptions-item label="导员电话">{{userinfo.teacherphone}}</el-descriptions-item>
    <el-descriptions-item label="学号">{{userinfo.stunum}}</el-descriptions-item>
    <el-descriptions-item label="居住地">{{userinfo.district}}</el-descriptions-item>
    <el-descriptions-item label="备注">
      <el-tag size="small">学校</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="联系地址">{{userinfo.extradistrict}}</el-descriptions-item>
</el-descriptions>
        
<el-button type="primary" round @click="notification()" class="btn">修改信息</el-button>
<el-dialog title="个人信息" :visible.sync="dialogFormVisible" width='100%'>
  <el-form :model="form">
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机号" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
<el-row :gutter="12">
  <el-col :span="8">
    <el-card shadow="hover" >
    你的信息采用自研加密技术加密,请注意信息的准确性
    </el-card>
  </el-col>
</el-row>
<BottomTab></BottomTab>
</div>
</template>

<script scoped>
import api from '@/api/api'
import BottomTab from '../BottomTab.vue';
export default {
    components:{
        BottomTab,
    },
    data(){
        return {
            dialogFormVisible:false,  //信息修改表单开关
            userinfo:{
                id:1,
                username:'测试',
                name:'测试姓名',
                phonenum:'****',
                district:'苏州市',
                school:'您的学校',
                extradistrict:'江苏省苏州市',
                roomnum:'宿舍地址',
                majorname:'专业',
                stunum:'学号',
                teacherphone:'1888888',
            },
            
            form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
    }
    },
    methods:{
        notification(){
            const h = this.$createElement;
            this.$notify({
            title: '功能待开发',
            type:'warning',
            message: h('i', { style: 'color: teal'}, '暂不支持手动更改个人信息,若需修改请联系客服!')
            });
        },
        getUserInfo(){
          api.post().then((res)=>{
            this.userinfo = res
          })
        }
    },
    mounted(){
      this.userinfo.district = this.userinfo.district = localStorage.getItem('location')? localStorage.getItem('location') : '苏州市'
    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
}
.el-card {
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 20px;
    width: 300px;
    height: auto;

}
.btn {
  margin: 10px;
}
</style>