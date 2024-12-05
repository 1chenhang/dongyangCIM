<template>
  <div class="tableWrapper">
    <div class="flexBoxTop">
      <div class="firstBox mr65">
        <div class="logo">
          <img class="icon" src="../../../../public/image/earlyWarningAnalysis/lsyj__icon.png" alt="">
        </div>
        <div class="numBox">
          <p class="text">历史预警数量</p>
          <p class="num num1">{{ historyData.historyWarnCount }}<span>个</span></p>
        </div>
      </div>
      <div class="firstBox">
        <div class="logo">
          <img class="icon" src="../../../../public/image/earlyWarningAnalysis/dtyjIcon.png" alt="">
        </div>
        <div class="numBox">
          <p class="text">当天预警数量</p>
          <p class="num num2">{{ historyData.todayWarnCount }}<span>个</span></p>
        </div>
      </div>
    </div>
    <!-- <div class="tabBox">
      <img class="tabTip tabLeft" :src="require('/public/image/earlyWarningInterpretation/tabTip.png')" alt="">
      <img class="tabTip tabRight" :src="require('/public/image/earlyWarningInterpretation/tabTip.png')" alt="">
      <ul class="flexBox">
        <li @click="tabClick(item.value)" v-for="item in tabs" :key="item.label"
          :class="['tabs', isTabActive === item.value ? 'tabActive' : '']">{{ item.label }}
        </li>
      </ul>

    </div> -->
    <div class="selBox">
      <el-input :prefix-icon="Search" @change="changeInput"  style="margin-bottom: 10px;" v-model="earlyWaringQuery.keyword"  auto-complete="off" :disabled="islook"></el-input>
      <el-date-picker v-model="value1"  value-format="YYYY-MM-DD HH:mm:ss" type="datetimerange" range-separator="至" start-placeholder="开始日期"
        end-placeholder="结束日期" @change="dateChange" clearable />
    </div>
    <div class="camera_List">
      <div @click="tableClick(item)" :class="['camera_Item', earlyWaringQuery.id === item.id ? 'tableActive' : '']"
        v-for="item in tableList" :key="item.camera">
        <div class="item_title">

          <span>{{
            item.alarmContent }}</span>
        </div>
        <div class="item_content">
          <div class="textBox"><span class="camera_label">街道：</span>
            <div class="camera_value">{{ item.townName }}</div>
          </div>
          <div class="textBox"><span class="camera_label">地块名称：</span>
            <div class="camera_value">{{ item.dkmc }}</div>
          </div>
          <div class="textBox"><span class="camera_label">摄像头：</span>
            <div class="camera_value">{{ item.deviceName }}</div>
          </div>
          <div class="textBox"><span class="camera_label">时间：</span>
            <div class="camera_value">{{ item.alarmTime
              }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination class="custom-pagination" v-model:current-page="pageParam.pageNum" v-model:page-size="pageParam.pageSize"
        :page-sizes="[10, 20, 300, 400]" :small="small"
        layout="total, prev, pager, next" :total="totalValue" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup>
import { Calendar, Search } from '@element-plus/icons-vue'
import { ref, onMounted, onUnmounted,watch,toRefs,nextTick } from 'vue'
import { alarmListPage } from '@/api/chart'
import $bus from '@/utils/eventBus.js'
import CircleDiffusion from '@/utils/diffuse.js'
import { computeCentroid } from '@/utils/utils'
import mapHelper from '@/utils/mapHelper'
import { ElMessage, ElLoading } from 'element-plus'
import { getLandInfoByCamera, updateReadStatus, getAlarmType, getStatisticsHistory,getPTZGoTo } from '@/api/camera'
import { useRoute } from 'vue-router'
const route = useRoute()
const value1 = ref('')
const totalValue = ref()
const small = ref(false)
const loading = ref()
const yjlxOptions = ref([])
const {query} = toRefs(route)

const earlyWaringQuery = ref(
  {
    handleStatue: 0,
    id: null,
    keyword: undefined,
    alarmTimeStart: undefined,
    alarmTimeEnd: undefined

  }
)

watch(query, async (newValue, oldValue) => {
    if(newValue.handleStatue){
      earlyWaringQuery.value.handleStatue = newValue.handleStatue;
      
      nextTick(()=>{
        isTabActive.value = Number(newValue.handleStatue);
      })
      getAlarmListPage()
    }
    if(newValue.id){
      earlyWaringQuery.value.id = newValue.id
      let res = await updateReadStatus({id:Number(newValue.id)});
      if(res.code === '200'){
        $bus.emit('closeEarlyMessageDilog2')
      }
    }
    
}, { deep: true ,immediate:true});


const handleCurrentChange = (val) => {
  pageParam.value.pageNum = val
  getAlarmListPage()
}
let circleDiffusion
const handleSizeChange = (val) => {
  pageParam.value.pageSize = val
  getAlarmListPage()
}
const isTabActive = ref(0)
const tabs = ref([
  {
    label: '未处理',
    value: 0
  },
  {
    label: '处理中',
    value: 1
  },
  {
    label: '已处理',
    value: 2
  }
])
const tableList = ref([
  {
    title: '发现吊车',
    address: '江北街道',
    camera: '东阳塘下前基站',
    dateTime: '2022-03-11 11:04:19',
    status: 1,
    id: 1
  },
  {
    title: '发现山火',
    address: '江北街道',
    camera: '东阳塘下前基站',
    dateTime: '2022-03-11 11:04:19',
    status: 2,
    id: 2
  },
  {
    title: '发现吊车',
    address: '江北街道',
    camera: '东阳塘下前基站',
    dateTime: '2022-03-11 11:04:19',
    status: 1,
    id: 3
  },
  {
    title: '发现吊车',
    address: '江北街道',
    camera: '东阳塘下前基站',
    dateTime: '2022-03-11 11:04:19',
    status: 1,
    id: 4
  },
  {
    title: '发现吊车',
    address: '江北街道',
    camera: '东阳塘下前基站',
    dateTime: '2022-03-11 11:04:19',
    status: 1,
    id: 5
  },
  {
    title: '发现吊车',
    address: '江北街道',
    camera: '东阳塘下前基站',
    dateTime: '2022-03-11 11:04:19',
    status: 1,
    id: 6
  }
])
const historyData = ref({})

// loading.value = ElLoading.service({
//   lock: true,
//   text: 'Loading',
//   background: 'rgba(0, 0, 0, 0.4)'
// })
// 获取预警类型
const getAlarmTypeList = async () => {
  const res = await getAlarmType({})
  yjlxOptions.value = res.data
  loading.value.close()
}
// 获取历史告警数量
const getStatisticsHistoryData = async () => {
  const res = await getStatisticsHistory({})
  historyData.value = res.data
}

getAlarmTypeList()
getStatisticsHistoryData()
const dateChange = (val) => {
  if (val) {
    earlyWaringQuery.value.alarmTimeStart = val[0]
    earlyWaringQuery.value.alarmTimeEnd = val[1]
  } else {
    earlyWaringQuery.value.alarmTimeStart = undefined
    earlyWaringQuery.value.alarmTimeEnd = undefined
  }
  getAlarmListPage()
}


const pageParam = ref({
  pageNum: 1,
  pageSize: 10
})
const landList = ref([])
const tableClick = async (param) => {
  // $bus.emit('analySisData', param)
  // if(param.dyDevice){
  //   param.dyDevice.type = '摄像头';
  //   $bus.emit('cameraClick', param.dyDevice)
  //   circleDiffusion = new CircleDiffusion(viewer, 'circle')
  //   clearAllEntity()
  //   console.log( param.dyDevice,' param.dyDevice param.dyDevice')
  //   await getCameraByLand(param.dyDevice)
  //   if (landList.value.length < 1) return
  //   const alt = 850
  //   const pitch = -48.71178972027612
  //   const centerPosition = [+param.dyDevice.lon, +param.dyDevice.lat]
  //   const newLat = mapHelper.getOffsetLat({ lat: +param.dyDevice.lat, alt: alt, pitch: pitch })
  //   setTimeout(() => {
  //     mapHelper.flyToByCameraInfo([+param.dyDevice.lon, newLat, alt, 354.6525606791816, pitch, 0], function () {
  //       mapHelper.addRadarScan(centerPosition, '地块搜索', 200.0)
  //       setTimeout(() => {
  //         mapHelper.clearRadarScan()
  //         const landCenterPosition = []
  //         landList.value.forEach(item => {
  //           const dataSource = viewer.dataSources.getByName(item.type)[0]
  //           const entity = dataSource.entities.getById(item.featureId)
  //           const landPositionList = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions
  //           const landLonLat = computeCentroid(landPositionList)
  //           circleDiffusion.add([landLonLat[0], landLonLat[1], 50], 'red', 50, 500)
  //           landCenterPosition.push(landLonLat)
  //           entity.show = true
  //         })
  //         mapHelper.parabolaFlowInit(viewer, 3, centerPosition, landCenterPosition)
  //         const lat2 = mapHelper.getOffsetLat({ lat: +param.dyDevice.lat, alt: 2166, pitch: -22.142152521798398 })
  //         mapHelper.flyToByCameraInfo([+param.dyDevice.lon, lat2, 2166, 358.95124797211355, -22.142152521798398, 0])
  //       }, 2000)
  //     })
  //   }, 4000)
  // }
  $bus.emit('analySisData', param)
  param.dyDevice.type = '摄像头'
  $bus.emit('cameraClick2', param.dyDevice)
  clearAllEntity()
  const alt = 1050
  const pitch = -28.71178972027612
  if (!param.landType) {
    $bus.emit('cameraClick', param.dyDevice)
  }
  console.log(param,'paramparamparam')
  await getPTZGoTo({
    deviceSn: param.dyDevice.deviceSn,
    pan: param.pan,
    tilt: param.tilt,
    zoom: param.zoom
  })
  // 当地块显示时，添加呼吸效果
  const dataSource = viewer.dataSources.getByName(param.landType)[0]
  const entity = dataSource.entities.getById(param.featureId)
  console.log(entity, 'entityentityentityentity')
  const landPositionList = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions
  const landLonLat = computeCentroid(landPositionList)
  entity.show = true
  mapHelper.flyToByLonLat(landLonLat[0], landLonLat[1], alt)
  if (entity && entity.polygon) {
    mapHelper.addBreathingEffect(entity)
  }
}

const clearAllEntity = () => {
  mapHelper.clearFlowInit()
  mapHelper.clearRadarScan()
  mapHelper.clearAllLand(viewer)
  // circleDiffusion.clear()
}

const getCameraByLand = async (query) => {
  const { data, code } = await getLandInfoByCamera({ deviceSn: query.deviceSn })
  if (code === '200') {
    landList.value = data
    landList.value.forEach(item => { item.check = false })
  }
}

const tabClick = (value) => {
  isTabActive.value = value
  earlyWaringQuery.value.handleStatue = value
  getAlarmListPage()
  $bus.emit('earlyHandleStatue', value)
}

const changeInput = () => {
  getAlarmListPage()
}
const getAlarmListPage = async () => {
  const res = await alarmListPage(earlyWaringQuery.value, pageParam.value)
  const { list, total } = res.data
  tableList.value = list
  totalValue.value = total
}

getAlarmListPage()
onMounted(() => {
  $bus.on('getEarlyList', () => {
    getAlarmListPage()
  })
})
onUnmounted(() => {
  $bus.off('getEarlyList')
  $bus.off('analySisData')
  if (viewer) clearAllEntity()
})
</script>

<style lang="less" scoped>
/deep/ .el-input__wrapper {
    width: 250px;
    box-sizing: border-box;
    background-color: rgba(13, 81, 157, 0.45);
    padding: 0px;
    box-shadow: 0 0 0 1px #0B7FE2 inset;
  }
  .el-textarea__inner{
    background-color: rgba(13, 81, 157, 0.45);
    padding: 10px;
    box-shadow: 0 0 0 1px #0B7FE2 inset;
    color: #fff;
  }
  ::v-deep .el-input__prefix-inner{
    padding-left: 10px;
  }

  ::v-deep .el-input__inner {
    width: 250px;
    height: 36px;
    font-size: 15px;
    border: 10px;
    color: #fff;
    padding: 10px;
  }
::v-deep.banner {
  padding: 20px 30px;
  .el-form-item__label{
    color: #fff;
  }
  .el-input__suffix .el-input__icon {
    color: #fff;
    /* 图标颜色 */
    font-size: 15px;
    /* 图标大小 */
    padding-right: 16px;
  }
}
.tableWrapper {
  width: 420px;
  box-sizing: border-box;

  .flexBoxTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;

    .firstBox {
      display: flex;
      align-items: center;

      .logo {
        position: relative;
        width: 77.17px;
        height: 81px;

        .icon {
          width: 77.17px;
          height: 81px;
        }
      }

      .numBox {
        margin-left: 15px;
        line-height: 35px;

        .num {
          font-size: 24px;
          font-weight: 400;
          letter-spacing: 4px;
          color: #ffffff;
          font-family: YSBTH;
          letter-spacing: 2px;

        }

        .num1 {
          color: #559CEE;
          font-style: italic;
        }

        .num2 {
          color: #E0B47C;
          font-style: italic;
        }

        span {
          font-size: 14px;
          color: #FFFFFF8A;
          font-style: normal;
          margin-left: 4px;
        }

        .text {
          font-size: 16px;
          letter-spacing: 1px;
          color: #FFFFFF;
        }
      }
    }
  }

  .selectFlex {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el_input {
      margin-top: 10px;
    }

    /deep/ .el-input__suffix .el-input__icon {
      color: #fff;
      /* 图标颜色 */
      font-size: 15px;
      /* 图标大小 */
      padding-right: 16px;
    }

    /deep/ .el-input__wrapper {
      background-color: rgba(13, 81, 157, 0.45);
      padding: 0px;
      box-shadow: 0 0 0 1px #0B7FE2 inset;
    }

    /deep/ .el-input__inner {
      padding-left: 15px;
      height: 36px;
      font-size: 15px;
      border: 0px;
      color: #fff;
    }
  }
}

