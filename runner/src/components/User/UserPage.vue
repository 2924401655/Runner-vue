<template>
  <div class="container">
    <div class="head">
      <div class="avatar">
      <el-avatar :size="60" :src="user.avatar"
></el-avatar>
        </div>
        <div class="baseinfo">
          <h4>{{ user.username }}</h4>
          <span>{{ user.phonenum }}</span>
          <div>{{ user.school }}</div>
          <!-- <RouterLink to="{name: 'userinfo'}" class="router-link"></RouterLink> -->
          <a class='arrow' href="/user/userinfo"><i class='el-icon-arrow-right infoarrow'></i></a>
        </div>
    </div>
    
        <el-card class="user-body">
          <el-row >
        <!-- <Router-Link><el-col :span="24"><div  class="item "><span class="text"><i class="el-icon-document order"></i>申请接单</span><i class="el-icon-arrow-right rightarrow"></i></div></el-col></Router-Link> -->
        <router-link to="/user/aply" class="router-link"><el-col :span="24"><div class="item"><span class="text"><i class="el-icon-document order"></i>申请接单</span><i class="el-icon-arrow-right rightarrow"></i></div></el-col></router-link>
       <router-link to="/user/rank" class="router-link"> <el-col :span="24"><div class="item "><span class="text"><i class="el-icon-s-data rank"></i>接单排行</span><i class="el-icon-arrow-right rightarrow"></i></div></el-col></router-link>
        </el-row>
        <el-row>
          <router-link to="/user/order" class="router-link"><el-col :span="24"><div class="item "><span class="text"><i class="el-icon-coin order "></i>我的订单</span><i class="el-icon-arrow-right rightarrow"></i></div></el-col></router-link>
          <el-col :span="24"><div class="item"><span class="text"><i class="el-icon-folder-opened service"></i>邀请新人</span><i class="el-icon-arrow-right rightarrow"></i></div></el-col>
        </el-row>
        <el-row>
        <el-col :span="24" ><div class="item " @click="kf()"><span class="text"><i class="el-icon-chat-dot-round service"></i>校区客服</span><i class="el-icon-arrow-right rightarrow"></i></div></el-col>
        <el-col :span="24"><div class="item "><span class="text"><i class="el-icon-tickets advice"></i>反馈建议</span><i class="el-icon-arrow-right rightarrow"></i></div></el-col>
        <RouterLink to="/user/about" class="router-link"><el-col :span="24"><div class="item "><span class="text"><i class="el-icon-position about"></i>关于我们</span><i class="el-icon-arrow-right rightarrow"></i></div></el-col></RouterLink>
        <el-col :span="24" ><div class="item " @click="loginout()"><span class="text"><i class="el-icon-switch-button about"></i>退出登录</span><i class="el-icon-arrow-right rightarrow"></i></div></el-col>
      </el-row>
      
    </el-card>

    <el-dialog
  title="复制成功"
  :visible.sync="schoolkf"
  width="80%"
  center>
  <span>已复制客服微信号，您可以添加后反馈问题</span>
  <span slot="footer" class="dialog-footer">

    <el-button type="primary" @click="schoolkf = false">确 定</el-button>
  </span>
</el-dialog>
    <BottomTab></BottomTab>

  </div>
</template>

<script>
import BottomTab from '../BottomTab.vue'
import { publicTools } from '../tools/publicTools';

export default {
  components: {
    BottomTab,
  
  },
  data() {
    return {
      user: {
        username: '',
        phonenum: '114514',
        school: '您的学校',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', // 初始化为一个默认值或者''
      },
      schoolkf:false,
    }
  },
  methods: {

    getUserInfo() {
      // 使用localStorage.getItem获取数据时，需要检查是否为null
       const name = localStorage.getItem('name')
      //  const avatar = localStorage.getItem('avatar')
      this.user.username = name;
      // this.user.avatar = avatar;
    },

    loginout(){
      // localStorage.removeItem('avatar');
      // localStorage.removeItem('name');
      publicTools.Cookie.set('username',null);
      publicTools.Cookie.remove('sessionid',null)

      this.$router.push({name:'login'});

    },
    islogin(){
      let username = publicTools.Cookie.get('username')
      let sessionid = publicTools.Cookie.get('sessionid')
      if(!username && !sessionid) {
        this.$router.push({name:'login'})
        
      } else {
        // this.$router.push({name:'user'})
      }

  },
  async kf(){
    // clipboard 只有在安全环境下 https  localhost等能使用
    let clipboard = navigator.clipboard || {
      writeText: function (text) {
        let textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (err) {
          console.log('复制失败', err);
        } finally {
          document.body.removeChild(textArea);

        }
      }
    }

    if(clipboard) {
      await clipboard.writeText('XXXXzy0501');
      this.schoolkf = true
    }
  }

},
mounted() {
    // 确保组件挂载后调用getUserInfo来设置用户信息
    this.getUserInfo()

  },
  created() {
    // 组件创建后检查登录状态
    this.islogin();
  },
}
</script>

<style scoped>
.container {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
.head{
  width: calc(100%+10px);
  height: 120px;
  background-image: linear-gradient(to right, #78b7f8, #458cf5);
  padding: 5px;
  margin: -10px 0 0 -10px;
  box-sizing: border-box;
  margin-right: -6px;
  position: relative;
}


.avatar {
  width: auto;
  height: auto;
  text-align:center;
  float: left;
  margin: 20px 10px;
}
.baseinfo {
  color: #fff;
}
.arrow i {
  position: absolute;
  right: 40px;
  top: 50%;
  margin-top: -10px;

  font-size: 30px;
  color: #fff;
}

.btn {
  width: 100%;
  height: 30px;
  line-height: 30px;
  border: none;
  background-color: #fff;
  
}
.user-body {
  margin: 10px;
  background-color: rgb(245,245,245);
}
.el-row {
    margin-bottom: 20px;
    
    border-radius: 8px 8px;
  }
  .item-type-1 {
  background-image: linear-gradient(to right, #78b7f8, #458cf5);
}

.item-type-2 {
  background-image: linear-gradient(to right, #f89460, #f86858);
}

.item-type-3 {
  background-image: linear-gradient(to right, #a080f8, #7074f8);
}
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .item{
    border-radius: 4px;
    min-height: 36px;
    background-color: #fff;
    text-align: center;
    border-bottom: 1px solid rgb(225,225,225);
    padding: 6px;
  }
  .rightarrow {
    float: right;
    margin: 3px;
  }
  .takeorder {
    /* background-color: #fff; */
    background-color: #fff;
    margin: 5px 0px;
    text-align: center;
  }
  .text {
    position: relative;
    top: 6px;
    left: 5px;
    float: left;
  }
  .order {
    color:rgb(255, 143, 131);
  }
  .rank{
    color: rgb(255, 211, 112);
  }
  .service{
    color:rgb(64, 177, 85);
  }
  .advice{
    color: rgb(18, 150, 219);
  }
  .about {
    color: rgb(212, 35, 122);
  }
  .text i {
    position: relative;
    left: -2px;
  }
  .bg-color-white{
    background-color: #fff;
  }
  .public_frame_style {
    margin: auto;
    padding: 5px 5px;
  }
  .router-link {
    color:inherit;
  }

</style>