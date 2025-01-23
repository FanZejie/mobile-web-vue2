import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style/tailwindcss.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import './plugins/highcharts.js'

Vue.config.productionTip = false

new Vue({
  router, // 挂载路由
  render: h => h(App),
}).$mount('#app')
