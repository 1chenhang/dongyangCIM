<template>
  <div class="tableWrapper">
    <el-table ref="reportTable" height="175" class="table-with-header-bg" :data="tableList" stripe
      :header-cell-style="{ backgroundImage: 'url(./image/platformOverview/tableHeaderBg.png)', color: '#99C3F4', fontWeight: '400' }"
      style="width: 100%;">
      <el-table-column prop="deviceName" label="摄像头名称" />
      <el-table-column prop="alarmContent" label="违法类型"  />
      <el-table-column prop="handleStatue" label="状态" width="80">
        <template v-slot="{ row }">
          <span class="green" v-if="row.handleStatue === 2">已处理</span>
          <span class="red" v-if="row.handleStatue === 0">未处理</span>
          <span class="orange" v-if="row.handleStatue === 1">处理中</span>
        </template>
      </el-table-column>
      <el-table-column  label="操作" width="80">
          <template #default="scope">
              <el-button v-if="scope.row.handleStatue !== 2" link type="primary" size="small" @click="handleClick(scope.row)">
              处理
              </el-button>
          </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script setup>
import { ref, onMounted,nextTick } from 'vue'
import { alarmListPage } from '@/api/chart'
import { useRouter } from 'vue-router'
import $bus from '@/utils/eventBus.js'
const Router = useRouter()
const reportTable = ref()
const tableList = ref([]);
const pageParam = ref({
  pageNum:1,
  pageSize:10,
})
const handleClick = async (row) =>{
  Router.push({
    path: '/earlyWarningAnalysis',
    query: row
  })  
}
const getAlarmListPage = async ()=>{
  let res = await alarmListPage({},pageParam.value);
  let {list,total} = res.data;
  tableList.value = list;
}

getAlarmListPage();

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
  margin-top: 17px;
}

::v-deep.el-table {
  .el-table__cell {
    padding: 5px;
  }
}

.el-table {

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

::v-deep .el-table--enable-row-transition,
.el-table .cell {
  background-color: transparent;
}

::v-deep.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: #1c252d;
}

::v-deep.el-table th.el-table__cell {
  background-color: transparent;
}

::v-deep.el-table tr {
  background: #04264E85;
}

::v-deep.el-table td.el-table__cell,
::v-deep.el-table th.el-table__cell.is-leaf {
  border: none;
}

::v-deep .el-table__inner-wrapper::before {
  z-index: 0;
  height: 0 !important;
}

.green {
  color: #5EFE6E;
}

.orange{
  color:orange;
}
.red {
  color: #881515;
}
</style>
