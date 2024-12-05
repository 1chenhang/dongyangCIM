<template>
  <div class="tableWrapper">
    <el-table ref="reportTable" height="100%" class="table-with-header-bg" :data="tableData" stripe
      :header-cell-style="{ backgroundImage: 'url(./image/supervisingAnalysis/tableBg.png)', color: '#99C3F4', fontWeight: '400' }"
      style="width: 100%;">
      <el-table-column label="编号" width="110px">
        <template v-slot="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="date" label="预警时间" width="170" />
      <el-table-column prop="name" label="执法结果" width="140" />
      <el-table-column prop="address" label="状态">
        <template v-slot="{ row }">
          <span class="green" v-if="row.address === '已处理'">正常</span>
          <span class="red" v-else>异常</span>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
const tableData = ref([
  {
    date: '2024-04-28 10:20:42',
    name: '已解决',
    address: '已处理'
  },
  {
    date: '2024-04-28 10:20:42',
    name: '未解决',
    address: '未解决'
  },
  {
    date: '2024-04-28 10:20:42',
    name: '已解决',
    address: '已处理'
  },
  {
    date: '2024-04-28 10:20:42',
    name: '已解决',
    address: '已处理'
  },
  {
    date: '2024-04-28 10:20:42',
    name: '已解决',
    address: '已处理'
  },
  {
    date: '2024-04-28 10:20:42',
    name: '已解决',
    address: '已处理'
  },
  {
    date: '2024-04-28 10:20:42',
    name: '已解决',
    address: '已处理'
  },
  {
    date: '2024-04-28 10:20:42',
    name: '已解决',
    address: '已处理'
  },
  {
    date: '2024-04-28 10:20:42',
    name: '已解决',
    address: '已处理'
  }
])
const reportTable = ref()
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
  padding: 10px 28px 0;
  height: 250px;
  box-sizing: border-box;
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
</style>
