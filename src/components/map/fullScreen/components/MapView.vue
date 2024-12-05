<template>
  <div id="cesiumContainer1"></div>
  <BaseDialog1 v-show="pipeDialog" ref="cameraRef" @closeDialog="pipeDialogClose" :styles="cameraDialogStyles"
    :title="dialogTitle">
    <template v-slot:content>
      <cameraDialog :dialogData="dialogData" />
    </template>
  </BaseDialog1>
</template>

<script setup>
import BaseDialog1 from '@/components/BaseDialog1'
import { onMounted, onBeforeUnmount, ref, inject, watch, nextTick, toRefs, defineProps } from 'vue'
import cameraDialog from '@/components/map/Dialog/cameraDialog.vue'
import Popup from '@/utils/bubble/popup.js'
import { modifyMap } from '@/utils/colorMap'
// import SkyBoxOnGround from '@/utils/skybox_nearground'
import EventManager from '@/utils/CesiumHandler/EventManager'
import mapHelper from '@/utils/mapHelper'
import $bus from '@/utils/eventBus.js'
import { computeCentroid, isEmptyObject } from '@/utils/utils'
import { calculateT2, calculateR } from '@/utils/formula'
import { getOneByFeatureId } from '@/api/chart'
import { getPtzParam, getPTZGoTo, cameraList, getPreviewUrl } from '@/api/camera'

const cameraData = ref([])
const fullCanvasLine = inject('fullCanvasLine') // 摄像头关联的地块信息
const cameraFullScreenObj = inject('cameraFullScreenObj')
const startAngle = ref(-20)
const endAngle = ref(20)
const sectorRadius = 600 // 扇形半径
const CameraRangeRadius = 700 // 摄像机圆半径
let currentFrame = 0
const totalFrames = 100
const PTZParams = ref({}) // 摄像头初始PTZ的P
let timer = null
let viewer2
let cameraSource, highlightSource, wallSource, XZQPolylineSource
const pipeCameraInfo = ref()
const dialogData = ref([])
const dialogTitle = ref('')
const cameraRef = ref()
const CesCenter = ref()
const pipeDialog = ref(false)
const heading = ref(0) // 设置水平旋转视口方向的角度

