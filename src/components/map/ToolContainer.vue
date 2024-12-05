<template>
  <div class="toolBox">
    <transition name="fade" v-show="showLayer">
      <div class="layer_container">
        <el-tree ref="treeRef" class="custom-tree" node-key="id" :data="treeData" :default-checked-keys="checkedKeys"
          :props="defaultProps" show-checkbox @check-change="handleCheckChange" @node-click="handleCheckClick" />
      </div>
    </transition>
    <div @click="handleLayer" class="tool-container" :class="{ active: isActive3 }">
      图层控制
    </div>
    <BaseDialog1 v-show="pipeDialog" @closeDialog="pipeDialogClose" ref="cameraRef" :styles="cameraDialogStyles" :drag="false" :title="dialogTitle">
      <template v-slot:content>
        <cameraDialog :dialogData="dialogData" />
      </template>
    </BaseDialog1>
  </div>
</template>

<script setup>
import { provide, nextTick, ref, onMounted, onUnmounted } from 'vue'
import { cameraList, getPreviewUrl, cameraMapping } from '@/api/camera'
import { landList } from '@/api/land'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import CircleDiffusion from '@/utils/diffuse.js'
import mapHelper from '@/utils/mapHelper.js'
import $bus from '@/utils/eventBus.js'
import BaseDialog1 from '@/components/BaseDialog1'
import cameraDialog from './Dialog/cameraDialog.vue'
import CreateFrustum from '@/utils/CreateFrustum.js'
import Popup from '@/utils/bubble/popup.js'
import { computeCentroid, isString } from '@/utils/utils'
import { ElMessage } from 'element-plus'

