<template>
  <div ref="chartDom" style="width: 100%;height: 180px;">
  </div>
  <ul class="tipBox">
    <li v-for="item in dataList" :key="item.name">
      <p :style="{ 'color': item.itemStyle.color }" class="num">{{ item.value }}</p>
      <div class="legend" :style="{ 'background-color': item.itemStyle.color }"></div>
      <p class="text">{{ item.name }}</p>
    </li>
  </ul>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, onBeforeUnmount, toRefs } from 'vue'
import 'echarts-gl'
const chartDom = ref()
const option = ref({})
const myChart = ref(null)
const hoveredIndex = ref(null)
const dataList = ref([
  {
    name: '数据1',
    value: 150,
    itemStyle: {
      color: '#51B6EB'
    }
  },
  {
    name: '数据2',
    value: 60,
    itemStyle: {

      color: '#EE7930'
    }
  },
  {
    name: '数据3',
    value: 80,
    itemStyle: {

      color: '#F5AC42'
    }
  },
  {
    name: '数据4',
    value: 40,
    itemStyle: {

      color: '#10979B'
    }
  }
])
// const props = defineProps({
//   yjflData: {
//     type: Array,
//     default: () => []
//   },
// })
// const {yjflData} = toRefs(props);
// const yjflType = ref([]);
// const yjflCount = ref([]);

onMounted(() => {
  // yjflData.value.map(item=>{
  //   yjflType.value.push(item.type);
  //   yjflCount.value.push(item.count)
  // })
  init()
  myChart.value.on('mouseover', function (params) {
    // 准备重新渲染扇形所需的参数
    let isSelected
    let isHovered
    let startRatio
    let endRatio
    let k
    let i
    // 如果触发 mouseover 的扇形当前已高亮，则不做操作
    if (hoveredIndex.value === params.seriesIndex) {

      // 否则进行高亮及必要的取消高亮操作
    } else {
      // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
      if (hoveredIndex.value !== '') {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
        isSelected = option.value.series[hoveredIndex.value].pieStatus.selected
        isHovered = false
        startRatio = option.value.series[hoveredIndex.value].pieData.startRatio
        endRatio = option.value.series[hoveredIndex.value].pieData.endRatio
        k = option.value.series[hoveredIndex.value].pieStatus.k
        i =
          option.value.series[hoveredIndex.value].pieData.value ===
            option.value.series[0].pieData.value
            ? 50
            : 10
        // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
        option.value.series[
          hoveredIndex.value
        ].parametricEquation = getParametricEquation(
          startRatio,
          endRatio,
          isSelected,
          isHovered,
          k,
          i
        )
        option.value.series[hoveredIndex.value].pieStatus.hovered = isHovered

        // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
        hoveredIndex.value = ''
      }

      // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
      if (params.seriesName !== 'mouseoutSeries') {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
        isSelected =
          option.value.series[params.seriesIndex].pieStatus.selected
        isHovered = true
        startRatio =
          option.value.series[params.seriesIndex].pieData.startRatio
        endRatio = option.value.series[params.seriesIndex].pieData.endRatio
        k = option.value.series[params.seriesIndex].pieStatus.k

        // 对当前点击的扇形，执行高亮操作（对 option 更新）
        option.value.series[
          params.seriesIndex
        ].parametricEquation = getParametricEquation(
          startRatio,
          endRatio,
          isSelected,
          isHovered,
          k,
          // option.value.series[params.seriesIndex].pieData.value + 5
          100
        )
        option.value.series[params.seriesIndex].pieStatus.hovered = isHovered

        // 记录上次高亮的扇形对应的系列号 seriesIndex
        hoveredIndex.value = params.seriesIndex
      }

      // 使用更新后的 option，渲染图表
      myChart.value.setOption(option.value)
    }
  })
  // 修正取消高亮失败的 bug
  myChart.value.on('globalout', function () {
    // 准备重新渲染扇形所需的参数
    let isSelected
    let isHovered
    let startRatio
    let endRatio
    let k
    let i
    if (hoveredIndex.value !== '') {
      // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
      isSelected = option.value.series[hoveredIndex.value].pieStatus.selected
      isHovered = false
      k = option.value.series[hoveredIndex.value].pieStatus.k
      startRatio = option.value.series[hoveredIndex.value].pieData.startRatio
      endRatio = option.value.series[hoveredIndex.value].pieData.endRatio
      // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
      i =
        option.value.series[hoveredIndex.value].pieData.value ===
          option.value.series[0].pieData.value
          ? 35
          : 10
      option.value.series[
        hoveredIndex.value
      ].parametricEquation = getParametricEquation(
        startRatio,
        endRatio,
        isSelected,
        isHovered,
        k,
        i
      )
      option.value.series[hoveredIndex.value].pieStatus.hovered = isHovered

      // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
      hoveredIndex.value = ''
    }

    // 使用更新后的 option，渲染图表
    myChart.value.setOption(option.value)
  })
})