const cameraDialogStyles = ref({
  width: '280px',
  minHeight: '180px',
  position: 'absolute',
  opacity: 0
})
onMounted(async () => {
  initViewer()
  getFlyAnimation()
  $bus.on('updateSector', (val) => {
    startAngle.value += val
    endAngle.value += val
    heading.value += val
    const entity = viewer2.entities.getById('CameraSector')
    entity.polyline.positions = generateSectorPositions(CesCenter.value, sectorRadius, startAngle.value, endAngle.value)
    const entity2 = viewer2.entities.getById('animateSector')
    entity2.polygon.hierarchy = new Cesium.CallbackProperty(() => {
      return new Cesium.PolygonHierarchy(generateSectorPositions(CesCenter.value, sectorRadius * (currentFrame / totalFrames), startAngle.value, endAngle.value))
    }, false)

    const pitch = -25.98205743403628 // 设置垂直旋转视口方向的角度
    const range = 358.29561615381874

    // 第一个是目标位置信息，第二个是视口方向信息
    viewer2.camera.lookAt(CesCenter.value, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(heading.value), Cesium.Math.toRadians(pitch), range))
    viewer2.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
  })
  $bus.on('mapLayerChange', (val) => {
    viewer2.imageryLayers.removeAll()
    viewer2.entities.removeAll()
    viewer2.imageryLayers.removeAll()
    viewer2.dataSources.removeAll()
    viewer2.scene.primitives.removeAll()
    viewer2.destroy() // 销毁Viewer实例

    initViewer()
    if (val === '影像地图') {
      addNginxMap('影像')
    } else {
      // 暗色地图
      addNginxMap()
      modifyMap(viewer2, {
        invertColor: true, // 反色?
        filterRGB: [60, 145, 172]// 滤镜值
      })
    }

    const origin = Cesium.Cartesian3.fromDegrees(120.237039, 29.29413, 8000)
    viewer2.camera.setView({
      destination: origin
    })
  })
  // 视频定位,地图扇形区域跟着变化
  $bus.on('changeVideoByMap', async () => {
    await getCameraPTZ()
    const entity = viewer2.entities.getById('CameraSector')
    entity.polyline.positions = generateSectorPositions(CesCenter.value, sectorRadius, startAngle.value, endAngle.value)
    const entity2 = viewer2.entities.getById('animateSector')
    entity2.polygon.hierarchy = new Cesium.CallbackProperty(() => {
      return new Cesium.PolygonHierarchy(generateSectorPositions(CesCenter.value, sectorRadius * (currentFrame / totalFrames), startAngle.value, endAngle.value))
    }, false)
    const L = calculateR(CameraRangeRadius, PTZParams.value.tilt)
    if (!L) return
    getMapPoint(L)
  })
})
const initViewer = () => {
  cameraSource = new Cesium.GeoJsonDataSource()
  highlightSource = new Cesium.GeoJsonDataSource()
  wallSource = new Cesium.GeoJsonDataSource()
  XZQPolylineSource = new Cesium.GeoJsonDataSource()
  Cesium.Ion.defaultAccessToken = config.defaultAccessToken
  viewer2 = new Cesium.Viewer('cesiumContainer1', {
    infoBox: false,
    mageryProvider: false, // 首先要禁用默认的影像服务提供商
    // baseLayerPicker: false, // 不显示底图选择控件
    baseLayerPicker: false, // 不显示底图选择控件
    geocoder: false, // 不显示查询控件
    homeButton: false, // 不显示Home按钮
    sceneModePicker: false, // 不显示场景模式选择控件
    timeline: false, // 不显示时间轴
    navigationHelpButton: false, // 不显示帮助按钮
    animation: false, // 不显示动画控件
    fullscreenButton: false, // 不显示全屏按钮
    contextOptions: {
      webgl: {
        preserveDrawingBuffer: true
      }
      // requestWebgl1: true
    }
  })
  viewer2.dataSources.add(highlightSource)
  viewer2.imageryLayers.get(0).show = false
  viewer2.cesiumWidget.screenSpaceEventHandler.removeInputAction(
    Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
  )
  viewer2.eventManager = new EventManager(viewer2)
  viewer2._cesiumWidget._creditContainer.style.display = 'none'
  viewer2.scene.screenSpaceCameraController.enableDoubleClickZoom = false
  viewer2.scene.globe.depthTestAgainstTerrain = true
  viewer2.scene.debugShowFramesPerSecond = true
  viewer2.scene.globe.baseColor = Cesium.Color.BLACK // 修改地图蓝色背景
  viewer2.eventManager.addEventListener('CLICK', leftClick, false)
  viewer2.scene.screenSpaceCameraController.tiltEventTypes = [Cesium.CameraEventType.PINCH, Cesium.CameraEventType.RIGHT_DRAG]
  viewer2.scene.screenSpaceCameraController.zoomEventTypes = [Cesium.CameraEventType.WHEEL, Cesium.CameraEventType.PINCH]
  viewer2.scene.screenSpaceCameraController.maximumZoomDistance = 151655 // 最大缩放高度（米）
  const baseDialogRef = cameraRef.value.$el
  pipeCameraInfo.value = new Popup({
    viewer: viewer2,
    element: baseDialogRef,
    scaleByDistance: new Cesium.NearFarScalar(100, 1, 10000, 0.2),
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
      0,
      50000
    ),
    pixelOffset: new Cesium.Cartesian2(0, -418),
    hideOnBehindGlobe: true
  })

  viewer2.dataSources.add(wallSource)

  // addXZQPolygon()
  // addTdTmapMap()
  addNginxMap('影像')
  addXZQ()
  getCameraList()
}
const getFlyAnimation = () => {
  const origin = Cesium.Cartesian3.fromDegrees(120.237039, 29.29413, 8000)
  viewer2.camera.flyTo({
    destination: origin
  })
}
// 行政区线地图加载
const addXZQ = () => {
  const roadLine1 = Cesium.GeoJsonDataSource.load(
    './东阳市乡镇边界.json',
    { clampToGround: true }
  )
  roadLine1
    .then(dataSource => {
      const line1 = dataSource.entities.values
      for (let i = 0; i < line1.length; i++) {
        const line = line1[i]
        const positions = line.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions
        const centerLonLat = computeCentroid(positions)
        const xzqLineEntity = new Cesium.Entity({
          polyline: {
            positions: positions,
            width: 5,
            clampToGround: true,
            material: new Cesium.PolylineGlowMaterialProperty({
              // 设置Glow材质
              glowPower: 0.1,
              color: Cesium.Color.fromCssColorString('#1039ff')
            })
          }
        })
        XZQPolylineSource.entities.add(xzqLineEntity)
        const xzqLabelEntity = new Cesium.Entity({
          position: Cesium.Cartesian3.fromDegrees(centerLonLat[0], centerLonLat[1], 40),
          id: 'xzq' + line.name,
          label: {
            text: line.name,
            font: '24px sans-serif',
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 4,
            // FILL填充文字，OUTLINE勾勒标签，FILL_AND_OUTLINE填充文字和勾勒标签
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            // 设置文字的偏移量
            pixelOffset: new Cesium.Cartesian2(0, -20),
            // 设置文字的显示位置,LEFT /RIGHT /CENTER
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            // 设置文字的显示位置
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 150000) // 可视缩放距离范围
          }
        })
        XZQPolylineSource.entities.add(xzqLabelEntity)
      }
      XZQPolylineSource.name = '行政区线'
      viewer2.dataSources.add(XZQPolylineSource)
    })
}
// 天地图
const addTdTmapMap = () => {
  const tk = '6494f057-b0b0-4ca4-a7c1-b8e306922406'
  const imageryLayerCollection = viewer2.imageryLayers
  const tdtMapData = config.tdtMap
  tdtMapData.forEach((cItem) => {
    const baseLayer = mapHelper.createBaseMapProvider(
      `${cItem.url}?request=GetTile&token=${tk}&service=wmts&REQUEST=GetTile&VERSION=1.0.0&LAYER=vmap&STYLE=default&TILEMATRIXSET=esritilematirx&TILEMATRIX={mz}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpgpng`
    )
    const imageLayer = imageryLayerCollection.addImageryProvider(baseLayer)
    const defaultShow = cItem.text === '影像地图' || cItem.text === '地图注记'
    imageLayer.show = defaultShow
  })
}
// nginx离线地图
const addNginxMap = (type) => {
  const TMap = config.nginxTMap
  TMap.forEach((mapItem) => {
    const MapModel = new Cesium.UrlTemplateImageryProvider({
      url: mapItem.url,
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      fileExtension: 'png',
      minimumLevel: 1,
      maximumLevel: 18
    })
    const imageLayer = viewer2.imageryLayers.addImageryProvider(MapModel)
    let defaultShow
    if (type === '影像') {
      defaultShow = mapItem.text === '影像地图' || mapItem.text === '地图注记'
    } else {
      defaultShow = mapItem.text === '科技版地图' || mapItem.text === '地图注记'
    }
    imageLayer.show = defaultShow
  })
}
// 加载地块
const addXZQPolygon = () => {
  config.diKuaiArr.forEach((item, index) => {
    const roadpolygon = Cesium.GeoJsonDataSource.load(
      item.url,
      { clampToGround: true }
    )
    roadpolygon
      .then(dataSource => {
        viewer2.dataSources.add(dataSource).then(t => {
          t.show = true
        })
        const entities = dataSource.entities.values
        for (let i = 0; i < entities.length; i++) {
          const entity = entities[i]
          entity.polygon.material = Cesium.Color.fromCssColorString(
            '#' +
            Math.random()
              .toString(16)
              .substr(2, 6)
          )
          entity.polygon.outline = false
          entity.show = false
        }
        dataSource.name = item.label
      })
  })
}
const pipeDialogClose = () => {
  pipeDialog.value = false
  pipeCameraInfo.value.close()
}
// 生成摄像机辐射范围
const getCameraRange = () => {
  // 圆的参数
  const center = CesCenter.value
  const radius = CameraRangeRadius // 圆的半径
  const segments = 100 // 圆的分割数

  // 获取中心点的经纬度
  const centerCartographic = Cesium.Cartographic.fromCartesian(center)

  // 生成圆的多段线
  const positions = []
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Cesium.Math.TWO_PI
    const offset = new Cesium.Cartesian3(
      radius * Math.cos(angle),
      radius * Math.sin(angle),
      0
    )
    const position = Cesium.Cartesian3.add(center, offset, new Cesium.Cartesian3())
    const cartographic = Cesium.Cartographic.fromCartesian(position)

    // 调整经纬度以确保生成正确的圆
    cartographic.longitude = centerCartographic.longitude + (radius / Cesium.Ellipsoid.WGS84.maximumRadius) * Math.cos(angle)
    cartographic.latitude = centerCartographic.latitude + (radius / Cesium.Ellipsoid.WGS84.maximumRadius) * Math.sin(angle)

    positions.push(Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude))
  }
  viewer2.entities.add({
    id: 'CameraRange',
    polyline: {
      positions: positions,
      width: 3,
      material: Cesium.Color.RED,
      clampToGround: true // 将多段线贴地
    }
  })
}
const getCameraSector = async () => {
  await getCameraPTZ()
  // 创建扇形polyline实体
  viewer2.entities.add({
    id: 'CameraSector',
    polyline: {
      positions: generateSectorPositions(CesCenter.value, sectorRadius, startAngle.value, endAngle.value),
      width: 3,
      material: Cesium.Color.RED,
      clampToGround: true // 将多段线贴地
    }
  })
  // 创建动画扇形面
  viewer2.entities.add({
    id: 'animateSector',
    polygon: {
      hierarchy: new Cesium.CallbackProperty(() => {
        return new Cesium.PolygonHierarchy(generateSectorPositions(CesCenter.value, sectorRadius * (currentFrame / totalFrames), startAngle.value, endAngle.value))
      }, false),
      material: Cesium.Color.YELLOW.withAlpha(0.5),
      clampToGround: true // 将多段线贴地
    }
  })
}
// 获取摄像头 PTZ
const getCameraPTZ = async () => {
  const { data, code } = await getPtzParam({ deviceSn: cameraFullScreenObj.value.deviceSn })
  if (code === '200') {
    // data.pan = Math.round(data.pan)
    PTZParams.value = data
    let newPan
    if (cameraFullScreenObj.value.brandName === 'HK') {
      newPan = data.pan - cameraFullScreenObj.value.pan
    } else {
      newPan = cameraFullScreenObj.value.pan - data.pan
    }

    if (newPan > 360) {
      newPan = newPan - 360
    }
    if (newPan < 0) {
      newPan = newPan + 360
    }
    startAngle.value = newPan - 20
    endAngle.value = newPan + 20
    console.log(newPan, data, startAngle.value, endAngle.value, 'PTZParams.value')
  }
}
// 动画循环
timer = setInterval(() => {
  currentFrame++
  if (currentFrame > totalFrames) {
    currentFrame = 0
  }
}, 30)
function generateSectorPositions (center, radius, startAngle, endAngle) {
  const positions = []
  const numPoints = 50 // 细分程度，值越大越光滑

  // 添加中心点
  positions.push(center)

  const centerCartographic = Cesium.Cartographic.fromCartesian(center)
  const centerLongitude = centerCartographic.longitude
  const centerLatitude = centerCartographic.latitude

  for (let i = 0; i <= numPoints; i++) {
    // 调整角度计算，使0度对应正北
    const angle = Cesium.Math.toRadians(90 - (startAngle + (endAngle - startAngle) * (i / numPoints)))
    const offsetX = radius * Math.cos(angle)
    const offsetY = radius * Math.sin(angle)

    const destination = Cesium.Cartesian3.fromRadians(
      centerLongitude + offsetX / (Cesium.Ellipsoid.WGS84.maximumRadius * Math.cos(centerLatitude)),
      centerLatitude + offsetY / Cesium.Ellipsoid.WGS84.maximumRadius
    )

    positions.push(destination)
  }

  positions.push(center) // 添加中心点以形成闭合扇形
  return positions
}

