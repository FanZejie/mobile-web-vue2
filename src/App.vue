<template>
  <div id="app">
    <ResponsiveLayout>
      <router-view />
    </ResponsiveLayout>
    
  </div>
</template>

<script>
import ResponsiveLayout from './components/ResponsiveLayout.vue';


export default {
  name: 'App',
  components: {ResponsiveLayout}
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
