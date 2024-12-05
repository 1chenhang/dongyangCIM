<template>
  <div class="tableWrapper">
    <div class="input_box">        
        <div class="searchBox">
            <el-select v-model="selectArea" multiple placeholder="请选择/支持多选" @change="changeSelect" clearable style="width:420px">
                <el-option style="background: #052243F5;color:#fff"  v-for="dict in areaOptions" :key="dict.value" :label="dict.label"
                    :value="dict.label" />
            </el-select>
        </div>
    </div>
    <el-table ref="reportTable" height="100%" class="table-with-header-bg" :data="tableData" stripe
      :header-cell-style="{ backgroundImage: 'url(./image/supervisingAnalysis/tableBg.png)', color: '#99C3F4', fontWeight: '400' }"
      style="width: 100%;">
      <el-table-column prop="alarmContent" label="预警内容" />
      <el-table-column prop="dkmc" label="地块名称" />
      <el-table-column prop="deviceName" label="摄像头" />
      <el-table-column prop="status" label="预警状态">
        <template v-slot="{ row }">
          <span class="red" v-if="row.handleStatue === 0">未处理</span>
          <span class="orange"   v-if="row.handleStatue === 1">处理中</span>
          <span class="green"   v-if="row.handleStatue === 2">已处理</span>
        </template>
      </el-table-column>
      <el-table-column prop="alarmTime" label="预警时间" />
      <el-table-column prop="townName" label="预警街道" />
    </el-table>
  </div>
  <div class="pagination">
    <el-pagination class="custom-pagination" v-model:current-page="currentPage4" v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]" :small="small" :disabled="disabled"
      layout="->,total, sizes, prev, pager, next, jumper" :total="totalValue" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { alarmListPage } from '@/api/chart'
const currentPage4 = ref(4)
const pageSize4 = ref(100)
const small = ref(false)
const disabled = ref(false)

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

const tableData = ref([])
const totalValue = ref();

const reportTable = ref()

const handleCurrentChange = (val) => {
  pageParam.value.pageNum = val
  getAlarmListPage()
}
let circleDiffusion
const handleSizeChange = (val) => {
  pageParam.value.pageSize = val
  getAlarmListPage()
}

const changeSelect = (val) =>{
  earlyWaringQuery.value.townNames = val;
  getAlarmListPage();
}

const selectArea = ref();
const earlyWaringQuery = ref({
  townNames:[],
})

const pageParam = ref({
  pageNum: 1,
  pageSize: 10
})
const getAlarmListPage = async () => {
  const res = await alarmListPage(earlyWaringQuery.value, pageParam.value)
  const { list, total } = res.data
  tableData.value = list
  totalValue.value = total
}

getAlarmListPage()
onMounted(() => {
  scrollUp(reportTable.value)
})
const scrollUp = (tableRef) => {
  const demo = tableRef.$refs.bodyWrapper.getElementsByClassName('el-scrollbar__wrap')[0]
  const tableScroll = ref(true)
  demo.addEventListener('mouseover', () => {
    tableScroll.value = false
  })
  demo.addEventListener('mouseout', () => {
    tableScroll.value = true
  })
  setInterval(() => {
    if (tableScroll.value) {
      demo.scrollTop += 1
      if (demo.clientHeight + demo.scrollTop === demo.scrollHeight) {
        demo.scrollTop = 0
      }
    }
  }, 100)
}

</script>

<style lang="less" scoped>
.tableWrapper {
  height: 156px;
  box-sizing: border-box;
}

.pagination {
  margin: 20px;
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
  background-color: transparent !important;
}

::v-deep .el-table__row {
  height: 36px;
  /* 你想要的行高 */
}

::v-deep .el-table--enable-row-transition,
.el-table .cell {
  background-color: transparent;
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

.green {
  color: #5EFE6E;
}

.red {
  color: #FE685E;
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

::v-deep .el-select {
  border: 1px solid #0674C1;
  border-radius: 5px;
}

::v-deep .el-select__wrapper {
  box-shadow: 0 0 0 0px;
}

::v-deep .el-pagination__jump {
  color: #fff;
}

::v-deep .el-input {
  border: 1px solid #0674C1;
  border-radius: 5px;
}

::v-deep .el-input__inner {
  color: #fff;
}

::v-deep .el-input__wrapper {
  box-shadow: 0 0 0 0px;
}
.green{
  color: #5EFE6E;
}
.red{
  color: red;
}
.orange{
  color: orange;
}

::v-deep .searchBox {
margin-bottom: 18px;
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
