<template>
  <div ref="chartDom" style="width: 100%;height: 500px;">

  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
const chartDom = ref()
const getdate = ['预警类型1', '预警类型2', '预警类型3', '预警类型4', '预警类型5', '预警类型6', '预警类型7']
const getvalue = [892, 892, 1320, 1620, 1920, 1920, 1920]
onMounted(() => {
  init()
})

const init = () => {
  const myChart = echarts.init(chartDom.value)
  const option = {

    grid: {
      top: '4%',
      right: '10%',
      left: '24%',
      bottom: '12%'
    },
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
    title: {
      text: '单位：万',
      textStyle: {
        align: 'center',
        color: '#BBD3F180',
        fontSize: 14
      },
      top: '1%',
      left: '8%'
    },
    xAxis: [{
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#BBD3F1',
        textStyle: {
          fontSize: 14
        }
      },
      max: 3000,
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      }
    }],
    yAxis: [{
      type: 'category',
      axisLabel: {
        margin: 10,
        color: '#fff',
        textStyle: {
          fontSize: 14
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      data: getdate
    }],
    aria: {
      enabled: true,
      decal: {
        show: true
      }
    },
    series: [{ // 背景色
      name: '实体库',
      type: 'bar',
      stack: '总量',
      barWidth: '25%', // 柱图宽度
      showBackground: true, // 开启背景
      backgroundStyle: { // 设置背景样式
        color: 'transparent',
        borderWidth: 1,
        borderColor: '#CEDDFC45',
        borderRadius: 20
      },

      data: getvalue,
      label: {
        show: true,
        position: 'right',
        fontSize: 12,
        color: '#CAEEFF',
        offset: [0, 0]
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          {
            offset: 0,
            color: '#0B75EC'
          },
          {
            offset: 1,
            color: '#75C3FF '
          }
        ]),
        borderRadius: 80
      }
    }
    ]
  }

  option && myChart.setOption(option)
}

</script>

<style lang="less" scoped></style>
