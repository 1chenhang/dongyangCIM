<template>
  <div class="video_wrap" ref="videoWrapRef">
    <div id="HKVideo" class="HKVideo"></div>
  </div>
</template>

<script setup>
import $bus from '@/utils/eventBus.js'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
const videoWrapRef = ref()
const cameraObj = ref({})
const oPlugin = ref()
const errorIndex = ref(0)
onMounted(() => {
  nextTick(() => {
    getScript()
  })
  $bus.on('cameraObj', (e) => {
    cameraObj.value = e
    errorIndex.value = 0
    realplay()
  })
  $bus.on('realplay', () => {
    errorIndex.value = 0
    realplay()
  })
})
onUnmounted(() => {
  $bus.off('cameraObj')
})

const getScript = () => {
  const { JSPlugin } = window
  oPlugin.value = new JSPlugin({
    szId: 'HKVideo',
    szBasePath: './static/h5player/',
    // 分屏播放
    iMaxSplit: 1,
    iCurrentSplit: 1,
    iWidth: 400,
    iHeight: 325,
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
        `window-${iWindIndex}, errorCode: ${iErrorCode}`,
        oError
      )
      if (errorIndex.value > 2) return
      realplay()
    },
    windowEventOver (iWindIndex) {
      // 鼠标移过回调
      console.log(iWindIndex)
    },
    windowEventOut (iWindIndex) {
      // 鼠标移出回调
      console.log(iWindIndex)
    },
    windowFullCcreenChange (bFull) {
      // 全屏切换回调
      console.log(bFull)
    },
    firstFrameDisplay (iWndIndex, iWidth, iHeight) {
      // 首帧显示回调
      console.log(iWndIndex, iWidth, iHeight)
    },
    performanceLack (iWndIndex) {
      // 性能不足回调
      console.log('性能不足回调', iWndIndex)
    }
  })
}
const realplay = () => {
  console.log(cameraObj.value.hlsUrl, '--cameraObj.value.hlsUrl')
  const param = {
    playURL: cameraObj.value.hlsUrl,
    mode: 1 // 1：高级模式  0：普通模式，高级模式支持所有
  }
  oPlugin.value
    .JS_Play(cameraObj.value.hlsUrl, param, oPlugin.value.currentWindowIndex).then(
      (res) => {
        errorIndex.value = 0
        console.log(res, '播放成功')
      },
      (err) => {
        errorIndex.value++
        console.log(err, '--小窗口插件播放失败')
      }
    )
}

</script>

<style lang="less" scoped>
.video_wrap {
  position: absolute;
  height: 100%;
}

// .HKVideo {
//   width: 400px !important;
//   height: 325px !important;
// }

.iconfont {
  font-family: "iconfont" !important;
}

.icon-zuoshang:before {
  content: '\e645';
}

.icon-shang:before {
  content: '\e646';
}

.icon-youshang:before {
  content: '\e648';
}

.icon-zuo:before {
  content: '\e647';
}

.icon-you:before {
  content: '\e649';
}

.icon-xia:before {
  content: '\e64a';
}

.icon-zuoxia:before {
  content: '\e64b';
}

.icon-youxia:before {
  content: '\e64c';
}

.icon-dot:before {
  content: '\e65c';
}

/* 中间的点图标 */

.slider-demo-block {
  max-width: 600px;
  display: flex;
  align-items: center;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>
