<template>
    <div class="land_list">
        <div class="tableWrapper">
            <el-table ref="reportTable" height="100%" class="table-with-header-bg" :data="landList" stripe
                :header-cell-style="{ color: '#99C3F4', fontWeight: '400' }" style="width: 100%;">
                <el-table-column width="300" prop="dkmc" label="地块名称" />
                <el-table-column width="80" prop="village" label="乡镇" />
                <el-table-column width="100" prop="xzq" label="街道" />
                <el-table-column width="200" prop="type" label="类型" />
                <el-table-column  width="350" prop="sskfq" label="所属开发区" />
                <el-table-column prop="tdyt" label="土地用途" />
                <el-table-column prop="createTime" label="创建时间" />
                <el-table-column label="操作" width="200">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="handleClick(scope.$index, scope.row)">
                            查看地块
                        </el-button>
                        <el-button link type="primary" size="small" @click="handleClick(scope.$index, scope.row)">
                            隐藏地块
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination class="custom-pagination" v-model:current-page="paginationParams.pageNum" v-model:page-size="paginationParams.pageSize"
                :page-sizes="[100, 200, 300, 400]"
                layout="->,total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup>
import $bus from '@/utils/eventBus.js'
import { ref, watch, nextTick, inject } from 'vue'
import { getLandInfoByCamera } from '@/api/camera'
const paginationParams = ref({
  pageNum: 1,
  pageSize: 10
})
const cameraFullScreenObj = inject('cameraFullScreenObj')
const landList = ref([])
const cameraObj = ref({})
const handleSizeChange = () => {}
const handleCurrentChange = () => {}
const handleClick = (index, params) => {
  const obj = {
    params: params,
    coords: params?.cameraPresetInfo[0].coords
  }
  $bus.emit('landCoordInfo', obj)
  $bus.emit('screenFLag',
    {
      cameraFullScreenObj: cameraObj.value,
      fullCanvasLine: obj,
      screenFLag: true
    }
  )
}
const getCameraByLand = async (query) => {
  const { data, code } = await getLandInfoByCamera({ deviceSn: query.deviceSn })
  if (code === '200') {
    landList.value = data
    landList.value.forEach(item => { item.check = false })
  }
}
watch(cameraFullScreenObj, (newValue) => {
  nextTick(async () => {
    cameraObj.value = newValue
    await getCameraByLand(newValue)
  })
}, { deep: true, immediate: true })
</script>

<style lang="less" scoped>
.land_list {
    margin-top: 20px;
}

div::-webkit-scrollbar {
    width: 4px;
}

div::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    opacity: 0.2;
    background: #6DE8F2;
    height: 100px;
}

div::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
}

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
</style>
