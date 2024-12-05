<template>
    <div class="container_box">
      <div @dblclick="handleDoubleClick" class="video_wapper">
        <DHPlayers ref="childVideo" @clearAll="clearAllCanvas" />
        <canvas class="canvas" ref="canvas" width="400" height="325" @mousedown.left="addPoint"
          @contextmenu.right.prevent="connectPoints" @mousedown="startDrawing" @mousemove="draw"
          @mouseup="finishDrawing" @mouseleave="finishDrawing"></canvas>
      </div>
      <div class="video_controller">
        <div class="controller_left">
          <img @click="clearAllCanvas" src="../../../../../public/image//earlyWarningAnalysis/Union.png">
          <img @click="screenClick" src="../../../../../public/image//earlyWarningAnalysis/fdhm.png">
          <img @click="reloadPlayer" src="../../../../../public/image/earlyWarningAnalysis/sx.png">
        </div>
        <div class="controller_right">
          <el-switch v-model="quickSwitchValue" class="ml-2" style="--el-switch-on-color: #1F6BC1D6;" />
          <span class="span1">快速定位</span>
          <!-- <el-switch v-model="value2" class="ml-2" @change="onStartEnlarge2" style="--el-switch-on-color: #1F6BC1D6; " />
          <span class="span2">视频定位</span> -->
        </div>
      </div>

      <!-- <el-dialog append-to-body v-model="screenFLag" class="fullDialog">
        <FullScreen />
      </el-dialog> -->
    </div>
  </template>

<script setup>
import { ref, onMounted, onBeforeUnmount, provide, defineProps, toRefs, watch } from 'vue'
import DHPlayers from '@/components/DHCamera/h5players.vue'
//   import FullScreen from './fullScreen/index.vue'
import { isEmptyObject, errorNotification } from '@/utils/utils'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { getPtzPointMove, exPtzFastGoTo } from '@/api/camera'
import $bus from '@/utils/eventBus.js'
const Router = useRouter()
const activeName = ref('third')
const quickSwitchValue = ref(false)
const btnFlag = ref(false)
const points = ref([])
const childVideo = ref()
const canvas = ref(null)
const landQuery = ref({})
const centerPoint = ref({})
const props = defineProps({
  cameraObj: {
    type: Object,
    default: () => {}
  }
})
const { cameraObj } = toRefs(props)
const isDrawing = ref(false)
const enlarge = ref(true)
let ctx = null
let isDraw = false
let startX = 0
let startY = 0
const rect = ref({ x: 0, y: 0, width: 0, height: 0 })
let x1 = 0
let x2 = 0
let y1 = 0
let y2 = 0

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
    ctx.lineWidth = 2
    ctx.strokeStyle = 'red'
  }

  $bus.on('showLand', async (params) => {
    landQuery.value = params
    setTimeout(() => {
      clearAllCanvas()
      const coord = JSON.parse(params.coords)
      coord.forEach(item => {
        item.forEach(cItem => {
          points.value.push({
            x: cItem[0],
            y: cItem[1]
          })
        })
      })
      connectPoints()
    }, 1000)
    await getPtzPointMove({ presetId: params.params.cameraPresetInfo[0].presetIndex, deviceSn: params.params.cameraPresetInfo[0].deviceSn })
  })
})
onBeforeUnmount(() => {
  $bus.off('showLand')
})
// <!-- 矩形快速定位开始 -->
// 鼠标按下
const startDrawing = (event) => {
  if (!quickSwitchValue.value) return
  const { offsetX, offsetY } = event
  startX = offsetX
  x1 = offsetX
  startY = offsetY
  y1 = offsetY
  isDrawing.value = true
}
// 鼠标移动
const draw = (event) => {
  if (!isDrawing.value) return
  ctx.value = canvas.value.getContext('2d')
  const { offsetX, offsetY } = event
  if (startY < offsetY) {
    enlarge.value = true
  } else if (startY > offsetY) {
    enlarge.value = false
  }

  canvas.value.getContext('2d')
  const width = offsetX - startX
  const height = offsetY - startY
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height) // 清空Canvas
  if (isDrawing.value) {
    // 绘制矩形
    ctx.value.beginPath()
    ctx.value.rect(startX, startY, width, height)
    ctx.value.strokeStyle = 'red'
    ctx.value.stroke()
    // 更新矩形数据
    rect.value = { x: startX, y: startY, width, height }
  }
}
// 鼠标松开
const finishDrawing = (event) => {
  if (!isDrawing.value) return
  const { offsetX, offsetY } = event
  x2 = offsetX
  y2 = offsetY
  isDrawing.value = false
  quickPos()
}
const quickPos = async (x, y) => {
  const clientWidth = 400
  const clientHeight = 325
  const params = {
    viewBox: [clientWidth, clientHeight] + '',
    deviceSn: cameraObj.value.deviceSn,
    x1y1: [x1, y1] + '',
    x2y2: [x2, y2] + ''
  }
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height) // 清空Canvas
  if (isEmptyObject(cameraObj.value)) return errorNotification('请先选择摄像头')
  await exPtzFastGoTo(params)
}
// <!-- 矩形快速定位结束 -->
const handleDoubleClick = () => childVideo.value.fullScreen()
const screenClick = () => {
  if (isEmptyObject(cameraObj.value)) return errorNotification('请先选择摄像头')
  const obj = {
    cameraFullScreenObj: JSON.stringify(cameraObj.value),
    fullCanvasLine: JSON.stringify(landQuery.value),
    screenFLag: true
  }
  Router.push({
    path: '/smartEvidence',
    query: obj
  })
}
const showBtn = () => {
  btnFlag.value = !btnFlag.value
  $bus.emit('showBtn', btnFlag.value)
}

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

