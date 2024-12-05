<template>
  <div class="warpper">
    <el-form :model="form2" ref="queryForm" size="small" :inline="true">
      <el-form-item label="查关键字" prop="keyword">
        <el-input v-model="form2.keyword" placeholder="请输入" style="width:300px" />
      </el-form-item>
      <el-form-item label="预警时间" prop="alarmTime">
        <div class="selectBox">
          <el-date-picker v-model="value2" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期"
            value-format="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss" @change="dateChange"
            style="width:300px;height: 35px;" />
        </div>
      </el-form-item>
      <el-form-item label="摄像头名称" prop="deviceName">
        <el-input v-model="form2.deviceName" placeholder="请输入" style="width:300px" />
      </el-form-item>
      <el-form-item label="摄像头IP" prop="deviceIp">
        <el-input v-model="form2.deviceIp" placeholder="请输入" style="width:300px" />
      </el-form-item>
      <el-form-item label="预警类型" prop="brandName">
        <div class="selectBox">
          <el-select v-model="form2.alarmOtherType" placeholder="请选择预警类型" clearable style="width:300px">
            <el-option style="background: #052243F5;color:#fff" v-for="dict in typeList" :key="dict.alarmType"
              :label="dict.name" :value="dict.alarmType" />
          </el-select>
        </div>
      </el-form-item>

      <el-form-item label="事件状态" prop="deviceAddress">
        <div class="selectBox">
          <el-select v-model="form2.handleStatue" placeholder="请选择" clearable style="width:300px">
            <el-option style="background: #052243F5;color:#fff" v-for="item in statusOptions" :key="item.value"
              :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </el-form-item>
      <!-- <el-form-item label="预警种类" prop="deviceAddress">
        <div class="selectBox">
          <el-select v-model="form2.landType" placeholder="请选择" clearable style="width:300px">
            <el-option style="background: #052243F5;color:#fff" v-for="dict in landTypeOptions" :key="dict.value"
              :label="dict.label" :value="dict.value" />
          </el-select>
        </div>
      </el-form-item> -->
      <el-form-item>
        <div class="btnList">
          <div @click="search" class="btn btn1">
            <p>查询</p>
          </div>
          <div @click="resetForm" class="btn btn2">
            <p>重置</p>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <div class="tableWrapper">
      <el-table ref="reportTable" height="500" class="table-with-header-bg" :data="landList" stripe
        :header-cell-style="{ color: '#99C3F4', fontWeight: '400' }" @selection-change="handleSelectionChange"
        style="width: 100%;">
        <el-table-column type="selection" width="55" />
        <el-table-column label="图片显示" prop="alarmType" align="center" :show-overflow-tooltip="true" width="150">
          <template #default="scope">
            <el-image :src="getUrl(scope.row)[0].url" style="height: 100%;object-fit: cover;"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="预警类型" prop="alarmType" align="center" :show-overflow-tooltip="true" width="150">
          <template #default="scope">
            <span>{{ getAlarmTypeName(scope.row.alarmType) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="预警种类" prop="alarmContent" align="center"></el-table-column>
        <el-table-column label="摄像头名称" prop="deviceName" align="center" />
        <el-table-column label="街道" prop="townName" align="center" />
        <el-table-column label="时间" align="center" prop="alarmTime"></el-table-column>
        <el-table-column label="事件状态" prop="handleStatue" width="100" align="center">
          <template #default="scope">
            <el-button v-if="scope.row.handleStatue == 0" type="danger">未处理</el-button>
            <el-button v-if="scope.row.handleStatue == 1" type="warning">处理中</el-button>
            <el-button v-if="scope.row.handleStatue == 2" type="success">已处理</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleClick(scope.row)">
              查看详情
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
    <BaseDialog1 style="z-index: 9999;" v-show="alarmConfigDialogEdit" @closeDialog="closeDialogHandler"
      :styles="earlyWaringStyles4" :title="'查看详情'">
      <template v-slot:content>
        <AlarmConForm :currRow="currRow" />
      </template>
    </BaseDialog1>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect, onBeforeUnmount, onMounted } from 'vue'
import { useStore } from 'vuex'
import $bus from '@/utils/eventBus.js'
import { alarmConfigEdit, alarmConfigList, alarmConfigDel, getAlarmType } from '@/api/camera'
import { alarmListPage } from '@/api/chart'
import BaseDialog1 from '@/components/BaseDialog1'
import AlarmConForm from './components/AlarmConForm.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import htmlDocx from 'html-docx-js/dist/html-docx'

const landList = ref([])
const form2 = ref({
  alarmOtherType: undefined,
  landType: undefined,
  ssjd: undefined,
  gjzValue: undefined,
  alarmTime: undefined,
  handleStatue: undefined,
  keyword: undefined,
  deviceName: undefined,
  alarmTimeStart: '',
  alarmTimeEnd: '',
  deviceIp: undefined,
})

const dateChange = (val) => {
  form2.value.alarmTimeStart = val[0];
  form2.value.alarmTimeEnd = val[1];
};
const earlyWaringStyles4 = ref({
  width: '1000px',
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
const statusOptions = ([
  { label: '未处理', value: 0 },
  { label: '处理中', value: 1 },
  { label: '已处理', value: 2 },
])
const sjjgOptions = ([
  { label: '7天', value: 1 },
  { label: '30天', value: 2 },
  { label: '60天', value: 3 },
  { label: '90天', value: 4 },
  { label: '从不', value: 5 },
])
const pageParam = ref({
  pageNum: 1,
  pageSize: 10,
})

const resetForm = () => {
  form2.value = {
    alarmOtherType: undefined,
    landType: undefined,
  }
  value2.value = [];
  getAlarmConfigList();
}
const search = () => {
  getAlarmConfigList();
}
const totalValue = ref(0);
// 获取预警配置信息
const getAlarmConfigList = async () => {
  let { data, code } = await alarmListPage(form2.value, pageParam.value);
  if (code === '200') {
    landList.value = data.list;
    totalValue.value = data.total;
  }
}
const value2 = ref([]);
const selectIds = ref([]);

const handleSelectionChange = (val) => {
  selectIds.value = [];
  selectIds.value = val.map(item => item.id);
}


getAlarmConfigList();





const typeList = ref([]);
//获取预警类型
const getAlarmTypeList = async () => {
  let res = await getAlarmType({});
  typeList.value = res.data;
}
getAlarmTypeList();
const getAlarmTypeName = (val) => {
  const result = typeList.value.find(item => item.alarmType === val);
  return result ? result.name : '暂无数据';
};
const handleClick = (row) => {
  alarmConfigDialogEdit.value = true;
  currRow.value = row;
  $bus.emit('currowData', row);
}
const getBase64FromUrl = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

const getUrl = (val) => {
  let photoUrl = [];
  if (val.alarmImageUrl) {
    let str = val.alarmImageUrl.split(',');
    str.forEach(item => {
      let obj = {
        url: ''
      }
      obj.url = 'api/ftpFile/download?path=' + item;
      photoUrl.push(obj);
    });
  }
  console.log(photoUrl,'photoUrlphotoUrl')
  return photoUrl
}

const closeDialogHandler = () => {
  alarmConfigDialogEdit.value = false;
}
const handleCurrentChange = (val) => {
  pageParam.pageNum = val;
  getAlarmConfigList();
}
const handleSizeChange = (val) => {
  pageParam.pageSize = val;
  getAlarmConfigList();
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
  position: relative;
  z-index: 10;
  width: 95%;
  height: 80%;
  margin: 0 auto;
  margin: 8% auto auto auto;
  padding: 35px 40px 40px 20px;
  box-sizing: border-box;
  background: #01152BD6;
  border: 1px solid #2A8DE8C7;
  box-shadow: 0px 0px 21.7px 0px #0B80E396 inset;
  overflow-y: auto;

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