const { state, commit } = useStore()
const Route = useRoute()
const Router = useRouter()
const showLayer = ref(false)
const isActive3 = ref(false)
const cameraData = ref([])
const landData = ref([])
const checkedKeys = ref([])
const cameraRef = ref()
const pipeCameraInfo = ref()
const dialogData = ref([])
const dialogTitle = ref('')
const landCenterPosition = ref('')
const pipeDialog = ref(false)
const frustum = null
const treeData = ref([
  {
    id: '1-1',
    label: '摄像头',
    children: []

  },
  {
    id: '2-1',
    label: '地块',
    defaultShow: true,
    children: []
  },
  {
    id: '3-1',
    label: '底图',
    children: []
  },
  {
    id: '4-1',
    label: '行政区',
    children: [],
    defaultShow: true
  },
  {
    id: '5-1',
    label: '白膜',
    defaultShow: true
  },
  {
    id: '6-1',
    label: '东阳江',
    defaultShow: true
  },
  {
    id: '7-1',
    label: '道路',
    defaultShow: true
  }
])
commit('treeData', treeData.value)
let cameraSource, highlightSource, landSource
let circleDiffusion = null
const defaultProps = {
  label: 'label',
  children: 'children'
}
const cameraDialogStyles = ref({
  width: '280px',
  minHeight: '180px',
  position: 'absolute',
  opacity: 0
})
const treeRef = ref(null)
onMounted(() => {
  circleDiffusion = new CircleDiffusion(viewer, 'circle')
  cameraSource = new Cesium.GeoJsonDataSource()
  landSource = new Cesium.GeoJsonDataSource()
  highlightSource = new Cesium.GeoJsonDataSource()
  viewer.dataSources.add(highlightSource)
  viewer.eventManager.addEventListener('CLICK', leftClick, false)
  const baseDialogRef = cameraRef.value.$el
  pipeCameraInfo.value = new Popup({
    viewer: viewer,
    element: baseDialogRef,
    scaleByDistance: new Cesium.NearFarScalar(1000, 1, 10000, 0.2),
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
      0,
      50000
    ),
    pixelOffset: new Cesium.Cartesian2(0, -418),
    hideOnBehindGlobe: true
  })
})
$bus.on('setNodesChange', () => {
  setNodesChange()
})
$bus.on('showLand', ({ params: { featureId } }) => {
  const landType = featureId.split('.')[0]
  const dataSource = viewer.dataSources.getByName(landType)[0]

  const entity = dataSource.entities.getById(featureId)
  console.log(entity, dataSource, landType, '--landType')
  entity.show = true
  initLandPopup(entity)
  viewer.flyTo(entity,
    {
      offset: new Cesium.HeadingPitchRange(
        10.646956075719464,
        -20.896571295715827,
        0.00004096053657751522
      )
    })
})
$bus.on('cameraClick', (data) => {
  handleCheckClick(data)
  // const id = 'camera' + data.id
  // initCameraPopup(id)
})
$bus.on('cameraClick2', (data) => {
  handleCheckClick2(data)
})
const setNodesChange = () => {
  checkedKeys.value = getAllNodeKeys(treeData.value, checkedKeys.value)
  if (treeRef.value) treeRef.value.setCheckedKeys(checkedKeys.value)
}
const getAllNodeKeys = (list, keys) => {
  list.forEach(item => {
    if (!item.children && item.defaultShow === true) {
      keys.push(item.id)
    }
    item.children && getAllNodeKeys(item.children, keys)
  })
  return keys
}
const handleCheckChange = (data, checked, indeterminate) => {
  switch (data.type) {
    case '摄像头': {
      const entity = cameraSource.entities.getById(data.id)
      entity.show = checked
      if (!entity.show) circleDiffusion.clear()
      break
    }
    case '底图': {
      $bus.emit('showMapLayer', { label: data.label, show: checked })
      break
    }
    case '地块':
    {
      const dataSource = viewer.dataSources.getByName(data.label)
      dataSource[0].entities.values.forEach(item => {
        item.show = checked
      })
      // landSource.entities.values.forEach(item => {
      //   item.show = checked
      // })

      break
    }
  }
  switch (data.label) {
    case '白膜':
    case '东阳江':
    case '道路':
    case '行政区':
    {
      $bus.emit('showBuilding', { label: data.label, show: checked })
      break
    }
  }

  // const checkedNodes = treeRef.value.getCheckedNodes()
  // const checkedNodeIds = checkedNodes.map((node) => node.id)
  // $bus.emit('showMapLayer', checkedNodeIds)
}
const pipeDialogClose = () => {
  pipeDialog.value = false
  pipeCameraInfo.value.close()
}
const handleCheckClick = (data) => {
  switch (data.type) {
    case '摄像头': {
      circleDiffusion.clear()
      const id = data.id.toString().includes('camera') ? data.id : 'camera' + data.id
      const entity = cameraSource.entities.getById(id)
      const position = mapHelper.worldToLonlat(entity.position.getValue())
      const cameraId = id.replace('camera', '')
      let status = '1'
      cameraData.value.forEach(async item => {
        if (cameraId == item.id) {
          status = item.status
          const hlsUrl = await getHlsUrl(item.deviceSn)
          $bus.emit('cameraObj', { ...item, hlsUrl: hlsUrl })
        }
      })
      mapHelper.openBounce(entity, [position[0], position[1]])
      circleDiffusion.add([position[0], position[1]], status === '1' ? '#19EBC569' : '#c01010b2', 50, 2000)
      viewer.flyTo(entity, { offset: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(358.29555605133936), Cesium.Math.toRadians(-25.978412915396504), 450) })
      break
    }
  }
}

const handleCheckClick2 = (data) => {
  switch (data.type) {
    case '摄像头': {
      circleDiffusion.clear()
      const id = data.id.toString().includes('camera') ? data.id : 'camera' + data.id
      const entity = cameraSource.entities.getById(id)
      const position = mapHelper.worldToLonlat(entity.position.getValue())
      const cameraId = id.replace('camera', '')
      cameraData.value.forEach(async item => {
        if (cameraId == item.id) {
          const hlsUrl = await getHlsUrl(item.deviceSn)
          $bus.emit('cameraObj', { ...item, hlsUrl: hlsUrl })
        }
      })
      break
    }
  }
}

