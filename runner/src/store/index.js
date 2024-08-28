import Vue from 'vue'
import Vuex from 'vuex'

// import actions from './actions'
// import loginuser from './loginuser'
// import User from './Modules/User'

Vue.use(Vuex);

const store = new Vuex.Store({
    strict:true,    //只能通过mutations修改状态，
    state(){  //相当于 data
        return {
            count :0,
            userInfo:{},
            isAuthenticated:true,
            user:'',
        }
    },
    mutations:{
        
        setLoginStatus(state,user){
            state.isAuthenticated = true;
            state.user = user
        },
        loginout(state){
            state.isAuthenticated = false;
            state.user = ''
        }
    },
    modules:{  
        
        }
    },
    

)
export default store