onBeforeUnmount(() => {
  if (myChart.value) {
    // echarts销毁函数
    echarts.dispose(myChart.value)
    myChart.value = null
  }
})
const init = () => {
  myChart.value = echarts.init(chartDom.value)
  option.value = getPie3D(
    dataList.value,
    0.59
  )

  option.value && myChart.value.setOption(option.value)
}
// 生成扇形的曲面参数方程
const getParametricEquation = (startRatio, endRatio, isSelected, isHovered, k, h) => {
  // 计算
  const midRatio = (startRatio + endRatio) / 2

  const startRadian = startRatio * Math.PI * 2
  const endRadian = endRatio * Math.PI * 2
  const midRadian = midRatio * Math.PI * 2

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    // eslint-disable-next-line no-param-reassign
    isSelected = false
  }

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  // eslint-disable-next-line no-param-reassign
  k = typeof k !== 'undefined' ? k : 1 / 3

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0

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

    x (u, v) {
      if (u < startRadian) {
        return (
          offsetX +
          Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        )
      }
      if (u > endRadian) {
        return (
          offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        )
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
    },

    y (u, v) {
      if (u < startRadian) {
        return (
          offsetY +
          Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        )
      }
      if (u > endRadian) {
        return (
          offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        )
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
    },

    z (u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u)
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1
      }
      // 当前图形的高度是Z根据h（每个value的值决定的）
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1
    }
  }
}
// 生成模拟 3D 饼图的配置
const getPie3D = (pieData, internalDiameterRatio) => {
  const series = []
  // 总和
  let sumValue = 0
  let startValue = 0
  let endValue = 0
  const legendData = []
  const k =
    typeof internalDiameterRatio !== 'undefined'
      ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
      : 1 / 3

  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i += 1) {
    sumValue += pieData[i].value

    const seriesItem = {
      name:
        typeof pieData[i].name === 'undefined'
          ? `series${i}`
          : pieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k
      }
    }

    if (typeof pieData[i].itemStyle !== 'undefined') {
      const { itemStyle } = pieData[i]

      // eslint-disable-next-line no-unused-expressions
      typeof pieData[i].itemStyle.color !== 'undefined'
        ? (itemStyle.color = pieData[i].itemStyle.color)
        : null
      // eslint-disable-next-line no-unused-expressions
      typeof pieData[i].itemStyle.opacity !== 'undefined'
        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
        : null

      seriesItem.itemStyle = itemStyle
    }
    series.push(seriesItem)
  }
  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  // console.log(series);
  for (let i = 0; i < series.length; i += 1) {
    endValue = startValue + series[i].pieData.value

    series[i].pieData.startRatio = startValue / sumValue
    series[i].pieData.endRatio = endValue / sumValue
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      // 我这里做了一个处理，使除了第一个之外的值都是10
      series[i].pieData.value
    )

    startValue = endValue

    legendData.push(series[i].name)
    // console.log(legendData);
  }

  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  option.value = {
    // animation: false,
    tooltip: {
      formatter: params => {
        if (params.seriesName !== 'mouseoutSeries') {
          return `${params.seriesName
            }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color
            };"></span>${option.value.series[params.seriesIndex].pieData.value
            }`
        }
        return ''
      }
    },
    legend: {
      show: false, // 暂时隐藏
      top: '10%',
      right: '0%',
      orient: 'vertical',
      align: 'left',
      itemWidth: 8,
      itemHeight: 8,
      icon: 'circle',
      formatter: function (name) {
        let value = ''
        pieData.forEach(item => {
          if (item.name === name) {
            value = item.value
          }
        })
        return `{a|${name}}\n{b|${value}}`
      },
      textStyle: {
        rich: {
          a: {
            color: '#FFFFFF',
            fontSize: 14,
            align: 'center',
            padding: [24, 0, 0, 0]
          },
          b: {
            color: '#00F5FF',
            fontSize: 16,
            align: 'center',
            padding: [10, 0, 0, 0]
          }
        }
      }
    },

    xAxis3D: {
      min: -1,
      max: 1
    },
    yAxis3D: {
      min: -1,
      max: 1
    },
    zAxis3D: {
      min: -1,
      max: 1
    },
    grid3D: {
      show: false,
      height: 250,
      boxHeight: 5,
      top: '-10%',
      left: '0%',
      bottom: '-10%',
      viewControl: {
        // 3d效果可以放大、旋转等，请自己去查看官方配置
        alpha: 30,
        // beta: 30,
        rotateSensitivity: 1,
        zoomSensitivity: 0,
        panSensitivity: 0,
        autoRotate: true,
        distance: 200
      },
      // 后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果。可以让整个画面更富有质感。
      postEffect: {
        // 配置这项会出现锯齿，请自己去查看官方配置有办法解决
        enable: false,
        bloom: {
          enable: true,
          bloomIntensity: 0.1
        },
        SSAO: {
          enable: true,
          quality: 'medium',
          radius: 2
        }
        // temporalSuperSampling: {
        //   enable: true,
        // },
      }
    },
    series
  }
  // console.log(option);
  return option.value
}

</script>

<style lang="less" scoped>
.tipBox {
  width: 420px;
  height: 77px;
  padding: 0 4px;
  background: #0377FF1A;
  display: flex;
  box-shadow: 0px 0px 13.1px 0px #2887CAE8 inset;
  margin: 10px auto;

  li {
    position: relative;
    width: 104px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .num {
      font-family: DDT;
      font-size: 23px;
      color: #fff;
    }

    .text {
      font-size: 14px;
      color: #fff;
    }

    .legend {
      width: 15px;
      height: 4px;
      border-radius: 22px;
      margin: 4px 0;
    }

    &:after {
      content: "";
      display: block;
      width: 1px;
      height: 66px;
      background: linear-gradient(180deg, rgba(11, 168, 254, 0.15) 0%, #0BA8FE 55%, rgba(11, 168, 254, 0.15) 100%);
      position: absolute;
      right: 0;
      top: 4px;
    }

    &:last-child::after {
      display: none;
    }
  }
}
</style>
