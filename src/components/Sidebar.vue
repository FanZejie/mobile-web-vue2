<template>
    <div>
      <ul>
        <li
          v-for="menu in menus"
          :key="menu.key"
          :class="['mb-2', { 'text-blue-500 font-bold': menu.key === activeMenu }]"
        >
          <!-- 使用 router-link 实现跳转 -->
          <router-link
            :to="menu.path"
            class="block p-2 hover:bg-gray-300 rounded"
            @click.native="updateActiveMenu(menu.key)"
          >
            {{ menu.label }}
          </router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        menus: [
          { key: 'home', label: 'Home', path: '/' },
          { key: 'causeAnalysis', label: 'causeAnalysis', path: '/causeAnalysis' },
        ], // 菜单数据
        activeMenu: '', // 当前选中的菜单项
      };
    },
    watch: {
      // 监听路由变化，更新菜单选中状态
      $route: {
        immediate: true,
        handler() {
          this.updateActiveMenu();
        },
      },
    },
    methods: {
      updateActiveMenu(key) {
        this.activeMenu = key || this.$route.meta?.activeMenu || '';
      },
    },
    mounted() {
      // 初始化选中菜单
      this.updateActiveMenu();
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