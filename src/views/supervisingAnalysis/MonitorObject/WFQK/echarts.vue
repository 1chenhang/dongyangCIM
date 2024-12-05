<template>
  <div class="a_wrapper">
    <p class="tip">单位(件）</p>
    <div style="width: 100%; height: 500px" ref="main"></div>
  </div>

</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
const main = ref()

onMounted(() => {
  init()
})
const init = () => {
  const myChart = echarts.init(main.value)
  const yValue = [
    [10, 12, 15, 26, 5],
    [0.5, 1.2, 2.8, 1.6, 1]
  ]
  const names = ['统计一', '统计二']
  const xValue = ['数据一', '数据二', '数据三', '数据四', '数据五']
  const colorList = [
    { color0: '#34F0FC', color1: '#1777FF' },
    { color0: '#F8FC34', color1: '#FFBE17' }
  ]
  const series = []
  const xoffset = (names.length - 1) * -8
  names.forEach((item, index) => {
    series.push(
      // {
      //   type: 'custom',
      //   itemStyle: {
      //     color: '#E7F0FF17'
      //   },
      //   yAxisIndex: 0,
      //   renderItem: function (params, api) {
      //     // 获取对应类目的axisTick中心点坐标
      //     const start = api.coord([api.value(0)])

      //     // 通过坐标系的宽度和类目数，计算单个类目的背景
      //     const width = (params.coordSys.width / 7) * 0.6

      //     return {
      //       type: 'rect',
      //       shape: {
      //         // 相对左上角坐标
      //         x: start[0] - width / 2,
      //         y: params.coordSys.y,
      //         width: width,
      //         height: params.coordSys.height
      //       },
      //       style: api.style()
      //     }
      //   },
      //   data: [0, 0, 0, 0, 0, 0, 0]
      // }
    )

    series.push({
      name: item,
      type: 'pictorialBar',
      symbol: 'rect',
      symbolSize: [0, 0],
      symbolPosition: 'end',
      symbolOffset: [6, xoffset + index * 15],
      z: 2,
      tooltip: {
        show: false
      },
      itemStyle: {
        color: colorList[index].color0
      },
      data: yValue[index]
      // xAxisIndex: index
    })
    series.push({
      name: item,
      type: 'bar',
      barGap: '50%',
      barWidth: 7,
      z: 1,
      label: {
        show: true,
        position: 'right',
        color: '#969a9d',
        offset: [0, 0]
      },
      showBackground: true,
      backgroundStyle: {
        color: '#E7F0FF17'
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          {
            offset: 0,
            color: colorList[index].color0
          },
          {
            offset: 1,
            color: colorList[index].color1
          }
        ]),
        barBorderRadius: [0, 15, 15, 0]
      },
      data: yValue[index]
      // xAxisIndex: index
    })
  })
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#00041c',
      borderColor: '#00041c',
      textStyle: {
        color: '#fff'
      },
      axisPointer: {
        type: 'none'
      }
    },
    grid: {
      left: '10%',
      right: '8%',
      bottom: '10%',
      top: '10%',
      containLabel: true
    },
    legend: {
      top: '2%',
      // left: 'right',
      right: 40,
      width: 250,
      icon: 'rect',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 30,
      textStyle: {
        color: '#fff',
        fontSize: 14,
        padding: [0, 6]
      }
    },
    yAxis: [
      {
        type: 'category',
        boundaryGap: true,
        nameGap: 15,

        axisLabel: {
          interval: 0, // 解决x轴名称过长问题
          fontSize: 14,
          color: '#fff'

        },
        axisTick: {
          show: false
        },
        data: xValue
      }
    ],
    xAxis: [
      {
        type: 'value', // 连续类型
        nameTextStyle: {
          color: '#7F7F7F',
          fontSize: 14,
          fontWeight: 400
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle: {
            type: 'dashed',
            color: '#D9D9D980'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#7F7F7F',
          fontSize: 14,
          fontWeight: 400
        }
      }

    ],
    series: series
  }
  myChart.setOption(option)
}

</script>

<style lang="less" scoped>
.a_wrapper {
  box-sizing: border-box;
  position: relative;
}

.tip {
  font-size: 14px;
  margin-top: 16px;
  color: #BBD3F1AD;
  position: absolute;
  top: 0;
  left: 51px;
}
</style>
