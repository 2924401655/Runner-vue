<template>
    <div class="container">
        <div class="notice" @click="$router.push('/user/bindemail')">
      <img src="../../assets/notice.png" width="40px" height="40px"  alt="">
     <span>点击开启邮件提醒功能,订单消息可及时提醒您~</span>
    </div>
    </div>
</template>

<script >

</script>

<style  scoped>
.container{
    width: 100%;
}
.notice{
   width: 100%;
   height: 40px;
   font-size: 1rem;
   display: flex;
   align-items: center;
   background-color: #fff;
   border-radius: 50px;
}
.notice span {
    color: rgb(42, 190, 246);
}
</style>