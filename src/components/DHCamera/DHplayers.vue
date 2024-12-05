<template>
  <div class="video_wrap" ref="videoWrapRef">
    <video class="videoContainer_video" ref="videoRef"></video>
    <canvas style="position: absolute;" class="videoContainer_cancas" ref="canvasRef"></canvas>
    <!-- <div v-if="loading">{{ loadingText }}</div> -->
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineProps, defineExpose, toRefs } from 'vue'
import axios from 'axios'

const PlayerControl = window.PlayerControl
const RPC = window.RPC
const setIP = window.setIP
const _getSession = window._getSession
const _setSession = window._setSession
const setCookie = window.setCookie
const PluginCanvasES6 = window.PluginCanvasES6

// 创建 ref
const videoRef = ref(null)
const canvasRef = ref(null)
const videoWrapRef = ref(null)
const loading = ref(false)
const loadingText = ref('')
const cutPlayer = ref(null)
let canvasSon
const talkPlayer = ref(null)
const playerInstance = ref(null)
const loginState = ref(false)
const session = ref(null)

const canvasParam = { // canvas绘图默认传参
  strokeColor: 'green',
  title: '',
  resizeEnable: false,
  moveEnable: false,
  closeEnable: true,
  array: true,
  showSize: false,
  selectType: 'inSide',
  disappear: true,
  selected: false
}
const props = defineProps({
  options: {
    type: Object,
    default: () => ({})
  },
  WndIndex: Number,
  step: Number,
  preset: {
    type: Number,
    default: 0
  }
})

// 以props定义方式获取父组件传递的值
const options = props.options
const WndIndex = ref(0)
const curEnlargeWnd = ref(0)
// 逻辑处理函数
const login = async () => {
  loading.value = true
  loadingText.value = '登录中。。。'
  setIP('192.168.2.108:80')

  try {
    await RPC.login('admin', 'root1013', false)
    setCookie('DWebClientSessionID', '', -1)
    setCookie('DhWebClientSessionID', '', -1)
    const target = '192.168.2.108:80'
    await RPC.keepAlive(300, 60000, _getSession(), target, WndIndex.value)
    loadingText.value = '登录成功'
    afterLogin()
    onRealPreview('192.168.2.108', '80', 'admin', 'root1013') // 登录后拉流
  } catch (err) {
    loadingText.value = '登录失败'
  }
}

const afterLogin = () => {
  loginState.value = true
  session.value = _getSession()
  RPC.MagicBox.getProductDefinition('MaxExtraStream').then(function (data) {
    const maxExtra = data.definition
  })
  RPC.DevVideoInput.getCollect().then(function (data) {
    const chnls = data.channels
  })
}

const onRealPreview = (ip, port, name, pswd) => {
  // loadingText.value = "加载中。。。";
  const curChannel = 1 // 无插件通道号从1开始
  const stream = 0

  const options = {
    wsURL: `ws://${ip}:${port}/rtspoverwebsocket`,
    // rtspURL: `rtsp://${ip}:${port}/cam/realmonitor?channel=${curChannel}&subtype=${stream}&proto=Private3`,
    rtspURL: 'rtsp://admin:root1013@192.168.2.108:554/cam/realmonitor?channel=1&subtype=0&proto=Private3',
    username: name,
    password: pswd,
    lessRateCanvas: true
  }
  cutPlayer.value = new PlayerControl(options)

  cutPlayer.value.on('MSEResolutionChanged', function (e) {
    console.log(e)
  })

  cutPlayer.value.on('PlayStart', (e) => {
    console.log('开始播放', e)
    loading.value = false
  })

  cutPlayer.value.on('DecodeStart', (e) => {
    console.log('开始解码', e)
    canvasSon = new PluginCanvasES6()
    canvasSon.init(canvasRef.value, function (data) {
      rebackActivateLocalEnlarging(data)
    })
    canvasSon.addChangeShapeEvent()
  })

  cutPlayer.value.on('GetFrameRate', function (e) {
    console.log('GetFrameRate: ' + e)
  })

  cutPlayer.value.on('FrameTypeChange', function (e) {
    console.log('视频编码格式改变: ' + e)
  })

  cutPlayer.value.on('audioChange', function (e) {
    console.log('音频编码模式改变: ' + e)
  })

  cutPlayer.value.on('Error', function (e) {
    console.log('Error: ' + JSON.stringify(e))
  })

  cutPlayer.value.on('MSEResolutionChanged', function (e) {
    console.log('分辨率改', e)
  })

  cutPlayer.value.on('WorkerReady', () => {
    console.log('文件加载完成')
    cutPlayer.value.connect()
  })

  cutPlayer.value.init(canvasRef.value, videoRef.value)
}

// 抓图
const capture = (name) => {
  cutPlayer.value.capture(name)
}

