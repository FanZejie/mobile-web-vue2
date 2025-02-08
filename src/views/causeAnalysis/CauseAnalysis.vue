<template>
  <div class="flex flex-col text-sm">

    <div class="flex flex-col w-full h-full md:mb-2 md:h-96 md:flex-row" >
      <div class="flex flex-col bg-graybackground rounded md:m-2 md:w-1/2 md:h-96">
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
      <div class="h-200px flex flex-col bg-graybackground rounded md:m-2 md:w-1/2 md:h-96">
        <p class="p-0 w-full flex flex-row items-center justify-center">告警分析</p>
        <AnalyzeBucket style="height: calc(100% - 20px);"/>
      </div>
    </div>

    <div class="w-full bg-graybackground rounded overflow-x-hidden overflow-y-auto max-h-48 md:max-h-80 md:mt-2  mx-2" style="max-width: calc(100% - 16px)">
      <AlarmTimeLine class="max-w-none rounded"
      style="height: 100%; width: 100%; overflow: auto; flex-wrap: nowrap;;"/>

    </div>
    <div class="w-full h-full">
      <p class="p-0 w-full flex flex-row items-center justify-center">重点场景分析看板</p>
      <el-tabs>
        <el-tab-pane label="拓扑" key="拓扑">
          <Topo/>
        </el-tab-pane>
        <el-tab-pane v-for="(item) in gfnArr" :key="item.name" :label="item.name">
          <GfnLinechart v-for="(promQl,qlIndex) in item.promQls" :key="qlIndex" :promQl="promQl"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AlarmPreview from './components/AlarmPreview.vue';

import AnalyzeBucket from './components/AnalyzeBucket.vue';
import ImapctTable from './components/ImapctTable.vue';
import AlarmTimeLine from './components/AlarmTimeLine.vue';
import GfnLinechart from './components/GfnLinechart.vue';
import Topo from './components/Topo.vue';
import {getGrafana} from './api/api'

export default {
  name: '',
  components: {AlarmPreview,ImapctTable,AnalyzeBucket,AlarmTimeLine,GfnLinechart,Topo},
  props: {},
  data() {
    return {
      timer:null,
      gfnArr:[],
      selectLegend: null,
      time: []
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() {
    this.initData()
   },
   beforeDestroy() { },
  methods: {
    async initData(){
      let {data} = await getGrafana()
      if(data.code == 0){
        this.gfnArr = data.data
      }else{
        this.$message.error('msg:'+data.msg)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
