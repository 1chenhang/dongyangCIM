<template>
    <div>

    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineEmits } from 'vue'
import { calculateT2, calculateR } from '@/utils/formula'
import { isEmptyObject, errorNotification } from '@/utils/utils'
import { getPtzParam, getPTZGoTo, cameraList } from '@/api/camera'
import mapHelper from '@/utils/mapHelper'
import $bus from '@/utils/eventBus.js'
let timer = null
const CesCenter = ref()
const startAngle = ref(-20)
const endAngle = ref(20)
const sectorRadius = 600 // 扇形半径
const CameraRangeRadius = 700 // 摄像机圆半径
let currentFrame = 0
const totalFrames = 100
const PTZParams = ref({}) // 摄像头初始PTZ的P
const cameraObj = ref({})
const cameraData = ref([])
const clickFn = ref()
const clickFn2 = ref()

const emit = defineEmits(['videoPointEmit'])
onMounted(() => {
  getCameraList()
  viewer.eventManager.addEventListener('CLICK', leftClick, false)
  $bus.on('cameraObj', (params) => {
    cameraObj.value = { ...params }
    getFlyToCamera()
  })
  $bus.on('handleMouseMove', (e) => {
    clickFn.value = e
  })
  $bus.on('handleMouseMove2', (e) => {
    clickFn2.value = e
  })
  // 视频定位,地图扇形区域跟着变化
  $bus.on('changeVideoByMap2', async () => {
    await getCameraPTZ()
    const entity = viewer.entities.getById('CameraSector')
    entity.polyline.positions = generateSectorPositions(CesCenter.value, sectorRadius, startAngle.value, endAngle.value)
    const entity2 = viewer.entities.getById('animateSector')
    entity2.polygon.hierarchy = new Cesium.CallbackProperty(() => {
      return new Cesium.PolygonHierarchy(generateSectorPositions(CesCenter.value, sectorRadius * (currentFrame / totalFrames), startAngle.value, endAngle.value))
    }, false)
    const L = calculateR(CameraRangeRadius, PTZParams.value.tilt)
    if (!L) return
    getMapPoint(L)
  })
})
onBeforeUnmount(() => {
  clearCamera()
  $bus.off('cameraObj')
  $bus.off('handleMouseMove')
  $bus.off('changeVideoByMap2')
  viewer.eventManager.removeEventListener('CLICK', leftClick)
})
// 定位至摄像头并添加高塔 区域模型
const getFlyToCamera = (camera) => {
  clearCamera()
  if (isEmptyObject(cameraObj.value)) return
  console.log(cameraObj.value, '--cameraObj.value')
  const alt = 1440
  const pitch = -29.903065981890872
  const lon = +cameraObj.value.lon
  const lat = +cameraObj.value.lat
  const heading = 1.243931828762447
  const newLat = mapHelper.getOffsetLat({ lat: lat, alt: alt, pitch: pitch })
  mapHelper.flyToByCameraInfo([lon, newLat, alt, heading, pitch, 0])
  viewer.entities.add({
    id: 'CameraModel',
    position: Cesium.Cartesian3.fromDegrees(lon, lat, 0), // 模型的位置
    model: {
      uri: './module/高压塔13.gltf',
      // minimumPixelSize: 500,
      // maximumScale: 10000,
      show: true
    }
  })
  CesCenter.value = Cesium.Cartesian3.fromDegrees(lon, lat)
  console.log(CesCenter.value, '--CesCenter.value ')
  getCameraRange()
  getCameraSector()
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
  viewer.entities.add({
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
  viewer.entities.add({
    id: 'CameraSector',
    polyline: {
      positions: generateSectorPositions(CesCenter.value, sectorRadius, startAngle.value, endAngle.value),
      width: 3,
      material: Cesium.Color.RED,
      clampToGround: true // 将多段线贴地
    }
  })
  // 创建动画扇形面
  viewer.entities.add({
    id: 'animateSector',
    polygon: {
      hierarchy: new Cesium.CallbackProperty(() => {
        return new Cesium.PolygonHierarchy(generateSectorPositions(CesCenter.value, sectorRadius * (currentFrame / totalFrames), startAngle.value, endAngle.value))
      }, false),
      material: Cesium.Color.YELLOW.withAlpha(0.5),
      clampToGround: true // 将多段线贴地
    }
  })
  // 动画循环
  timer = setInterval(() => {
    currentFrame++
    if (currentFrame > totalFrames) {
      currentFrame = 0
    }
  }, 30)
}
// 获取摄像头 PTZ
const getCameraPTZ = async () => {
  const { data, code } = await getPtzParam({ deviceSn: cameraObj.value.deviceSn })
  if (code === '200') {
    // data.pan = Math.round(data.pan)
    PTZParams.value = data
    let newPan
    if (cameraObj.value.brandName === 'HK') {
      newPan = data.pan - cameraObj.value.pan
    } else {
      newPan = cameraObj.value.pan - data.pan
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
  const entity = viewer.entities.getById('CameraSector')
  entity.polyline.positions = positions
  const entity2 = viewer.entities.getById('animateSector')
  entity2.polygon.hierarchy = new Cesium.CallbackProperty(() => {
    return new Cesium.PolygonHierarchy(generateSectorPositions(center, radius * (currentFrame / totalFrames), bearing - (endAngles - startAngles) / 2, bearing + (endAngles - startAngles) / 2))
  }, false)

  startAngle.value = bearing - (endAngles - startAngles) / 2
  endAngle.value = bearing + (endAngles - startAngles) / 2

  if (isEmptyObject(PTZParams.value) || !isGoToPTZ) return
  // 如果 bearing <0 bearing就得+360
  // 三维精确定位
  let newPan
  if (cameraObj.value.brandName === 'HK') {
    newPan = newBearing + cameraObj.value.pan
  } else {
    newPan = cameraObj.value.pan - newBearing
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
    deviceSn: cameraObj.value.deviceSn,
    pan: newPan,
    tilt: newTilt,
    zoom: zoom
  })
  $bus.emit('clearAllCanvas')
  console.log(newBearing, newPan, isGoToPTZ, '--bearingisGoToPTZ')
}
// 获取通过视频打点地图位置点
const getMapPoint = (L) => {
  const pointEntity = viewer.entities.getById('mapPoint')
  if (pointEntity)viewer.entities.removeById('mapPoint')
  const id = 'camera' + cameraObj.value.id
  const cameraSource = viewer.dataSources.getByName('摄像头')[0]
  const entity = cameraSource.entities.getById(id)
  // 获取实体的经纬度
  const positionCartographic = Cesium.Cartographic.fromCartesian(entity.position.getValue())
  const lon1 = Cesium.Math.toDegrees(positionCartographic.longitude)
  const lat1 = Cesium.Math.toDegrees(positionCartographic.latitude)
  // 已知点的经纬度

  // 距离和方向
  const distance = L // 距离，单位为米
  let bearing = startAngle.value + 20 // 方向，单位度
  if (bearing < 0)bearing += 360
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
  const newCartographic = new Cesium.Cartographic(lon2, lat2, 0)
  const newCartesian = ellipsoid.cartographicToCartesian(newCartographic)

  // 添加标记点到 Cesium 地图中
  viewer.entities.add({
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
// 获取摄像头列表
const getCameraList = async () => {
  const { data, code } = await cameraList({})
  if (code === '200') {
    cameraData.value = data
  }
}
const leftClick = (e) => {
  const position = e.message.position
  const pickedPosition = viewer.scene.pickPosition(position)

  if (Cesium.defined(pickedPosition)) {
    console.log(pickedPosition, '--pickedPosition')
    const pickedCartographic = Cesium.Cartographic.fromCartesian(pickedPosition)
    const pickLon = Cesium.Math.toDegrees(pickedCartographic.longitude)
    const pickLat = Cesium.Math.toDegrees(pickedCartographic.latitude)
    if (CesCenter.value) {
      const cartographicPosition = Cesium.Cartographic.fromCartesian(CesCenter.value)
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
        viewer.entities.removeById('mapPoint2')
        updateSector(CesCenter.value, pickedPosition, sectorRadius, true, distance)
        addMapPoint2Entity(pickLon, pickLat)
        emit('videoPointEmit')
      }
    }
    if (clickFn.value) {
      console.log(clickFn.value, '--clickFn.value')
      viewer.entities.removeById('mapPoint2')
      document.removeEventListener('mousemove', clickFn.value)
      $bus.emit('hideText')
      clickFn.value = null
      addMapPoint2Entity(pickLon, pickLat)
      getCameraDistance(pickLon, pickLat, pickedPosition)
    }
    if (clickFn2.value) {
      viewer.entities.removeById('mapPoint3')
      document.removeEventListener('mousemove', clickFn2.value)
      $bus.emit('hideText')
      clickFn2.value = null
      addMapPoint3Entity(pickLon, pickLat)
      getFlyToPoint(pickLon, pickLat)
    }
  }
}
const addMapPoint2Entity = (lon, lat) => {
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(lon, lat, 0),
    id: 'mapPoint2',
    billboard: {
      scale: 0.6,
      image: './image/components/坐标点2.png',
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 设置在地球底部
      disableDepthTestDistance: Number.POSITIVE_INFINITY, // 防止被覆盖
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 26000) // 可视缩放距离范围
    }
  })
}

const addMapPoint3Entity = (lon, lat) => {
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(lon, lat, 0),
    id: 'mapPoint3',
    billboard: {
      scale: 0.2,
      image: './image/components/point-icon01.png',
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 设置在地球底部
      disableDepthTestDistance: Number.POSITIVE_INFINITY, // 防止被覆盖
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 26000) // 可视缩放距离范围
    }
  })
}

