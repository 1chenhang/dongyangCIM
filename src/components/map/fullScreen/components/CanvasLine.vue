<template>
  <canvas class="canvas" ref="canvas" width="885" height="850" @mousedown="startDrawing"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, inject, watch, nextTick, defineProps, toRefs } from 'vue'
import { getPtzPointMove, ptzControl, exPtzFastGoTo } from '@/api/camera'
import { isEmptyObject, warnNotification } from '@/utils/utils'
import $bus from '@/utils/eventBus.js'
const points = ref([
  {
    x: 128,
    y: 83
  },
  {
    x: 217,
    y: 87
  },
  {
    x: 219,
    y: 212
  },
  {
    x: 133,
    y: 192
  },
  {
    x: 129,
    y: 81
  }
])
const fullCanvasLine = inject('fullCanvasLine')
const cameraFullScreenObj = inject('cameraFullScreenObj')
const initWidth = 885 / 400
const initHeight = 850 / 325
const moreCoords = ref([])
const canvas = ref(null)
const cameraObj = ref({})
let ctx = null

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
    ctx.lineWidth = 2
    ctx.strokeStyle = 'red'
  }
  $bus.on('cameraObj', () => {
    clearAllCanvas()
  })
  $bus.on('clearAllCanvas', () => {
    clearAllCanvas()
  })
  $bus.on('sliderChange', async (query) => {
    const { sliderParams } = query
    const data = moreCoords.value.find(item => (+item.x === sliderParams.x && +item.y === sliderParams.y && +item.z === sliderParams.z))
    console.log(data, moreCoords, sliderParams, '--------e')
    if (data) {
      await getPtzPointMove({ presetId: data.presetIndex, deviceSn: data.deviceSn })
      filterCoord(data.coords)
    } else {
      clearAllCanvas()
      cameraControl(query)
    }
  })
  $bus.on('landCoordInfo', (newValue) => {
    nextTick(async () => {
      moreCoords.value = newValue.params.cameraPresetInfo
      if (!moreCoords.value) return
      console.log(moreCoords.value, '--moreCoords.value')
      await getPtzPointMove({ presetId: moreCoords.value[0].presetIndex, deviceSn: moreCoords.value[0].deviceSn })
      filterCoord(newValue.coords)
    })
  })
})
onBeforeUnmount(() => {
  $bus.off('cameraObj')
  $bus.off('sliderChange')
  $bus.off('landCoordInfo')
  $bus.off('clearAllCanvas')
  clearAllCanvas()
})

// 球机操作
const cameraControl = async (query) => {
  const params = {
    command: '',
    deviceSn: query.deviceSn,
    speed: 60
  }
  switch (query.control.type) {
    case 'isTop':
      params.command = query.control.value ? 'UP' : 'DOWN'
      break
    case 'isZoomAdd':
      params.command = query.control.value ? 'ZOOM_IN' : 'ZOOM_OUT'
      break
    case 'isLeft':
      params.command = query.control.value ? 'LEFT' : 'RIGHT'
      break
  }
  await ptzControl(params)
}
// 数据处理
const filterCoord = (coords) => {
  clearAllCanvas()
  const coord = JSON.parse(coords)
  coord.forEach(item => {
    item.forEach(cItem => {
      points.value.push({
        x: cItem[0] * initWidth,
        y: cItem[1] * initHeight
      })
    })
  })
  connectPoints()
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
  const arr = []
  points.value.forEach(item => {
    arr.push([item.x, item.y])
  })
}
const startDrawing = (event) => {
  if (isEmptyObject(cameraObj.value)) return warnNotification('请先选择摄像头')
  const { offsetX, offsetY } = event
  console.log('开启快速定位')
  drawPoint2(offsetX, offsetY)
  quickPos(offsetX, offsetY)
  $bus.emit('videoPointEmit')
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
// 快速定位
const quickPos = async (x, y) => {
  if (isEmptyObject(cameraObj.value)) return warnNotification('请先选择摄像头')
  clearAllCanvas()
  const { clientWidth, clientHeight } = canvas.value
  const params = {
    viewBox: [clientWidth, clientHeight] + '',
    deviceSn: cameraObj.value.deviceSn,
    x1y1: [x, y] + '',
    x2y2: [x, y] + ''
  }
  await exPtzFastGoTo(params)
  $bus.emit('changeVideoByMap')
}
watch(fullCanvasLine, (newValue) => {
  // if (isEmptyObject(newValue)) return
  nextTick(() => {
    moreCoords.value = newValue.params.cameraPresetInfo
    filterCoord(newValue.coords)
  })
}, { deep: true, immediate: true })
watch(cameraFullScreenObj, (newValue) => {
  if (isEmptyObject(newValue)) return
  cameraObj.value = newValue
}, { deep: true, immediate: true })
</script>

<style lang="less" scoped>
.canvas {
  position: absolute;
  top: 0;
  left: 42px;
  z-index: 10;
}
</style>
