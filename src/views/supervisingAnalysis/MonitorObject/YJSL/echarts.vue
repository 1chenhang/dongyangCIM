<template>
  <div class="s_wrapper">
    <div style="width: 100%; height: 500px" ref="main"></div>
  </div>

</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, toRefs } from 'vue'
const main = ref()

onMounted(() => {
  init()
})
const init = () => {
  const myChart = echarts.init(main.value)
  // 数据
  const XName = ['类型一', '类型二', '类型三', '类型四', '类型五', '类型六', '类型七']
  const data1 = [0, 97, 51, 180, 52, 33, 1]
  const data2 = [0, 70, 41, 120, 44, 22, 1]
  const option = {

    grid: {
      left: '10%',
      top: '10%',
      bottom: '14%',
      right: '10%'
    },
    title: {
      text: '单位：个',
      textStyle: {
        align: 'center',
        color: '#BBD3F180',
        fontSize: 14
      },
      top: '1%',
      left: '8%'
    },
    legend: {
      top: '1%',
      right: 50,
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
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(50,50,50,0)', // tooltip默认背景为白色，手动置为透明
      borderWidth: 0,
      borderColor: 'rgba(50,50,50,0)',
      padding: 0,
      textStyle: {
        color: '#fff'
      },
      axisPointer: {
        type: 'none'
      },
      formatter: function (params) {
        let html = ''
        html += `<div style="font-size: 16px;height: 52px;padding: 6px 11px; box-sizing: border-box;
        background: linear-gradient(270deg, rgba(0, 52, 101, 0.42) 0%, #003465 100%);
                      border-radius: 4px;">
                        <div>
                          <div style="margin-bottom: 2px;color:#478AD8">${params[0].name}</div>
                          <div style="margin-bottom: 0px">
                            <span style="font-size: 17px;color:#fff;font-famimy:DDT">${params[0].value}</span>
                          </div>
                          
                        </div>
                      </div>`
        return html
      }
    },
    yAxis: [
      {
        type: 'value',
        scale: true,
        splitNumber: 3,
        min: 0,
        max: 200,
        splitLine: {
          lineStyle: {
            color: '#202E48'
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          formatter: '{value}',
          color: '#BBD3F1',
          fontSize: 14
        }
      }
    ],
    xAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#425A87'
          }
        },
        axisLabel: {
          inside: false,
          margin: 15,
          padding: [0, 0, 0, 30],
          textStyle: {
            color: '#BBD3F1', // x轴文字颜色
            fontWeight: 'normal',
            fontSize: '14'
          }
        },
        data: XName
      }
    ],
    series: [
      {
        name: '统计一',
        type: 'line',
        data: data1,
        symbol: 'none',
        itemStyle: {
          // normal: {
          //   borderWidth: 5

          // }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: ' rgba(23, 133, 234, 0.32)'
                },
                {
                  offset: 1,
                  color: 'rgba(23, 133, 234, 0)'
                }
              ],
              false
            ),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        lineStyle: {
          width: 2,
          type: 'solid',
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0.4167, color: '#1785EA' // 起始颜色
            }, {
              offset: 1, color: 'rgba(23, 133, 234, 0)' // 结束颜色
            }],
            global: false // 缺省为 false
          } // 应用定义的渐变色
        }
      },
      {
        name: '统计二',
        type: 'line',
        data: data2,
        symbol: 'none',
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: '  rgba(46, 242, 183, 0.32)'
                },
                {
                  offset: 1,
                  color: ' rgba(46, 242, 183, 0)'
                }
              ],
              false
            ),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        lineStyle: {
          width: 2,
          type: 'solid',
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0.4167, color: '#2EF2B7' // 起始颜色
            }, {
              offset: 1, color: 'rgba(46, 242, 183, 0)' // 结束颜色
            }],
            global: false // 缺省为 false
          } // 应用定义的渐变色
        }
      }

    ]
  }
  myChart.setOption(option)
}

</script>

<style lang="less" scoped>
.s_wrapper {
  box-sizing: border-box;
}

.tip {
  font-size: 14px;
  margin-top: 16px;
  color: #BBD3F1AD;

}
</style>
