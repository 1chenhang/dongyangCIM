<template>
  <div class="container_box">
    <div class="video_title">
      <img src="../../../../public/image//earlyWarningAnalysis/jkbt.png" />
      <span>{{ cameraName }}</span>
    </div>
    <div @dblclick="handleDoubleClick" class="video_wapper">
      <DHPlayers ref="childVideo" @clearAll="clearAllCanvas" />
      <canvas class="canvas" ref="canvas" width="400" height="325" @mousedown="startDrawing"></canvas>
      <!-- <canvas class="canvas2" ref="canvas2" width="400" height="325" @mousedown="startDrawing">
      </canvas> -->
      <div :style="{ top: centerPoint.y + 'px', left: centerPoint.x + 'px' }" class="landText">
        {{ landParams.check ? landParams.dkmc : "" }}
      </div>
      <img v-show="videoPointShow" class="videoPoint" src="../../../../public/image/components/坐标点2.png" alt="" />
    </div>
    <div class="video_controller">
      <div class="controller_left">
        <img @click="clearAllCanvas" src="../../../../public/image//earlyWarningAnalysis/Union.png" />
        <img @click="screenClick" title="放大" src="../../../../public/image//earlyWarningAnalysis/fdhm.png" />
        <!-- <img @click="resetDrawing" title="清空" src="../../../../public/image/earlyWarningAnalysis/sx.png">
        <img @click="startDarwLine" class="img2" title="测距" src="../../../../public/image/earlyWarningAnalysis/ruler.png">
        <img @click="startDarwPolen" class="img1" title="测面"  src="../../../../public/image/earlyWarningAnalysis/area.png"> -->
      </div>
      <!-- <div class="controller_right">
        <el-switch v-model="mapSwitch" class="ml-2" @change="onStartEnlarge" style="--el-switch-on-color: #1F6BC1D6;" />
      <div class="controller_right">
        <el-switch
          v-model="mapSwitch"
          class="ml-2"
          @change="onStartEnlarge"
          style="--el-switch-on-color: #1f6bc1d6"
        />
        <span class="span1">地图定位</span>
        <el-switch
          v-model="videoSwitch"
          class="ml-2"
          @change="onStartEnlarge2"
          style="--el-switch-on-color: #1f6bc1d6"
        />
        <span class="span2">视频定位</span>
      </div> -->
    </div>

    <BaseDialog1 v-if="massifDialog" @closeDialog="closeDialog" :styles="massifStyles" :title="'监控画面'">
      <template v-slot:content>
        <DHPlayers2 @clearAll="clearAllCanvas" />
        <canvas class="canvas3" ref="canvas3" @mousedown="startDrawing"></canvas>
        <canvas class="canvas2" ref="canvas2" @mousedown="startDrawing">
        </canvas>
        <cameraController />
        <!--折叠按钮-->
        <div v-drag :class="['toolBanner', isOpenTool ? 'isOpenActive' : '']">
          <div @click="isOpenClick" :class="['toolBox', isOpenTool ? 'toolBg' : '']">
            <img :src="require('/public/image/components/toolIcon1.png')" alt="" />
          </div>
          <div @click="toolClick(item)" v-for="item in toolList"
            :class="['tool', item.name === toolName ? 'toolActive' : '']" :key="item.name">
            <i :class="['iconfont', item.icon]"></i>
          </div>
        </div>
      </template>
    </BaseDialog1>
    <MapCamera @videoPointEmit="videoPointEmit" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, provide, watch, nextTick } from 'vue'
