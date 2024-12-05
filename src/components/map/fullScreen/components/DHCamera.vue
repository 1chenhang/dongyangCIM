<template>
  <div class="video_wrap" ref="videoWrapRef">
    <div id="video_box1" ref="videoRef">
      <div class="video_controller">
        <div class="controller_left">
          <!-- <p @click="quitFullScreen">
            <i class="iconfont icon-tuichuquanping2"></i>退出全屏
          </p> -->
          <!-- <p @click="getFlvVideo">
            <i class="iconfont icon-shuaxin"></i>刷新
          </p> -->
          <!-- <p @click="getFlvVideo">
            <i class="iconfont icon-zhuatu big"></i>抓图
          </p> -->
          <p>
            <i @click="onHandlePTZ('ZOOM_OUT')" class="iconfont icon-jian big"></i>变倍<i @click="onHandlePTZ('ZOOM_IN')"
              class="iconfont icon-jiahao big"></i>
          </p>
          <p @click="getFlvVideo">
            <i class="iconfont icon-jian big"></i>变焦<i class="iconfont icon-jiahao big"></i>
          </p>
          <p @click="getFlvVideo">
            <i class="iconfont icon-jian big"></i>光圈<i class="iconfont icon-jiahao big"></i>
          </p>
        </div>
        <div class="controller_right">
          <p @click="onHandlePTZ('UP_LEFT')"><i class="iconfont icon-zuoshang-yuan"></i></p>
          <p @click="onHandlePTZ('UP')"><i class="iconfont icon-up"></i></p>
          <p @click="onHandlePTZ('UP_RIGHT')"><i class="iconfont icon-youshang-yuan"></i></p>
          <p @click="onHandlePTZ('LEFT')"><i class="iconfont icon-left"></i></p>
          <p @click="isDrawHandler"><i class="iconfont icon-fangda"></i></p>
          <p @click="onHandlePTZ('RIGHT')"><i class="iconfont icon-right"></i></p>
          <p @click="onHandlePTZ('DOWN_LEFT')"><i class="iconfont icon-zuoxia-yuan"></i></p>
          <p @click="onHandlePTZ('DOWN')"><i class="iconfont icon-down"></i></p>
          <p @click="onHandlePTZ('DOWN_RIGHT')"><i class="iconfont icon-youxia-yuan"></i></p>
        </div>
      </div>
      <canvas class="canvas_box" ref="canvasRef" width="400" height="300" @mousedown="startDrawing" @mousemove="draw"
        @mouseup="finishDrawing" @mouseleave="finishDrawing"></canvas>
    </div>

  </div>
</template>

<script setup>
import flvjs from 'flv.js'
import { ref, onMounted, computed, nextTick, defineEmits } from 'vue'
import { ptzControl, exPtzFastGoTo } from '@/api/camera'
import 'xgplayer'
import HlsJsPlugin2 from 'xgplayer-hls.js'
import 'xgplayer/dist/index.min.css'
import emitter from '@/utils/eventBus'
const videoWrapRef = ref(null)
const videoElement = ref(null)
const videoRef = ref(null)
const player = ref()
const enlarge = ref(true)
const cameraObj = ref()
const emits = defineEmits(['clearAll'])
// 使用一个标记来记录是否是全屏模式
const isFullscreen = ref(false)
const isDraw = ref(false)

const isDrawHandler = () => {
  isDraw.value = !isDraw.value
}
// 全屏
const fullScreen = () => {
  player.value.getFullscreen()
  requestAnimationFrame(adjustCanvasSize)
}

const adjustCanvasSize = () => {
  const isNowFullscreen = document.fullscreenElement != null
  if (isNowFullscreen !== isFullscreen.value) {
    if (isNowFullscreen) {
      // 进入全屏
      canvasRef.value.width = screen.width
      canvasRef.value.height = screen.height
    } else {
      nextTick(() => {
        setTimeout(() => {
          const { clientWidth, clientHeight } = videoRef.value
          canvasRef.value.width = clientWidth
          canvasRef.value.height = clientHeight
        }, 0)
      })
    }
    // 更新全屏状态标记
    isFullscreen.value = isNowFullscreen
  }
}

document.addEventListener('fullscreenchange', adjustCanvasSize)

// 退出全屏
const quitFullScreen = () => {
  player.value.exitFullscreen()
}

