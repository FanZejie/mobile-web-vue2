<template>
    <div class="flex flex-col md:flex-row">
      <!-- 动态 Banner -->
      <div class="block md:hidden">
        <TopNavBar />
      </div>
  
      <!-- 独立 Sidebar 组件 -->
      <Sidebar class="hidden md:block bg-gray-200 w-64 p-4" />
  
      <!-- 动态内容区域 -->
      <div class="flex-1">
        <slot />
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from './Sidebar.vue';
import TopNavBar from './TopNavBar.vue';
  
  export default {
    components: {
      Sidebar,
      TopNavBar
    },
    data() {
      return {

      };
    },
    watch: {
      
    },
    methods: {

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