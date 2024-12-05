<template>
    <div :class="['leftBannerBox', bannerFlag ? '' : 'closeLeftBanner']">
      <Tags class="mt10" title="监控对象" />
      <CameraType />
      <!-- <Tags class="mt10" title="摄像头列表" />
      <CameraList /> -->
    </div>
    <div :class="['rightBannerBox', bannerFlag ? '' : 'closeRightBanner']">
      <Tags class="mt10" title="实时监控" />
      <SurveillanceVideo/>
      <!-- <RealTimeMonitoring /> -->
      <Tags class="mt10" title="地块详情" />
      <LandDetail />
    </div>
  </template>

<script setup>
import Tags from '@/components/Tags/index'
import CameraType from './CameraType/index'
import SurveillanceVideo from './surveillanceVideo/index.vue'
import RealTimeMonitoring from './realTimeMonitoring/index.vue'
import CameraList from './cameraList/index'
import LandDetail from './landDetail/index'
import { ref, onMounted } from 'vue'
import emitter from '@/utils/eventBus'
const bannerFlag = ref(true)
onMounted(async () => {
  emitter.on('bannerFlag', (e) => {
    bannerFlag.value = e
  })
})

</script>

  <style lang="less" scoped>
  .mb13 {
    margin-bottom: 13px;
  }

  .mt10 {
    margin-top: 10px;
  }

  .leftBannerBox {
  width: 468px;
  box-sizing: border-box;
  padding-left: 44px;
  position: absolute;
  top: 111px;
  left: 0px;
  z-index: 10;
  transition: all .3s;
}

.rightBannerBox {
  position: absolute;
  top: 111px;
  right: 0;
  width: 468px;
  z-index: 10;
  box-sizing: border-box;
  padding-right: 44px;
  overflow: hidden;
  transition: all .3s;
}

.closeLeftBanner {
  left: -468px;
}

.closeRightBanner {
  right: -468px;
}
  </style>
