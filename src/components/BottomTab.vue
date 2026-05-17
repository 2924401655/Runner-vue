<template>
  <div class="footer">
    <div class="footer-seat">
      <div class="footer-list">
        <ul>
          <li>
            <router-link 
              to="/" 
              exact 
              :active-class="'select'" 
              class="footer-link"
            >
              <i class="el-icon-s-shop"></i> <!-- 改用 i 标签显示图标 -->
              <span>在线下单</span>
            </router-link>
          </li>
          <li>
            <router-link 
              to="/square" 
              :active-class="'select'" 
              class="footer-link"
            >
              <i class="el-icon-s-comment"></i> <!-- 改用 i 标签显示图标 -->
              <span>抢单大厅</span>
            </router-link>
          </li>
          <li>
            <router-link 
              to="/user" 
              :active-class="'select'" 
              class="footer-link"
            >
              <i class="el-icon-user-solid"></i> <!-- 改用 i 标签显示图标 -->
              <span>我的</span>
            </router-link>
          </li>
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