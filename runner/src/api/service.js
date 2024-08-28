//用于axios、qs模块的引入，并在此文件中对axios进行封装
// 操作类
import axios from 'axios'
import qs from 'qs'   //用来序列化post类型的数据，否则后端无法接收到数据

//  设置post请求头 
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials = false  // 跨域请求时不携带用户凭证 

//创建axis 实例  请求超时时间300秒

const instance = axios.create({
    timeout:5000,
})

// 请求和响应拦截

// 请求发起前拦截
instance.interceptors.request.use((config)=>{
    // 可以对接口请求头进行操作 
    console.log('请求拦截',config)
    return config
},(err)=>{
    // 请求错误处理
    return Promise.reject(err)
})

instance.interceptors.response.use(response => {
    console.log("响应拦截",response);
    return response;
  }, error => {
    console.log('catch', error)
    return Promise.reject(error)
  })


    const api = {
        async get(url,param){
            return axios.get(url,{
                ...param
            })
            .then(res =>{
                return res
            })
            .catch(res =>{
                return res
            })
        },
        async post(url,param){
           return axios.post(url,qs.stringify(param),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded',
                   
                }

            })
            }
    }
  export  {api}