const getHlsUrl = async (deviceSn) => {
  const { data } = await getPreviewUrl({ deviceSn: deviceSn })
  console.log(data)
  return data?.previewUrl || 'test.url' // 本地测试用
}
const handleLayer = () => {
  isActive3.value = !isActive3.value
  showLayer.value = !showLayer.value
  $bus.emit('showLayer', showLayer.value)
}
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
    console.log(cameraData.value, '--cameraData.value')

    commit('treeData', treeData.value)
    commit('cameraData', data)
    cameraData.value.forEach(item => {
      const entityImg = new Cesium.Entity({
        position: Cesium.Cartesian3.fromDegrees(+item.lon, +item.lat, 40),
        id: 'camera' + item.id,
        billboard: {
          scale: 1,
          image: +item.status === 1 ? './image/components/icon_camera.png' : './image/components/errorCamera.png',
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 设置在地球底部
          disableDepthTestDistance: Number.POSITIVE_INFINITY, // 防止被覆盖
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 126000) // 可视缩放距离范围
          // width: this.getBillboardWidth(),
          // height: 64
        }
      })
      cameraSource.entities.add(entityImg)
    })
  }
  cameraSource.name = '摄像头'
  viewer.dataSources.add(cameraSource)
  setTimeout(() => { setNodesChange() }, 300)
}
const getLandData = async () => {
  const { data, code } = await landList({}, { pageNum: 1, pageSize: 1000000 })
  if (code === '200') {
    data.list.forEach(item => {
      if (item.coordinates) {
        item.coord = flattenArray(JSON.parse(item.coordinates))
        const coords = JSON.parse(item.coordinates)
        item.coordXY = []
        if (coords && coords.length > 0) {
          coords.forEach(aItem => {
            if (aItem && aItem.length > 0) {
              aItem[0].forEach(bItem => {
                const coordXY = Cesium.Cartesian3.fromDegrees(bItem[0], bItem[1], 0)
                item.coordXY.push(coordXY)
              })
            }
          })
        }
        item.centerLonLat = computeCentroid(item.coordXY)
      }
    })
    landData.value = data.list
    const mappingArr = []
    landData.value.forEach(land => {
      const landCoord = { lng: land.centerLonLat[0], lat: land.centerLonLat[1] }
      let minDistance = Infinity
      let closestCamera = null
      cameraData.value.forEach(camera => {
        const cameraCoord = { lng: camera.lon, lat: camera.lat }
        const distance = mapHelper.calculateDistance(landCoord, cameraCoord)
        if (distance < minDistance) {
          minDistance = distance
          if (minDistance <= 700) {
            closestCamera = camera
          }
        }
      })
      if (closestCamera) {
        const obj = {
          featureId: land.featureId,
          cameraIp: closestCamera.deviceIp,
          distance: minDistance
        }
        mappingArr.push(obj)
        console.log(obj, minDistance)
      }
    })
    // const res = await cameraMapping(mappingArr)

    console.log(landData.value, mappingArr, data, '--landData.value ')

    // commit('landData', landData.value)
    // landData.value.forEach(item => {
    //   const entityImg = new Cesium.Entity({
    //     polygon: {
    //       hierarchy: Cesium.Cartesian3.fromDegreesArray(
    //         item.coord
    //       ),
    //       outline: false,
    //       outlineColor: Cesium.Color.BLACK,
    //       material: Cesium.Color.fromCssColorString(
    //         '#' +
    //         Math.random()
    //           .toString(16)
    //           .substr(2, 6)
    //       )
    //     },
    //     id: 'land' + item.id
    //   })
    //   landSource.entities.add(entityImg)
    // })
  }
  // landSource.entities.values.forEach(item => {
  //   item.show = false
  // })
  // viewer.dataSources.add(landSource)
}

function flattenArray (arr) {
  const result = []
  function recurse (currentArray) {
    for (let i = 0; i < currentArray.length; i++) {
      if (Array.isArray(currentArray[i])) {
        recurse(currentArray[i])
      } else {
        result.push(currentArray[i])
      }
    }
  }

  recurse(arr)
  return result
}

