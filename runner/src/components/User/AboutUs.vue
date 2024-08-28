<template>
  <div class="about">
    <h1>关于我们</h1>
    <div class="content">
        Runner接力者联盟专注于为高校提供最方便快捷的校园生活服务的平台。
        我们的理念是：让校园生活更美好！
        在这里你可以找到你所需要的各种服务，如快递、外卖、代购、代跑、代拿等。
        你也可以作为一个发布者，发布你的需求，让更多的人来帮助你。
    </div>
    <div class="content">
      对本程序中的疏漏之处,望不吝赐教
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.about{
  text-align: center;

}
.content {
  width: 100%;
  height: auto;
  padding: 20px;
  box-shadow:
    0 0 10px rgba(0, 123, 255, 0.1),
    0 0 20px rgba(0, 123, 255, 0.05),
    0 0 30px rgba(0, 123, 255, 0.025);
    border-radius: 10px;
    margin: 10px;
}
</style>