<template>
    <div class="warpper">
        <el-form :model="form2" ref="queryForm" size="small" :inline="true">
            <el-form-item label="预警间隔" prop="brandName">
                <div class="selectBox">
                    <el-select v-model="form2.frequencyType" placeholder="报警时间间隔" clearable style="width:250px">
                        <el-option style="background: #052243F5;color:#fff"  v-for="dict in sjjgOptions" :key="dict.value" :label="dict.label" :value="dict.value" />
                    </el-select>
                </div>

            </el-form-item>
            <el-form-item label="地块预警" prop="deviceAddress">
                <div class="selectBox">
                    <el-select v-model="form2.landType" placeholder="请选择" clearable style="width:250px">
                        <el-option style="background: #052243F5;color:#fff"  v-for="dict in landTypeOptions" :key="dict.value" :label="dict.label"
                            :value="dict.value" />
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item>
                <div class="btnList">
                    <div @click="search" class="btn btn1">
                        <p>搜索</p>
                    </div>
                    <div @click="resetForm" class="btn btn2">
                        <p>重置</p>
                    </div>
                </div>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="24">
                <div class="btnList2">
                    <div @click="addConform" class="btn btn1">
                        <p>新增</p>
                    </div>
                    <div @click="deleteAll" class="btn btn2">
                        <p>删除</p>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="tableWrapper">
            <el-table ref="reportTable" height="100%" class="table-with-header-bg" :data="landList" stripe
                :header-cell-style="{ color: '#99C3F4', fontWeight: '400' }" @selection-change="handleSelectionChange"
                style="width: 100%;">
                <el-table-column type="selection" width="55" />
                <el-table-column label="预警类型" prop="brandName" :show-overflow-tooltip="true" width="150">
                    <template #default="scope">
                        <span>{{ scope.row.brandName == 'DH' ? '火灾预警' : '施工预警' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="预警种类" prop="alarmType">
                    <template #default="scope">
                        <span>{{ getAlarmTypeName(scope.row) }}</span>
                        <!-- <span v-if="scope.row.alarmType.indexOf(1) !== -1">行人</span>
                        <span v-if="scope.row.alarmType.indexOf(2) !== -1">工程车辆</span>
                        <span v-if="scope.row.alarmType.indexOf(3) !== -1">火灾</span>
                        <span v-if="scope.row.alarmType.indexOf(4) !== -1">烟雾</span> -->
                    </template>
                </el-table-column>
                <el-table-column label="预警间隔" prop="frequencyType" width="100">
                    <template #default="scope">
                        <span v-if="scope.row.frequencyType == 1">始终</span>
                        <span v-if="scope.row.frequencyType == 2">7天</span>
                        <span v-if="scope.row.frequencyType == 3">30天</span>
                        <span v-if="scope.row.frequencyType == 4">60天</span>
                        <span v-if="scope.row.frequencyType == 5">90天</span>
                        <span v-if="scope.row.frequencyType == 6">从不</span>
                    </template>
                </el-table-column>
                <el-table-column label="预警时间" align="center" prop="createTime">
                    <template #default="scope">
                        <span>{{ scope.row.createTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="handleClick(scope.row)">
                            修改信息
                        </el-button>
                        <!-- <el-button link type="primary" size="small" @click="handleClick(scope.row)">
                            查看信息
                        </el-button> -->
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination class="custom-pagination" v-model:current-page="pageParam.pageNum"
                    v-model:page-size="pageParam.pageSize" :page-sizes="[10, 20, 100, 400]" :small="small"
                    layout="total, prev, pager, next" :total="totalValue" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </div>
        </div>
        <BaseDialog1 style="z-index: 99999999;" v-show="alarmConfigDialogEdit" @closeDialog="closeDialogHandler"
            :styles="earlyWaringStyles4" :title="'预警配置修改'">
            <template v-slot:content>
                <AlarmConForm  :currRow="currRow" :isEdit2="isEdit2"/>
            </template>
        </BaseDialog1>
    </div>
</template>

<script setup>
import { ref, watch, watchEffect, onBeforeUnmount, onMounted } from 'vue'
import { useStore } from 'vuex'
import $bus from '@/utils/eventBus.js'
import { alarmConfigEdit, alarmConfigList, alarmConfigDel,getAlarmType } from '@/api/camera'
import BaseDialog1 from '@/components/BaseDialog1'
import AlarmConForm from './AlarmConForm.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const { state, commit } = useStore()
const landList = ref([])

const form2 = ref({
    frequencyType: undefined,
    landType: undefined,
    ssjd: undefined,
})
const isEdit2 = ref(false);
const earlyWaringStyles4 = ref({
    width: '800px',
    top: '15%',
    left: '15%',
})
const currRow = ref({});
const alarmConfigDialogEdit = ref(false);
const landTypeOptions = ref([
    { label: '供地', value: '1' },
    { label: '农转用', value: '2' },
    { label: '供而未用', value: '3' },
    { label: '已供已用', value: '4' },
    { label: '用而未尽', value: '5' },
    { label: '闲置土地', value: '6' },
    { label: '批而未供', value: '7' },
    { label: '低效用地', value: '8' },
])

const sjjgOptions = ([
    { label: '始终', value: 1 },
    { label: '7天', value: 2 },
    { label: '30天', value: 3 },
    { label: '60天', value: 4 },
    { label: '90天', value: 5 },
    { label: '从不', value: 6 },
])
const pageParam = ref({
    pageNum: 1,
    pageSize: 10,
})

const resetForm = () => {
    form2.value = {
        frequencyType: undefined,
        landType: undefined,
    }
    getAlarmConfigList();
}
const search = () => {
    getAlarmConfigList();
}
const closeDialogHandler = () => {
    alarmConfigDialogEdit.value = false;
    $bus.emit('closeAlarmConfigDialog')
}
const handleCurrentChange = (val) => {
    pageParam.pageNum = val;
}
const handleSizeChange = (val) => {
    pageParam.pageSize = val;
}

const totalValue = ref(0);
// 获取预警配置信息
const getAlarmConfigList = async () => {
    const { data, code } = await alarmConfigList(form2.value, { pageNum: pageParam.pageNum, pageSize: pageParam.pageSize })
    if (code === '200') {
        landList.value = data.list;
        totalValue.value = data.total;
    }
}

const selectIds = ref([]);

const handleSelectionChange = (val) => {
    selectIds.value = [];
    selectIds.value = val.map(item => item.id);
}

const deleteAll = () => {
    if (selectIds.value.length <= 0) {
        ElMessage.warning('请勾选选项')
        return
    }
    ElMessageBox.confirm(
        '确定要删除数据吗？',
        '提示信息',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            let res = await alarmConfigDel(selectIds.value);
            if (res.code === '200') {
                ElMessage.success('删除成功')
            }
            getAlarmConfigList();
            selectIds.value = [];
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
            getAlarmConfigList();
            selectIds.value = [];
        })



}
getAlarmConfigList();

const addConform = () => {
    alarmConfigDialogEdit.value = true;
    isEdit2.value = false;
}


const getAlarmTypeName = (row) => {
    const alarmTypes = row.alarmOtherTypes ? row.alarmOtherTypes.split(','):[];
    let result = [];

    typeList.value.forEach(item => {
        if (item.alarmType === row.alarmType) {
            item.alarmOtherTypes.forEach(subItem => {
                if (alarmTypes.includes(subItem.alarmOtherType.toString())) {
                    result.push(subItem.name);
                }
            });
        }
    });

    return result.join(',');
};


const typeList = ref([]);
//获取预警类型
const getAlarmTypeList = async () => {
    let res = await getAlarmType({});
    typeList.value = res.data;
}
getAlarmTypeList();
const handleClick = (row) => {
    alarmConfigDialogEdit.value = true;
    // if(!Array.isArray(row.alarmType)){
    //     row.alarmType = row.alarmType.split(',');
    // }
    currRow.value = row;
    isEdit2.value = true;
    $bus.emit('alarmConfigData', row);
}

onMounted(() => {
    $bus.on('cameraClick', async (query) => {
        console.log(query.deviceSn, 'queryqueryqueryquery')
    })
    $bus.on('closeDilaogaa', async (query) => {
        alarmConfigDialogEdit.value = false;
    })
    $bus.on('closeConForm', async (query) => {
        alarmConfigDialogEdit.value = false;
        getAlarmConfigList();
    })

})

</script>

<style lang="less" scoped>
.warpper {
    width: 100%;
    height: 800px;
    position: relative;
    z-index: 10;
    background-size: 100% 100%;
    box-sizing: border-box;

}

.tableWrapper {
    height: 500px;
    box-sizing: border-box;
}

.pagination {
    margin: 20px;
    height: 100px;
}

::v-deep.el-table {
    .el-table__cell {
        padding: 5px;
    }
}

.el-table {
    height: 156px;
    color: #fff;
}

::v-deep.el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #0E509B73 !important;
}

::v-deep .el-table__body {
    border-collapse: separate !important;
    border-spacing: 0 2px !important;
    table-layout: auto !important;
}

::v-deep .el-table,
.el-table__expanded-cell {
    background-color: #1c252d;
}

::v-deep .el-table__row {
    height: 36px;
    /* 你想要的行高 */
    background: #0E509B73 !important;
}

::v-deep .el-table--enable-row-transition,
.el-table .cell {
    background-color: #1c252d;
}

::v-deep.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #1c252d;
}

::v-deep.el-table tr {
    background: #04264E85;
}

::v-deep.el-table td.el-table__cell,
::v-deep.el-table th.el-table__cell.is-leaf {
    border: none;
}

::v-deep.el-table th.el-table__cell {
    background-color: transparent;
}

::v-deep .el-table__inner-wrapper::before {
    z-index: 0;
    height: 0 !important;
}


.custom-pagination {
    margin: 0 5px;
    border-radius: 3px;
    color: #fff;
}

.custom-pagination /deep/ .el-select__wrapper {
    background-color: rgba(144, 141, 141, 0.1);
    border: 0px;
}

.custom-pagination /deep/ .el-select__placeholder {
    color: #fff;
}

.custom-pagination /deep/ .el-input__wrapper {
    background-color: rgba(144, 141, 141, 0.1);
    color: #fff;
}

.custom-pagination /deep/ el-input__inner {
    color: #fff;
}

/deep/.el-pagination {
    --el-pagination-bg-color: rgba(144, 141, 141, 0.1) !important;
    --el-pagination-button-disabled-bg-color: rgba(144, 141, 141, 0.1) !important;
    --el-pagination-hover-color: #FFF !important;
    --el-pagination-text-color: #999 !important;
    --el-pagination-button-color: #999 !important;
}

::v-deep .el-pagination__total {
    color: #fff;
    font-size: 14px;
}

::v-deep .el-pager li {
    border: 1px solid #0674C1;
    margin-right: 8px;
    border-radius: 5px;
}

::v-deep .el-pagination__jump {
    color: #fff;
}

::v-deep.warpper {
    padding: 20px 30px;

    .el-form-item__label {
        color: #fff;
    }

    .el-input__suffix .el-input__icon {
        color: #fff;
        /* 图标颜色 */
        font-size: 15px;
        /* 图标大小 */
        padding-right: 16px;
    }

    .el-input__wrapper {

        background-color: rgba(13, 81, 157, 0.45);
        padding: 0px;
        box-shadow: 0 0 0 1px #0B7FE2 inset;
    }

    .el-textarea__inner {
        background-color: rgba(13, 81, 157, 0.45);
        padding: 10px;
        box-shadow: 0 0 0 1px #0B7FE2 inset;
        color: #fff;
    }

    .el-input__inner {
        padding-left: 15px;
        height: 36px;
        font-size: 15px;
        border: 0px;
        color: #fff;
    }
}

.btnList2 {
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
    margin-bottom: 20px;

    .btn {
        width: 80px;
        box-sizing: border-box;
        border-radius: 8px;
        text-align: center;
        font-size: 14px;
        line-height: 32px;
        cursor: pointer;
        transition: all .3s;

        &:hover {
            filter: brightness(130%);
        }
    }

    .btn1 {
        margin-right: 22px;
        background: linear-gradient(180deg, rgba(3, 212, 136, 0.8) 25%, rgba(18, 196, 154, 0.8) 100%);
        border: 2px solid #31DFB5;
        box-shadow: 0px 4px 14.6px 0px #25EAC680;

        p {
            background: linear-gradient(180deg, #FFFFFF 27.27%, #4DC7BF 100%);
            // text-shadow: 0px 2px 0px #00000080;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }

    .btn2 {
        background: linear-gradient(180deg, rgba(243, 67, 67, 0.8) 25%, rgba(226, 35, 28, 0.8) 100%);

        border: 2px solid #f12b1d;
        box-shadow: 0px 4px 14.6px 0px #f0251780;

        p {
            background: linear-gradient(180deg, #FFFFFF 27.27%, #4D9BC7 100%);

            // text-shadow: 0px 2px 0px #00000080;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }
}

.btnList {
    display: flex;
    justify-content: center;

    .btn {
        width: 80px;
        box-sizing: border-box;
        border-radius: 8px;
        text-align: center;
        font-size: 14px;
        line-height: 32px;
        cursor: pointer;
        transition: all .3s;

        &:hover {
            filter: brightness(130%);
        }
    }

    .btn1 {
        margin-right: 22px;
        background: linear-gradient(180deg, rgba(1, 79, 51, 0.8) 25%, rgba(21, 242, 189, 0.8) 100%);
        border: 2px solid #31DFB5;
        box-shadow: 0px 4px 14.6px 0px #25EAC680;

        p {
            background: linear-gradient(180deg, #FFFFFF 27.27%, #4DC7BF 100%);
            // text-shadow: 0px 2px 0px #00000080;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }

    .btn2 {
        background: linear-gradient(180deg, rgba(1, 51, 79, 0.8) 25%, rgba(21, 136, 242, 0.8) 100%);

        border: 2px solid #318CDF;
        box-shadow: 0px 4px 14.6px 0px #258BEA80;

        p {
            background: linear-gradient(180deg, #FFFFFF 27.27%, #4D9BC7 100%);

            // text-shadow: 0px 2px 0px #00000080;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }
}

::v-deep .selectBox {

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
}</style>
