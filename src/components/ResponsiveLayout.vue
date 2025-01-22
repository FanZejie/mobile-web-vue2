<template>
    <div class="flex flex-col md:flex-row">
      <!-- 动态 Banner -->
      <div class="block md:hidden bg-blue-500 text-white p-4">
        <h1>{{ bannerTitle }}</h1>
      </div>
  
      <!-- 独立 Sidebar 组件 -->
      <Sidebar class="hidden md:block bg-gray-200 w-64 p-4" />
  
      <!-- 动态内容区域 -->
      <div class="flex-1 p-4">
        <slot />
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from './Sidebar.vue';
  
  export default {
    components: {
      Sidebar,
    },
    data() {
      return {
        bannerTitle: '', // 当前 Banner 的标题
      };
    },
    watch: {
      // 监听路由变化，动态更新标题
      $route: {
        immediate: true,
        handler() {
          this.updateBanner();
        },
      },
    },
    methods: {
      updateBanner() {
        this.bannerTitle = this.$route.meta?.title || 'Default Title';
      },
    },
  };
  </script>
  
  <style scoped>
  .font-bold {
    font-weight: bold;
  }
  .text-blue-500 {
    color: #3b82f6;
  }
  </style>