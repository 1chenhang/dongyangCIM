<template>
    <div class="wrapper">
        <div class="flexBox">
            <Tags class="mt5" title="违法综合性分析"></Tags>
            <div class="tabBox">
                <div class="btnBOx">
                    <FolderAdd />导出统计报表
                </div>
                <p class="timeText">统计时间：{{time}}</p>
                <ul class="tab">
                        <li @click="tabClick(item.id)" v-for="item in tabData" :key="item.label"
                            :class="isTabActive === item.id ? 'tabActive' : ''">{{ item.label }}</li>
                    </ul>
                <el-date-picker  v-if="isTabActive === 5" v-model="selectDateTime"  value-format="YYYY-MM-DD" type="daterange" range-separator="至" start-placeholder="开始日期"
        end-placeholder="结束日期" @change="dateChange" clearable />
            </div>
        </div>
        <div class="topContentBox">
            <div class="bgBox">
                <Tags3 title="处置类别"></Tags3>
                <CZLB :isTabActive="isTabActive" :selectDateTime="selectDateTime" />
            </div>
            <div class="bgBox">
                <Tags3 title="处置方式"></Tags3>
                <CZFS :isTabActive="isTabActive" :selectDateTime="selectDateTime" />
            </div>
            <div class="bgBox">
                <Tags3 title="处置状态及时间"></Tags3>
                <CZZTJSJ :isTabActive="isTabActive" :selectDateTime="selectDateTime" />
            </div>
        </div>
        <div class="flexBox mt26">
            <Tags title="违法执法人员考核分析"></Tags>
            <!-- <div class="tabBox">
                <p class="timeText">统计时间：2024-04-28 10:20:42</p>
                <ul class="tab">
                    <li @click="tabClick(item.id)" v-for="item in tabData" :key="item.label"
                        :class="isTabActive === item.id ? 'tabActive' : ''">{{ item.label }}</li>
                </ul>
            </div> -->
        </div>
        <div class="selectBox">
            <el-select v-model="handleUserId" clearable @change="changeSelect" placeholder="请选择" popper-class="selectMenuOption"
            suffix-icon="CaretBottom">
            <el-option v-for="item in cldwOptions" :key="item.value" :label="item.nickname" :value="item.id"
                style="background: #052243F5;" />
            </el-select>
        </div>
        <div class="bottomContentBox">
            <div class="bg2Box">
                <Tags3 title="处置效率"></Tags3>
                <CZXL />
            </div>
            <div class="bg2Box">
                <Tags3 title="执法结果"></Tags3>
                <ZFJG />
            </div>
            <div class="bg2Box">
                <Tags3 title="执法反馈"></Tags3>
                <ZFFK />
            </div>
        </div>
    </div>

</template>

<script setup>
import Tags from '@/components/Tags/index'
import Tags3 from '@/components/Tags3/index'
import CZLB from './CZLB/echarts'
import CZFS from './CZFS/echarts'
import CZXL from './CZXL'
import CZZTJSJ from './CZZTJSJ/echarts'
import ZFJG from './ZFJG/echarts'
import ZFFK from './ZFFK'
import { Search } from '@element-plus/icons-vue'
import { timeline } from '@/utils/utils'
import { ref } from 'vue'
import { allUser } from '@/api/camera'
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

const cldwOptions = ref([])
const handleUserId = ref();
const getAllUser = async () =>{
  let res = await allUser({});
  cldwOptions.value = res.data;
}
getAllUser();

const changeSelect = (val) =>{
  console.log(val,'选中的值')
}
const timeQuery = ref({
  startDate: timeline('year-week-day'),
  endDate: timeline('year-week-day')
})
const time = ref(timeline('year-week-day'))
const tabClick = async (id) => {
    isTabActive.value = id;
}
const selectDateTime = ref([])
const dateChange = async (val) => {
}
</script>

<style lang="less" scoped>
.wrapper {
    position: relative;
    z-index: 10;
    width: 1830px;
    height: 858px;
    background-image: url('/public/image/supervisingAnalysis/bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    margin: 19px auto;
    padding: 25px 39px;
    box-sizing: border-box;

    .flexBox {
        display: flex;
        justify-content: space-between;
        align-items: center;

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

    .topContentBox {
        display: flex;
        margin-top: 20px;
        justify-content: space-between;

        .bgBox {
            width: 554px;
            height: 261px;
            background-image: url('/public/image/supervisingAnalysis/小背景.png');
            background-size: cover;
            background-repeat: no-repeat;
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

    .bottomContentBox {
        display: flex;
        margin-top: 18px;
        justify-content: space-between;

        .bg2Box {
            width: 554px;
            height: 329px;
            background-image: url('/public/image/supervisingAnalysis/bg4.png');
            background-size: cover;
            background-repeat: no-repeat;
        }
    }

    .title_right {
        display: flex;
        /* 设置为 Flexbox */
        flex-direction: column;
        /* 子元素垂直排列 */
        justify-content: flex-end;

        /* 垂直方向上将文本对齐到底部 */
        .p1 {

            .mt26 {
                margin-top: 26px;
            }
        }
    }
}
::v-deep .selectBox {
width: 420px;
.el-select {
  .el-select__wrapper {
    width: 420px;
    height: 40px;
    margin-top: 20px;
    background: url('/public/image/platformOverview/selectBg.png');
    background-size: cover;
    background-repeat: no-repeat;

    box-shadow: none;
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
