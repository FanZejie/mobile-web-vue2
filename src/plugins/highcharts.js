import Vue from 'vue';
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';
import DarkUnicaTheme from 'highcharts/themes/dark-unica';

// 加载主题
DarkUnicaTheme(Highcharts);

// 全局配置
Highcharts.setOptions({
  global: { useUTC: false },
  credits: { enabled: false },
});

// 将高定制的 Highcharts 传递给 Vue
Vue.use(HighchartsVue, {
  tagName: 'highcharts', // 可选，默认 tagName 是 'highcharts'
  Highcharts,
});