async function updateSector (center, target, radius, isGoToPTZ = true, distance = 0) {
  const endAngles = endAngle.value
  const startAngles = startAngle.value
  // 计算中心点到目标点的方位角
  const centerCartographic = Cesium.Cartographic.fromCartesian(center)
  const targetCartographic = Cesium.Cartographic.fromCartesian(target)
  const y = Math.sin(targetCartographic.longitude - centerCartographic.longitude) * Math.cos(targetCartographic.latitude)
  const x = Math.cos(centerCartographic.latitude) * Math.sin(targetCartographic.latitude) - Math.sin(centerCartographic.latitude) * Math.cos(targetCartographic.latitude) * Math.cos(targetCartographic.longitude - centerCartographic.longitude)
  const bearing = Cesium.Math.toDegrees(Math.atan2(y, x))
  let newBearing = Cesium.Math.toDegrees(Math.atan2(y, x))
  newBearing = (newBearing + 360) % 360 // 将方位角转换到0-360度范围内
  // 更新扇形的顶点
  const positions = generateSectorPositions(center, radius, bearing - (endAngles - startAngles) / 2, bearing + (endAngles - startAngles) / 2)
  const entity = viewer2.entities.getById('CameraSector')
  entity.polyline.positions = positions
  const entity2 = viewer2.entities.getById('animateSector')
  entity2.polygon.hierarchy = new Cesium.CallbackProperty(() => {
    return new Cesium.PolygonHierarchy(generateSectorPositions(center, radius * (currentFrame / totalFrames), bearing - (endAngles - startAngles) / 2, bearing + (endAngles - startAngles) / 2))
  }, false)

  startAngle.value = bearing - (endAngles - startAngles) / 2
  endAngle.value = bearing + (endAngles - startAngles) / 2

  if (isEmptyObject(PTZParams.value) || !isGoToPTZ) return
  // 如果 bearing <0 bearing就得+360
  // 三维精确定位
  let newPan
  if (cameraFullScreenObj.value.brandName === 'HK') {
    newPan = newBearing + cameraFullScreenObj.value.pan
  } else {
    newPan = cameraFullScreenObj.value.pan - newBearing
  }

  if (newPan > 360) {
    newPan = newPan - 360
  }
  if (newPan < 0) {
    newPan = newPan + 360
  }
  const newTilt = calculateT2(CameraRangeRadius, distance)
  console.log(newTilt, '--newTilt')
  const { zoom } = PTZParams.value
  await getPTZGoTo({
    deviceSn: cameraFullScreenObj.value.deviceSn,
    pan: newPan,
    tilt: newTilt,
    zoom: zoom
  })
  $bus.emit('clearAllCanvas')
  console.log(newBearing, newPan, cameraFullScreenObj.value.brandName, 1.1, '--bearingisGoToPTZ')
}

