<template>
    <div class="warpper">
        <div class="early_header">
            <div class="flexBox mt26">
                <Tags class="mt10" title="预警概况" />
                <div class="tabBox">
                    <div class="btnBOx" @click="exportExcel">
                        <FolderAdd />导出统计报表
                    </div>
                    <p class="timeText">统计时间：2024-04-28 10:20:42</p>
                    <ul class="tab">
                        <li @click="tabClick(item.id)" v-for="item in tabData" :key="item.label"
                            :class="isTabActive === item.id ? 'tabActive' : ''">{{ item.label }}</li>
                    </ul>
                        <el-date-picker  v-if="isTabActive === 5" v-model="selectDateTime"  value-format="YYYY-MM-DD" type="daterange" range-separator="至" start-placeholder="开始日期"
        end-placeholder="结束日期" @change="dateChange" clearable />
                </div>
            </div>
            <div class="chart_warpper">
                <div class="title_box">
                    <div class="title_header">
                        <img src="../../../../public/image/earlyWarningAnalysis/Group7.png" alt="">
                        <div class="title_right">
                            <div class="div1"><span class="txt1">较7天前预警数量</span>
                                <p class="p1"></p>
                            </div>
                            <p class="p2"><span class="txt2">{{ difCount }}</span></p>
                        </div>
                    </div>
                    <div class="chart chart1">
                        <Tags3 title="数据表格"></Tags3>
                        <SJBG :isTabActive="isTabActive" :selectDateTime="selectDateTime" />
                    </div>
                </div>
                <div class="chart chart2">
                    <Tags3 title="预警类型"></Tags3>
                    <YJLX :isTabActive="isTabActive" :selectDateTime="selectDateTime"/>
                </div>
                <div class="chart chart3">
                    <Tags3 title="预警分类"></Tags3>
                    <YJFL :isTabActive="isTabActive" :selectDateTime="selectDateTime" />
                </div>
                <div class="chart chart3">
                    <Tags3 title="预警街道"></Tags3>
                    <YJJD :isTabActive="isTabActive" :selectDateTime="selectDateTime" />
                </div>
                <div class="chart chart3">
                    <Tags3 title="预警数量"></Tags3>
                    <YJWZ :isTabActive="isTabActive" :selectDateTime="selectDateTime" />
                </div>
            </div>
            <div class="early_bottom">
                <Tags class="mt10" title="预警明细" />
                <YJMX />
            </div>
        </div>
    </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, onUnmounted,toRefs, watch, defineProps } from 'vue'
import { near2weeksWarnCount} from '@/api/camera.js'
import { timeline } from '@/utils/utils'
import Tags from '@/components/Tags/index'
import Tags3 from '@/components/Tags3/index'
import SJBG from './SJBG/index.vue'
import YJLX from './YJLX/index.vue'
import YJFL from './YJFL/index.vue'
import YJJD from './YJJD/index.vue'

import YJWZ from './YJWZ/index.vue'
import YJMX from './YJMX/index.vue'
import { Search } from '@element-plus/icons-vue'
const chartDom = ref()
const isTabActive = ref(4)
const input = ref('')
const tabData = ref([
    {
        label: '实时',
        id: 1
    },
    {
        label: '昨天',
        id: 2
    },
    {
        label: '7天',
        id: 3
    },
    {
        label: '30天',
        id: 4
    },
    {
        label: '自定义',
        id: 5
    }
])

const areaOptions =  ref([
    { label: '虎鹿镇', value: '330783014',coordinates:[120.4532, 29.4244] },
    { label: '魏山镇', value: '330783011' ,coordinates:[120.5176, 29.3776]},
    { label: '三单乡', value: '330783017' ,coordinates:[120.6660, 29.2925]},
    { label: '六石街道', value: '330783018' ,coordinates:[120.3369, 29.3509]},
    { label: '江北街道', value: '330783012',coordinates:[120.2716, 29.3415] },
    { label: '白云街道', value: '330783013' ,coordinates:[120.1812, 29.2717]},
    { label: '吴宁街道', value: '330783004' ,coordinates:[120.2448, 29.2644]},
    { label: '歌山镇', value: '330783005' ,coordinates:[120.4141, 29.27841]},
    { label: '六石街道', value: '330783006',coordinates:[120.5176, 29.3776] },
    { label: '东阳江镇', value: '330783006',coordinates:[120.5133, 29.2072] },
    { label: '南市街道', value: '330783006',coordinates:[120.2139, 29.1836] },
    { label: '画水镇', value: '330783006',coordinates:[120.1374, 29.1689] },
    { label: '南马镇', value: '330783006',coordinates:[120.2315, 29.0855] },
    { label: '千祥镇', value: '330783006',coordinates:[120.3353, 29.0301] },
    { label: '马宅镇', value: '330783006',coordinates:[120.4099, 29.1087] },
    { label: '湖溪镇', value: '330783006',coordinates:[120.4036, 29.1783] },
    { label: '佐村镇', value: '330783006',coordinates:[120.5334, 29.3022] },
]);

const selectArea = ref();


const difCount = ref();
const getWarninfoData = async (params) => {
  const { code, msg, data } = await near2weeksWarnCount(params);
  if (code === '200') {
    difCount.value = data.dif;
    init();
  }
}

