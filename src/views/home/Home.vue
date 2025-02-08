<template>
  <div class="flex flex-col h-screen">
    <div class="flex flex-row w-full h-10 bg-blue-300 md:hidden">
      小屏幕名片及版本信息
    </div>
    <div class="flex flex-row h-20 md:h-36">
      <div class="flex flex-col w-full bg-gray-400 md:w-1/2">告警信息</div>
      <div class=" w-1/2 bg-gray-400 hidden md:flex md:flex-col">更新信息</div>
    </div>

    <div class="m-2 bg-gray-300 h-300px hidden md:flex md:flex-row">
      <div class="flex w-1/3 m-2 bg-gray-400">设备信息</div>
      <div class="flex  w-1/3 m-2 bg-gray-400">设备状态</div>
      <div class="flex  w-1/3 m-2 bg-gray-400">设备状态</div>
    </div>

    <!-- 小屏幕滑动效果 -->
    <div class="relative overflow-hidden h-300px w-full md:hidden sm:block" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <div class="flex transition-transform duration-500"
        :style="{ transform: 'translateX(-' + currentIndex * 100 + '%)' }">
        <div class="flex-none w-full  bg-gray-400 h-300px">设备信息1</div>
        <div class="flex-none w-full  bg-gray-400 h-300px">设备状态2</div>
        <div class="flex-none w-full  bg-gray-400 h-300px">设备状态3</div>
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

    <div class="flex flex-row  bg-gray-300 h-300px">

    </div>

  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      currentIndex: 0, // 当前轮播的索引
      totalSlides: 3, // 总的轮播项数
      touchStartX: 0,   // 记录触摸起始位置
      touchEndX: 0,     // 记录触摸结束位置
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
