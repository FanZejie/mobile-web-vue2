<template>
  <div class="flex flex-col text-sm">

    <div class="flex flex-col w-full h-full md:h-96 md:flex-row" :key="windowWidth">
      <div class="flex flex-col md:w-1/2 md:h-96  ">
        <!-- 告警概览 -->
        <div class="w-full flex flex-col " style="height: 64px;">
          <p class="p-0 w-full flex flex-row items-center justify-center h-5">告警概览</p>
          <AlarmPreview/>
        </div>

        <!-- 终端数量业务影响 -->
        <div class="bg-[#272823] mt-1 w-full" style="height: calc(100% - 64px);">
          <p class="p-0 w-full flex flex-row items-center justify-center h-5">终端数量业务影响</p>
          <ImapctTable style="height: calc(100% - 20px);"/>
        </div>

      </div>
      <!-- 告警分析 -->
      <div class="h-200px flex flex-col md:w-1/2 md:h-96 ">
        <p class="p-0 w-full flex flex-row items-center justify-center">告警分析</p>
        <AnalyzeBucket style="height: calc(100% - 20px);"/>
      </div>
    </div>

    <div class="w-full h-200px">
      <p class="p-0 w-full flex flex-row ">时序告警</p>
      

    </div>
    <div class="w-full h-200px">重点场景分析看板</div>
  </div>
</template>

<script>
import AlarmPreview from './components/AlarmPreview.vue';
import AnalyzeBucket from './components/AnalyzeBucket.vue';
import ImapctTable from './components/ImapctTable.vue';



export default {
  name: '',
  components: {AlarmPreview,ImapctTable,AnalyzeBucket},
  props: {},
  data() {
    return {

    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() {

   },
   beforeDestroy() { },
  methods: {

  }
}
</script>

<style scoped lang="less"></style>