import DHPlayers from '@/components/DHCamera/h5players.vue'
import DHPlayers2 from '@/components/DHCamera/h5players2.vue'
import { isEmptyObject, errorNotification, warnNotification } from '@/utils/utils'
import MapCamera from './mapCamera.vue'
import { ElNotification } from 'element-plus'
import { getPtzPointMove, getPreviewUrl, exPtzFastGoTo, getPtzParam, getPTZGoTo } from '@/api/camera'
import $bus from '@/utils/eventBus.js'
import { useRouter } from 'vue-router'
import BaseDialog1 from '@/components/BaseDialog2'
import cameraController from '@/components/DHCamera/cameraController.vue'
const Router = useRouter()
const activeName = ref('third')
const isOpenTool = ref(false)
const mapSwitch = ref(false)
const videoSwitch = ref(false)
const cameraName = ref('')
const btnFlag = ref(false)
const points = ref([])
const childVideo = ref()
const cameraObj = ref({})
const canvas = ref(null)
const landParams = ref({})
const landQuery = ref({})
const centerPoint = ref({})
const canvas2 = ref(null)
const canvas3 = ref(null)
const lineLength = ref()
const videoPointShow = ref(false)
const massifStyles = ref({
  width: '85%',
  height: '85%',
  top: '10%',
  right: '8%'
})
const isOpenClick = () => {
  isOpenTool.value = !isOpenTool.value
}
const toolList = ref([
  {
    name: '测距',
    icon: 'icon-chizi_o'
  },
  {
    name: '绘制面',
    icon: 'icon-shitucemianji'
  },
  {
    name: '快速定位',
    icon: 'icon-manyou'
  },
  {
    name: '清除',
    icon: 'icon-qingchu'
  }
])
const toolClick = (item) => {
  if (item.name == '测距') {
    startDarwLine()
  }
  if (item.name == '绘制面') {
    startDarwPolen()
  }
  if (item.name == '清除') {
    resetDrawing()
  }
  if (item.name == '快速定位') {
    resetDrawing()
    quickPosition.value = true
  } else {
    quickPosition.value = false
  }
}
const quickPosition = ref(false)
const massifDialog = ref(false)
onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
    ctx.lineWidth = 2
    ctx.strokeStyle = 'red'
  }

  if (canvas2.value) {
    canvas2.value.width = canvas2.value.offsetWidth // 设置 canvas 的宽度
    canvas2.value.height = canvas2.value.offsetHeight // 设置 canvas 的高度
    ctx2 = canvas2.value.getContext('2d')
    ctx2.lineWidth = 2
    ctx2.strokeStyle = 'red'
    ctx2.clearRect(0, 0, canvas2.value.width, canvas2.value.height)
  }

  $bus.on('showLand', async (params) => {
    landQuery.value = params
    setTimeout(() => {
      clearAllCanvas()
      const coord = JSON.parse(params.coords)
      coord.forEach((item) => {
        item.forEach((cItem) => {
          points.value.push({
            x: cItem[0],
            y: cItem[1]
          })
        })
      })
      connectPoints()
    }, 1000)
    await getPtzPointMove({
      presetId: params.params.cameraPresetInfo[0].presetIndex,
      deviceSn: params.params.cameraPresetInfo[0].deviceSn
    })
  })
  $bus.on('cameraObj', async (params) => {
    cameraObj.value = params
    cameraName.value = params.deviceName

    console.log(cameraName.value, 'cameraName.value')

    await getCameraPTZ()
    clearAllCanvas()
    resetDrawing()
  })
  $bus.on('showLandText', (params) => {
    if (!params) return
    const coord = JSON.parse(params.cameraPresetInfo[0].coords)
    const arr = []
    coord.forEach((item) => {
      item.forEach((cItem) => {
        arr.push({
          x: cItem[0],
          y: cItem[1]
        })
      })
    })
    centerPoint.value = calculateCentroid(arr)
    landParams.value = params
  })

  if (isEmptyObject(cameraObj.value)) { return errorNotification('请先选择摄像头') }
})
onBeforeUnmount(() => {
  $bus.off('showLand')
  $bus.off('cameraObj')
  $bus.off('showLandText')
})
const handleDoubleClick = () => childVideo.value.fullScreen()
const screenClick = () => {
  if (isEmptyObject(cameraObj.value)) { return errorNotification('请先选择摄像头') }
  massifDialog.value = true
  setTimeout(async () => {
    console.log(cameraObj.value, 'cameraObj.valuecameraObj.value')
    const hlsUrl = await getHlsUrl(cameraObj.value.deviceSn)
    $bus.emit('cameraObj22', { ...cameraObj.value, hlsUrl: hlsUrl })
  }, 100)
  // 收起工具箱
  $bus.emit('foldtool', false)
}
const closeDialog = () => {
  massifDialog.value = false
  // 收起工具箱
  $bus.emit('foldtool', true)
}
const getHlsUrl = async (deviceSn) => {
  const { data } = await getPreviewUrl({ deviceSn: deviceSn, streamType: 1 })
  console.log(data)
  return data?.previewUrl || 'test1.url' // 本地测试用
}
const showBtn = () => {
  btnFlag.value = !btnFlag.value
  $bus.emit('showBtn', btnFlag.value)
}