const leftClick = (e) => {
  const position = e.message.position
  if (position) {
    const lonLat = mapHelper.worldToLonlat(position, viewer2)
    console.log(lonLat, '--lonLat')
    console.log(
      '--cameraInfo',
      mapHelper.getCurrentCameraInfo(viewer2.camera)
    )
  }
  const data = viewer2.scene.pick(position)
  const pickedPosition = viewer2.scene.pickPosition(position)
  pipeDialogClose()
  pipeCameraInfo.value.close()
  if (highlightSource.entities) highlightSource.entities.removeAll()
  if (Cesium.defined(pickedPosition)) {
    console.log(pickedPosition, '--pickedPosition')
    const pickedCartographic = Cesium.Cartographic.fromCartesian(pickedPosition)
    const cartographicPosition = Cesium.Cartographic.fromCartesian(CesCenter.value)
    const pickLon = Cesium.Math.toDegrees(pickedCartographic.longitude)
    const pickLat = Cesium.Math.toDegrees(pickedCartographic.latitude)
    // 判断是否在圆范围里
    const distance = mapHelper.calculateDistance(
      {
        lng: Cesium.Math.toDegrees(cartographicPosition.longitude),
        lat: Cesium.Math.toDegrees(cartographicPosition.latitude)
      },
      {
        lng: pickLon,
        lat: pickLat
      }
    )
    if (distance < CameraRangeRadius) {
      viewer2.entities.removeById('mapPoint2')
      updateSector(CesCenter.value, pickedPosition, sectorRadius, true, distance)
      // 添加标记点到 Cesium 地图中
      viewer2.entities.add({
        position: Cesium.Cartesian3.fromDegrees(pickLon, pickLat, 0),
        id: 'mapPoint2',
        billboard: {
          scale: 0.6,
          image: './image/components/坐标点2.png',
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 设置在地球底部
          disableDepthTestDistance: Number.POSITIVE_INFINITY, // 防止被覆盖
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 26000) // 可视缩放距离范围
        }
      })
      $bus.emit('videoPointEmit')
      $bus.emit('clearAllCanvas')
    }
  }
  if (!data) return
  const { id } = data
  if (!id) return
  if (id.id.indexOf('camera') !== -1) initCameraPopup(id.id)
  if (isLand(id)) initLandPopup(id)
}
const clearCamera = () => {
  viewer2.entities.removeById('CameraRange')
  viewer2.entities.removeById('CameraSector')
  viewer2.entities.removeById('animateSector')
}
const isLand = ({ id }) => {
  if (!id) return
  const arr = config.diKuaiArr.map(item => item.label)
  return arr.some((item) => id.indexOf(item) !== -1)
}
const initCameraPopup = async (id) => {
  dialogData.value = []
  dialogTitle.value = '摄像头信息'
  const cameraId = id.replace('camera', '')
  const query = cameraData.value.find(item => item.id === +cameraId)
  const keys = Object.getOwnPropertyNames(query)
  keys.forEach(item => {
    if (item === 'deviceName') {
      dialogData.value.push({ label: '摄像头名称', value: query[item] })
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
  const hlsUrl = await getHlsUrl(query.deviceSn)
  $bus.emit('cameraObj', { ...query, hlsUrl: hlsUrl })
}
const getHlsUrl = async (deviceSn) => {
  const { data } = await getPreviewUrl({ deviceSn: deviceSn })
  console.log(data)
  return data?.previewUrl || 'test.url' // 本地测试用
}
const initLandPopup = (entity) => {
  const positions = entity.wall.positions
  const { properties } = entity
  const keys = Object.getOwnPropertyNames(properties)
  dialogData.value = []
  dialogTitle.value = '地块信息'
  keys.forEach(item => {
    if (item === 'type') {
      dialogData.value.push({ label: '地块类型', value: properties[item]._value })
    }
    if (item === 'dkmc') {
      dialogData.value.push({ label: '地块名称', value: properties[item]._value })
    }
    if (item === 'dkmj') {
      dialogData.value.push({ label: '地块面积', value: properties[item]._value + '' })
    }
    if (item === 'Shape_Leng') {
      dialogData.value.push({ label: '地块长度', value: properties[item]._value + '' })
    }
    if (item === 'qdrq') {
      dialogData.value.push({ label: '签订日期', value: properties[item]._value })
    }
    if (item === 'NZYPZWH') {
      dialogData.value.push({ label: '地块编号', value: properties[item]._value })
    }
    if (item === 'tdzl') {
      dialogData.value.push({ label: '土地坐落', value: properties[item]._value })
    }
    if (item === 'tdyt') {
      dialogData.value.push({ label: '土地用途', value: properties[item]._value })
    }
    if (item === 'xmmc') {
      dialogData.value.push({ label: '项目名称', value: properties[item]._value })
    }
    if (item === 'town') {
      dialogData.value.push({ label: '乡镇', value: properties[item]._value })
    }
    if (item === 'village') {
      dialogData.value.push({ label: '村庄', value: properties[item]._value })
    }
    if (item === 'xzq') {
      dialogData.value.push({ label: '行政区', value: properties[item]._value })
    }
    if (item === 'bz' && properties[item]._value) {
      dialogData.value.push({ label: '备注', value: properties[item]._value })
    }
  })
  const landCenterPosition = computeCentroid(positions)
  const worldP = mapHelper.lonlatToWorld(landCenterPosition[0], landCenterPosition[1], 10)
  pipeDialog.value = true
  nextTick(() => {
    pipeCameraInfo.value.setPosition(worldP)
    pipeCameraInfo.value.show()
  })
}
// 获取摄像头列表
const getCameraList = async () => {
  const { data, code } = await cameraList({})
  if (code === '200') {
    cameraData.value = data
    cameraData.value.forEach(item => {
      const entityImg = new Cesium.Entity({
        position: Cesium.Cartesian3.fromDegrees(+item.lon, +item.lat, 20),
        id: 'camera' + item.id,
        billboard: {
          scale: 1,
          image: item.status === '1' ? './image/components/icon_camera.png' : './image/components/errorCamera.png',
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 设置在地球底部
          disableDepthTestDistance: Number.POSITIVE_INFINITY, // 防止被覆盖
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 26000) // 可视缩放距离范围
          // width: this.getBillboardWidth(),
          // height: 64
        }
      })
      cameraSource.entities.add(entityImg)
    })

    viewer2.dataSources.add(cameraSource)
  }
}
// 定位至摄像头并添加高塔 区域模型
const getFlyToCamera = (camera) => {
  clearCamera()
  if (isEmptyObject(cameraFullScreenObj.value)) return
  console.log(cameraFullScreenObj.value, '--cameraFullScreenObj.value')
  const id = 'camera' + cameraFullScreenObj.value.id
  const entity = cameraSource.entities.getById(id)
  viewer2.flyTo(entity, { offset: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-25.978412915396504), 450) })
  // 获取实体的经纬度
  const positionCartographic = Cesium.Cartographic.fromCartesian(entity.position.getValue())
  const longitude = Cesium.Math.toDegrees(positionCartographic.longitude)
  const latitude = Cesium.Math.toDegrees(positionCartographic.latitude)
  viewer2.entities.add({
    position: Cesium.Cartesian3.fromDegrees(longitude, latitude, 0), // 模型的位置
    model: {
      uri: './module/高压塔13.gltf',
      // minimumPixelSize: 500,
      // maximumScale: 10000,
      show: true
    }
  })

  CesCenter.value = Cesium.Cartesian3.fromDegrees(longitude, latitude)
  console.log(CesCenter.value, '--CesCenter.value ')

  getCameraRange()
  getCameraSector()
}
// 跳转至摄像头关联地块
const getLandByCamera = async () => {
  if (wallSource.entities) wallSource.entities.removeAll()
  const featureId = fullCanvasLine.value.params.featureId
  const { positions, properties } = await getIdByLand(featureId)
  const entityLonLat = computeCentroid(positions)
  const origin = Cesium.Cartesian3.fromDegrees(entityLonLat[0], entityLonLat[1], 0)
  updateSector(CesCenter.value, origin, sectorRadius, false)
  const wallEntity = new Cesium.Entity({
    // name: "立体墙效果",
    id: properties.featureId,
    wall: {
      positions: positions,
      // 设置高度
      maximumHeights: new Array(positions.length).fill(50),
      minimunHeights: new Array(positions.length).fill(0),
      // 扩散墙材质
      material: new Cesium.WallDiffuseMaterialProperty({
        color: new Cesium.Color(1.0, 1.0, 0.0, 1.0)
      })
    }
  })
  wallEntity.properties = properties
  wallSource.name = '光墙'
  wallSource.entities.add(wallEntity)
  setTimeout(() => {
    // const pitch = -42.79243047142489
    // const alt = 900
    // const newLat = mapHelper.getOffsetLat({ lat: entityLonLat[1], alt: alt, pitch: pitch })
    // mapHelper.flyToByCameraInfo(
    //   [
    //     entityLonLat[0],
    //     newLat,
    //     alt,
    //     258.8438650087698,
    //     pitch,
    //     0
    //   ],
    //   null, viewer2
    // )

    viewer2.flyTo(wallEntity,
      {
        offset: new Cesium.HeadingPitchRange(
          258.8438650087698,
          -42.79243047142489,
          0
        )
      })
  }, 500)
  initLandPopup(wallEntity)
}
// 根据地块id查找地块
const getIdByLand = async (id) => {
  const { data } = await getOneByFeatureId({ featureId: id })
  if (!data) return
  const { coordinates } = data
  if (!coordinates) return
  const lonLatArr = JSON.parse(coordinates)[0][0]
  const positions = lonLatArr.map(item => Cesium.Cartesian3.fromDegrees(item[0], item[1], 0))
  return { positions: positions, properties: data }
}
// 获取通过视频打点地图位置点
const getMapPoint = (L) => {
  const pointEntity = viewer2.entities.getById('mapPoint')
  if (pointEntity) viewer2.entities.removeById('mapPoint')
  const id = 'camera' + cameraFullScreenObj.value.id
  const entity = cameraSource.entities.getById(id)
  // 获取实体的经纬度
  const positionCartographic = Cesium.Cartographic.fromCartesian(entity.position.getValue())
  const lon1 = Cesium.Math.toDegrees(positionCartographic.longitude)
  const lat1 = Cesium.Math.toDegrees(positionCartographic.latitude)
  // 已知点的经纬度

  // 距离和方向
  const distance = L // 距离，单位为米
  let bearing = startAngle.value + 20 // 方向，单位度
  if (bearing < 0) bearing += 360
  console.log(distance, bearing, '--没报错,距离')

  // 将已知点的经纬度转换为 Cartographic
  const startCartographic = Cesium.Cartographic.fromDegrees(lon1, lat1)

  // 将距离转换为弧度
  const ellipsoid = Cesium.Ellipsoid.WGS84
  const distanceInRadians = distance / ellipsoid.maximumRadius

  // 计算新的 Cartographic 位置
  const bearingRadians = Cesium.Math.toRadians(bearing)
  const lat2 = Math.asin(Math.sin(startCartographic.latitude) * Math.cos(distanceInRadians) +
    Math.cos(startCartographic.latitude) * Math.sin(distanceInRadians) * Math.cos(bearingRadians))
  const lon2 = startCartographic.longitude + Math.atan2(Math.sin(bearingRadians) * Math.sin(distanceInRadians) * Math.cos(startCartographic.latitude),
    Math.cos(distanceInRadians) - Math.sin(startCartographic.latitude) * Math.sin(lat2))

  // 输出新的经纬度
  const newLat = Cesium.Math.toDegrees(lat2)
  const newLon = Cesium.Math.toDegrees(lon2)
  console.log(`新点的经纬度为: (${newLat}, ${newLon})`)

  // 将新的经纬度转换为 Cartesian3
  const newCartographic = new Cesium.Cartographic(lon2, lat2)
  const newCartesian = ellipsoid.cartographicToCartesian(newCartographic)

  // 添加标记点到 Cesium 地图中
  viewer2.entities.add({
    position: newCartesian,
    id: 'mapPoint',
    billboard: {
      scale: 0.5,
      image: './image/components/坐标点.png',
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 设置在地球底部
      disableDepthTestDistance: Number.POSITIVE_INFINITY, // 防止被覆盖
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 26000) // 可视缩放距离范围
    }
  })
}
watch(fullCanvasLine, (newValue) => {
  if (isEmptyObject(newValue)) return
  nextTick(() => {
    getLandByCamera()
  })
}, { deep: true, immediate: true })
watch(cameraFullScreenObj, (newValue) => {
  if (isEmptyObject(newValue)) return
  nextTick(() => {
    getFlyToCamera()
  })
}, { deep: true, immediate: true })

