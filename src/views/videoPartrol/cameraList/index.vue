<template>
    <div class="container_box">
        <el-tabs class="new-tabs-header" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="地块列表" name="first">
            </el-tab-pane>
            <el-tab-pane label="预警信息" name="second">
            </el-tab-pane>
        </el-tabs>
        <div class="selectFlex">
            <el-select v-model="landParams.type" size="small" placeholder="请选择地块类型" @change="changeSelect" clearable style="width: 200px">
                <el-option v-for="item in landOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="landParams.ssjd" size="small" placeholder="请选择所属街道" clearable style="width: 200px">
                <el-option v-for="item in ssjd0ptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div class="camera_List">            
            <div class="camera_Item" @click="clickItem(item)" v-for="(item, index) in landListData" :key="index">
                <div class="item_title">{{ item.dkmc }}_{{ item.bsm }}</div>
                <div class="item_content">
                    <div class="item_left">
                        <p><span class="camera_label">行政区划：</span><span class="camera_value">{{ item.xzq
                        }}</span></p>
                        <p><span class="camera_label">规划用途：</span><span class="camera_value">{{ item.tdyt
                        }}</span></p>
                        <p><span class="camera_label">土地坐落：</span><span class="camera_value">{{ item.tdzl
                        }}</span></p>
                    </div>
                    <div class="item_right">
                        <p><span class="camera_label">土地类型：</span><span class="camera_value">{{ item.dxydlx
                        }}</span></p>
                        <p><span class="camera_label">土地面积：</span><span class="camera_value">{{ item.zdmj
                        }}</span></p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
  
<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import $bus from "@/utils/eventBus.js";
import { landList } from '@/api/land'
const activeName = ref('first');
const landParams = reactive({
    type:'供而未用t',
    ssjd:''
})
const landOptions = reactive([
    {label:'低效用地',value:'低效用地'},
    {label:'供而未用t',value:'供而未用t'},
    {label:'批而未供',value:'批而未供'},
    {label:'批而未供（1999-2022）',value:'批而未供（1999-2022）'},
    {label:'闲置',value:'闲置'},
    {label:'已供已用',value:'已供已用'},
    {label:'用而未尽',value:'用而未尽'},
])

const ssjd0ptions = reactive([]);
const changeSelect = (val)=>{
    getLandlist();

}
const landListData = ref([])
const handleClick = (tab, event) => {
    console.log(tab, event)
}

const clickItem = (landItem) => {
    $bus.emit("locateFeatureByCustomId", landItem);
}

const getLandlist = async () => {
    let params = {
        pageNum: 1, pageSize: 10
    };
    let data = {
        type: landParams.type
    };
    let res = await landList(params,data);
    landListData.value = res.data.list;
}

getLandlist();
onMounted(() => {
    // $bus.on("featuresList", (data)=>{
    //     landListData.value = data;
    // });
})


</script>

<style lang="less" scoped>
.camera_List{
    height: 60%;
    overflow-y: auto;
    .camera_Item {
    height: 125px;
    border: 1px solid #6DE8F2;
    margin-bottom: 10px;
    border-radius: 3px;
    font-size: 13px;
    background-color: #222222;
    cursor: pointer;

    .item_content {
        display: flex;
    }

    p {
        padding: 5px 15px;
    }

    .item_title {
        padding: 10px 15px;
        background-color: rgb(23, 99, 99);
        border-radius: 3px 3px 0px 0px;
        font-weight: 700;
    }

    .camera_label {
        color: #dadada;
    }

    .camera_value {
        font-weight: 700;
    }
}

}
.container_box {
    height: 75%;
    color: #fff;
    padding: 0px 10px;
    /deep/ .el-tabs__content {
        padding: 0px 10px;
        color: #fff;
        font-weight: 600;
        margin-top: 10px;
    }

    /deep/ .tabs-card {
        .el-tabs__nav-scroll {
            padding: 0;
        }
    }

    /deep/ .el-tabs__nav-wrap {
        &::after {
            display: none;
        }
    }

    /deep/ .el-tabs__header {
        margin: 0;
    }

    /deep/ .el-tabs__active-bar {
        background-color: #6DE8F2;
        height: 4px;
        border-radius: 2px;
    }

    /deep/ .el-tabs__item:hover {
        span {
            color: #6DE8F2;
        }
    }

    /deep/ .el-tabs__item.is-active {

        color: #6DE8F2;
        position: relative;

        span {
            color: #6DE8F2;
        }
    }

    /deep/ .el-tabs__item:hover {
        color: #6DE8F2;
    }

    /deep/ .el-tabs__item {
        color: #fff;
        font-size: 14px;
        font-weight: 500;
    }

    /deep/ .el-tabs.tabs-card .el-tabs__item span {
        background: none;
        box-shadow: none;
        height: 54px;
        line-height: 54px;
        min-width: 0;
        padding: 0;
        margin: 0 18px;
    }

    /deep/ .el-tab-pane {
        color: #fff;
    }
}
</style>
<style lang="less" scoped>

.selectFlex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

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
  