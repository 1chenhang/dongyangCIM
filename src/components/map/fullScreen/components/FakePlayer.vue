<template>
  <div class="video_wrap" ref="videoWrapRef">
    <div class="flexbox">
      <div class="startY">
      </div>
      <div class="videoPlayerBox">
        <div id="HKVideo1">
        </div>
        <img v-show="videoPointShow" class="videoPoint" :src="require('/public/image/components/坐标点2.png')" alt="">
      </div>
      <!-- <video crossOrigin = "anonymous" autoplay muted loop id="video1" controls width="885" height="850" src="http://192.168.2.7:8304/Upload/Default/2024/07/17/1445103155047896292.mp4"></video> -->
    </div>
    <div class="echartBox">
      <YBPEchart :sliderZ="sliderParams.z" />
    </div>
    <div class="zoomBox">
      <div @click="zoomClick('add')" class="zoomAdd pointer mb10">
        <el-icon>
          <Plus />
        </el-icon>
      </div>
      <div @click="zoomClick('minus')" class="zoomAdd pointer">
        <el-icon>
          <Minus />
        </el-icon>
      </div>
    </div>
    <div class="video_controller">
      <RulerX ref="rulerX" :NowNum='0' :maxNum='360' :minNum='-360' :numSize='18' :ruleWidth='120' :oneGridValue="1"
        :pointerColor="'#2C76F3'" @scroll-end="endEvent">
      </RulerX>
      <div class="textIcon left">左</div>
      <div class="textIcon right">右</div>
    </div>
    <div class="rulerY">
      <RulerY ref="rulerY" @handleScroll="handleScroll"></RulerY>
      <div class="textIcon top right">上</div>
      <div class="textIcon bottom right">下</div>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted, onUnmounted, defineEmits, watch, inject, nextTick, defineExpose } from 'vue'
import { Plus, Minus, CaretTop, CaretBottom } from '@element-plus/icons-vue'
import { isEmptyObject, warnNotification } from '@/utils/utils'
import { ElLoading } from 'element-plus'
import YBPEchart from './YBPEchart.vue'
import $bus from '@/utils/eventBus'
import RulerX from './RulerX.vue'// 刻度尺组件
import RulerY from './RulerY.vue'// 刻度尺组件
import _ from 'lodash'
const videoWrapRef = ref(null)
const videoPointShow = ref(false)
const video1 = ref()
const cameraObj = ref()
const oPlugin = ref()
const loading = ref()
const errorIndex = ref(0)
const rulerX = ref()
const rulerY = ref()
const cameraFullScreenObj = inject('cameraFullScreenObj')
const sliderParams = ref({
  x: 0,
  y: 0,
  z: 0
})

const emit = defineEmits(['WSIMG'])

// 左右滑动操作
const endEvent = _.debounce((val) => {
  const newVal = Math.round(val / 10)
  if (isEmptyObject(cameraObj.value)) return warnNotification('请先选择摄像头')
  if (sliderParams.value.x === newVal) return
  const isLeft = sliderParams.value.x > newVal
  sliderParams.value.x = newVal
  console.log(val, isLeft, sliderParams.value.x, '结束值value')
  const query = {
    sliderParams: sliderParams.value,
    deviceSn: cameraObj.value.deviceSn,
    control: {
      type: 'isLeft',
      value: isLeft
    }
  }
  $bus.emit('sliderChange', query)
  $bus.emit('updateSector', isLeft ? 10 : -10)
}, 1500)