onBeforeUnmount(() => {
  if (cameraSource.entities) cameraSource.entities.removeAll()
  if (wallSource.entities) wallSource.entities.removeAll()
  if (XZQPolylineSource.entities) XZQPolylineSource.entities.removeAll()
  clearInterval(timer)
  clearCamera()
  viewer2.entities.removeById('mapPoint')
  viewer2.entities.removeById('mapPoint2')
  viewer2.eventManager.removeEventListener('CLICK', leftClick)
  // 销毁cesium
  if (Cesium.defined(viewer2)) {
    viewer2.entities.removeAll()
    viewer2.imageryLayers.removeAll()
    viewer2.dataSources.removeAll()
    // viewer.scene.primitives.removeAll()
    // 获取webgl上下文
    let gl = viewer2.scene.context._originalGLContext
    gl.canvas.width = 1
    gl.canvas.height = 1
    viewer2.destroy() // 销毁Viewer实例
    gl.getExtension('WEBGL_lose_context').loseContext()
    gl = null
    const cesiumContainer = document.getElementById('cesiumContainer1')
    if (cesiumContainer) {
      cesiumContainer.remove() // 移除与地图相关的DOM元素
    }
    console.log('--销毁viewer2')
  }
})
</script>

<style scoped>
#cesiumContainer1 {
  width: 100% !important;
  height: 960px !important;

  color: rgb(219, 247, 255)0%, 93%);
}

@media screen and (max-height:953px) {
  #cesiumContainer1 {
    height: 850px !important;
  }
}
</style>
