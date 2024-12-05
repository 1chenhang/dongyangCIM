<template>
  <div ref="chartDom" style="width: 100%;height: 390px;">

  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, onUnmounted,toRefs, watch, defineProps } from 'vue'
import { getAlarmCountWithStateByDate} from '@/api/camera.js'
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
    const { code, msg, data } = await getAlarmCountWithStateByDate(params);
    if (code === '200') {
        /**
         * effective  有效
         * invalid 无效
         * processed 处理中
         * processing 已处理
         * total 告警次数
         * unprocessed 未处理的
         */
        let {effective,invalid,processed,processing,total,unprocessed} = data[0];
        yjlxData.value = [total,processing,processed,unprocessed,effective,invalid];
        init();
    }
}

const init = () => {
  const myChart = echarts.init(chartDom.value)
  let Ydata = ['告警次数', '已处理告警数', '处理中报警数', '未处理报警数', '有效报警数',  '无效报警数'];
  let Xdata = yjlxData.value;
  let myColor = ["#FC2D42", "#015DFD", "#015DFD"].reverse();


  const option ={
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
            // 调整左侧文字的3个属性，缺一不可
            verticalAlign: 'bottom',
            align: 'top',
            //调整文字上右下左
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
        right: "0%",
        bottom: "0%",
        top: "0%",
        containLabel: false,
    },
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

  myChart.setOption(option)
}


</script>

<style lang="less" scoped></style>
