import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/Home.vue'
import CauseAnalysis from '@/views/causeAnalysis/CauseAnalysis.vue'

// 注册 vue-router
Vue.use(Router)

// 定义路由
const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/causeAnalysis',
      name: 'CauseAnalysis',
      component: CauseAnalysis
    }
  ]
  
  // 创建路由实例
  const router = new Router({
    mode: 'history', // 使用 HTML5 History 模式
    routes
  })
  
  export default router