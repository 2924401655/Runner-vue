<template>
    <div class="container">

        <el-card>
            您当前绑定的邮箱地址: <p >{{ user.email ? user.email : '未绑定邮箱'}}</p>
            功能： 通过开启 邮箱提醒功能，在有新悬赏单发布后，以及您的订单被他人接单和订单状态可通过邮箱提醒你
        </el-card>
        <div>
        <span>是否开启新订单提醒</span>
        <el-tooltip :content="'您已'+ value1" placement="top">
  <el-switch
    v-model="value1"
    active-color="#13ce66"
    inactive-color="#ff4949"
    active-value="开启"
    inactive-value="关闭" >
  </el-switch>
</el-tooltip>
</div>
<div>
        <span>是否开启订单状态提醒</span>
        <el-tooltip :content="'您已'+ value2" placement="top">
  <el-switch
    v-model="value2"
    active-color="#13ce66"
    inactive-color="#ff4949"
    active-value="开启"
    inactive-value="关闭">
  </el-switch>
</el-tooltip>
</div>
        
    </div>
</template>

<script >
    export default {
        data() {
                    return {
                        user: {
                            email: '' // replace with your email
                        },
                        value1:false,
                        value2:false,
                        
                    }
        }
    }
</script>

<style  scoped>
div {
    margin: 10px;
}
</style>