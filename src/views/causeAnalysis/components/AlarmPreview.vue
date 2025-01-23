<template>
  <div class="flex flex-row mx-4">
    <div class="flex flex-col  flex-1 text-xs items-center">
        <div class="text-blue-500 text-lg">10</div>
        <div>告警总量</div>
    </div>
    <div class="mt-2 h-6 " style="border-right: 1px solid black;"></div>
    <div class="flex flex-col flex-1 text-xs items-center">
        <div class="text-yellow-500 text-lg">10</div>
        <div>六级告警</div>
    </div>
    <div class="mt-2 h-6 " style="border-right: 1px solid black;"></div>
    <div class="flex flex-col flex-1 text-xs items-center">
        <div class="text-blue-500 text-lg">10</div>
        <div>未处理-重要</div>
    </div>
    <div class="mt-2 h-6 " style="border-right: 1px solid black;"></div>
    <div class="flex flex-col flex-1 text-xs items-center">
        <div class="text-blue-500 text-lg">10</div>
        <div>处理中-重要</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
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