let ctx = null
let ctx3 = null
let isDraw = false
// 绘制点
const addPoint = (e) => {
  return // 暂时关闭画线功能
  if (!isDraw) points.value = []
  isDraw = true
  const x = e.offsetX
  const y = e.offsetY
  points.value.push({ x, y })
  drawPoint(x, y)
}
let points2 = []
let ctx2 = null
let isDrawing = false
const isLine = ref(false)
const isPolen = ref(false)

const startDarwLine = () => {
  resetDrawing()
  isLine.value = true
  isPolen.value = false
  isDrawing = true
  drawLine(points2[points2.length - 2], points2[points2.length - 1])
}
const startDarwPolen = () => {
  resetDrawing()
  isDrawing = true
  isPolen.value = true
  isLine.value = false
  drawPolygon()
}
watch(quickPosition, (newVal) => {
  if (newVal) {
    // 等待画布显示后重新初始化宽高，并绘制内容
    nextTick(() => {
      if (canvas3.value) {
        canvas3.value.width = canvas3.value.offsetWidth
        canvas3.value.height = canvas3.value.offsetHeight
        ctx3 = canvas3.value.getContext('2d')
        ctx3.lineWidth = 2
        ctx3.strokeStyle = 'red'
        ctx2.clearRect(0, 0, canvas3.value.width, canvas3.value.height)
      }
    })
  }
})

watch(massifDialog, (newVal) => {
  if (newVal) {
    // 等待画布显示后重新初始化宽高，并绘制内容
    nextTick(() => {
      if (canvas2.value) {
        canvas2.value.width = canvas2.value.offsetWidth
        canvas2.value.height = canvas2.value.offsetHeight
        ctx2 = canvas2.value.getContext('2d')
        ctx2.lineWidth = 2
        ctx2.strokeStyle = 'red'
        ctx2.clearRect(0, 0, canvas2.value.width, canvas2.value.height)
        // 重新绘制之前的内容，或初始化新绘制
      }
    })
  }
})