.tabBox {
  height: 42px;
  background: linear-gradient(90deg, rgba(3, 119, 255, 0) 0%, rgba(3, 119, 255, 0.24) 49.32%, rgba(3, 119, 255, 0) 100%);
  position: relative;
  margin-top: 17px;

  .tabTip {
    position: absolute;
    top: 4px;

  }

  .tabLeft {
    left: 0;
  }

  .tabRight {
    right: 0;
    transform: scaleX(-1);
  }

  .flexBox {
    display: flex;
    align-items: center;
    justify-content: center;

    .tabs {
      width: 134px;
      font-family: PMZD;
      font-size: 18px;
      letter-spacing: 0.12em;
      color: #FFFFFFCC;
      text-align: center;
      line-height: 42px;
      transition: all .3s;
      cursor: pointer;

      &:hover {
        filter: brightness(130%);
        color: #FFFFFF;
      }
    }

    .tabActive {
      background-image: url('/public/image/earlyWarningInterpretation/tab_选中_bg.png');
      background-repeat: no-repeat;
      background-size: cover;
      color: #FFFFFF;
      box-shadow: 0px 1px 0px 0px #0B1056;
    }
  }

}

::v-deep.selBox {
  margin-top: 20px;

  .el-select {
    margin-bottom: 10px;

    .el-select__wrapper {
      min-height: 36px;
      background: #0D519D73;
      box-shadow: none;
      border: 1px solid #2A8DE8C7;

    }

    .el-select__caret {
      font-size: 16px;
      color: #0B80E3;
    }

    .el-select__placeholder.is-transparent {
      color: #FFFFFF80 !important;
    }

    .el-select__placeholder {
      color: #fff;
    }

  }

  .el-date-editor.el-input__wrapper {
    width: 100%;
    box-sizing: border-box;
    min-height: 36px;
    background: #0D519D73;
    box-shadow: none;
    border: 1px solid #2A8DE8C7;

    .el-range-separator {
      color: #FFFFFF80;
    }

    .el-range-input {
      color: #fff;
    }
  }
}

.camera_List {
  height: 530px;
  overflow-y: auto;
  color: #fff;
  margin-top: 20px;
}

.camera_Item {
  height: 174px;
  margin-bottom: 26px;

  font-size: 13px;
  background-image: url('/public/image/earlyWarningInterpretation/卡片_bg1.png');
  transition: all .3s;
  cursor: pointer;

  &:hover {
    filter: brightness(150%);
  }

  .textBox {
    padding: 8px 15px 5px 40px;
    position: relative;
    display: flex;

    .camera_label {
      font-size: 14px;
      color: #2DCAEB;

    }

    &::before {
      content: "";
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #2DCAEB3D;
      position: absolute;
      top: 15px;
      left: 20px;
    }

    .camera_value {
      width: 290px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .item_title {
    display: flex;
    padding: 5px 16px;
    font-size: 16px;
    color: #5EFEE1;

    span{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 400px;
    }
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
