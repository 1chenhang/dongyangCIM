<template>
    <div class="warpper">
        <div class="fullDialog">
            <div class="cameraTypeBox" v-if="isOpenTool">
                <CameraType />
            </div>
            <CameraTool />
            <FullScreen v-show="showMap" />
            <div class="land_list">
                <div class="tableWrapper">
                    <el-table ref="reportTable" height="100%" class="table-with-header-bg" :data="landList" stripe
                    :header-cell-style="{ color: '#99C3F4', fontWeight: '400' }"
                    style="width: 100%;">
                    <el-table-column prop="dkmc" label="地块名称" />
                    <el-table-column prop="village" label="乡镇"/>
                    <el-table-column prop="xzq" label="街道"/>
                    <el-table-column prop="type" label="类型" />
                    <el-table-column prop="type" label="类型" />
                    <el-table-column prop="sskfq" label="所属开发区" />
                    <el-table-column prop="tdyt" label="土地用途" />
                    <el-table-column prop="createTime" label="创建时间" />
                    <el-table-column  label="操作" width="200">
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
                    <el-pagination class="custom-pagination" v-model:current-page="currentPage4" v-model:page-size="pageSize4"
                    :page-sizes="[100, 200, 300, 400]" :small="small" :disabled="disabled"
                    layout="->,total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import CameraTool from './components/cameraTool.vue'
import FullScreen from '@/components/map/fullScreen/index.vue'
import CameraType from '../cameraManagement/CameraType/index.vue'
import { ref, watch, watchEffect, onBeforeUnmount, onMounted } from 'vue'
import { useStore } from 'vuex'
import $bus from '@/utils/eventBus.js'
import mapHelper from '@/utils/mapHelper.js'
import { cameraList, getPreviewUrl, getLandInfoByCamera } from '@/api/camera'
import Tags from '@/components/Tags/index'
const { state, commit } = useStore()
const treeData = ref([])
const cameraData = ref([])
const tabsList = ref([
  {
    id: 1,
    name: '预警信息分析'
  },
  {
    id: 2,
    name: '违法处置分析'
  },
  {
    id: 3,
    name: '监控对象统计分析'
  },
  {
    id: 4,
    name: '视频监控分析'
  }
])
const landList = ref([])
const isaa = ref(false)
const showMap = ref(false)

const componentKey = ref(0)
// const updateKey = () => {
//   // 更新 key 值，触发重新渲染
//   componentKey.value += 1
// }
// 获取摄像头列表
const getCameraList = async () => {
  const { data, code } = await cameraList({})
  if (code === '200') {
    treeData.value.forEach(item => {
      if (item.label === '摄像头') {
        data.forEach(cItem => {
          item.children.push({
            label: cItem.deviceName,
            id: 'camera' + cItem.id,
            type: '摄像头',
            url: cItem.rtspUrl,
            defaultShow: true
          })
        })
      }
    })
    cameraData.value = data
    commit('cameraData', data)
    showMap.value = true
  }
}
getCameraList()
// updateKey()
const getCameraByLand = async (query) => {
  const { data, code } = await getLandInfoByCamera({ deviceSn: query.deviceSn })
  if (code === '200') {
    landList.value = data
    landList.value.forEach(item => { item.check = false })
  }
}

const handleClick = (index, params) => {
  const obj = {
    params: params,
    coords: params?.cameraPresetInfo[0].coords
  }
  console.log(obj, '发送地块信息')
  $bus.emit('landCoordInfo', obj)
}

const isOpenTool = ref(false)
onMounted(() => {
  $bus.on('cameraClick', async (query) => {
    console.log(query.deviceSn, 'queryqueryqueryquery')
    await getCameraByLand(query)
  })

  $bus.on('isOpenToolShow', (val) => {
    isOpenTool.value = val
  })
})

</script>

<style lang="less" scoped>
.warpper {
    width: 100%;
    height: 1000px;
    position: relative;
    z-index: 10;
    background-size: 100% 100%;
    box-sizing: border-box;

    .fullDialog{
        width: 97%;
        height: 800px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        position: relative;
        overflow: hidden;
        overflow-y: scroll;
    }
    .land_list{
        margin-top: 150px;
    }

}
.cameraTypeBox{
    position: absolute;
    left: 30px;
    top: 20%;
    width: 350px;
    height: 400px;
    overflow: hidden;
    overflow-y: scroll;
    z-index: 9999999;
    background-image: url('../../../public/image/homePage/弹框_bg.png');
    background-size: cover;
    padding-top: 60px;
    padding-left: 10px;
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
