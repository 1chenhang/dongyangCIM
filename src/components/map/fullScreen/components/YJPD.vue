<template>
  <div class="warpper">
    <el-form ref="phoneDataRef" label-width="auto" class="login-form" :inline="true" status-icon :model="form">
          <el-row>
              <el-col :span="24">
                  <el-form-item label="类型设置">
                      <el-radio-group v-model="radio1" @change="changeRadioHandler">
                          <el-radio label="1">全自动取证</el-radio>
                          <el-radio label="2">重点取证</el-radio>
                      </el-radio-group>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row v-if="radio1 === '2'">
              <el-col :span="24">
                <el-form-item label="摄像头名称" prop="deviceName">
                    <el-input v-model="form.deviceName" placeholder="请输入" style="width:200px" />
                  </el-form-item>
                <el-form-item label="查询IP" prop="deviceIp">
                  <el-input v-model="form.deviceIp" placeholder="请输入" style="width:200px" />
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
              </el-col>
          </el-row>
          <el-row :gutter="10" class="mb8" v-if="radio1 === '2'">
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
      </el-form>
    

    <div class="tableWrapper" v-if="radio1 === '2'">
      <el-table ref="reportTable" height="500" class="table-with-header-bg" :data="landList" stripe
        :header-cell-style="{ color: '#99C3F4', fontWeight: '400' }" @selection-change="handleSelectionChange"
        style="width: 100%;height: 350px;overflow: hidden;overflow-y: scroll;">
        <el-table-column type="selection" width="55" />
        <el-table-column label="设备名称" prop="deviceName" />
        <el-table-column label="设备序列号" prop="deviceSn" align="center" :show-overflow-tooltip="true" width="150">
        </el-table-column>
        <el-table-column label="摄像头IP" prop="deviceIp" align="center"/>
        <el-table-column label="时间" align="center" prop="createTime"></el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleClick(scope.row,false)">
              修改
            </el-button>
            <el-button style="color:rgb(221, 28, 28)" link type="primary" size="small" @click="deleteItem(scope.row)">
              删除
            </el-button>
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
    <div class="btnList" style="">
      <div @click="submitForm" class="btn btn1">
        <p>确定</p>
      </div>
      <div @click="close" class="btn btn2">
        <p>取消</p>
      </div>
    </div>

    <BaseDialog1 style="z-index: 9999;" v-show="alarmConfigDialogEdit" @closeDialog="closeDialogHandler"
      :styles="earlyWaringStyles4" :title="isEdit ? '修改配置' : '新增配置'">
      <template v-slot:content>
        <YJPDForm :currRow="currRow" />
      </template>
    </BaseDialog1>
  </div>

</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, defineProps, toRefs, watch, defineEmits,onUnmounted,onMounted} from 'vue'
import { forensicConfiglistPage,setForensicType,forensicConfigDel,getForensicType } from '@/api/camera'
import $bus from '@/utils/eventBus.js'
import YJPDForm from './YJPDForm.vue'
import BaseDialog1 from '@/components/BaseDialog1'
import { useStore } from 'vuex'
const { state } = useStore()
const cameraList = ref([])
const props = defineProps({
})
const earlyWaringStyles4 = ref({
  width: '1000px',
  top: '20%',
  left: '20%',
})

const form = ref({
  deviceName:undefined,
  deviceIp:undefined,
})

const currRow = ref({});
const { analySisData,islook } = toRefs(props)
const emit = defineEmits(['closeYj'])
const radio1 = ref('2')
const totalValue = ref(0);
const landList = ref([
])

const alarmConfigDialogEdit = ref(false);
const changeRadioHandler = async (val) =>{
}

const getForensicTypeData = async () =>{
  let {data} = await getForensicType({});
  radio1.value = data.forensicType;
}
const close = () =>{
  emit('closeYj');
}
const submitForm = async () =>{
  let {code} = await setForensicType({forensicType:radio1.value})
  if(code === '200'){
    ElMessage.success('操作成功')
  }
  close();
}
getForensicTypeData();
const pageParam = ref({
  pageNum: 1,
  pageSize: 10,
})

const resetForm = () => {
  form.value = {
    deviceName:undefined,
    deviceIp:undefined,
  }
  getForensicConfiglistPage();
}


// 获取取证配置信息
const getForensicConfiglistPage = async () => {
  let { data, code } = await forensicConfiglistPage(form.value, pageParam.value);
  if (code === '200') {
    landList.value = data.list;
    totalValue.value = data.total;
  }
}
getForensicConfiglistPage();
const handleClick = (row) => {
  alarmConfigDialogEdit.value = true;
  $bus.emit('currowData', row);
}


const handleCurrentChange = (val) => {
  pageParam.pageNum = val;
  getForensicConfiglistPage();
}
const handleSizeChange = (val) => {
  pageParam.pageSize = val;
  getForensicConfiglistPage();
}

const search = () => {
  getForensicConfiglistPage();
}
const selectIds = ref([]);
const handleSelectionChange = (val) => {
    selectIds.value = [];
    selectIds.value = val.map(item => item.id);
}

const isEdit = ref(true);
const addConform = () => {
    alarmConfigDialogEdit.value = true;
    isEdit.value = false;
}

const deleteItem = (row) =>{
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
            let res = await forensicConfigDel([row.id]);
            if (res.code === '200') {
                ElMessage.success('删除成功')
            }
            getForensicConfiglistPage();
            selectIds.value = [];
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
            getForensicConfiglistPage();
            selectIds.value = [];
        })
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
            let res = await forensicConfigDel(selectIds.value);
            if (res.code === '200') {
                ElMessage.success('删除成功')
            }
            getForensicConfiglistPage();
            selectIds.value = [];
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
            getForensicConfiglistPage();
            selectIds.value = [];
        })



}

const closeDialogHandler = () => {
  alarmConfigDialogEdit.value = false;
  $bus.emit('closeDialogResetForm');
}
onMounted(()=>{
  cameraList.value = state.cameraData;
  $bus.on('closeYjpdFormDialog',() => {
    alarmConfigDialogEdit.value = false;
    getForensicConfiglistPage();
  })
})
onUnmounted(() => {
  $bus.off('closeYjpdDialog')
})
</script>

<style lang="less" scoped>
::v-deep.warpper {
  //height: 600px;
  overflow: hidden;
  overflow-y: scroll;
  padding: 20px 30px;
  .el-form-item__label{
    color: #fff;
  }
  .check_box{
    display: flex;
  }
  .el-radio__label{
    color:#fff;
  }
}
</style>


<style lang="less" scoped>

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
    line-height: 35px !important;
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

  .el-date-editor {
    color: #fff;
  }

  .el-date-editor .el-range__icon {
    margin-left: 10px;
    color: #fff;
  }

  .el-range-editor--small .el-range-input {
    color: #fff;
  }
}
</style>