// 绘制电子放大后的回调函数
const rebackActivateLocalEnlarging = (data) => {
  console.log(data, '坐标信息')
  if (curEnlargeWnd.value != WndIndex.value) return

  const pos = data.data
  let newData
  if (pos[0][0] === pos[1][0]) {
    // return false;
  } else {
    newData = {
      left: pos[0][0],
      top: pos[0][1],
      right: pos[1][0],
      bottom: pos[1][1]
    }
  }
  // let dom = videoRef.value;
  // if (dom.style.display === "none") {
  //   dom = videoRef.value;
  // }
  const dom = videoRef.value
  // 倒着画
  if (newData.right < newData.left) {
    const tmp = newData.left
    newData.left = newData.right
    newData.right = tmp
  }

  if (newData.bottom < newData.top) {
    const tmp = newData.top
    newData.top = newData.bottom
    newData.bottom = tmp
  }

  console.log(videoWrapRef.value.clientWidth, 'videoWrapRef.value.clientWidth', videoWrapRef.value)
  const scaleW = videoWrapRef.value.clientWidth / 8191
  const scaleH = videoWrapRef.value.clientHeight / 8191

  const result = zoomArea(
    newData.left * scaleW,
    newData.top * scaleH,
    newData.right * scaleW,
    newData.bottom * scaleH,
    videoWrapRef.value.clientWidth,
    videoWrapRef.value.clientHeight
  )
  dom.style.width = result.width + 'px'
  dom.style.height = result.height + 'px'
  dom.style.left = result.left + 'px'
  dom.style.top = result.top + 'px'
  dom.style.position = 'absolute'
  canvasSon.removeShapeDrawEvent()
}

const zoomArea = (x1, y1, x2, y2, width, height) => {
  // 小框区域的数据
  const rectArea = {
    width: x2 - x1,
    height: y2 - y1,
    centerX: (x1 + x2) / 2, // 圆心坐标
    centerY: (y1 + y2) / 2
  }
  // 放大比例,控件放大倍数上限是20
  const scale = Math.min(width / rectArea.width, height / rectArea.height, 20)

  // 原始窗口信息
  const sourceWin = {
    width: width,
    height: height,
    centerX: width / 2,
    centerY: height / 2
  }

  // 放大后的窗口区域
  const bigWinArea = {
    width: width * scale,
    height: height * scale,
    left: sourceWin.centerX - rectArea.centerX * scale,
    top: sourceWin.centerY - rectArea.centerY * scale
  }

  // 数据矫正
  if (bigWinArea.left > 0) {
    bigWinArea.left = 0
  }
  if (bigWinArea.left < sourceWin.width - bigWinArea.width) {
    bigWinArea.left = sourceWin.width - bigWinArea.width
  }
  if (bigWinArea.top > 0) {
    bigWinArea.top = 0
  }
  if (bigWinArea.top < sourceWin.height - bigWinArea.height) {
    bigWinArea.top = sourceWin.height - bigWinArea.height
  }
  return bigWinArea
}

// 开启电子放大
const onStartEnlarge = () => {
  if (canvasSon) {
    canvasSon.setRegionNum('rect', 1)
    const param = { ...canvasParam }
    canvasSon.drawStart('rect', param)
    curEnlargeWnd.value = WndIndex.value
  }
}

// 关闭电子放大
const onStopEnlarge = () => {
  if (curEnlargeWnd.value != WndIndex.value) return
  const dom = videoRef.value
  dom.style.width = '100%'
  dom.style.height = '100%'
  dom.style.left = 0
  dom.style.top = 0
  dom.style.position = 'absolute'
}

const handleFullscreen = () => {
  if (bool) {
    const wrap = {
      position: 'absolute',
      left: 0,
      top: 0,
      width: window.screen.width + 'px',
      height: window.screen.height + 'px',
      overflow: 'visible'
    }
    videoWrapRef.value.style = wrap
  } else {
    const wrap = {
      position: 'relative',
      overflow: 'hidden',
      width: '500px',
      height: '300px'
    }
    videoWrapRef.value.style = wrap
  }
}

// ptz云台事件
const onHandlePTZ = (type, isStop) => {
  _setSession(session.value)
  const stepVal = 5
  let arg2 = 0
  const arg2Arr = ['LeftUp', 'RightUp', 'LeftDown', 'RightDown']
  const presetArr = ['GotoPreset', 'SetPreset', 'ClearPreset']
  const presetNum = ''
  if (arg2Arr.indexOf(type) > -1) {
    arg2 = stepVal
  }
  const channel = 0
  if (!isStop) {
    if (presetArr.indexOf(type) > -1) {
      /**
       * RPC.PTZManager 云台相关
       * @param {string} 方法
       * @param {number} channel 通道
       * @param {object} 参数集合
       */
      RPC.PTZManager('start', channel, {
        code: type,
        arg1: presetNum,
        arg2: 0,
        arg3: 0
      })
    } else {
      RPC.PTZManager('start', channel, {
        code: type,
        arg1: stepVal,
        arg2: arg2,
        arg3: 0
      })
    }
  } else {
    RPC.PTZManager('stop', channel, {
      code: type,
      arg1: stepVal,
      arg2: arg2,
      arg3: 0
    })
  }
}
onMounted(() => {
  const video = videoRef.value
  const canvas = canvasRef.value
  const videoWrap = videoWrapRef.value
  login()
})

defineExpose({
  login, onHandlePTZ, onStartEnlarge, onStopEnlarge, capture, handleFullscreen
})
</script>

<style lang="less" scoped>
.video_wrap {
  position: relative;
  // width: 500px;
   height: 350px;

  .videoContainer_video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    padding: 0;
  }

  .videoContainer_canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    padding: 0;
  }
}
</style>
