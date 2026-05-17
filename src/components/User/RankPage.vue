\4<template>
  <div class="rankContainer">
    <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="开始时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    </el-form-item>
    <el-form-item label="截止时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
    <span>总数:{{ totalRunner }}</span>

    <el-card v-for="(Data,key) in runnerData" :key="key">
        <!-- 获取到数据后 通过v-for渲染 -->
         <span>{{Data}}</span>
    </el-card>
  </el-form>
  </div>
</template>

<script>
export default {
    data(){
        return {
            runnerData:'',
            form:{
                data1:'',
                data2:''
            }
        }
    },
    computed:{
        totalRunner(){
            //  后端计算并返回
            return 1
        }
    },
    mounted(){

    }
}
</script>

<style>

</style>