const startDrawing = (event) => {
  const { offsetX, offsetY } = event
  clearAllCanvas()
  console.log('开启快速定位')
  drawPoint2(offsetX, offsetY)
  quickPos(offsetX, offsetY)
  clearPoints()
  videoPointShow.value = true

  if (quickPosition.value) {
    drawPoint4(offsetX, offsetY)
    quickPos4(offsetX, offsetY)
  }

  // 检查是否已经在绘制，如果是，添加新点并绘制线段
  if (isDrawing) {
    const rect = canvas2.value.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    points2.push({ x, y })

    // 清空画布以绘制新的形状
    ctx2.clearRect(0, 0, canvas2.value.width, canvas2.value.height)

    // 重新绘制所有点
    points2.forEach((point) => drawPoint3(point.x, point.y))

    // 如果点数超过1，绘制线段
    if (points2.length > 1 && isLine.value) {
      if (points2.length > 2 && isLine.value) {
        resetDrawing()
        console.log('清空')
      }
      drawLine(points2[points2.length - 2], points2[points2.length - 1])
    }

    // 如果点数超过2，绘制多边形
    if (points2.length > 2 && isPolen.value) {
      drawPolygon()
    }
  }
}
const drawLine = async () => {
  if (points2.length >= 2) {
    ctx2.beginPath()
    ctx2.strokeStyle = 'red' // 设置线条颜色为红色
    ctx2.lineWidth = 2
    ctx2.moveTo(points2[0].x, points2[0].y)
    ctx2.lineTo(points2[1].x, points2[1].y)
    ctx2.stroke()
    if (points2.length <= 2) {
      // 计算两点 X Y坐标的差
      const dataX = points2[0].x - points2[1].x
      const dataY = points2[0].y - points2[1].y

      console.log(dataX, dataY)
      // 求差值的平方
      const deltaXSquared = dataX ** 2
      const deltaYSquared = dataY ** 2
      console.log(deltaXSquared, deltaYSquared)
      const deltaValue = Math.sqrt(deltaXSquared + deltaYSquared)
      const zoomResult = 4.32 * zoomVlaue.value
      console.log(deltaValue, zoomResult)
      lineLength.value = (deltaValue / zoomResult).toFixed(2)
      // 计算文本位置
      const textX = (points2[0].x + points2[1].x) / 2
      const textY = (points2[0].y + points2[1].y) / 2

      ctx2.font = 'bold 14px Arial'
      const text = `${lineLength.value} ㎡`
      const textWidth = ctx2.measureText(text).width
      const textHeight = 16 // 估计文本高度，14px 字体大约是 16px 高

      // 绘制带背景色的矩形
      ctx2.fillStyle = 'rgba(255, 255, 255, 0.7)' // 背景色（白色，带 0.7 的透明度）
      ctx2.fillRect(
        textX - textWidth / 2 - 4,
        textY + 20 - textHeight / 2 - 4,
        textWidth + 8,
        textHeight + 8
      )

      // 绘制文本
      ctx2.fillStyle = '#ff0000'
      ctx2.fillText(
        text,
        textX - textWidth / 2,
        textY + 20 + textHeight / 2 - 4
      )

      console.log(lineLength.value, '距离')
    }
  }
}
const zoomVlaue = ref({}) // 摄像头初始PTZ的Z值
// 获取摄像头 PTZ
const getCameraPTZ = async () => {
  const { data, code } = await getPtzParam({
    deviceSn: cameraObj.value.deviceSn
  })

  if (code === '200') {
    zoomVlaue.value = data.zoom
    console.log(zoomVlaue.value, 'PTZParams.value')
  }
}

const drawPolygon = () => {
  if (points2.length > 2) {
    ctx2.beginPath()
    ctx2.strokeStyle = 'red' // 设置线条颜色为红色
    ctx2.lineWidth = 2
    ctx2.moveTo(points2[0].x, points2[0].y)

    for (let i = 1; i < points2.length; i++) {
      ctx2.lineTo(points2[i].x, points2[i].y)
    }

    console.log(points2, '测面')
    ctx2.lineTo(points2[0].x, points2[0].y) // 闭合路径
    ctx2.stroke()
    ctx2.closePath()

    const s1 = calculateS1(points2)
    const s2 = calculateS2(points2)
    // 计算s1 s2 差的绝对值
    const s = Math.abs(s1 - s2) / 2
    const constant = 4.32 * zoomVlaue.value
    const result = (s / constant ** 2).toFixed(2)

    // 计算文本位置
    const textX = (points2[0].x + points2[1].x) / 2
    const textY = (points2[0].y + points2[1].y) / 2

    ctx2.font = 'bold 14px Arial'
    const text = `${result} ㎡`
    const textWidth = ctx2.measureText(text).width
    const textHeight = 16 // 估计文本高度，14px 字体大约是 16px 高

    // 绘制带背景色的矩形
    ctx2.fillStyle = 'rgba(255, 255, 255, 0.7)' // 背景色（白色，带 0.7 的透明度）
    ctx2.fillRect(
      textX - textWidth / 2 - 4,
      textY + 20 - textHeight / 2 - 4,
      textWidth + 8,
      textHeight + 8
    )

    // 绘制文本
    ctx2.fillStyle = '#ff0000'
    ctx2.fillText(text, textX - textWidth / 2, textY + 20 + textHeight / 2 - 4)
  }
}

