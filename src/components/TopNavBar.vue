<template>
 <div class="flex items-center justify-between bg-gray-100 px-4 py-2 shadow">
  <!-- 左侧 返回 -->
  <button class="text-blue-500 font-bold" @click="handleBack">返回</button>

  <!-- 中间 Title -->
  <h1 class="text-lg font-semibold text-center flex-grow text-gray-800">{{ bannerTitle }}</h1>

  <!-- 右侧 Home -->
  <button class="text-green-500 font-bold" @click="handleHome">Home</button>
</div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
  },
  data () {
    return {
      bannerTitle: '', // 当前 Banner 的标题
    }
  },
  computed: {},
  watch: {
    // 监听路由变化，动态更新标题
    $route: {
        immediate: true,
        handler() {
          this.updateBanner();
        },
      },
  },
  created () {},
  mounted () {},
  methods: {
    handleHome(){
      this.$router.push('/')
    },
    handleBack() {
      this.$router.go(-1); // 返回上一页
    },
    updateBanner() {
        this.bannerTitle = this.$route.meta?.title || 'Default Title';
      },
  }
}
</script>

<style scoped lang="less"></style>
