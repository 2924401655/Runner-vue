import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuex from 'vuex'
import store from '@/store/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false


Vue.use(ElementUI)
Vue.use(vuex)

// Vue.prototype.$api = api

export  const vm = new Vue({
  store,
  router,
  render: h => h(App),
})


vm.$mount('#app')