// 定位至点位
const getFlyToPoint = (lon, lat) => {
  const alt = 1440
  const pitch = -29.903065981890872
  const heading = 1.243931828762447
  const newLat = mapHelper.getOffsetLat({ lat: lat, alt: alt, pitch: pitch })
  mapHelper.flyToByCameraInfo([lon, newLat, alt, heading, pitch, 0])
}

const getCameraDistance = (pickLon, pickLat, pickedPosition) => {
  const distanceArr = []
  cameraData.value.forEach(item => {
    distanceArr.push(mapHelper.calculateDistance(
      {
        lng: item.lon,
        lat: item.lat
      },
      {
        lng: pickLon,
        lat: pickLat
      }
    ))
  })
  const minDistance = Math.min(...distanceArr)
  const cameraIndex = distanceArr.findIndex(item => item === minDistance)
  const camera = cameraData.value[cameraIndex]
  camera.type = '摄像头'
  $bus.emit('cameraClick', camera)
  setTimeout(() => {
    getFlyToCamera()
    setTimeout(() => {
      addMapPoint2Entity(pickLon, pickLat)
      updateSector(CesCenter.value, pickedPosition, sectorRadius, true, minDistance)
    }, 8000)
  }, 2000)
}
const clearCamera = () => {
  clearInterval(timer)
  viewer.entities.removeById('CameraRange')
  viewer.entities.removeById('CameraSector')
  viewer.entities.removeById('animateSector')
  viewer.entities.removeById('CameraModel')
  viewer.entities.removeById('mapPoint')
  viewer.entities.removeById('mapPoint2')
}
</script>

<style lang="less" scoped>

</style>