const leftClick = (e) => {
  const position = e.message.position
  const data = viewer.scene.pick(position)
  const pickedPosition = viewer.scene.pickPosition(position)
  pipeDialogClose()
  if (highlightSource.entities) highlightSource.entities.removeAll()
  if (Cesium.defined(pickedPosition)) {
    // frustum.lookAt(pickedPosition)
  }
  if (!data) return
  const { id } = data
  console.log(id, '--id')
  if (!id || !isString(id.id)) return
  if (id.id.indexOf('camera') !== -1) initCameraPopup(id)
  if (isLand(id)) initLandPopup(id)
}
const isLand = ({ id }) => {
  if (!id) return false
  const arr = config.diKuaiArr.map(item => item.label)
  return arr.some((item) => id.indexOf(item) !== -1)
}
const initCameraPopup = ({ id }) => {
  function getFn () {
    dialogData.value = []
    dialogTitle.value = '摄像头信息'
    const cameraId = id.replace('camera', '')
    const query = cameraData.value.find(item => item.id === +cameraId)
    handleCheckClick(query)
    const keys = Object.getOwnPropertyNames(query)
    keys.forEach(item => {
      if (item === 'deviceName') {
        dialogData.value.push({ label: '摄像头名称', value: query[item] })
      }
      if (item === 'status') {
        dialogData.value.push({ label: '摄像头状态', value: +query[item] === 1 ? '在线' : '离线' })
      }
      if (item === 'deviceAddress') {
        dialogData.value.push({ label: '摄像头地址', value: query[item] })
      }
      if (item === 'brandName') {
        dialogData.value.push({ label: '摄像头厂商', value: query[item] === 'HK' ? '海康' : '大华' })
      }
    })
    const worldP = mapHelper.lonlatToWorld(+query.lon, +query.lat, 10)
    pipeDialog.value = true
    nextTick(() => {
      pipeCameraInfo.value.setPosition(worldP)
      pipeCameraInfo.value.show()
    })
  }
  if (Route.path !== '/videoPartrol') {
    Router.push({ path: 'videoPartrol' })
    setTimeout(() => {
      getFn()
    }, 700)
  } else {
    getFn()
  }
}
const initLandPopup = (entity) => {
  const positions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions
  const highlightLine = new Cesium.Entity({
    polyline: {
      positions: positions.concat([positions[0]]),
      width: 5,
      material: Cesium.Color.BLACK,
      clampToGround: true // 将多段线贴地
    }
  })
  highlightSource.entities.add(highlightLine)
  const landType = entity.id.split('.')[0]
  dialogData.value = []
  dialogData.value.push({ label: '地块类型', value: landType })
  dialogTitle.value = '地块信息'
  // $bus.emit('featureId', id)
  // viewer.flyTo(entity)
  const properties = entity.properties
  const keys = Object.getOwnPropertyNames(entity.properties)
  keys.forEach(item => {
    if (item === 'NZYDKMC') {
      dialogData.value.push({ label: '地块名称', value: properties[item]._value })
    }
    if (item === 'Shape_Area') {
      dialogData.value.push({ label: '地块面积', value: properties[item]._value + '' })
    }
    if (item === 'Shape_Leng') {
      dialogData.value.push({ label: '地块长度', value: properties[item]._value + '' })
    }
    if (item === 'NZYPZWH') {
      dialogData.value.push({ label: '地块编号', value: properties[item]._value })
    }
    if (item === 'TDZL') {
      dialogData.value.push({ label: '土地坐落', value: properties[item]._value })
    }
    if (item === 'TDYT') {
      dialogData.value.push({ label: '土地用途', value: properties[item]._value })
    }
    if (item === 'XMMC') {
      dialogData.value.push({ label: '项目名称', value: properties[item]._value })
    }
    if (item === 'TOWN') {
      dialogData.value.push({ label: '乡镇', value: properties[item]._value })
    }
    if (item === 'VILLAGE') {
      dialogData.value.push({ label: '村庄', value: properties[item]._value })
    }
    if (item === 'XZQMC') {
      dialogData.value.push({ label: '行政区', value: properties[item]._value })
    }
    if (item === 'BZ' && properties[item]._value) {
      dialogData.value.push({ label: '备注', value: properties[item]._value })
    }
  })
  console.log(positions, '--positions')

  landCenterPosition.value = computeCentroid(positions)
  const worldP = mapHelper.lonlatToWorld(landCenterPosition.value[0], landCenterPosition.value[1], 10)
  pipeDialog.value = true
  nextTick(() => {
    pipeCameraInfo.value.setPosition(worldP)
    pipeCameraInfo.value.show()
  })
}
// const getSZT = () => {
//   // 创建视点
//   const origin = Cesium.Cartesian3.fromDegrees(120.237039, 29.29413, 20)
//   const head = 0
//   const pitch = 0
//   const roll = 0
//   const hpr = new Cesium.HeadingPitchRoll(head, pitch, roll)
//   const orientation = Cesium.Quaternion.fromHeadingPitchRoll(hpr)

