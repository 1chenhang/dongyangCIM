<template>
    <div class="warpper">
        <div class="container_box">
            <div class="box left_box">
            <p class="txt_title">事件素材</p>
            <el-form :model="form2" ref="queryForm" size="small" :inline="true">
            <el-form-item label="预警时间" prop="createTime">
                <div class="selectBox">
                    <el-date-picker style="width:250px;" class="custom-cascader"
                  v-model="form2.createTime"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  type="datetime"
                  placeholder="请选择预警时间"
                />
                </div>
            </el-form-item>
            <el-form-item label="选摄像头" prop="deviceSns">
                <div class="selectBox2">
                    <el-cascader v-model="form2.deviceSns" :options="treeData" :props="props" clearable style="width:250px;"  @change="handleChange"/>
                </div>
            </el-form-item>
            <el-form-item label="预警类型" prop="alarmType">
                <div class="selectBox">
                    <el-select v-model="form2.alarmType" placeholder="请选择预警类型" clearable style="width:250px">
                        <el-option style="background: #052243F5;color:#fff"  v-for="dict in typeList" :key="dict.alarmType" :label="dict.name"
                            :value="dict.alarmType" />
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
                        <p>自动训练设置</p>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="tableWrapper">
            <el-table ref="reportTable" class="table-with-header-bg" :data="landList" stripe
                :header-cell-style="{ color: '#99C3F4', fontWeight: '400' }" @selection-change="handleSelectionChange"
                style="width: 100%;">
                <el-table-column type="selection" width="50" />
                <el-table-column label="预警类型" prop="alarmType" :show-overflow-tooltip="true" width="100">
                    <template #default="scope">
                        <span>{{ getAlarmTypeName2(scope.row.alarmType) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="街道" align="center" prop="deviceName">
                    <template #default="scope">
                        <span>{{ scope.row.townName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="摄像头" align="center" prop="deviceName">
                    <template #default="scope">
                        <span>{{ scope.row.deviceName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="预警时间" align="center" prop="alarmTime">
                    <template #default="scope">
                        <span>{{ scope.row.alarmTime}}</span>
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
        </div>
        <div class="box center_box">
            <p class="txt_title">自定义素材</p>
            <upload :limit="25"/><div class="txt_label">(上传误识别素材，可以用于训练，素材格式限定为jpg格式)</div>
            
        </div>
        <div class="box right_box">
            <p class="txt_title">训练模型</p>
            <el-radio-group v-model="formParams.modelType" class="ml-4">
                <el-radio :label="1" size="large">火灾烟雾</el-radio>
                <el-radio :label="2" size="large">工程车辆</el-radio>
            </el-radio-group>
        </div>
        </div>
        <div class="form_box">
            <p>训练备注:</p>
            <el-input v-model="formParams.trainingNotes" style="width: 100%;" :rows="3"  type="textarea" auto-complete="off" ></el-input>
        </div>
        <div class="btnList" style="margin-top: 20px;">
            <div @click="submit" class="btn btn1">
                <p>训练</p>
            </div>
            <div @click="resetForm2" class="btn btn2">
                <p>重置</p>
            </div>
        </div>
        <BaseDialog1 style="z-index: 99999999;" v-show="alarmConfigDialogEdit" @closeDialog="closeDialogHandler"
            :styles="earlyWaringStyles4" title="自动训练设置">
            <template v-slot:content>
                <TrainingSetup  :currRow="currRow"/>
            </template>
        </BaseDialog1>
       
    </div>
    
</template>

<script setup>
import { ref, computed, watch, defineEmits, defineProps, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import $bus from '@/utils/eventBus.js'
import { modelTrainingConfig, alarmConfigList, alarmConfigDel,getAlarmType } from '@/api/camera'
import { alarmListPage } from '@/api/chart'
import BaseDialog1 from '@/components/BaseDialog1'
import TrainingSetup from './TrainingSetup.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import upload from '@/components/uploadFile/index'
const { state, commit } = useStore()                                                                                                                                                                                                                                                                                        
const landList = ref([])
const cameraList = ref([])
const treeData = ref([])
cameraList.value = computed(() => state.cameraData)

const pageParam = ref({
    pageNum: 1,
    pageSize: 10,
})


const form2 = ref({
    alarmType: undefined,
    createTime:undefined,
    deviceSns:[],
})
const reportTable = ref(null);
const resetForm = () => {
    form2.value = {
        alarmType: undefined,
        createTime:undefined,
        deviceSns:[],
    }
    reportTable.value.clearSelection();
    getAlarmListPage();
}

const getAlarmListPage = async () => {
  const res = await alarmListPage(form2.value,pageParam.value)
  const { list, total } = res.data
  landList.value = list
  totalValue.value = total
}
getAlarmListPage();


const props = ref({
    value: 'deviceSn',
    label: 'label',
    children: 'children',
    multiple: true,
    checkStrictly: false,
    emitPath: true,
});



const getAlarmTypeName2 = (val) => {
  const result = typeList.value.find(item => item.alarmType === val);
  return result ? result.name : '暂无数据';
};

const handleChange = (value) => {
    const levelOne = new Set();
    const levelTwo = new Set();
   

    value.forEach((val) => {
        if (val.length === 1) {
            levelOne.add(val[0]);
        } else if (val.length === 2) {
            levelOne.add(val[0]);
            levelTwo.add(val[1]);
        }
    });

    let arr1 = Array.from(levelOne);
    let arr2 = Array.from(levelTwo);
    form2.value.deviceSns = arr2;
};

const filterCamera = () => {
  if (cameraList.value.length === 0) return
  const map = cameraList.value.reduce((acc, obj) => {
    if (!acc[obj.townName]) {
      acc[obj.townName] = []
    }
    acc[obj.townName].push(obj)
    return acc
  }, {})
  const result = Object.values(map).filter(group => group.length > 0)
  treeData.value = []
  result.forEach((item, index) => {
    item.forEach((aItem) => {
      aItem.label = aItem.deviceName
      aItem.type = '摄像头'
    })
    treeData.value.push({
      id: index,
      label: item[0].townName || '未分类',
      type: '街道',
      children: item,
      icon: 'FolderOpened',
    })
  })
}

watch(cameraList.value, (newValue) => {
  if (newValue) {
    cameraList.value = newValue
    filterCamera()
  }
}, { deep: true, immediate: true })


const earlyWaringStyles4 = ref({
    width: '500px',
    height: '400px',
    top: '15%',
    left: '15%',
})

const currRow = ref({});
const alarmConfigDialogEdit = ref(false);

const formParams = ref({
    customImageSource:[],
    modelType:1,
    imageSource:[],
    trainingNotes:null,
});



const search = () => {
    getAlarmListPage();
}
const closeDialogHandler = () => {
    alarmConfigDialogEdit.value = false;
}
const handleCurrentChange = (val) => {
    pageParam.value.pageNum = val
    getAlarmListPage()
}
const handleSizeChange = (val) => {
    pageParam.value.pageSize = val
    getAlarmListPage()
}

const totalValue = ref(0);

const submit = async ()=>{
    const { data, code,msg } = await modelTrainingConfig(formParams.value)
    if (code === '200') {
        ElMessage.success('训练中')
    }else{
        ElMessage.warning(msg)
    }
    resetForm2();
}

const resetForm2 = () =>{
    formParams.value = {
        customImageSource:[],
        modelType:1,
        imageSource:[],
        trainingNotes:null,
    };
    selectIds.value = [];
    resetForm();
    $bus.emit('resetFileIds');
}

const selectIds = ref([]);

const handleSelectionChange = (val) => {
    selectIds.value = [];
    selectIds.value = val.map(item => item.id);
    formParams.value.imageSource = selectIds.value;
}




const addConform = () => {
    alarmConfigDialogEdit.value = true;
}


const getAlarmTypeName = (row) => {
    
    const alarmTypes = row.alarmOtherTypes.split(',');
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

onMounted(() => {
    $bus.on('cameraClick', async (query) => {
        console.log(query.deviceSn, 'queryqueryqueryquery')
    })
    $bus.on('closeDilaogaa', async (query) => {
        alarmConfigDialogEdit.value = false;
    })
    $bus.on('closeConForm', async (query) => {
        alarmConfigDialogEdit.value = false;
        getAlarmListPage();
    })
    $bus.on('closeYj2', async (query) => {
        alarmConfigDialogEdit.value = false;
        getAlarmListPage();
    })
    $bus.on('uploadedFilesIds', async (result) => {
        let fileId = result.map(item=>item.id);
        formParams.value.customImageSource = fileId;
    })
    $bus.on('automaticResult', async (result) => {
        alarmConfigDialogEdit.value = false;
    })
})

</script>

<style lang="less" scoped>
.custom-cascader {
  height: auto !important; /* 自动调整高度 */
  width: 100%;  /* 占满父容器的宽度 */
}
.warpper {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 10;
    background-size: 100% 100%;
    box-sizing: border-box;
    
    .container_box{
        display: flex;
        flex-direction: row;
        gap:30px;
        .box{
            width: 33.33333%;
            height: 600px;
            box-sizing: border-box;
            background: #01152BD6;
            border: 1px solid #2A8DE8C7;
            box-shadow: 0px 0px 21.7px 0px #0B80E396 inset;
            padding: 20px;
            border-radius: 25px;
        }
        .txt_title{
            color: #fff;
            margin-bottom: 10px;
            font-size: 16px;
        }
        .left_box{
            
        }
        .txt_label{
            font-size: 12px;
            color: rgb(190, 26, 26);
        }
    }
   

}

.tableWrapper {
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

        height: 36px;
        background-color: rgba(13, 81, 157, 0.45);
        padding: 0px;
        box-shadow: 0 0 0 1px #0B7FE2 inset;
        color: #fff;
    }

    .el-textarea__inner {
        background-color: rgba(13, 81, 157, 0.45);
        padding: 10px;
        box-shadow: 0 0 0 1px #0B7FE2 inset;
        color: #fff;
        width: 100%;
    }

    .el-input__inner {
        padding: 0 !important;
        height: 36px;
        font-size: 12px !important;
        color: #fff !important;
    }
}

.btnList2 {
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
    margin-bottom: 20px;

    .btn {
        width: 120px;
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

    .el-input__inner {
      height: 36px;
      font-size: 12px;
      border: 10px;
      color: #fff;
      padding: 10px;
    }
    .el-input__prefix-inner{
        padding-left: 10px;
    }

    p {
        font-size: 14px;
        color: #fff;
    }
}

.form_box{
    width: 100%;
    p{
        font-size: 16px;
        margin-top: 10px;
        margin-bottom: 10px;
        color: #fff;
    }
}
.el-radio {
      color: #fff;
  
      .el-radio__inner {
        border: 1px solid #0B80E3;
        width: 14px;
        height: 14px;
        background-color: transparent;
  
        &:after {
          width: 5px;
          height: 5px;
  
          background-color: #0B80E3;
        }
      }
  
    }
</style>
<style scoped>

/deep/ .el-checkbox__label{
  color: #fff;
}

.selectBox2 /deep/ .el-input__wrapper {
 height: auto !important;
 min-height: 36px;
}


.selectBox /deep/ .el-input__inner::-webkit-input-placeholder {
    color: #fff;
}
.selectBox /deep/ .el-input__prefix{
    color: #fff;
}
.selectBox2 /deep/ .el-input__inner::-webkit-input-placeholder {
    color: #fff;
    padding-left: 10px;
}

</style>
