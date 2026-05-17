import { ref } from 'vue'
import store from '../../store/index.js'
import axios from 'axios'
import { publicTools } from '../tools/publicTools'


export  const handlerPay = {

    dopay(type,trade_name,totalAmount){
        // 判断登录状态
        // alert(trade_name)
        let username = publicTools.Cookie.get('username')
        let sessionid = publicTools.Cookie.get('sessionid')
        if(!username || !sessionid) {
            publicTools._message('该操作需先登录,即将跳转','error',3,'login')
            
        }else {   /// 
       
        // 跳转到支付页面之前需要检查是否有未支付的订单，如果有，跳转到支付页面，如果没有，跳转到下单页面
        if(!this.checkOrder()){
        axios.post('./epayapi.php',{
            trade_no:111111111,
            trade_name: trade_name,
            amount: totalAmount,
            type:type,
        })
        .then((res) =>{
            console.log(res.data)
            if(res.status ===  200 && res.data){
                // 已有订单
                console.log(res.data)
                publicTools._confirm('订单存在,是否前往支付','orderfeature');
            }else {
                // 跳转支付页面
                document.write(res.data)
                
            }
        })
        .catch(res => {
            console.log('catch', res)
            // publicTools._message('支付请求失败','error',3,'')
        })
    }
}   /// 
    },
    //得到当前日期
     getCurrentDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要+1
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
    
        return `${year}${month}${day}${hours}${minutes}${seconds}`;
    },
    //返回一个随机数
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    //生成一个订单号
    generateOrderId() {
        return parseInt(this.getCurrentDateTime() + this.getRandomNumber(100,999));
    },
    // 检查是否登录 根据vuex
    isLogin(){
        let isAuthenticated = ref(store.state.isAuthenticated)
        if(!isAuthenticated || publicTools.localStorage.get()) {
            this.$router.push({name: "login"})
    }else {
        return true
    }
    },
    //检查是否已有订单
    checkOrder(){
            let username = publicTools.Cookie.get('username')
            axios.post('./api/api.php',{
                username,
                act:'getOrder'
            }).then((res) =>{
                if(res.status === 200 && res.data){
                    // 有类似订单 跳转
                    publicTools._confirm('您有未支付订单,是否前往支付？');
                   
                } else {
                    //

                    return true
            }})
            .catch((res)=>{
                console.log(res)
            })
        } 
    }

