import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style/tailwindcss.css'


Vue.config.productionTip = false

new Vue({
  router, // 挂载路由
  render: h => h(App),
}).$mount('#app')