const getFlvVideo = () => {
  player.value = new window.Player({
    id: 'video_box1',
    url: cameraObj.value.hlsUrl,
    autoplay: true,
    controls: false,
    playsinline: true,
    isLive: true,
    ignores: ['play', 'time', 'repeat', 'poster'], // 忽略特定的插件
    height: '100%',
    width: '100%',
    plugins: [window.HlsJsPlugin]
  })
}

// ptz云台事件
const onHandlePTZ = async (type) => {
  emits('clearAll')
  const params = {
    command: type,
    deviceSn: cameraObj.value.deviceSn,
    speed: 4
  }
  await ptzControl(params)
}

const canvasRef = ref(null)
const ctx = ref()
const isDrawing = ref(false)
let startX = 0
let startY = 0
const rect = ref({ x: 0, y: 0, width: 0, height: 0 })
let x1 = 0
let x2 = 0
let y1 = 0
let y2 = 0
// 鼠标按下
const startDrawing = (event) => {
  const { offsetX, offsetY, x, y } = event
  startX = offsetX
  startY = offsetY
  x1 = x
  y1 = y
  isDrawing.value = true
}

// 鼠标移动
const draw = (event) => {
  if (!isDrawing.value) return
  if (!isDraw.value) return
  const canvas = canvasRef.value
  ctx.value = canvas.getContext('2d')
  const { offsetX, offsetY } = event
  if (startY < offsetY) {
    enlarge.value = true
  } else if (startY > offsetY) {
    enlarge.value = false
  }

  canvas.getContext('2d')
  const width = offsetX - startX
  const height = offsetY - startY
  ctx.value.clearRect(0, 0, canvas.width, canvas.height) // 清空Canvas

  if (isDraw.value) {
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
  const { x, y } = event
  x2 = x
  y2 = y
  isDrawing.value = false
  quickPos()
}

// 计算矩形中心点坐标
const center = computed(() => {
  const x = rect.value.x + rect.value.width / 2
  const y = rect.value.y + rect.value.height / 2
  // console.log(x, y, '12313123', videoRef.value)
  // quickPos(x,y);
})
const quickPos = async (x, y) => {
  const { clientWidth, clientHeight } = videoRef.value
  const params = {
    viewBox: [clientWidth, clientHeight] + '',
    deviceSn: cameraObj.value.deviceSn,
    x1y1: [x1, y1] + '',
    x2y2: [x2, y2] + ''
  }
  ctx.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height) // 清空Canvas
  const res = await exPtzFastGoTo(params)
}
onMounted(() => {
  emitter.on('drawHandler', (e) => {
    isDraw.value = e
  })
  emitter.on('cameraObj', (e) => {
    cameraObj.value = e
    getFlvVideo()
  })
  emitter.on('bannerFlag', (e) => {
  })
  const canvas = canvasRef.value
  canvas.addEventListener('mousedown', startDrawing)
  canvas.addEventListener('mousemove', draw)
  canvas.addEventListener('mouseup', finishDrawing)
  canvas.addEventListener('mouseleave', finishDrawing)
})

</script>

<style lang="less" scoped>
.video_wrap {
  position: relative;
  height: 100%;
}

#video_box {
  position: relative !important;
  object-fit: cover;
}

.canvas_box {
  position: absolute;
  left: 0;
  top: 0;
}

.video_controller {
  position: absolute;
  width: 100%;
  bottom: 0px;
  display: flex;
  cursor: pointer;
  padding: 0px 50px;
  box-sizing: border-box;
  z-index: 999999;
  color: #fff;
  background-color: rgba(49, 49, 49, 0.5);

  .controller_left {
    display: flex;
    line-height: 100px;
    font-size: 22px;

    i {
      font-size: 23px;
      margin-right: 10px;
      margin-left: 10px;
    }

    .big {
      font-size: 28px;
    }

    p {
      margin-right: 20px;
    }
  }

  .controller_center {
    line-height: 100px;

    span {
      margin-left: 8px;
    }

    .span1 {
      margin-right: 22px;
    }
  }

  .controller_right {
    width: 160px;
    display: flex;
    flex-wrap: wrap;
    margin-left: 50px;

    i {
      font-size: 28px;
    }

    p {
      &:nth-child(3n+1) {
        /* targeting every 3rd element starting from 1st - left elements */
        padding-right: 35px;
        padding-bottom: 10px;
      }

      &:nth-child(3n+3) {
        /* targeting every 3rd element starting from 3rd - right elements */
        padding-left: 35px;
        padding-bottom: 10px;
      }
    }
  }
}
</style>
