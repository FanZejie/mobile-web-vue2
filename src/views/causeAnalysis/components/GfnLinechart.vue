<template>
    <highcharts class="highchart" :options="chartOptions"></highcharts>
  </template>
   
  <script>
  //import
  import {sendMproxyQuery} from '../api/api'
  // const colorConfig = [
  //   {
  //     color: 'rgb(234, 184, 57,0.5)',
  //     shadowColor: 'rgb(234, 184, 57,0.5)',
  //     opacity: 0.3
  //   },
  //   {
  //     color: 'rgb(126, 178, 109,0.5)',
  //     shadowColor: 'rgb(126, 178, 109,0.5)',
  //     opacity: 0.3
  //   }
  // ]
  export default {
    components: {},
    props: {
      promQl: {
        type: Object
      }
    },
    data() {
      return {
        timer: null,
        loadind: true,
        chartOptions: {
          chart: {
            type: 'area',
            backgroundColor: '#f8f8f8',
            style: {
              fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif'
            }
          },
          title: {
            text: this.promQl.name,
            align: 'left',
            margin: 0,
            verticalAlign: 'top',
            y: 10,
            style: {
              fontSize: '14px',
              lineHeight: '20px',
              color: '#000'
            }
          },
          subtitle: {
            text: null
          },
          xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
              millisecond: '%H:%M:%S.%L',
              second: '%H:%M:%S',
              minute: '%H:%M',
              hour: '%H:%M',
              day: '%m-%d',
              week: '%m-%d',
              month: '%Y-%m',
              year: '%Y'
            },
            gridLineWidth: 0, // 取消x轴网格线,
            labels: {
              style: {
                color: '#393e46'
              }
            }
          },
          yAxis: {
            min: 0,
            enabled: false,
            title: {
              enabled: false
            },
            labels: {
              style: {
                color: '#393e46'
              }
            },
            gridLineColor: '#e6e6e6', // y轴网格线颜色
            lineColor: '#393e46' // y轴线颜色
          },
          legend: {
            backgroundColor: '#f8f8f8',
            itemStyle: {
              color: '#000'
            },
            navigation: {
              enabled: true
            },
            maxHeight: 50
          },
          tooltip: {
            xDateFormat: '%Y-%m-%d %H:%M:%S',
            shared: false,
            dateTimeLabelFormats: {
              millisecond: '%Y-%m-%d %H:%M:%S',
              minute: '%H:%M'
            },
            style: {
              fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif'
            }
          },
          plotOptions: {
            area: {
              lineWidth: 1, // 线条宽度
              marker: {
                enabled: false // 显示数据点
              }
            },
            series: {
              fillOpacity: 0.2
            }
          },
          series: [],
          credits: {
            enabled: false // 去掉 Highcharts 水印
          }
        },
        time: [(Date.now() - 60 * 60 * 1000) / 1000, Date.now() / 1000],
        tipMap: {}
      }
    },
    computed: {},
    // 监听data中的数据变化
    watch: {},
    methods: {
      async getMetricData() {
        let series = []
        let seriesOneMetric = await this.transformMapsToSeries(this.promQl.promQl)
        series = [...series, ...seriesOneMetric]
        this.chartOptions.series = series
      },
   
      async transformMapsToSeries(promQl) {
        let getBody = {
          query: promQl,
          start: Math.floor(this.time[0]),
          end: Math.floor(this.time[1]),
          step: 60 //单位是s
        }
        let res = await sendMproxyQuery(getBody)
        let series = this.transformMproxyData(res.data.data.data.result)
   
        return series
      },
      transformMproxyData(result) {
        let series = []
        if (result.length != 0) {
          for (let item of result) {
            let tmp = item.values.map(innerArray => {
              // 对每个一维数组的第一个元素进行乘法操作
              return [innerArray[0] * 1000, parseInt(innerArray[1])]
            })
            let seriesObj = {
              name: Object.values(item.metric).join(' '),
              data: tmp
            }
            series.push(seriesObj)
          }
        }
   
        return series
      }
    },
    created() {},
    mounted() {
      this.getMetricData()
      this.timer = setInterval(() => {
        this.time = [(Date.now() - 60 * 60 * 1000) / 1000, Date.now() / 1000]
        this.getMetricData()
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
  .highchart {
    margin-top: 10px;
    height: 200px;
  }
  </style>