const calculateS1 = (points) => {
  let s1 = 0
  const n = points.length
  for (let i = 0; i < n; i++) {
    const nextIndex = (i + 1) % n // 循环到最后一个元素后回到第一个元素
    s1 += points[i].x * points[nextIndex].y
  }

  return s1
}

const calculateS2 = (points) => {
  let s2 = 0
  const n = points.length
  for (let i = 0; i < n; i++) {
    const prevIndex = i === 0 ? n - 1 : i - 1 // 第一个元素的前一个元素是最后一个元素
    s2 += points[i].x * points[prevIndex].y
  }
  return s2
}

const resetDrawing = () => {
  if (ctx2) {
    ctx2.clearRect(0, 0, canvas2.value.width, canvas2.value.height) // 清除画布
  }
  points2 = [] // 清空点的数组
  isDrawing = false // 重置绘制状态
  isLine.value = false
  isPolen.value = false
}

// 绘制单个点
const drawPoint3 = (x, y) => {
  if (!ctx2) return
  ctx2.beginPath()
  ctx2.arc(x, y, 3, 0, Math.PI * 2)
  ctx2.fillStyle = 'orange'
  ctx2.fill()
}

// 快速定位
const quickPos = async (x, y) => {
  if (isEmptyObject(cameraObj.value)) return warnNotification('请先选择摄像头')
  const { clientWidth, clientHeight } = canvas.value
  const params = {
    viewBox: [clientWidth, clientHeight] + '',
    deviceSn: cameraObj.value.deviceSn,
    x1y1: [x, y] + '',
    x2y2: [x, y] + ''
  }
  await exPtzFastGoTo(params)
  $bus.emit('changeVideoByMap2')
}
const quickPos4 = async (x, y) => {
  if (isEmptyObject(cameraObj.value)) return warnNotification('请先选择摄像头')
  const { clientWidth, clientHeight } = canvas3.value
  const params = {
    viewBox: [clientWidth, clientHeight] + '',
    deviceSn: cameraObj.value.deviceSn,
    x1y1: [x, y] + '',
    x2y2: [x, y] + ''
  }
  await exPtzFastGoTo(params)

  $bus.emit('changeVideoByMap2')
}

// 绘制单个点
const drawPoint2 = (x, y) => {
  if (!ctx) return
  ctx.beginPath()
  ctx.arc(x, y, 3, 0, Math.PI * 2)
  ctx.fillStyle = 'orange'
  ctx.fill()
  // 1秒后清除该点
  setTimeout(() => {
    // 清除指定区域，这里假设清除的区域是10x10像素
    ctx.clearRect(x - 5, y - 5, 10, 10)
  }, 300)
}

// 绘制单个点
const drawPoint4 = (x, y) => {
  if (!ctx3) return
  ctx3.beginPath()
  ctx3.arc(x, y, 3, 0, Math.PI * 2)
  ctx3.fillStyle = 'orange'
  ctx3.fill()
  // 1秒后清除该点
  setTimeout(() => {
    // 清除指定区域，这里假设清除的区域是10x10像素
    ctx3.clearRect(x - 5, y - 5, 10, 10)
  }, 300)
}
// 清除所有点
const clearPoints = () => {
  if (!ctx) return
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
}
const clearAllCanvas = () => {
  points.value = []
  clearPoints()
}
// 连接所有点
const connectPoints = () => {
  if (!ctx || points.value.length < 2) return
  clearPoints()
  ctx.beginPath()
  ctx.moveTo(points.value[0].x, points.value[0].y)
  for (let i = 1; i < points.value.length; i++) {
    ctx.lineTo(points.value[i].x, points.value[i].y)
  }
  ctx.stroke()
  isDraw = false
  const arr = []
  points.value.forEach((item) => {
    arr.push([item.x, item.y])
  })
  // $bus.emit('canvasCoord', arr)
}
const handleClick = (tab, event) => {
  console.log(tab, event)
}

