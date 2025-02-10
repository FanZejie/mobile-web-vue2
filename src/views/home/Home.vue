<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <!-- <div class="flex flex-row w-full h-12 items-center justify-between px-4  bg-blue-800 md:hidden">
      <div class=" text-white">范泽杰2289</div>
      <div class=" text-white">v1.1</div>
    </div> -->
    <div class="flex flex-row md:h-36">
      <div class="flex flex-col w-full md:m-1 bg-white md:w-1/2">
        <div class="flex flex-row w-full h-12 items-center justify-between px-4  bg-blue-800 md:mb-6">
          <div class=" text-white">范泽杰2289</div>
          <div class=" text-white">v1.1</div>
        </div>
        <AlarmPreview />
      </div>
      <div class=" w-1/2 bg-white md:m-1 p-2 hidden overflow-auto md:flex md:flex-col">


    <ul class="space-y-4">
      <li class="flex items-start space-x-3  rounded-lg hover:bg-gray-200 transition duration-300">
        <span class="text-blue-500 ">🔧</span>
        <span class="text-gray-700 ">根因分析添加响应式功能</span>
      </li>
      <li class="flex items-start space-x-3  rounded-lg hover:bg-gray-200 transition duration-300">
        <span class="text-blue-500">🎨</span>
        <span class="text-gray-700 ">全新设计的首页</span>
      </li>
      <li class="flex items-start space-x-3  rounded-lg hover:bg-gray-200 transition duration-300">
        <span class="text-blue-500 ">📊</span>
        <span class="text-gray-700 ">根因分析增加架构拓扑可视化模块</span>
      </li>
    </ul>

        <!-- <el-timeline>
          <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline> -->
      </div>
    </div>

    <div class="m-2 h-300px hidden md:flex md:flex-row md:gap-2">

      <AnalyzeBucket class="flex w-1/3 border" />
      <AnalyzeBucket class="flex w-1/3 border" />
      <AnalyzeBucket class="flex w-1/3 border" />
    </div>

    <!-- 小屏幕滑动效果 -->
    <div class="relative overflow-hidden h-300px w-full md:hidden sm:block" @touchstart="touchStart"
      @touchmove="touchMove" @touchend="touchEnd">
      <div class="flex transition-transform duration-500"
        :style="{ transform: 'translateX(-' + currentIndex * 100 + '%)' }">
        <div class="flex-none w-full   h-300px">
          <AnalyzeBucket />
        </div>
        <div class="flex-none w-full   h-300px">
          <AnalyzeBucket />
        </div>
        <div class="flex-none w-full  h-300px">
          <AnalyzeBucket />
        </div>
      </div>

      <!-- 上一页按钮 -->
      <button class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2"
        @click="moveSlide(-1)">
        ‹
      </button>

      <!-- 下一页按钮 -->
      <button class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2"
        @click="moveSlide(1)">
        ›
      </button>
    </div>

    <div class="flex flex-col h-300px">
      <div class="border h-full flex flex-col text-lg font-bold bg-white m-1 rounded-lg">
        <div>分析工具</div>
        <div class="w-full h-full flex flex-row gap-3 flex-wrap pb-2">

          <HomeMenuItem class="w-16 h-16" imgSrc="causeAnalysis.png" label="根因分析" href="/causeAnalysis" />
          <HomeMenuItem class="w-16 h-16" imgSrc="inspection.png" label="自证结果" href="/causeAnalysis" />
          <HomeMenuItem class="w-16 h-16" imgSrc="alarmSearch.png" label="应急事件查看" href="/causeAnalysis" />
          <HomeMenuItem class="w-16 h-16" imgSrc="alarmSearch.png" label="应急事件编辑" href="/causeAnalysis" />
        </div>
      </div>
      <div class="border h-full flex flex-col text-lg font-bold bg-white m-1 rounded-lg">
        <div>运行状态</div>
        <div class="w-full h-full flex flex-row gap-3 flex-wrap pb-2">
          <FontMenuItem class="w-16 h-16" label="营销中心" shortName="MKC"/>
          <FontMenuItem class="w-16 h-16" label="实体渠道" shortName="CHC"/>
          <FontMenuItem class="w-16 h-16" label="开放平台" shortName="OP"/>
          <FontMenuItem class="w-16 h-16" label="USAP" shortName="USAP"/>
          <FontMenuItem class="w-16 h-16" label="短信服务" shortName="SMS"/>
        </div>
      </div>
      <div class="border h-full flex flex-col text-lg font-bold bg-white m-1 rounded-lg">
        <div>IT服务管理端</div>
        <div class="w-full h-full flex flex-row gap-3 flex-wrap pb-2">
          <HomeMenuItem class="w-16 h-16" imgSrc="calendar.png" label="重保日历" href="/causeAnalysis" />
          <HomeMenuItem class="w-16 h-16" imgSrc="bandWidth.png" label="带宽容量" href="/causeAnalysis" />
          <HomeMenuItem class="w-16 h-16" imgSrc="itAssets.png" label="IT资产" href="/causeAnalysis" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import AlarmPreview from '../causeAnalysis/components/AlarmPreview.vue';
import AnalyzeBucket from '../causeAnalysis/components/AnalyzeBucket.vue';
import HomeMenuItem from './components/HomeMenuItem.vue';
import FontMenuItem from './components/FontMenuItem.vue';

export default {
  name: '',
  components: { AlarmPreview, AnalyzeBucket, HomeMenuItem,FontMenuItem },
  props: {},
  data() {
    return {
      currentIndex: 0, // 当前轮播的索引
      totalSlides: 3, // 总的轮播项数
      touchStartX: 0,   // 记录触摸起始位置
      touchEndX: 0,     // 记录触摸结束位置

      activities: [{
        content: '根因分析增加架构拓扑可视化模块',
        timestamp: '2025-04-15'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }]
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    // 切换轮播项
    moveSlide(direction) {
      this.currentIndex += direction;

      // 保证索引在合法范围内
      if (this.currentIndex < 0) {
        this.currentIndex = this.totalSlides - 1;
      }
      if (this.currentIndex >= this.totalSlides) {
        this.currentIndex = 0;
      }
    },
    // 触摸开始，记录起始位置
    touchStart(event) {
      this.touchStartX = event.touches[0].clientX;
    },

    // 触摸滑动，记录结束位置
    touchMove(event) {
      this.touchEndX = event.touches[0].clientX;
    },

    // 触摸结束，判断滑动方向
    touchEnd() {
      const distance = this.touchStartX - this.touchEndX;

      // 如果滑动距离大于一定值，就进行切换
      if (Math.abs(distance) > 50) {
        if (distance > 0) {
          this.moveSlide(1);  // 向左滑动，切换到下一项
        } else {
          this.moveSlide(-1);  // 向右滑动，切换到上一项
        }
      }
    },
  }
}
</script>

<style scoped lang="less"></style>
