<template>
    <div class="selectFlex">
        <el-select v-model="value1" size="small" placeholder="请选择所属街道" clearable style="width: 200px">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="value2" size="small" placeholder="请选择对象类别" clearable style="width: 200px">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </div>
    <div class="elPicker">
        <el-date-picker v-model="value3" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" size="small" />
    </div>

    <div ref="chartDom" style="width: 100%;height: 300px;">
    </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
const chartDom = ref();
const value3 = ref('')
const options1 = [
    {
        value: '吊车',
        label: '吊车'
    }
]
onMounted(() => {
    init()
})
const init = () => {
    const myChart = echarts.init(chartDom.value)
    const option = {
        backgroundColor: 'rgba(0, 0, 0, 0.50)',
        tooltip: {//提示框组件
            trigger: 'axis',//触发类型 柱状图
            axisPointer: { type: 'shadow' } //触发效果 移动上去 背景效果
        },
        xAxis: [//x轴
            {
                type: 'category',//坐标轴类型 离散
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],//数据
                axisTick: false,//是否显示刻度
                axisLine: {//坐标轴样式
                    show: true,//是否显示
                    lineStyle: {//线的样式
                        type: 'dashed'//线的类型 虚线
                    },
                },
                axisLabel: {
                    color: "#DEDEDE"
                }
            },
        ],
        yAxis: [//y轴
            {
                min: 0,//最小
                max: 700,//最大
                interval: 100,//相差
                name: '单位：',//名称
                type: 'value',//连续类型
                axisLine: {//坐标轴样式
                    show: false, //不显示
                },
                splitLine: {//分隔辅助线
                    lineStyle: {
                        type: 'dashed',//线的类型 虚线0
                        opacity: 0.2//透明度
                    },
                },
                axisLabel: {
                    color: "#DEDEDE"
                }
            },
        ],
        series: [//系统列表   
            {
                name: '违法数量',//名称
                type: 'bar',//类型
                barWidth: 11,//宽度
                data: [300, 450, 90, 300, 520, 450, 150, 300],//数值
                z: 2,
                itemStyle: {
                    color: {//渐变色
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        type: 'linear',
                        global: false,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(6, 244, 231)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(6, 244, 231,0)',
                            },
                        ],
                    },
                },
            },
            {
                name: '预警数量',
                type: 'bar',
                barWidth: 11,
                data: [400, 600, 90, 400, 400, 250, 90, 400],
                z: 1,
                itemStyle: {
                    color: {
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        type: 'linear',
                        global: false,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(3, 181, 243)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(2, 190, 251,0)',
                            },
                        ],

                    },
                },
            },
            {
                name: "",
                barGap: '-220%',
                type: 'bar',
                z: 0,
                data: [420, 620, 110, 420, 540, 470, 170, 420],
                barWidth: '48px',
                itemStyle: {
                    normal: {
                        color: '#fff', // 0% 处的颜色
                        opacity: 0.1//透明度
                    }
                },
            },
        ],
        grid: {
            left: '10%',
            right: '10%',
            bottom: '10%',
            top: '30%',
        },
        legend: {
            right: '70',
            top: '10%',
            textStyle: {
                // 图例文字的样式
                color: '#fff',
                fontSize: 14,
                padding: [2, 0, 0, 2],
                fontWeight: 100,
            },
        },
    };
    ;
    option && myChart.setOption(option)
}

</script>

<style lang="less" scoped>
.selectBox {
    margin-top: 20px;
}

.selectFlex {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

}

.elPicker {
    margin-top: 20px;

    .el-date-editor.el-input__wrapper {
        width: 100%;
    }
}

.mr65 {
    margin-right: 65px;
}

::v-deep .el-range-editor.el-input__wrapper {
    width: calc(100% - 28px);
    background-color: transparent;
    box-shadow: 0 0 0 1px #2a3d5d inset;
    padding: 1.5px 14px;
}

::v-deep.el-select {
    .el-select__wrapper {
        background-color: transparent;
        box-shadow: 0 0 0 1px #2a3d5d inset;
        padding: 7px 14px;
    }

    .el-select__placeholder {

        color: #fff;
    }
}

div::-webkit-scrollbar {
    width: 4px;
}

div::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(145, 75, 75, 0.2);
    opacity: 0.2;
    background: #2a3d5d;
    height: 100px;
}

div::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
}
</style>
<style>
.el-select-dropdown {
    background: transparent;
}

.el-popper.is-light {
    background: #02081cd6;
    border: 1px solid #2a3d5d;
    color: #fff;
}

.el-select-dropdown__item {
    color: #fff;
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
    background-color: #173046 !important;
    color: #fff;
    box-shadow: 0px 0px 78px rgba(1, 194, 255, 0.4) inset;
}

.el-select-dropdown__item.is-hovering {
    background-color: #173046 !important;
}

.el-date-editor .el-range-input {
    color: #fff;
}

.el-picker-panel {
    background-color: #02081cd6;
}

.el-date-table td.in-range .el-date-table-cell {
    background-color: #062a55;
    color: #fff;
}

.el-date-editor .el-range-separator {
    color: #fff;
}

.el-date-editor .el-range__icon {
    color: #fff;
}
</style>
