//封装 用户类api
//导入请求方法
//导入全局状态库
import {api} from './service.js'
const user = {
    getUserInfo(code,type){
        return api.get('/api/connect.php',{
            code,
            type,
        })
    }

}
export default user