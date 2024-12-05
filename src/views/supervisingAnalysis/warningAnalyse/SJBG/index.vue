<template>
    <div ref="chartDom" style="width: 100%;height: 220px;">

    </div>
</template>
  
<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, onUnmounted,toRefs, watch, defineProps } from 'vue'
import { near2weeksWarnCount} from '@/api/camera.js'
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


const chartDom = ref()
onMounted(() => {
    getWarninfoData({startDate: timeline('beforeMonth'),endDate:timeline('year-week-day')});
})
const week1 = ref([]);
const week2 = ref([]);

const getWarninfoData = async (params) => {
  const { code, msg, data } = await near2weeksWarnCount(params);
  if (code === '200') {
    week1.value = data.week1;
    week2.value = data.week2;
    init();
  }
}

const init = () => {
    const myChart = echarts.init(chartDom.value);

    // Convert week1 and week2 data into format suitable for the chart
    const week1Data = week1.value || [];
    const week2Data = week2.value || [];
    const xAxisData = week1Data.map(item => item.weekday); // Assuming week1Data has a 'weekday' field
    const seriesData = week1Data.map(item => item.count || 0); // Replace 'value' with actual data field name
    const seriesData1 = week2Data.map(item => item.count || 0); // Replace 'value' with actual data field name

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: '30%',
            left: '2%',
            right: '10%',
            bottom: '5%',
            containLabel: true
        },
        legend: {
            icon: 'rect',
            right: "center",
            top: '2%',
            itemWidth: 7,
            itemHeight: 7,
            itemGap: 15,
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        },
        xAxis: {
            boundaryGap: true,
            data: xAxisData,
            axisLine: {
                lineStyle: {
                    color: "rgba(117, 168, 202, 0.4)"
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#fff'
            }
        },
        yAxis: [{
            name: '单位：个',
            type: "value",
            inverse: false,
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(117, 168, 202, 0.3)',
                    type: 'dashed'
                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#0A5C95"
                }
            },
            axisLabel: {
                formatter: "{value}",
                textStyle: {
                    color: '#fff',
                    fontSize: 14
                }
            },
            nameTextStyle: {
                color: '#89BFE5',
                padding: [0, 0, 0, -10],
                fontSize: 14
            },
            axisTick: {
                show: false
            }
        }],
        series: [
            {
                name: '本周预警',
                type: "line",
                symbol: 'none',
                showAllSymbol: true,
                symbolSize: 5,
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#2BDFD4',
                        lineStyle: {
                            color: '#52D2863D',
                            width: 5
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: 'rgba(82, 210, 134, 0.24)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(82, 210, 134, 0.26)'
                                    }
                                ]
                            }
                        },
                    }
                },
                data: seriesData
            },
            {
                name: '上周预警',
                type: "line",
                symbol: 'none',
                showAllSymbol: true,
                symbolSize: 5,
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#FFD076',
                        lineStyle: {
                            color: '#FFD076',
                            width: 1.5
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#5E75BE'
                                    },
                                    {
                                        offset: 1,
                                        color: '#5E75BE'
                                    }
                                ]
                            }
                        },
                    }
                },
                data: seriesData1
            }
        ]
    };

    myChart.setOption(option);
}


</script>
  
<style lang="less" scoped></style>
  