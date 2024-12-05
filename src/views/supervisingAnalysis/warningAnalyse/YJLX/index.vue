<template>
  <div ref="chartDom" style="width: 100%;height: 400px;">

  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, onUnmounted,toRefs, watch, defineProps } from 'vue'
import { getAlarmTypeCountByDate} from '@/api/camera.js'
import { timeline } from '@/utils/utils'
const chartDom = ref()

const prpos = defineProps({
isTabActive:{
  type:Array,
  default:() => []
},
selectDateTime:{
  type:Array,
  default:() => []
}
})
const isActive = ref();
const { isTabActive,selectDateTime } = toRefs(prpos);

watch(selectDateTime,async (newValue,oldValue)=>{
let params = {};
switch (isActive.value) {
  case 5:
    params.startDate = newValue[0];
    params.endDate = newValue[1];
    break;
  default:
    params.startDate = '';
    params.endDate = '';
    break
}

await getWarninfoData(params);
},{ deep: true, immediate: true })


watch(isTabActive,async (newValue,oldValue)=>{
isActive.value = newValue;
let params = {};
switch (isActive.value) {
  case 1:
    params.startDate = timeline('year-week-day');
    params.endDate = timeline('year-week-day');
    break;
  case 2:
    params.startDate = timeline('beforeDay');
    params.endDate = timeline('year-week-day');
    break;
  case 3:
    params.startDate = timeline('beforeWeek');
    params.endDate = timeline('year-week-day');
    break;
  case 4:
    params.startDate = timeline('beforeMonth');
    params.endDate = timeline('year-week-day');
    break;
  default:
    params.startDate = '';
    params.endDate = '';
    break
}

await getWarninfoData(params);
},{ deep: true, immediate: true })


let myChart
onMounted(() => {
  getWarninfoData({startDate: timeline('beforeMonth'),endDate:timeline('year-week-day')});
})
const yjlxData = ref([])
const getWarninfoData = async (params) => {

const { code, msg, data } = await getAlarmTypeCountByDate(params);
if (code === '200') {
  yjlxData.value = data.map(item=>({name:item.name,value:item.count}))
  init();
}
}

const init = async () => {
myChart = echarts.init(chartDom.value)
const colorList = ['#00FFFF','	#00008B','#008B8B','#B8860B','#A9A9A9','#006400','#FF8C00','#00CED1','#FF1493','#00BFFF']
function getParametricEquation (startRatio, endRatio, isSelected, isHovered, k, h) {
  // 计算
  const midRatio = (startRatio + endRatio) / 2

  const startRadian = startRatio * Math.PI * 2
  const endRadian = endRatio * Math.PI * 2
  const midRadian = midRatio * Math.PI * 2

  // 如果只有一个扇形，则不实现选中效果。
  // if (startRatio === 0 && endRatio === 1) {
  //     isSelected = false;
  // }
  isSelected = false
  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== 'undefined' ? k : 1 / 3

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX = isSelected ? Math.sin(midRadian) * 0.1 : 0
  const offsetY = isSelected ? Math.cos(midRadian) * 0.1 : 0

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  const hoverRate = isHovered ? 1.05 : 1

  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32
    },

    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20
    },

    x: function (u, v) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
    },

    y: function (u, v) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
    },

    z: function (u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u)
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1
      }
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1
    }
  }
}

