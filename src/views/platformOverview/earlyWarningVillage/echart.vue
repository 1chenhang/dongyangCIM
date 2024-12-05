<template>
  <div ref="chartDom" style="width: 100%;height: 250px;">

  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, toRefs } from 'vue'
const chartDom = ref()

const props = defineProps({
  xzData: {
    type: Array,
    default: () => []
  },
})
const xzyjData = ref([]);

const {xzData} = toRefs(props)

onMounted(() => {
  xzyjData.value = xzData.value.map(item => ({
      value: item.count,
      name: item.town_name
  }));
  init()
})
const init = () => {
  const myChart = echarts.init(chartDom.value)
  const yList = [32, 58, 64, 55, 66, 88]
  const xList = [10, 55, 44, 55, 66, 88]
  const xData = ['白云街道', '东阳江镇', '歌山镇', '横店镇', '湖溪镇', '虎鹿镇']
  const color = [
    '#CC1CAA',
    '#8D67FF',
    '#00FFFF',
    '#48DE13',
    '#FFC516',
    '#DC3E14',
    '#8E16F8'
  ]

  const dom = 400
  const barWidth = dom / 20
  const colors = []
  for (let i = 0; i < 6; i++) {
    colors.push({
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: '#0073F9' // 最左边
        },
        {
          offset: 0.5,
          color: '#3dc8ca' // 最左边
        },
        {
          offset: 0.5,
          color: '#0073F9' // 左边的右边 颜色
        },
        {
          offset: 1,
          color: '#3dc8ca'
        }
      ]
    })
  }
  const option = {
    // backgroundColor: '#010d3a',
    // 提示框
    tooltip: {
      trigger: 'axis',
      formatter: '{b} : {c}',
      backgroundColor: '#00041c',
      borderColor: '#00041c',
      textStyle: {
        color: '#fff'
      },
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    /** 区域位置 */
    grid: {
      left: '10%',
      right: '2%',
      top: '10%',
      bottom: '15%'
    },
    // X轴
    xAxis: {
      data: xData,
      type: 'category',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#425A87'
        }

      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        margin: 15,
        color: '#fff', // x轴文字颜色
        fontWeight: 'normal',
        fontSize: '14'

      }
    },
    yAxis: {
      show: true,
      splitNumber: 4,
      axisLine: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#425A87'
        }
      },
      axisLabel: {
        color: '#FFFFFF',
        margin: 15,
        fontSize: 15
      }
    },
    series: [
      {
        type: 'bar',
        barWidth: barWidth,
        itemStyle: {

          color: function (params) {
            return colors[params.dataIndex % 7]
          }

        },
        label: {
          show: true,
          position: 'top',
          offset: [0, -18],
          color: '#fff',
          formatter: function (data) {
            return data.value
          }
        },
        data: yList
      },
      {
        z: 2,
        type: 'pictorialBar',
        data: yList,
        symbol: 'diamond',
        symbolOffset: [0, '50%'],
        symbolSize: [barWidth, barWidth * 0.7],
        itemStyle: {

          color: function (params) {
            return colors[params.dataIndex % 7]
          }

        }
      },
      {
        z: 3,
        type: 'pictorialBar',
        symbolPosition: 'end',
        data: yList,
        symbol: 'diamond',
        symbolOffset: [0, '-50%'],
        symbolSize: [barWidth, barWidth * 0.7],
        itemStyle: {

          borderWidth: 0,
          color: function (params) {
            return colors[params.dataIndex % 7].colorStops[0].color
          }

        }
      }
    ]
  }

  option && myChart.setOption(option)
}

</script>

<style lang="less" scoped></style>
