<template>
    <div ref="chartDom" style="width: 100%;height: 250px;">

    </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
const chartDom = ref()
onMounted(() => {
    init()
})
const init = () => {
    const myChart = echarts.init(chartDom.value)
    const option = {
        backgroundColor: '#070e2e',
        color: ['#0C65F6', '#00FFA6', '#F4DF58'],
        tooltip: {
            confine: true,
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
            textStyle: {
                color: '#fff',
                fontSize: 12,
                lineHeight: 24,
            },
            padding: [5, 10],
            backgroundColor: 'rgba(0, 0, 0, 0.50)',
            formatter(params) {	// 根据条件修改
                let unit = '个'
                let relVal = params[0].name
                for (let i = 0; i < params.length; i++) {
                    if (i === 1) {
                        unit = '%'
                    }
                    if (typeof (params[i].color) === 'string') {
                        relVal += `<div class="g-flex"><div style="width: 13px;height: 5px; margin-right: 5px; background: ${params[i].color}"></div><div class="g-p-r-20">${params[i].seriesName}</div>${params[i].value} ${unit}</div>`
                    } else {
                        relVal += `<div class="g-flex"><div style="width: 13px;height: 5px; margin-right: 5px; background: ${params[i].color.colorStops[0].color}"></div><div class="g-p-r-20">${params[i].seriesName}</div>${params[i].value} ${unit}</div>`
                    }
                }
                return relVal
            },
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '10%',
            top: '30%',
        },
        legend: {
            icon: 'rect',
            orient: 'horizontal',
            x: 'center',
            y: '10%',
            itemWidth: 12,
            itemHeight: 12,
            formatter: ['{a|{name}}'].join('\n'),
            textStyle: {
                color: '#fff',
                height: 8,
                rich: {
                    a: {
                        verticalAlign: 'bottom',
                    },
                },
            },
            data: ['历史预警数量', '当天预警数量'],
        },
        xAxis: {
            type: 'category',
            data: ['1月份', '2月份', '3月份', '4月份', '5月份', '6月份', '7月份', '8月份', '9月份', '10月份', '11月份', '12月份'],
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.45)',
                },
            },
            axisLabel: {
                color: '#FFF',
            },
            axisTick: {
                show: false,
            },
        },
        yAxis: [{
            type: 'value',
            name: '(个)',
            nameTextStyle: {
                color: '#fff',
                padding: [0, 0, 0, 30],
            },
            min: 0,
            minInterval: 1,
            splitArea: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.15)',
                },
            },
            axisLabel: {
                color: '#FFF',
                formatter: (params) => (params === 1 ? 0 : params),
            },
        }, {
            type: 'value',
            name: '(%)',
            nameTextStyle: {
                color: '#fff',
                padding: [0, 0, 0, 15],
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false,
            },
            axisLabel: {
                formatter: '{value}%', // 右侧Y轴文字显示
                color: '#FFF',
            },
            splitArea: {
                show: false,
            },
            min: 0,
            max: 100,
        }],
        series: [
            {
                name: '历史预警数量',
                type: 'bar',
                barWidth: 16,
                barMinHeight: 10,
                itemStyle: {
                    shadowColor: '#ffffff33',
                    shadowBlur: 1,
                    shadowOffsetX: 4,
                    shadowOffsetY: -3,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#5FD5EC' },
                        { offset: 1, color: 'rgba(95, 213, 236, 0)' },
                    ]),
                },
                data: [319, 998, 512, 198, 766, 189, 225, 667, 889, 456, 321, 456],
            },
            {
                name: '当天预警数量',
                type: 'line',
                yAxisIndex: 1,
                smooth: false,
                symbol: 'circle', // 标记的图形为实心圆
                symbolSize: 8, // 标记的大小
                data: [52, 42, 12, 40, 25, 18, 20, 45, 64, 32, 12, 18],
                itemStyle: { color: '#FFCF5F' },
            },
        ],
    };
    option && myChart.setOption(option)
}

</script>

<style lang="less" scoped></style>
