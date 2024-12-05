<template>
    <div ref="chartDom" style="width: 100%;height: 390px;">
  
    </div>
  </template>
  
  <script setup>
  import * as echarts from 'echarts'
  import { ref, onMounted, onUnmounted,toRefs, watch, defineProps } from 'vue'
  import { getAlarmCountWithZjByDate} from '@/api/camera.js'
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
  
  onMounted(() => {
    getWarninfoData({startDate: timeline('beforeMonth'),endDate:timeline('year-week-day')});
  })
  
  const yjlxData = ref([])
  const getWarninfoData = async (params) => {

    const { code, msg, data } = await getAlarmCountWithZjByDate(params);
    if (code === '200') {
        yjlxData.value = data.map(item => ({ name: item.town_name, value: item.count, ratio: '10' }))
        init();
    }
 }
  
 const init = () => {
    const myChart = echarts.init(chartDom.value);

    const propData = yjlxData.value;

    let Ydata = propData.map((item) => item.name);
    let Xdata = propData.map((item) => item.value);
    var myColor = [
        'rgba(65, 241, 141, 0.9)', 'rgba(72,209,204, 0.9)', 'rgba(255, 208, 118, 0.9)',
        'rgba(255,99,71, 0.9)', 'rgba(124,252,0, 0.9)', '#DC143C', '#00FFFF',
        '#00008B', '#008B8B', '#B8860B', '#A9A9A9', '#006400', '#FF8C00',
        '#00CED1', '#FF1493', '#00BFFF'
    ].reverse();
  
    const option = {
        xAxis: {
            type: 'value',
            show: false,
        },
        yAxis: {
            type: 'category',
            inverse: true,
            axisLabel: {
                show: true,
                margin: 15,
                textStyle: {
                    color: '#fff',
                    fontSize: 14,
                },
                verticalAlign: 'bottom',
                align: 'top',
                padding: [0, 0, 10, 15],
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            data: Ydata,
        },
        grid: {
            left: "10%",
            right: "10%",  // 右侧增加一点间距以容纳滚动条
            bottom: "0%",
            top: "0%",
            containLabel: false,
        },
        dataZoom: [
            {
                type: 'inside',
                yAxisIndex: [0],  // 关联 yAxis
                start: 5,
                end: 30,  // 默认显示的百分比范围，可根据需要调整
                zoomOnMouseWheel: true,  // 支持鼠标滚轮缩放
                moveOnMouseMove: true,   // 支持鼠标拖拽
                moveOnMouseWheel: true,  // 支持鼠标滚轮移动
            },
            {
                type: 'slider',
                yAxisIndex: [0],  // 关联 yAxis
                start: 0,
                end: 50,  // 默认显示的百分比范围，可根据需要调整
                handleSize: '100%',  // 滚动条的大小
                width: 15,
                right: '2%',
                handleStyle: {
                    color: '#00CED1',  // 滚动条的颜色
                },
                textStyle: {
                    color: '#fff'  // 滚动条上的文字颜色
                }
            }
        ],
        series: [
            {
                type: 'bar',
                barWidth: 8,
                zlevel: 2,
                barGap: '100%',
                showBackground: true,
                backgroundStyle: {
                    color: '#042F61'
                },
                itemStyle: {
                    borderRadius: 3,
                    color: (params) => {
                        var num = myColor.length;
                        return {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 1,
                                    color: "#fff",
                                },
                                {
                                    offset: 0,
                                    color: myColor[params.dataIndex % num],
                                },
                            ],
                        };
                    },
                },
                label: {
                    show: true,
                    position: [170, -22],
                    fontSize: 14,
                    color: "#fff",
                    formatter: function (data) {
                        return '{a|' + data.value + '}'
                    },
                    rich: {
                        a: {
                            color: '#fff',
                            textBorderWidth: 1,
                            fontSize: 14,
                            align: 'right',
                            width: 100,
                            fontWeight: 'bold'
                        }
                    },
                },
                data: Xdata,
            }
        ],
    };

    myChart.setOption(option);
};

  
  
  </script>
  
  <style lang="less" scoped></style>
  