const tabClick = async (id) => {
    isTabActive.value = id;

    let params = {};
    switch (isTabActive.value) {
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
}
const exportExcel = () =>{
    console.log('导出excel')
}
const selectDateTime = ref([])
const dateChange = async (val) => {
    let params = {};
    switch (isTabActive.value) {
        case 5:
        params.startDate = val[0];
        params.endDate = val[1];
        break;
        default:
        params.startDate = '';
        params.endDate = '';
        break
    }
  
    await getWarninfoData(params);
}
onMounted(() => {
    getWarninfoData({startDate: timeline('year-week-day'),endDate:timeline('year-week-day')});
})

</script>

<style lang="less" scoped>
.warpper {
    width: 1823px;
    height: 845px;
    position: relative;
    z-index: 10;
    background-image: url('../../../../public/image/earlyWarningAnalysis/k1.png');
    background-size: cover;
    padding: 25px 30px 26px 39px;
    box-sizing: border-box;
    margin: 19px auto 0px auto;
}

.chart_warpper {
    display: flex;
    justify-content: space-between;

    .chart {
        width: 316px;
        height: 443px;
        background-image: url('../../../../public/image/earlyWarningAnalysis/Group1.png');
        background-size: cover;
    }

    .chart1 {
        height: 307px;
        margin-top: 30px;
    }
}
.early_bottom{
    margin-top: 10px;
}
.flexBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 23px;

    .tabBox {
        display: flex;
        align-items: center;

        .timeText {
            font-size: 14px;
            color: #fff;
            margin-right: 15px;
        }

        .tab {
            display: flex;
            align-items: center;

            li {
                width: 61px;
                height: 28px;
                background: #07518066;
                line-height: 28px;
                text-align: center;
                font-size: 14px;
                color: #fff;
                border: 1px solid #14567B;
                border-left: none;
                cursor: pointer;
                transition: all .3s;

                &:hover {
                    filter: brightness(150%);
                }

                &:first-child {
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                    border-left: 1px solid #14567B;
                }

                &:last-child {
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                }
            }

            .tabActive {
                background: linear-gradient(180deg, rgba(1, 51, 79, 0.8) 0%, rgba(19, 169, 234, 0.8) 100%);
                border-radius: 4px;
                border: 1px solid #318CDF
            }
            
        }
        .btnBOx{
                width:  140px;
                height: 28px;
                background: linear-gradient(180deg, rgba(1, 51, 79, 0.8) 0%, rgba(19, 169, 234, 0.8) 100%);
                border-radius: 4px;
                border: 1px solid #318CDF;
                line-height: 28px;
                text-align: center;
                font-size: 14px;
                color: #fff;
                border: 1px solid #14567B;
                border-left: none;
                cursor: pointer;
                transition: all .3s;
                margin-right: 20px;
                &:hover {
                    filter: brightness(150%);
                }

                &:first-child {
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                    border-left: 1px solid #14567B;
                }

                &:last-child {
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                }
                svg{
                    display: inline-block;
                    vertical-align: middle;
                    margin-top: -2px;
                    width: 20px; 
                    height: 20px; 
                    margin-right: 3px
                }
        }
    }
    
}

.title_box {
    position: relative;
    color: #fff;
    font-size: 16px;
    z-index: 10;

    .title_header {
        display: flex;
        /* 使用 Flexbox */
        align-items: flex-end;
        /* 垂直方向上将子元素对齐到容器的末尾（即底部） */
        line-height: 43px;
    }

    img {
        width: 127px;
        height: 106px;
    }

    .title_right {
        display: flex;
        /* 设置为 Flexbox */
        flex-direction: column;
        /* 子元素垂直排列 */
        justify-content: flex-end;

        /* 垂直方向上将文本对齐到底部 */
        .p1 {
            position: absolute;
            top: 35px;
            left: 102px;
            width: 147px;
            height: 15px;
            background-image: url('../../../../public/image/earlyWarningAnalysis/txtbg.png');
            background-size: 100%;
        }

        .p2 {}

        .txt2 {
            font-size: 32px;
        }
    }
}
::v-deep .searchBox {
        width: 420px;
        height: 36px;
        background-image: url('/public/image/supervisingAnalysis/searchBg.png');
        margin-top: 20px;

        .el-input {
            height: 100%;

            .el-input__wrapper {
                background-color: transparent;
                box-shadow: none;

                .el-input__inner {
                    color: #fff;
                }
            }
        }

        .el-input__suffix {
            color: #fff;
        }

    }

.input_box{
    display: flex;
    justify-content: space-between;
    margin-bottom: 23px;
}

::v-deep .searchBox {

.el-select {
    .el-select__wrapper {
        min-height: 35px;
        background: url('/public/image/platformOverview/selectBg.png');
        background-size: cover;
        background-repeat: no-repeat;
        box-shadow: none;
    }

    .el-select-dropdown__item.selected {
        // background-color: #83e818!important; // 选中
    }

    .el-select-dropdown__item.hover {
        background-color: #498f6c !important; // hover
    }

    :deep .el-dropdown-menu__item:not(.is-disabled) {
        // color: #182F23!important; // disabled
    }

    .el-select-dropdown__item {
        color: #4FC78A !important; // 下拉项颜色
    }

    :deep .el-popper {
        background-color: #121f1b !important; // 展开下拉背景
        border: 1px solid #498f6c !important; // 展开下拉边框
    }

    :deep .el-popper .el-popper__arrow::before {
        border-top: 1px solid #498f6c !important; // 箭头按钮边框
        background-color: #121f1b !important; // 箭头按钮背景色
    }

    .el-select__caret {
        font-size: 16px;
        color: #0B80E3;
    }

    .el-select__placeholder {
        color: #fff;
    }
}

p {
    font-size: 14px;
    color: #fff;
}
}
</style>
<style scoped>
::v-deep .el-range-editor.el-input__wrapper{
    width: 300px;
    box-sizing: border-box;
    min-height: 30px;
    background: #0D519D73;
    box-shadow: none;
    border: 1px solid #14567B; 
    margin-left: 20px;
  }
  ::v-deep .el-date-editor .el-range-input{
    color: #fff !important;
  }
  ::v-deep .el-range-separator{
    color: #fff !important;
  }

  
</style>