const sliderChange = () => {
  $bus.emit('sliderChange', sliderParams.value)
}
// 缩放操作
const zoomClick = _.debounce((type) => {
  if (isEmptyObject(cameraObj.value)) return warnNotification('请先选择摄像头')
  const query = {
    sliderParams: sliderParams.value,
    deviceSn: cameraObj.value.deviceSn,
    control: {
      type: 'isZoomAdd',
      value: false
    }
  }
  if (type === 'add') {
    if (sliderParams.value.z >= 4) return
    sliderParams.value.z++
    query.control.value = true
  } else {
    if (sliderParams.value.z <= -4) return
    sliderParams.value.z--
    query.control.value = false
  }
  $bus.emit('sliderChange', query)
}, 800)
const startYClick = (type) => {
  if (type === 'add') {
    if (sliderParams.value.y >= 2) return
    sliderParams.value.y++
  } else {
    if (sliderParams.value.y <= -2) return
    sliderParams.value.y--
  }
  $bus.emit('sliderChange', sliderParams.value)
}
// 上下滑动操作
const handleScroll = _.debounce((val) => {
  if (isEmptyObject(cameraObj.value)) return warnNotification('请先选择摄像头')
  const newVal = Math.round(val / 10)
  if (sliderParams.value.y === newVal) return
  const isTop = sliderParams.value.y < newVal
  console.log(isTop, '--isTop')
  sliderParams.value.y = newVal
  const query = {
    sliderParams: sliderParams.value,
    deviceSn: cameraObj.value.deviceSn,
    control: {
      type: 'isTop',
      value: isTop
    }
  }
  $bus.emit('sliderChange', query)
}, 800)
const getScript = () => {
  const { JSPlugin } = window
  oPlugin.value = new JSPlugin({
    szId: 'HKVideo1',
    szBasePath: './static/h5player/',
    // 分屏播放
    iMaxSplit: 1,
    iCurrentSplit: 1,
    iWidth: 885,
    iHeight: 850,
    // 设置样式
    oStyle: {
      border: '#343434',
      borderSelect: 'transparent',
      background: '#000'
    }
  })
  initPlugin()
}
const initPlugin = () => {
  oPlugin.value.JS_SetWindowControlCallback({
    windowEventSelect (iWindIndex) {
      // 插件选中窗口回调
      console.log('windowSelect callback: ', iWindIndex)
    },
    pluginErrorHandler (iWindIndex, iErrorCode, oError) {
      // 插件错误回调
      console.error(
        errorIndex.value,
        `window-${iWindIndex}, errorCode: ${iErrorCode}`,
        oError
      )
      if (errorIndex.value > 2) return
      realplay()
    },
    // windowEventOver (iWindIndex) {
    //   // 鼠标移过回调
    //   console.log(iWindIndex)
    // },
    // windowEventOut (iWindIndex) {
    //   // 鼠标移出回调
    //   console.log(iWindIndex)
    // },
    windowFullCcreenChange (bFull) {
      // 全屏切换回调
      console.log(bFull)
    },
    firstFrameDisplay (iWndIndex, iWidth, iHeight) {
      // 首帧显示回调
      // console.log(iWndIndex, iWidth, iHeight)
    },
    performanceLack (iWndIndex) {
      // 性能不足回调
      console.log('性能不足回调', iWndIndex)
    }
  })
  if (isEmptyObject(cameraObj.value)) return
  realplay()
}
const realplay = () => {
  console.log(cameraObj.value.hlsUrl, '--cameraObj.value.hlsUrl')
  loading.value = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  const param = {
    playURL: cameraObj.value.hlsUrl,
    mode: 1 // 1：高级模式  0：普通模式，高级模式支持所有
  }
  console.log(oPlugin.value, '-- oPlugin.value')
  oPlugin.value
    .JS_Play(cameraObj.value.hlsUrl, param, oPlugin.value.currentWindowIndex).then(
      (res) => {
        loading.value.close()
        errorIndex.value = 0
        console.log(res, '播放成功')
      },
      (err) => {
        errorIndex.value++
        loading.value.close()
        console.log(err, '--全屏窗口插件播放失败')
      }
    )
}
// 截图
const getImg = () => {
  const curIndex = 0
  const fileName = 'img'
  const fileType = 'JPEG'
  oPlugin.value.JS_CapturePicture(curIndex, fileName, fileType, imageData => {
    emit('WSIMG', imageData)
    console.log('JS_CapturePicture success', imageData) // 2.1.0开始全是base64，之前的版本存在blob或者是b
    // do you want...
  })
}
// PTZ归零
const getPTZZero = () => {
  rulerX.value.getZero()
  rulerY.value.getZero()
  sliderParams.value.z = 0
}
onMounted(() => {
  nextTick(() => {
    getScript()
  })
  $bus.on('landCoordInfo', () => {
    getPTZZero()
  })
  $bus.on('videoPointEmit', () => {
    videoPointShow.value = true
  })
})
onUnmounted(() => {
  $bus.off('landCoordInfo')
  $bus.off('videoPointEmit')
})
defineExpose({
  getImg
})
watch(cameraFullScreenObj, (newValue) => {
  if (isEmptyObject(newValue)) return
  nextTick(() => {
    getPTZZero()
    cameraObj.value = newValue
    errorIndex.value = 0
    realplay()
  })
}, { deep: true, immediate: true })

</script>

<style lang="less" scoped>
.video_wrap {
  position: relative;
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
  width: 885px;
  overflow: hidden;
  cursor: pointer;
  z-index: 11;
  color: #fff;
  position: absolute;
  top: 0;
  left: 15px;
  background-color: #333333a4;

}

.flexbox {
  width: 100%;
  height: 100%;
  display: flex;
}

.el-slider {
  width: 100%;
}

::v-deep .el-slider__button {
  width: 18px;
  height: 18px;
  border: none;
  background: linear-gradient(320.06deg, #2198FE 6.74%, #CAEBFF 84.15%);
}

.el-slider__button-wrapper {
  vertical-align: middle !important;
}

::v-deep.startY {
  width: 15px;

  .el-slider {
    width: auto;
  }

  .el-slider.is-vertical .el-slider__runway {
    background-color: #023671;
    width: 10px;
    border-radius: 15px;
  }

  .el-slider__bar {
    background-color: #1F6BC1D6;
    width: 10px;
  }

  .el-slider__button-wrapper {
    top: auto;
    left: -13px;
  }
}

.zoomBox {
  position: absolute;
  right: -34px;
  top: 90px;
  z-index: 12;

  .zoomAdd {
    width: 26px;
    height: 26px;
    background-image: url('/public/image/components/dialogBg.png');
    background-size: cover;
    background-repeat: no-repeat;

    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;

    .el-icon {
      font-size: 19px;
      color: #fff;
    }
  }

  .mb10 {
    margin-bottom: 10px;
  }
}

.startYBox {
  top: 50%;
  left: 25px;
  right: 0;
}

.rulerY {
  position: absolute;
  bottom: 0;
  left: 15px;
  z-index: 11;
  background-color: #333333a4;
}

.textIcon {
  font-size: 14px;
  position: absolute;
  bottom: 5px;
  color: #fff;
}

.left {
  left: 5px;
}

.right {
  right: 5px;
}

.top {
  top: 5px;
}

.bottom {
  bottom: 5px;
}

.echartBox {
  position: absolute;
  right: 0;
  top: 80px;
  z-index: 10;
}

.pointer {
  cursor: pointer;
}
.videoPlayerBox{
  position: relative;
  .videoPoint{
    width: 32px;
  height: 32px;
  position: absolute;
  left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  }
}
</style>
