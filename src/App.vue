<template>
  <div id="app">
    <!-- 根据路由的 meta 字段判断是否使用布局 -->
    <ResponsiveLayout v-if="shouldUseLayout">
      <router-view />
    </ResponsiveLayout>
    <router-view v-else />
    
  </div>
</template>

<script>
import ResponsiveLayout from './components/ResponsiveLayout.vue';


export default {
  name: 'App',
  components: {ResponsiveLayout},
  computed: {
    shouldUseLayout() {
      // 获取当前路由的 meta 字段中的 useLayout
      return this.$route.meta.useLayout !== false; // 默认值为 true
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
