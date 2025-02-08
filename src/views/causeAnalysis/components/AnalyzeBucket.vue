<template>
    <div class="h-full">
      <highcharts class="h-full w-full" :options="chartOptions"></highcharts>
    </div>
  </template>
   
  <script>
  //import
  import {getAlertsAnalyse} from '../api/api'
  export default {
    components: {},
    props: {},
    data() {
      return {
        selectedLegend: null,
        timer: null,
        chartOptions: {
          chart: {
            backgroundColor: '#f8f8f8',
            type: 'column'
          },
   
          title: {
            text: null
          },
          subtitle: {
            text: null
          },
   
          xAxis: {
            categories: [],
            labels: {
              style: {
                color: '#323232'
              }
            }
          },
   
          yAxis: {
            visible: false,
            allowDecimals: false,
            min: 0,
            title: {
              enabled: false,
              text: '告警数'
            },
            gridLineWidth: 0
          },
   
          tooltip: {
            format: '<b>{key}</b><br/>{series.name}: {y}<br/>' + 'Total: {point.stackTotal}'
          },
          legend: {
            backgroundColor: '#f8f8f8',
            itemStyle: {
              color: '#000'
            }
          },
   
          plotOptions: {
            series: {
              events: {
                legendItemClick: this.handleLegendClick
              }
            },
            column: {
              stacking: 'normal',
              dataLabels: {
                enabled: false,
                formatter: function () {
                  return this.y !== 0 ? this.y : ''
                }
              },
              minPointLength: 8,
              threshold: 0.1,
              borderWidth: 0
            }
          },
   
          series: []
        }
      }
    },
    computed: {},
    // 监听data中的数据变化
    watch: {},
    methods: {
      async initData() {
        let res = await getAlertsAnalyse()
        console.log('res', res.data.data.histograms)
        let series = res.data.data.histograms
        this.setColor(series)
        series = this.setZeroToNull(series)
        let xcategories = res.data.data.times
        this.chartOptions.xAxis.categories = xcategories
        this.chartOptions.series = series
      },
      setZeroToNull(series) {
        for (let item of series) {
          let res = item.data.map(value => (value === 0 ? null : value))
          item.data = res
        }
        return series
      },
      setColor(series) {
        for (let item of series) {
          let color = '#e4e7ee'
          switch (item.name) {
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
          item.color = color
        }
      },
      getData(seriesName) {
        this.$emit('clickLegend', seriesName)
      },
      handleLegendClick(e) {
        console.log('e', e)
        const clickedSeries = e.target.chart.series.find(series => series.name === e.target.name)
        if (this.selectedLegend === clickedSeries.name) {
          e.target.chart.series.forEach(series => {
            series.update({opacity: 1}, true) //恢复透明度
          })
          this.selectedLegend = null
        } else {
          e.target.chart.series.forEach(series => {
            series.update({opacity: series.name === clickedSeries.name ? 1 : 0.3}, true)
          })
          this.selectedLegend = clickedSeries.name
        }
        this.getData(this.selectedLegend)
        return false
      }
    },
    created() {},
    mounted() {
      this.initData()
      this.timer = setInterval(() => {
        this.initData()
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
  </style>