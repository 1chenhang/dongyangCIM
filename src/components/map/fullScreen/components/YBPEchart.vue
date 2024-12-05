<template>
  <div ref="chartDom" style="width: 176px;height: 126px;">

  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, defineProps, toRefs, watch } from 'vue'
const chartDom = ref()
const props = defineProps({
  sliderZ: {
    type: Number,
    default: 0
  }
})
const { sliderZ } = toRefs(props)
onMounted(() => {
  init()
})
const init = () => {
  const myChart = echarts.init(chartDom.value)
  const option = {
    tooltip: {
      // formatter: "{a} <br/>{b} : {c}%"
    },
    grid: {
      right: '0%',
      left: '0%',
      top: '2%',
      bottom: '5%'
    },
    series: [
      {
        name: '',
        type: 'gauge',
        // center: ["50%", "45%"], // 仪表位置
        radius: '0%', // 仪表大小
        startAngle: 200, // 开始角度
        endAngle: -20, // 结束角度
        min: -4,
        max: 4,
        axisLine: {
          lineStyle: { // 属性lineStyle控制线条样式
            color: [
              [0.4, new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
                offset: 0.4,
                color: '#45e4c3' // 50% 处的颜色
              }, {
                offset: 0.75,
                color: '#207ae8' // 40% 处的颜色
              }], false)], // 100% 处的颜色

              [1, new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                offset: 0.1,
                color: '#207ae8' // 50% 处的颜色
              }, {
                offset: 0.6,
                color: '#f06e23' // 40% 处的颜色
              }], false)]
            ],
            width: 10
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        pointer: {
          // show: false
          length: '45%'
        },
        detail: {
          show: false
        }
      },
      {
        name: '',
        type: 'gauge',
        // center: ["50%", "45%"], // 仪表位置
        radius: '55%', // 仪表大小
        startAngle: 200, // 开始角度
        endAngle: -20, // 结束角度
        min: -4,
        max: 4,
        axisLine: {
          show: false
        },
        splitLine: {
          // show: false
          length: 15
        },
        axisTick: {
          // show: false
          length: 15
        },
        axisLabel: {
          show: false
        },
        detail: {
          show: false
        }
      },
      {
        name: '先行指标',
        type: 'gauge',
        // center: ["50%", "45%"], // 默认全局居中
        radius: '100%',
        startAngle: 200,
        endAngle: -20,
        min: -4,
        max: 4,
        axisLine: {
          show: true,
          lineStyle: { // 属性lineStyle控制线条样式
            color: [
              [0.4, new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
                offset: 0.4,
                color: '#45e4c3' // 50% 处的颜色
              }, {
                offset: 0.75,
                color: '#207ae8' // 40% 处的颜色
              }], false)], // 100% 处的颜色

              [1, new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                offset: 0.1,
                color: '#207ae8' // 50% 处的颜色
              }, {
                offset: 0.6,
                color: '#f06e23' // 40% 处的颜色
              }], false)]
            ],
            width: 20// 表盘宽度
          }
        },
        splitLine: { // 分割线样式（及10、20等长线样式）
          show: false
        },
        axisTick: { // 刻度线样式（及短线样式）
          show: false
        },
        axisLabel: { // 文字样式（及“10”、“20”等文字样式）
          show: false
        },
        pointer: {
          // show: false,
          length: '75%',
          width: 8
        },
        markPoint: {
          symbol: 'circle',
          symbolSize: 7,
          data: [
            { x: 'center', y: 'center', itemStyle: { color: '#09194A' } }
          ]
        },
        itemStyle: {
          color: '#45e4c3'
        },
        detail: {
          formatter: '{score|{value}}',
          offsetCenter: [0, '30%'],
          rich: {
            score: {
              color: '#fff',
              fontFamily: '微软雅黑',
              fontSize: 18
            }
          }
        },
        data: [{
          value: sliderZ.value
        }]
      }
    ]
  }

  option && myChart.setOption(option)
}
watch(sliderZ, (newValue, oldValue) => {
  console.log(sliderZ, '--sliderZ')
  init()
})
</script>

<style lang="less" scoped></style>
