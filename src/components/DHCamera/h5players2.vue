<template>
  <div class="video_wrap2" ref="videoWrapRef2">
    <div id="HKVideo2" class="HKVideo2"></div>
  </div>
</template>

<script setup>
import $bus from '@/utils/eventBus.js'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
const videoWrapRef2 = ref()
const cameraObj = ref({})
const oPlugin = ref()
const errorIndex = ref(0)
onMounted(() => {
  
    nextTick(() => {
      getScript()
    })
    
    $bus.on('cameraObj22', (e) => {
      cameraObj.value = e
      errorIndex.value = 0
      realplay()
    })
})


const getScript = () => {
  const { JSPlugin } = window
  oPlugin.value = new JSPlugin({
    szId: 'HKVideo2',
    szBasePath: './static/h5player/',
    // 分屏播放
    iMaxSplit: 1,
    iCurrentSplit: 1,
    // 设置样式
    oStyle: {
      border: '#343434',
      borderSelect: 'transparent',
      background: '#000',
      objectFit: 'cover'
    }
  })
  initPlugin()
}
const setWindResize = (width, height)=>  {
  return new Promise((resolve, reject) => {
      oPlugin.value.JS_Resize(900, 700).then(() => {
          console.log('resize success')
          resolve()
        }).catch(e => {
          console.log(e)
          reject(e)
        })
    })
	}
const initPlugin = () => {
  
  setWindResize();   
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
  console.log(cameraObj.value.hlsUrl, '--cameraObj.value.hlsUrl6666666666666666')
  const param = {
    playURL: cameraObj.value.hlsUrl,
    mode: 1 // 1：高级模式  0：普通模式，高级模式支持所有
  }
  oPlugin.value
    .JS_Play(cameraObj.value.hlsUrl, param, 1).then(
      (res) => {
        errorIndex.value = 0
        console.log(res, '播放成功')
      },
      (err) => {
        errorIndex.value++
        console.log(err, '--播放失败')
      }
    )
}

</script>

<style lang="less" scoped>
.video_wrap2 {
  width: 100%;
  height: 100%;
}

.HKVideo2 {
  width: 100% !important;
  height: 100% !important;
}

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
