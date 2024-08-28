<template>
  <div class="footer">
    <div class="footer-seat">
      <div class="footer-list">
        <ul>
          <li><a href="/" :class="{'select':$route.path==='/'}">
            <li class="el-icon-s-shop"></li>
            <span>在线下单</span>
          </a></li>
          <li><a href="/square" :class="{'select':$route.path==='/square'}">
            <li class="el-icon-s-comment"></li>
            <span>抢单大厅</span>
          </a></li>
          <li><a href="/user" :class="{'select':$route.path==='/user'}">
            <li class="el-icon-user-solid"></li>
            <span>我的</span>
          </a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
  
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.footer {
  height: 30px;
}
.footer-seat {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #FFF;
  border-top: 1px solid #e5e5e5;
}
a{
  color: rgb(145,145,145);
  text-decoration: none;
}
li {
  list-style-type: none;
}
.footer-list ul{
  display: flex;
  text-align: center;
  align-items: center;
  height: 100%;
  }
.footer-list ul li {
  flex:1;
  margin-top: 5px;
}
.footer-list ul li i {
  font-size: 2rem;
}
.footer-list ul li span {
  display: block;
}
.select{
color: #2ABEF6;
}
</style>