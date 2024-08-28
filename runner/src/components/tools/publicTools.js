import { MessageBox } from 'element-ui'
import { Message } from 'element-ui';
// import Router from 'vue-router'

export const publicTools = {

    /**
     * 询问弹窗
     */
    _confirm(message,where) {
        
        MessageBox.confirm(message, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            location.href = './'+ where
            })
          .catch(() => {
            Message({
              type: 'info',
              message: '取消跳转'
            });          
          });
    },
    // 一个能够延迟跳转的消息弹窗
    /**
     * 
     * @param {String} message 
     * @param {string} type 
     * @param {Number} duration
     * 时间单位为秒 
     */
    _message(message,type,duration,where){
        Message({
            message: message,
            type: `${type}`,
            duration: duration
        });
        setTimeout(() => {
            location.href = './'+ where;
        }, duration * 1000);
        
    },
    // 用于保存订单信息
    Cookie:{
       cookie:document.cookie.split('; '),
       obj:{},
        //获取所有cookie键值对
        getAll: function(){
            this.cookie.forEach(item => {
                let arr = item.split('=');
                this.obj[arr[0]] = arr[1];
            });
            return this.obj;
        },
        // 获取某一cookie值
        get: function(key){
            this.cookie.forEach(item => {
                let arr = item.split('=');
                this.obj[arr[0]] = arr[1];
            });
            return this.obj[key] || '';
        },
        // 设置某一cookie值 
        set: function(key, value, expires){
            let date = new Date();
            date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
            //设置cookie
            document.cookie = `${key}=${value};path=/;expires=${date.toUTCString()};samesite=Lax`;
            //设置cookie属性httponly
            // document.cookie += '; HttpOnly';
            // 如果设置成功 console.log()
            
            if(this.get(key)){
                console.log('cookie set success');
            }
        },
        // 删除某一cookie值
        remove: function(key){
            window.localStorage.removeItem(key);
        },
        // ��空所有本地存储
        clear: function(){
            window.localStorage.clear();
        }
        
    
    },
    // 用于保存用户登录状态
    localStorage:{
        // 获取本地存储某一键值
        get: function(key){
            return window.localStorage.getItem(key);
        },
        // 设置本地存储某一键值
        set: function(key, value){
            window.localStorage.setItem(key, value);
        },
        // 删除本地存储某一键值
        remove: function(key){
            window.localStorage.removeItem(key);
        },
        // 获取所有本地存储键值对
        getAll: function(){
            return window.localStorage;
        },
        // 清空所有本地存储
        clear: function(){
            window.localStorage.clear();
        }
    },

    }
