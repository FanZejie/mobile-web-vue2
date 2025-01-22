<template>
 <div class="flex items-center justify-between bg-gray-100 px-4 py-2 shadow">
  <!-- 左侧 返回 -->
  <button class="text-blue-500 font-bold">返回</button>

  <!-- 中间 Title -->
  <h1 class="text-lg font-semibold text-center flex-grow text-gray-800">{{ title }}</h1>

  <!-- 右侧 Home -->
  <button class="text-green-500 font-bold">Home</button>
</div>
</template>
nod
<script>
export default {
  name: '',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
