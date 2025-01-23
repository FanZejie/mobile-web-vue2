<template>
    <div class="block">
      <div class="radio">
        <span>时序告警：</span>
        <el-radio-group v-model="reverse">
          <el-radio :label="true">倒序</el-radio>
          <el-radio :label="false">正序</el-radio>
        </el-radio-group>
      </div>
   
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.time"
          :color="getColor(activity.category)"
          :hide-timestamp="true"
          placement="top"
        >
          <span class="content"
            ><div class="time">{{ activity.time.split(' ')[1] }}</div>
            <div :class="{redfont: activity.level === 6}">IP: {{ activity.ip }}</div>
          </span>
          <span :class="['content', {redfont: activity.level === 6}]">{{ activity.summary }}</span>
        </el-timeline-item>
      </el-timeline>
    </div>
  </template>
   
  <script>
  //import
  import {getAlertTimeSequence} from '../api/api'
  export default {
    components: {},
    props: {
      selectLegend: {
        type: String
      }
    },
    data() {
      return {
        timer: null,
        reverse: true,
        activities: []
      }
    },
    computed: {},
    // 监听data中的数据变化
    watch: {
      selectLegend(newValue) {
        this.initData(newValue)
      }
    },
    methods: {
      async initData(selectLegend) {
        let {data} = await getAlertTimeSequence(selectLegend)
        if (data.code == 0) {
          this.activities = data.data
        } else {
          this.$message.error('msg:' + data.msg)
        }
      },
      getColor(category) {
        let color = '#e4e7ee'
        switch (category) {
          case '六级':
            color = '#ff2121'
            break
          case '云平台':
            color = '#17b978'
            break
          case '中间件':
            color = '#f8b595'
            break
          case '存储设备':
            color = '#f3f798'
            break
          case '安全':
            color = '#f25d9c'
            break
          case '安全设备':
            color = '#fc85ae'
            break
          case '应用':
            color = '#9e579d'
            break
          case '操作系统':
            color = '#9df3c4'
            break
          case '数据库':
            color = '#62d2a2'
            break
          case '服务器':
            color = '#1fab89'
            break
          case '未知管理对象类别':
            color = '#dfd3d3'
            break
          case '监控系统':
            color = '#10ddc2'
            break
          case '竞猜':
            color = '#71c9ce'
            break
          case '竞猜业务':
            color = '#a6e3e9'
            break
          case '竞猜中间件':
            color = '#cbf1f5'
            break
          case '竞猜容器':
            color = '#e3fdfd'
            break
          case '竞猜应用':
            color = '#3d84a8'
            break
          case '竞猜系统告警':
            color = '#3f72af'
            break
          case '竞猜网络':
            color = '#112d4e'
            break
          case '网络设备':
            color = '#aa96da'
            break
          case '腾讯云平台':
            color = '#ffc7c7'
            break
          case '腾讯云底座':
            color = '#ffe2e2'
            break
          case '设备连通性':
            color = '#fcbad3'
            break
          case '阿里云平台':
            color = '#ffd460'
            break
          case '阿里公有云平台':
            color = '#f07b3f'
            break
          default:
            color = '#e4e7ee'
            break
        }
        return color
      }
    },
    created() {},
    mounted() {
      this.initData()
      this.timer = setInterval(() => {
        this.initData(this.selectLegend)
        //需要定时执行的方法
      }, 60 * 1000)
    },
    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {
      window.clearInterval(this.timer)
    },
    destroyed() {},
    activated() {} //如果页面有keep-alive缓存功能，这个函数会触发执行
  }
  </script>
  <style lang="less" scoped>
  .block {
    margin-left: 16px;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .radio {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 6px;
  }
  ::v-deep .el-radio {
    margin-right: 10px;
  }
  ::v-deep .el-timeline-item__wrapper {
    display: flex;
  }
  ::v-deep .el-timeline-item__content {
    width: 100%;
  }
  ::v-deep .el-timeline-item {
    padding-bottom: 10px;
  }
  ::v-deep .el-timeline-item__node--normal {
    left: 0;
  }
  .content {
    margin-top: 1px;
    display: flex;
    flex-wrap: nowrap;
    text-align: left;
    white-space: nowrap;
    width: calc(100vw - 300px);
    .time {
      color: #3f72af;
      margin-right: 8px;
    }
  }
   
  .redfont {
    color: red;
  }
  </style>