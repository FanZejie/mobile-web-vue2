<template>
  <div class="w-full h-full flex flex-col">
    <div class="text-yellow-500 flex items-center justify-center">当前时刻第二组存在部分省终端数量异常。</div>
    <div class="w-full overflow-auto">
        <el-table
      :data="tableData"
      border
      style="width: 100%"
      size="mini"
      empty-text="当前时刻终端数量无明显异常。"
      :header-row-style="headerRowStyle"
      :cell-style="cellStyle"
      :span-method="objectSpanMethod"
    >
      <el-table-column prop="group" label="组别" min-width="40"> </el-table-column>
      <el-table-column prop="province" label="省份" min-width="40"> </el-table-column>
      <el-table-column label="安卓TLS变化率">
        <template slot-scope="scope">
          <div class="flex flex-row">
            <div style="color: red" v-if="scope.row.atls.lastWeekChangeNum < 0">↓</div>
            <div style="color: green" v-if="scope.row.atls.lastWeekChangeNum > 0">↑</div>
            <div>{{ Math.abs(scope.row.atls.lastWeekChangeNum) }}</div>
            <div style="margin: 0px 1px">/</div>
            <div style="color: red" v-if="scope.row.atls.lastWeekChangeRate < 0">↓</div>
            <div style="color: green" v-if="scope.row.atls.lastWeekChangeRate > 0">↑</div>
            <div>{{ Math.floor(Math.abs(scope.row.atls.lastWeekChangeRate)) }}%</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="VPDN变化率">
        <template slot-scope="scope">
          <div class="flex flex-row">
            <div style="color: red" v-if="scope.row.vpdn.lastWeekChangeNum < 0">↓</div>
            <div style="color: green" v-if="scope.row.vpdn.lastWeekChangeNum > 0">↑</div>
            <div>{{ Math.abs(scope.row.vpdn.lastWeekChangeNum) }}</div>
            <div style="margin: 0px 1px">/</div>
            <div style="color: red" v-if="scope.row.vpdn.lastWeekChangeRate < 0">↓</div>
            <div style="color: green" v-if="scope.row.vpdn.lastWeekChangeRate > 0">↑</div>
            <div>{{ Math.floor(Math.abs(scope.row.vpdn.lastWeekChangeRate)) }}%</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="传统TLS变化率">
        <template slot-scope="scope">
          <div class="flex flex-row">
            <div style="color: red" v-if="scope.row.ttls.lastWeekChangeNum < 0">↓</div>
            <div style="color: green" v-if="scope.row.ttls.lastWeekChangeNum > 0">↑</div>
            <div>{{ Math.abs(scope.row.ttls.lastWeekChangeNum) }}</div>
            <div style="margin: 0px 1px">/</div>
            <div style="color: red" v-if="scope.row.ttls.lastWeekChangeRate < 0">↓</div>
            <div style="color: green" v-if="scope.row.ttls.lastWeekChangeRate > 0">↑</div>
            <div>{{ Math.floor(Math.abs(scope.row.ttls.lastWeekChangeRate)) }}%</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import {getBusiImpact} from '../api/api'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
        timer: null,
      descMsg: '',
      tableData: []
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.initData()
    this.timer = setInterval(() => {
      this.initData()
      //需要定时执行的方法
    }, 60 * 1000)
  },
  beforeDestroy() {
    window.clearInterval(this.timer)
  },
  methods: {
    headerRowStyle() {
      return {
        fontSize: '10px'
      }
    },
    cellStyle() {
      return {
        fontSize: '10px',
        padding: '0px 0px'
      }
    },
    groupSpan(data) {
      let spanArr = [],
        pos = 0
      // data就是我们从后台拿到的数据
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          spanArr.push(1)
          pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].group === data[i - 1].group) {
            spanArr[pos] += 1
            spanArr.push(0)
          } else {
            spanArr.push(1)
            pos = i
          }
        }
      }
      return spanArr
    },
      /*eslint-disable */
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
      //合并行
      let spanArr = this.groupSpan(this.tableData)
      if (columnIndex === 0) {
        const _row = spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          // [0,0] 表示这一行不显示， [2,1]表示行的合并数
          rowspan: _row,
          colspan: _col
        }
      }
    },
    async initData() {
      let {data} = await getBusiImpact()
      console.log(data)
      if (data.code == 0) {
        this.tableData = data.data
        this.refreshDesc()
      } else {
        this.$message.error('msg:' + data.msg)
      }
    },
    refreshDesc() {
      let firstGroupName = this.tableData[0].group
      let flag = true
      if (this.tableData.length != 0) {
        for (let item of this.tableData) {
          if (item.group != firstGroupName) {
            flag = false
            break
          }
        }
      }
      if (flag) {
        this.descMsg = '当前时刻' + firstGroupName + '存在部分省终端数量异常。'
      } else {
        this.descMsg = '当前时刻存在部分单元终端数量异常。'
      }
    },
  }
}
</script>

<style scoped lang="less"></style>
