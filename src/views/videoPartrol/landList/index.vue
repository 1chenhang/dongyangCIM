<template>
  <!-- <div v-show="showBtn" @click="testDialog = true" class="btn_box">地块关联摄像头</div> -->
  <div class="container_box">
    <div class="camera_List">
      <div @click="tableClick(item)" class="camera_Item" v-for="item in landList" :key="item.camera">
        <div class="item_title">
          <img :src="getImg(item.id)"><span>{{
            item.dkmc }}</span>
        </div>
        <div class="item_content">
          <p>
            <span class="point"></span>
            <span class="camera_label">乡镇：</span><span class="camera_value">{{ item.village }}</span>
          </p>
          <p>
            <span class="point"></span>
            <span class="camera_label">街道：</span><span class="camera_value">{{ item.xzq }}</span>
          </p>
        </div>
        <div class="checkBox" @click.stop>
          <el-checkbox @change="checkChange(item)"  v-model="item.check"></el-checkbox>
        </div>
        </div>

    </div>
    <BaseDialog1 v-show="testDialog" @closeDialog="testDialog = false" :styles="testStyles" :title="'地块关联摄像头'">
      <template v-slot:content>
        <CameraByLand @closeSon="closeDialog" />
      </template>
    </BaseDialog1>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getLandInfoByCamera, getPtzPointMove } from '@/api/camera'
import BaseDialog1 from '@/components/BaseDialog1'
import CameraByLand from './components/cameraByLand.vue'
import $bus from '@/utils/eventBus.js'
import mapHelper from '@/utils/mapHelper'
import { computeCentroid } from '@/utils/utils'
import CircleDiffusion from '@/utils/diffuse.js'
const landList = ref([])
const isActive = ref('')
const testDialog = ref(false)
// const showBtn = ref(false)
let circleDiffusion
const testStyles = ref({
  width: '500px',
  top: '47%',
  right: '40%'
})
const getImg = (id) => {
  return isActive.value === id ? './image/earlyWarningAnalysis/s2.png' : './image/earlyWarningAnalysis/s1.png'
}
const closeDialog = () => {
  testDialog.value = false
}
onMounted(() => {
  circleDiffusion = new CircleDiffusion(viewer, 'circle')
  $bus.on('cameraObj', async (query) => {
    clearAllEntity()
    await getCameraByLand(query)
    if (landList.value.length < 1) return
    const alt = 850
    const pitch = -48.71178972027612
    const centerPosition = [+query.lon, +query.lat]
    const newLat = mapHelper.getOffsetLat({ lat: +query.lat, alt: alt, pitch: pitch })
    setTimeout(() => {
      mapHelper.flyToByCameraInfo([+query.lon, newLat, alt, 354.6525606791816, pitch, 0], function () {
        mapHelper.addRadarScan(centerPosition, '地块搜索', 200.0)
        setTimeout(() => {
          mapHelper.clearRadarScan()
          const landCenterPosition = []
          landList.value.forEach(item => {
            const dataSource = viewer.dataSources.getByName(item.type)[0]
            const entity = dataSource.entities.getById(item.featureId)
            const landPositionList = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions
            const landLonLat = computeCentroid(landPositionList)
            circleDiffusion.add([landLonLat[0], landLonLat[1], 50], 'red', 50, 500)
            landCenterPosition.push(landLonLat)
            entity.show = true
          })
          mapHelper.parabolaFlowInit(viewer, 3, centerPosition, landCenterPosition)
          const lat2 = mapHelper.getOffsetLat({ lat: +query.lat, alt: 333, pitch: -22.142152521798398 })
          mapHelper.flyToByCameraInfo([+query.lon, lat2, 333, 358.95124797211355, -22.142152521798398, 0])
        }, 2000)
      })
    }, 4000)
  })
  // $bus.on('showBtn', (flag) => {
  //   showBtn.value = flag
  // })
})
onUnmounted(() => {
  $bus.off('cameraObj')
  if (viewer) clearAllEntity()
})
const clearAllEntity = () => {
  mapHelper.clearFlowInit()
  mapHelper.clearRadarScan()
  mapHelper.clearAllLand(viewer)
  circleDiffusion.clear()
}

const getCameraByLand = async (query) => {
  const { data, code } = await getLandInfoByCamera({ deviceSn: query.deviceSn })
  if (code === '200') {
    landList.value = data
    landList.value.forEach(item => { item.check = false })
  }
}
const tableClick = async (params) => {
  console.log(params)
  isActive.value = params.id
  const obj = {
    params: params,
    coords: params?.cameraPresetInfo[0].coords
  }
  $bus.emit('showLand', obj)
}
const checkChange = (query) => {
  $bus.emit('showLandText', query)
  // console.log(query, '--query')
}
const positionYZD = async (params) => {
  const { data } = await getPtzPointMove({ deviceSn: params.deviceSn, presetId: params.presetNo })
}
</script>

<style lang="less" scoped>
.container_box {
  width: 100%;
  height: 349px;
  overflow-y: auto;
  color: #fff;
  margin-top: 18px;
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

.camera_List {
  height: 615px;
  overflow-y: auto;
  color: #fff;
}

.camera_Item {
  position: relative;
  height: 96px;
  margin-bottom: 31px;
  border-radius: 3px;
  font-size: 13px;
  padding: 24px 32px 18px 35px;
  box-sizing: border-box;
  background-image: url('../../../../public/image//earlyWarningAnalysis/bg.png');
  background-size: 100% 100%;
  cursor: pointer;

  &:hover {
    filter: brightness(150%);
  }

  .item_content {
    display: flex;
    flex-wrap: wrap;
    margin-left: 6px;
    margin-top: 10px;

    .point {
      width: 8px;
      height: 8px;
      display: inline-block;
      border-radius: 50%;
      margin-right: 7px;
      background: rgba(45, 202, 235, 0.24);
    }
  }

  p {
    width: 50%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .item_title {
    display: flex;
    border-radius: 3px 3px 0px 0px;
    font-weight: 700;
    font-size: 16px;
  }

  .camera_label {
    font-size: 14px;
    color: #2DCAEB;
  }

  .camera_value {
    font-weight: 700;
  }
}

.btn_box {
  width: 160px;
  height: 43px;
  background-image: url('/public/image/earlyWarningAnalysis/wfcz.png');
  margin: 20px 0 0 20px;
  line-height: 43px;
  text-align: center;
  transition: all .3s;
  cursor: pointer;
  color: #fff;

  &:hover {
    filter: brightness(150%);
  }
}
.checkBox{
  position: absolute;
  right: 20px;
  top: 20px;
}

::v-deep .el-checkbox__inner {
  border: 1px solid #0674C1;
  background-color: #296FBF5C;
}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #296FBFD6;
  border-color: #0674C1;
}
</style>