// 生成模拟 3D 饼图的配置项
function getPie3D (pieData, internalDiameterRatio) {
  const series = []
  let sumValue = 0
  let startValue = 0
  let endValue = 0
  const legendData = []
  const k =
          typeof internalDiameterRatio !== 'undefined'
            ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
            : 1 / 3

  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value

    const seriesItem = {
      name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: 1 / 10
      }
    }

    if (typeof pieData[i].itemStyle !== 'undefined') {
      const itemStyle = {}

      typeof pieData[i].itemStyle.color !== 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null
      typeof pieData[i].itemStyle.opacity !== 'undefined'
        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
        : null

      seriesItem.itemStyle = itemStyle
    }
    series.push(seriesItem)
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value

    series[i].pieData.startRatio = startValue / sumValue
    series[i].pieData.endRatio = endValue / sumValue
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value
    )

    startValue = endValue

    legendData.push(series[i].name)
  }

  // // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
  series.push({
    name: 'mouseoutSeries',
    type: 'surface',
    parametric: true,
    wireframe: {
      show: false
    },
    itemStyle: {
      opacity: 0.1,
      color: '#dc9b3b'
    },
    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20
      },
      x: function (u, v) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2
      },
      y: function (u, v) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2
      },
      z: function (u, v) {
        return Math.cos(v) > 0 ? -0.5 : -5
      }
    }
  })

  // // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
  series.push({
    name: 'mouseoutSeries',
    type: 'surface',
    parametric: true,
    wireframe: {
      show: false
    },
    itemStyle: {
      opacity: 0.1,
      color: 'rgba(24, 250, 232)'
    },
    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20
      },
      x: function (u, v) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2
      },
      y: function (u, v) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2
      },
      z: function (u, v) {
        return Math.cos(v) > 0 ? -5 : -7
      }
    }
  })
  series.push({
    name: 'mouseoutSeries',
    type: 'surface',

    parametric: true,
    wireframe: {
      show: false
    },
    itemStyle: {
      opacity: 0.1,
      color: '#E1E8EC'
    },
    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20
      },
      x: function (u, v) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.2
      },
      y: function (u, v) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.2
      },
      z: function (u, v) {
        return Math.cos(v) > 0 ? -7 : -7
      }
    }
  })

  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  const option = {
    backgroundColor: 'transparent',
    fontFamily: 'Source Han Sans CN',
    legend: [
      {
        icon: 'none',
        orient: 'vertical',
        data: pieData.slice(0, Math.ceil(pieData.length / 2)).map((dItem, dIndex) => {
          return {
            ...dItem,
            textStyle: {
              rich: {
                iconName: {
                  width: 4,
                  height: 16,
                  borderRadius: 5,
                  backgroundColor: colorList[dIndex]
                },
                percent: {
                  color: colorList[dIndex]
                }
              }
            }
          }
        }),
        bottom: '10%',
        left: '0%',
        itemGap: 25,
        itemWidth: 12,
        itemHeight: 5,
        selectedMode: false, // 关闭图例选择
        textStyle: {
          color: '#fff',
          fontSize: 25,
          fontFamily: 'Source Han Sans CN',
          rich: {
            name: {
              color: '#FFF',
              fontSize: 15,
              width: 80,
              padding: [0, 0, 0, 10]
            },
            value: {
              color: '#2BDFD4',
              fontFamily: 'PangMenZhengDao',
              fontSize: 15,
              width: 30,
              padding: [0, 0, 0, 10]
            },
            percent: {
              color: '#2BDFD4',
              fontFamily: 'PangMenZhengDao',
              fontSize: 15,
              padding: [0, 0, 0, 10]
            },
            unit: {
              color: '#ACDCE4',
              fontSize: 15,
              padding: [0, 0, 0, 5]
            }
          }
        },
        formatter: name => {
          const obj = pieData.find(item => item.name === name)
          const datas = pieData
          let total = 0
          const target = obj.value
          for (let i = 0; i < datas.length; i++) {
            total += Number(datas[i].value)
          }
          const arr = [
            `{iconName|}{name|${name}}{value|${obj.value}}`
          ]
          return arr.join('')
        }
      },
      {
        icon: 'none',
        orient: 'vertical',
        data: pieData.slice(Math.ceil(pieData.length / 2)).map((dItem, dIndex) => {
          return {
            ...dItem,
            textStyle: {
              rich: {
                iconName: {
                  width: 4,
                  height: 16,
                  borderRadius: 5,
                  backgroundColor: colorList[dIndex + Math.ceil(pieData.length / 2)]
                },
                percent: {
                  color: colorList[dIndex + Math.ceil(pieData.length / 2)]
                }
              }
            }
          }
        }),
        bottom: '10%',
        right: '10%',
        itemGap: 25,
        itemWidth: 12,
        itemHeight: 5,
        selectedMode: false, // 关闭图例选择
        textStyle: {
          color: '#fff',
          fontSize: 25,
          fontFamily: 'Source Han Sans CN',
          rich: {
            name: {
              color: '#FFF',
              fontSize: 15,
              width: 80,
              padding: [0, 0, 0, 10]
            },
            value: {
              color: '#2BDFD4',
              fontFamily: 'PangMenZhengDao',
              fontSize: 15,
              width: 30,
              padding: [0, 0, 0, 10]
            },
            percent: {
              color: '#2BDFD4',
              fontFamily: 'PangMenZhengDao',
              fontSize: 15,
              padding: [0, 0, 0, 10]
            },
            unit: {
              color: '#ACDCE4',
              fontSize: 15,
              padding: [0, 0, 0, 5]
            }
          }
        },
        formatter: name => {
          const obj = pieData.find(item => item.name === name)
          const datas = pieData
          let total = 0
          const target = obj.value
          for (let i = 0; i < datas.length; i++) {
            total += Number(datas[i].value)
          }
          const arr = [
            `{iconName|}{name|${name}}{value|${obj.value}}`
          ]
          return arr.join('')
        }
      }
    ],

    xAxis3D: {},
    yAxis3D: {},
    zAxis3D: {},
    grid3D: {
      viewControl: {
        autoRotate: true // 自动旋转
      },
      top: '-30%',
      width: '100%',
      show: false,
      boxHeight: 50
    },
    series: series
  };
  return option
}
const data = yjlxData.value
const serData = data.map((dItem, index) => {
  return {
    ...dItem,
    value: Number(dItem.value),
    itemStyle: {
      color: colorList[index]
    }
  }
})
// 传入数据生成 option
const option = getPie3D(serData, 0.7)
myChart.setOption(option)
}
onUnmounted(() => {
if (myChart) {
  echarts.dispose(myChart)
  myChart = null
}
})

</script>

<style lang="less" scoped></style>