//   // 创建视锥体
//   frustum = new CreateFrustum({
//     position: origin,
//     orientation: orientation,
//     fov: 30,
//     near: 10,
//     far: 100,
//     aspectRatio: 600 / 1080
//   })
//   // setInterval(() => {
//   //   // 绕Z轴旋转-航向
//   //   // head += 0.01

//   //   // 绕X轴旋转-俯仰
//   //   // pitch += 0.01

//   //   // 绕Y轴旋转-翻滚
//   //   roll += 0.01
//   //   hpr = new Cesium.HeadingPitchRoll(head, pitch, roll)
//   //   orientation = Cesium.Quaternion.fromHeadingPitchRoll(hpr)
//   //   createFrustum.update(origin, orientation)
//   // }, 200)
// }

getCameraList()
getLandData()
onUnmounted(() => {
  if (!viewer) return
  if (cameraSource.entities) cameraSource.entities.removeAll()
  if (highlightSource.entities) highlightSource.entities.removeAll()
  pipeCameraInfo.value.destroy()
  circleDiffusion.clear()
  viewer.eventManager.removeEventListener('CLICK', leftClick)
  // 销毁cesium

  if (Cesium.defined(viewer)) {
    viewer.entities.removeAll()
    viewer.imageryLayers.removeAll()
    viewer.dataSources.removeAll()
    viewer.scene.primitives.removeAll()
    // 获取webgl上下文
    let gl = viewer.scene.context._originalGLContext
    gl.canvas.width = 1
    gl.canvas.height = 1
    viewer.destroy() // 销毁Viewer实例
    gl.getExtension('WEBGL_lose_context').loseContext()
    gl = null
    window.viewer = null
    const cesiumContainer = document.getElementById('cesiumContainer')
    if (cesiumContainer) {
      cesiumContainer.remove() // 移除与地图相关的DOM元素
    }
    console.log('cesium销毁')

    // 清理其他JavaScript对象和事件监听器
    // ...
  }
  commit('treeData', [])
  $bus.off('showLayer')
  $bus.off('showMapLayer')
  $bus.off('cameraClick')
  $bus.off('cameraClick2')
})
</script>

<style lang="less" scoped>
.layer_container {
  min-height: 317px;
  background: #0D1F3CE5;
  border: 1px solid #1B65A6;
  border-radius: 4px;
  position: relative;
  margin-bottom: 10px;
  right: 0px;
  padding: 16px 14px;
  padding-left: 0;
  box-sizing: border-box;
  transition: all.3s;

  &::before {
    content: "";
    display: block;
    width: 110px;
    height: 18px;
    background-image: url('/public/image/components/toolBg.png');
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: 0;
  }

}

.toolBox {
  position: absolute;
  left: 492px;
  bottom: 49px;
  z-index: 11;
}

.tool-container {
  width: 138px;
  height: 43px;
  padding-top: 6px;
  padding-left: 25px;
  box-sizing: border-box;
  background-image: url('/public/image/components/图层控制_bg1.png');
  background-size: cover;
  background-repeat: no-repeat;
  font-family: PMZD;
  font-size: 16px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    filter: brightness(150%);
  }
}

.active {
  background-image: url('/public/image/components/图层控制_bg2.png') !important;
}

::v-deep .el-checkbox__inner {
  border-radius: 3px;
  border: none;
  box-shadow: 0px 0px 3.4px 0px #38B2F0 inset;
  width: 14px;
  height: 14px;
  background-color: transparent;

  &:after {
    height: 6px;
    left: 5px;
    top: 2px;
    width: 3px;
  }
}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: transparent;
  border: none;
}
</style>

<style lang="less" scoped>
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
  background-color: #66b1ff87 !important;
}

.el-tree {
  background-color: rgba(0, 0, 0, 0) !important;
  color: #fff !important;
}

::v-deep(.el-tree-node:focus > .el-tree-node__content) {
  background-color: #66b1ff87;
}

::v-deep(.el-tree-node__content:hover) {
  background-color: #66b1ff87 !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

::v-deep .el-tree-node>.el-tree-node__children {
  max-height: 300px !important;
  overflow: auto !important;

  &::-webkit-scrollbar {
    width: 2px; //修改滚动条宽度
  }
}
</style>
