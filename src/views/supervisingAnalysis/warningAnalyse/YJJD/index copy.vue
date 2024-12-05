<template>
    <div ref="chartDom" style="width: 100%;height: 390px;">

    </div>
</template>
  
<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, onUnmounted, toRefs, watch, defineProps } from 'vue'
import { getAlarmCountWithZjByDate } from '@/api/camera.js'
import { timeline } from '@/utils/utils'
const chartDom = ref()

const prpos = defineProps({
    isTabActive: {
        type: Array,
        default: () => []
    },
    selectDateTime: {
        type: Array,
        default: () => []
    }
})

const isActive = ref();
const { isTabActive, selectDateTime } = toRefs(prpos);

watch(selectDateTime, async (newValue, oldValue) => {
    console.log(newValue, 'selectDateTimeselectDateTimeselectDateTime')
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
}, { deep: true, immediate: true })


watch(isTabActive, async (newValue, oldValue) => {
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
}, { deep: true, immediate: true })


onMounted(() => {
    getWarninfoData({ startDate: timeline('year-week-day'), endDate: timeline('year-week-day') });
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
    var myColor = [
        'rgba(65, 241, 141, 0.9)', 'rgba(72,209,204, 0.9)', 'rgba(255, 208, 118, 0.9)',
        'rgba(255,99,71, 0.9)', 'rgba(124,252,0, 0.9)', '#DC143C', '#00FFFF',
        '#00008B', '#008B8B', '#B8860B', '#A9A9A9', '#006400', '#FF8C00',
        '#00CED1', '#FF1493', '#00BFFF'
    ].reverse();

    const propData = yjlxData.value;
    const xData = propData.map((item) => item.name);
    const yData = propData.map((item) => item.value);
    let max = Math.ceil(Math.max(...yData) * 1.2) || 1; // 确保 max 至少为 1，避免全为 0 时无显示
    let maxData = new Array(xData.length).fill(max); // 生成与xData长度一致的 maxData

    const option = {
        grid: {
            left: "10%",
            right: "10%", // 调整右侧留白以容纳数据标签
            bottom: "1%",
            top: "0%",
            containLabel: false,
        },
        xAxis: [
            { show: false },
            { show: false },
        ],
        yAxis: [
            {
                show: false,
                inverse: true,
                data: xData,
            },
            {
                show: true,
                inverse: true, // 保持与左侧一致的顺序
                data: xData,
                offset: -109,
                position: 'right',
                axisLabel: {
                    lineHeight: 50,
                    verticalAlign: 'top',
                    textStyle: {
                        fontSize: 14,
                        color: '#fff',
                    },
                    formatter: (value) => {
                        return ''; // 隐藏 yAxis 上的标签
                    },
                    padding: [0, 0, -8, 0],
                },
                axisLine: { show: false },
                splitLine: { show: false },
                axisTick: { show: false },
            },
        ],
        dataZoom: [
            {
                type: 'inside',
                yAxisIndex: [0, 1],
                start: 0,
                end: 50, // 默认显示的百分比范围，可根据需要调整
                zoomOnMouseWheel: true, // 支持鼠标滚轮缩放
                moveOnMouseMove: true,  // 支持鼠标拖拽
                moveOnMouseWheel: true, // 支持鼠标滚轮移动
            },
            {
                type: 'slider',
                yAxisIndex: [0, 1],
                start: 0,
                end: 50, // 默认显示的百分比范围，可根据需要调整
                handleSize: '100%', // 滚动条的大小
                width: 15,
                right: '2%',
                handleStyle: {
                    color: '#00CED1', // 滚动条的颜色
                },
                textStyle: {
                    color: '#fff' // 滚动条上的文字颜色
                }
            }
        ],
        series: [
            {
                show: true,
                type: 'bar',
                barGap: '100%',
                xAxisIndex: 1,
                barWidth: 8,
                itemStyle: {
                    normal: {
                        barBorderRadius: 8,
                        color: function (params) {
                            var num = myColor.length;
                            return {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 1,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#0F1F45',
                                    },
                                    {
                                        offset: 1,
                                        color: myColor[params.dataIndex % num],
                                    },
                                ],
                            };
                        },
                    },
                },
                label: {
                    show: true,
                    position: 'right',  // 标签显示在柱状条右侧
                    formatter: (params) => `${yData[params.dataIndex]}`, // 显示 yData 的值
                    color: '#fff',       // 设置标签颜色为白色
                    fontSize: 14,        // 设置标签字体大小
                    offset: [20, 0],     // 调整水平偏移量，将标签移到外圆右侧
                    align: 'right',      // 标签内容右对齐，确保固定在外圆右侧
                    distance: 10,        // 设置与外圆的距离
                },

                z: 2,
                data: yData, // 使用实际的 yData
            },
            {
                name: '外圆',
                type: 'scatter',
                hoverAnimation: false,
                data: yData,
                xAxisIndex: 1,
                symbolSize: 14,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var num = myColor.length;
                            return myColor[params.dataIndex % num];
                        },
                        opacity: 1,
                    },
                },
                z: 2,
            },
            {
                z: 1,
                show: true,
                type: 'bar',
                xAxisIndex: 1,
                barGap: '-100%',
                barWidth: 7,
                itemStyle: {
                    normal: {
                        barBorderRadius: 7,
                        color: 'rgba(13, 55, 78, 1)',
                    },
                },
                label: {
                    normal: {
                        show: true,
                        position: [0, -20],
                        rich: {
                            white: {
                                color: '#ffffff',
                            },
                        },
                        formatter: function (data) {
                            return '{white|' + xData[data.dataIndex] + '}';
                        },
                    },
                },
                data: maxData,
            },
        ],
    };

    myChart.setOption(option);
};







</script>
  
<style lang="less" scoped></style>
  