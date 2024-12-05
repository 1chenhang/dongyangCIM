<template>
  <!-- 工具栏图标 -->
  <transition name="fade" v-show="showTool">
    <div class="toolBar">
      <div
        v-for="(icon, index) in icons"
        :key="index"
        class="toolbar-item"
        @click="toggleActive(index)"
        :class="{ active: isActive[index] }"
      >
        <i :class="['iconfont', icon.iconName]"></i>
        <span>{{ icon.text }}</span>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, reactive, ref, inject, unref, onUnmounted } from 'vue'
import mapCommon from './js/common2.js'
import $bus from '@/utils/eventBus.js'
const icons = [
  { iconName: 'icon-manyou', text: '漫游' },
  { iconName: 'icon-chizi_o', text: '测距' },
  { iconName: 'icon-shitucemianji', text: '测面' },
  { iconName: 'icon-drawing', text: '画笔' },
  { iconName: 'icon-chaxun', text: '查询' },
  { iconName: 'icon-qingchu', text: '清除' },
  { iconName: 'icon-quanping', text: '全屏' }
]
const showTool = ref(false)
const isActive = ref(Array(icons.length).fill(false))
const viewer = ref()
let tempEntities = []
const toggleActive = (index) => {
  isActive.value = isActive.value.map((item, i) =>
    i === index ? !item : false
  )
  let position = []
  let tempPoints = []
  // 创建场景的HTML canvas元素
  console.log(viewer, '0000000000000000')
  let handler = new Cesium.ScreenSpaceEventHandler(viewer.value.scene.canvas)
  switch (index) {
    case 0:
      break
    case 1:
      // 监听鼠标移动
      handler.setInputAction(function (movement) {},
        Cesium.ScreenSpaceEventType.MOUSE_MOVE)
      // 左键单击开始画线
      handler.setInputAction(function (click) {
        // 获取位置信息
        const ray = viewer.value.camera.getPickRay(click.position)
        position = viewer.value.scene.globe.pick(ray, viewer.value.scene)
        tempPoints.push(position) // 记录点位
        const tempLength = tempPoints.length // 记录点数

        // 调用绘制点的接口
        const point = drawPoint(tempPoints[tempPoints.length - 1])
        tempEntities.push(point)
        // 存在超过一个点时
        if (tempLength > 1) {
          // 绘制线
          const pointline = drawPolyline([
            tempPoints[tempPoints.length - 2],
            tempPoints[tempPoints.length - 1]
          ])
          tempEntities.push(pointline) // 保存记录
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
      // 右键单击结束画线
      handler.setInputAction(function (click) {
        const startPoint = tempPoints[tempPoints.length - 2]
        const endPoint = tempPoints[tempPoints.length - 1]
        // 添加距离标签
        addDistanceLabel(startPoint, endPoint)
        tempPoints = [] // 清空点位记录
        handler.destroy()
        handler = null
        isActive.value[index] = false
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
      break
    case 2:
    case 3:
      // 监听鼠标移动
      handler.setInputAction(function (movement) {},
        Cesium.ScreenSpaceEventType.MOUSE_MOVE)
      // 左键单击开始画线
      handler.setInputAction(function (click) {
        // 获取位置信息
        const ray = viewer.value.camera.getPickRay(click.position)
        position = viewer.value.scene.globe.pick(ray, viewer.value.scene)
        tempPoints.push(position) // 记录点位
        const tempLength = tempPoints.length // 记录点数
        // 调用绘制点的接口
        const point = drawPoint(tempPoints[tempPoints.length - 1])
        tempEntities.push(point)
        // 存在超过一个点时
        if (tempLength > 1) {
          // 绘制线
          const pointline = drawPolyline([
            tempPoints[tempPoints.length - 2],
            tempPoints[tempPoints.length - 1]
          ])
          tempEntities.push(pointline) // 保存记录
          drawPolygon(tempPoints)
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
      // 右键单击结束画面
      handler.setInputAction(function (click) {
        // 选择一个椭球或地图
        const cartesian = viewer.value.camera.pickEllipsoid(
          click.position,
          viewer.value.scene.globe.ellipsoid
        )
        isActive.value[index] = false
        if (cartesian) {
          const tempLength = tempPoints.length
          if (tempLength < 3) {
            alert('闭合操作需要至少3个点嗷')
          } else {
            // 闭合最后一条线
            const pointline = drawPolyline([
              tempPoints[tempPoints.length - 2],
              tempPoints[tempPoints.length - 1]
            ])
            tempEntities.push(pointline)
            drawPolygon(tempPoints)
            tempEntities.push(tempPoints)
            handler.destroy()
            handler = null
          }
        }
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
      break
    case 4:
      break
    case 5:
      clearAllDrawn()
      break
    case 6:
      break
    default:
      break
  }
}
const activeLinePositions = ref([])
const lineEntities = ref([])
// 使用自定义颜色
const myCustomColor = Cesium.Color.fromCssColorString('#00eaff') // 例如，粉红色

const drawPoint = (position) => {
  return viewer.value.entities.add({
    position: position,
    point: {
      pixelSize: 3,
      color: Cesium.Color.WHITE,
      pixelSize: 3,
      outlineWidth: 2,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND // 规定贴地
    }
  })
}

const drawPolyline = (positions) => {
  return viewer.value.entities.add({
    polyline: {
      positions: positions,
      width: 3,
      material: new Cesium.PolylineGlowMaterialProperty({
        glowPower: 0.1, // 发光程度，低一些可能减少条纹
        color: myCustomColor
      }),
      clampToGround: true
    }
  })
}

const drawPolygon = (positions) => {
  if (positions.length < 2) return
  return viewer.value.entities.add({
    name: '面几何对象',
    polygon: {
      hierarchy: positions,
      // eslint-disable-next-line new-cap
      material: new Cesium.ColorMaterialProperty(
        Cesium.Color.WHITE.withAlpha(0.4)
      )
    }
  })
}

const computeSurfaceDistance = (startPoint, endPoint) => {
  // 将笛卡尔坐标转换为经纬度
  const startCartographic = Cesium.Cartographic.fromCartesian(startPoint)
  const endCartographic = Cesium.Cartographic.fromCartesian(endPoint)

  // 创建EllipsoidGeodesic来计算两点之间的地表距离
  const ellipsoidGeodesic = new Cesium.EllipsoidGeodesic(
    startCartographic,
    endCartographic
  )
  return ellipsoidGeodesic.surfaceDistance // 获得地表距离
}

const addDistanceLabel = (startPoint, endPoint) => {
  const distance = Cesium.Cartesian3.distance(startPoint, endPoint)
  // const distance = computeSurfaceDistance(startPoint, endPoint);
  const midPoint = Cesium.Cartesian3.midpoint(
    startPoint,
    endPoint,
    new Cesium.Cartesian3()
  )
  const distanceLabelEntity = viewer.value.entities.add({
    position: midPoint,
    label: {
      text: distance.toFixed(2) + ' m',
      font: '14pt sans-serif',
      fillColor: Cesium.Color.RED,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      outlineWidth: 2,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -9),
      disableDepthTestDistance: Number.POSITIVE_INFINITY, // 禁用深度测试
      scaleByDistance: new Cesium.NearFarScalar(1000, 1, 1500, 0.5), // 在不同距离下调整大小
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000) // 设置显示条件
    }
  })
  tempEntities.push(distanceLabelEntity)
  return distanceLabelEntity
}

// 创建扇形
const createSector = () => {
  const centerLongitude = 114.312015
  const centerLatitude = 30.565938
  const radius = 50.0 // Radius in meters
  const startAngle = -15 // Start angle in degrees
  const endAngle = 15 // End angle in degrees

  mapCommon.createCesiumSector(
    viewer.value,
    centerLongitude,
    centerLatitude,
    radius,
    startAngle,
    endAngle
  )
}

/* 清除实体 */
const clearAllDrawn = () => {
  tempEntities = []
  viewer.value.entities.removeAll()
}

onMounted(() => {
  $bus.on('showTool', (data) => {
    showTool.value = unref(data)
  })
  viewer.value = window.viewer
  createSector()
})
</script>

<style lang="less" scoped>
.toolBar {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 80px;
  width: 350px;
  height: 50px;
  z-index: 10000;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* 上下居中 */
  padding: 0 20px;
  border-radius: 10px;
  border: 1px solid rgb(5, 155, 255);
  background: rgba(0, 19, 39, 0.726);
  box-shadow: 0px 0px 10px 0px rgb(5, 77, 154);
}

.toolbar-item {
  /* 其他样式 */
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.toolbar-item i,
.toolbar-item span {
  transition: color 0.3s;
}

.toolbar-item.active i,
.toolbar-item.active span {
  color: #00eaff;
}
</style>
