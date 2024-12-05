<template>
    <div class="selectFlex">
        <el-select v-model="value1" size="small" placeholder="处置类别" clearable style="width: 200px">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="value2" size="small" placeholder="处置方式" clearable style="width: 200px">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </div>
    <div class="elPicker">
        <el-date-picker v-model="value3" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" size="small" />
    </div>
    <div ref="chartDom" style="width: 100%;height: 330px;">
    </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
const chartDom = ref()
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
    var category = [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
    ];
    var dottedBase = [];
    var lineData = [
        18092, 20728, 24045, 28348, 32808, 36097, 39867, 44715, 48444, 50415, 56061,
        62677, 59521, 67560, 18092, 20728, 24045, 28348, 32808, 36097, 39867, 44715,
        48444, 50415, 36097, 39867, 44715, 48444, 50415, 50061, 32677, 49521, 32808,
    ];
    var barData = [
        4600, 5000, 5500, 6500, 7500, 8500, 9900, 12500, 14000, 21500, 23200, 24450,
        25250, 33300, 4600, 5000, 5500, 6500, 7500, 8500, 9900, 22500, 14000, 21500,
        8500, 9900, 12500, 14000, 21500, 23200, 24450, 25250, 7500,
    ];
    var rateData = [];
    for (var i = 0; i < 33; i++) {
        var rate = barData[i] / lineData[i];
        rateData[i] = rate.toFixed(2);
    }
    let option = {
        title: {
            text: "处置效率情况",
            x: "center",
            y: 30,
            textStyle: {
                color: "#fff",
                fontSize: 16,
                fontWeight: "normal",
            },
        },
        backgroundColor: "rgba(0, 0, 0, 0.50)",
        tooltip: {
            trigger: "axis",
            backgroundColor: "rgba(255,255,255,0.7)",
            axisPointer: {
                type: "shadow",
                label: {
                    show: true,
                    backgroundColor: "#7B7DDC",
                },
            },
        },
        legend: {
            data: ["已处置", "未处置", "处置率"],
            textStyle: {
                color: "#B4B4B4",
            },
            top: "20%",
        },
        grid: {
            x: "10%",
            width: "82%",
            y: "20%",
        },
        xAxis: {
            data: category,
            axisLine: {
                lineStyle: {
                    color: "#B4B4B4",
                },
            },
            axisTick: {
                show: false,
            },
        },
        yAxis: [
            {
                splitLine: { show: false },
                axisLine: {
                    lineStyle: {
                        color: "#B4B4B4",
                    },
                },

                axisLabel: {
                    formatter: "{value} ",
                },
            },
            {
                splitLine: { show: false },
                axisLine: {
                    lineStyle: {
                        color: "#B4B4B4",
                    },
                },
                axisLabel: {
                    formatter: "{value} ",
                },
            },
        ],

        series: [
            {
                name: "处置率",
                type: "line",
                smooth: true,
                showAllSymbol: true,
                symbol: "emptyCircle",
                symbolSize: 8,
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        color: "#F02FC2",
                    },
                },
                data: rateData,
            },

            {
                name: "已处置",
                type: "bar",
                barWidth: 10,
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: "#956FD4" },
                            { offset: 1, color: "#3EACE5" },
                        ]),
                    },
                },
                data: barData,
            },

            {
                name: "未处置",
                type: "bar",
                barGap: "-100%",
                barWidth: 10,
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: "rgba(156,107,211,0.5)" },
                            { offset: 0.2, color: "rgba(156,107,211,0.3)" },
                            { offset: 1, color: "rgba(156,107,211,0)" },
                        ]),
                    },
                },
                z: -12,

                data: lineData,
            },
        ],
    };
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