function calculateCentroid (vertices) {
  let signedArea = 0
  let Cx = 0
  let Cy = 0
  const n = vertices.length
  for (let i = 0; i < n; i++) {
    const x0 = vertices[i].x
    const y0 = vertices[i].y
    const x1 = vertices[(i + 1) % n].x
    const y1 = vertices[(i + 1) % n].y

    const a = x0 * y1 - x1 * y0
    signedArea += a
    Cx += (x0 + x1) * a
    Cy += (y0 + y1) * a
  }

  signedArea *= 0.5
  Cx = Cx / (6 * signedArea)
  Cy = Cy / (6 * signedArea)

  return { x: +Cx.toFixed(2), y: +Cy.toFixed(2) }
}
const videoPointEmit = () => {
  videoPointShow.value = true
  clearAllCanvas()
}
</script>

<style lang="less" scoped>
.canvas {
  position: absolute;
  top: 35px;
  left: 0;
  z-index: 10;
  width: 100%;
  height: calc(100% - 35px);
}

.canvas2 {
  position: absolute;
  top: 35px;
  left: 0;
  z-index: 11;
  width: 100%;
  height: calc(100% - 35px);
}

.canvas3 {
  position: absolute;
  top: 35px;
  left: 0;
  z-index: 11;
  width: 100%;
  height: calc(100% - 35px);
}

.line_txt {
  position: absolute;
  top: 10px;
  left: 0;
  z-index: 100;
}

.container_box {
  padding: 12px 12px 15px 12px;
  margin-top: 20px;
  height: 416px;
  color: #ffffff;
  font-size: 14px;
  box-sizing: border-box;
  background-image: url("../../../../public/image/earlyWarningAnalysis/Rectangle 19960.png");
  background-size: 100% 100%;
  margin-bottom: 32px;
}

.video_title {
  display: flex;
  margin-left: 3px;
  margin-bottom: 10px;

  span {
    margin-left: 4.83px;
  }
}

.video_wapper {
  height: 325px;
  margin-bottom: 12px;
  position: relative;

  // img {
  //   width: 100%;
  //   height: 325px;
  // }
}

.video_controller {
  display: flex;
  justify-content: space-between;

  .controller_left {
    display: flex;

    img {
      width: 18px;
      height: 18px;
      margin-right: 12px;
      cursor: pointer;
    }

    .img1 {
      width: 17px;
      height: 17px;
    }

    .img2 {
      width: 19px;
      height: 19px;
    }
  }

  .controller_right {
    line-height: 21px;

    span {
      margin-left: 8px;
    }

    .span1 {
      margin-right: 22px;
    }
  }
}

.controller_right /deep/ .el-switch {
  height: 17px;
  margin-top: -2px;
}

::v-deep .el-switch__core {
  border: 1px solid #2a8de85c;
  background: #01152bd6;
}

::v-deep .el-switch__core .el-switch__action {
  background: linear-gradient(125.74deg, #edf8ff 24.85%, #448efc 83.7%);
  box-shadow: 0px0px 5.68px 0px #5397fd7a;
}

.controller_right /deep/ .el-switch__core {
  width: 36px;
  height: 17px;
}

.landText {
  position: absolute;
  z-index: 11;
  pointer-events: none;
  font-size: 12px;
  color: #af0404;
}

.videoPoint {
  width: 32px;
  height: 32px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>

<style lang="less" scoped>
.toolBanner {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 500px;
  top: 111px;
  z-index: 11;
  width: 46px;
  height: 46px; // 408
  overflow: hidden;
  transition: all 0.3s;

  .toolBox {
    min-width: 46px;
    min-height: 46px;
    background-image: url("/public/image/components/工具箱_bg1.png");
    background-color: #06314e;

    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      filter: brightness(200%);
    }
  }

  .toolBg {
    background-image: url("/public/image/components/工具箱_bg2.png");
  }

  .tool {
    background-image: url("/public/image/components/toolIconBg.png");
    background-size: cover;
    background-repeat: no-repeat;
    width: 38px;
    min-height: 38px;
    margin-bottom: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      filter: brightness(200%);
    }

    color: #fff;

    i {
      font-size: 22px;
    }
  }

  .toolActive {
    background-image: url("/public/image/components/toolIconBg2.png");
  }
}

.isOpenActive {
  height: 500px !important;
}
</style>
