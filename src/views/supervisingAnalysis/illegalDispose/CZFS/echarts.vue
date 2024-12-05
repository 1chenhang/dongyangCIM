<template>
  <div ref="chartDom" style="width: 100%;height: 220px;">

  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, onUnmounted,toRefs, watch, defineProps } from 'vue'
import { judgmeState} from '@/api/camera.js'
import { timeline } from '@/utils/utils'

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

const chartDom = ref()
const timed = ref(null)
let index = 0
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

console.log(newValue,'newValuenewValue')
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


onMounted(() => {
  getWarninfoData({startDate: timeline('beforeMonth'),endDate:timeline('year-week-day')});
})

const yjlxData = ref()
const getWarninfoData = async (params) => {

const { code, msg, data } = await judgmeState(params);
  if (code === '200') {
    let {effective_count,invalid_count} = data;
    yjlxData.value  = [
        { value: effective_count, name: '有效标记' },
        { value: invalid_count, name: '无效标记' }
    ]
    init();
  }
}

onUnmounted(() => {
  clearTime()
})
const init = () => {
  const myChart = echarts.init(chartDom.value)
  const option = {
    color: ['#188FFC', '#F5C859', '#77E53D'],
    legend: {
      top: '12%',
      // left: 'right',
      right: 70,
      width: 163,
      icon: 'roundRect',
      itemWidth: 15,
      itemHeight: 4,
      itemGap: 30,
      textStyle: {
        color: '#fff',
        fontSize: 14,
        padding: [0, 6]
      }
    },
    graphic: [
      {
        type: 'image',
        left: '117.5',
        top: '12.5',
        z: -10,
        bounding: 'raw',
        rotation: 0, // 旋转
        scale: [1, 1], // 缩放
        style: {
          // 背景图
          image: require('../../../../../public/image/supervisingAnalysis/32环形图_bg2.png'),
          opacity: 1
        }
      }

    ],
    series: [
      {
        type: 'pie',
        radius: ['47%', '55%'],
        center: ['35%', '40%'],
        avoidLabelOverlap: false,
        padAngle: 2,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            color: '#fff',
            formatter: params => {
              return `{a|${params.value}}\n\n{b|${params.name} }`
            },
            rich: {
              a: {
                fontSize: '18',
                color: '#fff'
                // fontWeight: 'DDJBT'
              },
              b: {
                fontSize: 14,
                color: '#fff'
              }
            }
          }

        },
        labelLine: {
          show: false
        },
        data: yjlxData.value
      }
    ]
  }
  let index = 0
  // hover选中
  // hover选中
  myChart.on('mouseover', function (e) {
    if (e.dataIndex !== index) {
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0
      })
    }
    clearTime()
  })
  myChart.on('mouseout', function (e) {
    index = e.dataIndex
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: index
    })
    setIntervals(myChart)
  })
  window.addEventListener('resize', function () {
    myChart.resize()
  })

  setTimeout(() => {
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: index
    })
    setIntervals(myChart)
  }, 300)

  option && myChart.setOption(option)
}
const clearTime = () => {
  clearInterval(timed.value)
}
const setIntervals = (myChart) => {
  timed.value = setInterval(() => {
    index++
    if (index > 2) index = 0

    myChart.dispatchAction({
      type: 'downplay', // 取消高亮
      seriesIndex: 0
    })

    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: index
    })
  }, 3000)
}
</script>

<style lang="less" scoped></style>