// 绘制单个点
const drawPoint = (x, y) => {
  if (!ctx) return
  ctx.beginPath()
  ctx.arc(x, y, 3, 0, Math.PI * 2)
  ctx.fillStyle = 'red'
  ctx.fill()
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
  points.value.forEach(item => {
    arr.push([item.x, item.y])
  })
  // $bus.emit('canvasCoord', arr)
}
const handleClick = (tab, event) => {
  console.log(tab, event)
}

const onStartEnlarge2 = (event) => {
  //   emitter.emit('drawHandler', event)
}

const onStartEnlarge = () => {

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
const reloadPlayer = () => {
  if (isEmptyObject(cameraObj.value)) return errorNotification('请先选择摄像头')
  $bus.emit('realplay')
}
</script>

  <style lang="less" scoped>
  .canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }

  .container_box {
    // padding: 12px 12px 15px 12px;
    // margin-top: 20px;
    // height: 416px;
    // color: #FFFFFF;
    // font-size: 14px;
    // box-sizing: border-box;
    // background-image: url('../../../../../public/image/earlyWarningAnalysis/Rectangle 19960.png');
    // background-size: 100% 100%;
    // margin-bottom: 32px;
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

    img {
      width: 100%;
      height: 325px;
    }

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
      }
    }

    .controller_right {
      line-height: 21px;

      span {
        margin-left: 8px;
        color: #fff;
      }

      .span1 {
        margin-right: 22px;
        color: #fff;
      }
    }
  }

  .controller_right /deep/ .el-switch {
    height: 17px;
    margin-top: -2px;
  }

  ::v-deep .el-switch__core {
    border: 1px solid #2A8DE85C;
    background: #01152BD6;
  }

  ::v-deep .el-switch__core .el-switch__action {
    background: linear-gradient(125.74deg, #EDF8FF 24.85%, #448EFC 83.7%);
    box-shadow: 0px0px 5.68px 0px #5397FD7A;
  }

  .controller_right /deep/ .el-switch__core {
    width: 36px;
    height: 17px;
  }

  </style>
  <style lang="less">
  .fullDialog {
    width: 100%;
     height: 100%;
     margin: 0;
    padding: 0;
    background: transparent;

    .el-dialog__header {
      padding: 0;

      .el-dialog__headerbtn {
        z-index: 999;
        font-size: 0px;
        background-image: url('/public/image/components/关闭_icon.png');
        background-repeat: no-repeat;
        background-size: cover;
        width: 30px;
        height: 30px;
        top: 5px;
        right: 5px;

        i {
          color: #333;
        }
      }
    }

    .el-dialog__body {
      height: 100%;
      background: transparent;
    }
  }
  </style>
