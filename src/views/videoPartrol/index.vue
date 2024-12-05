<template>
  <div :class="['leftBannerBox', bannerFlag ? '' : 'closeLeftBanner']">
    <Tags class="mt10" title="监控对象" />
    <CameraType :isShowBtn="true" />
  </div>
  <div :class="['centerBannerBox', bannerFlag ? '' : 'closeCenterBanner']">
    <CameraTags :deviceStatusData="deviceStatusData" />
  </div>
  <div :class="['rightBannerBox', bannerFlag ? '' : 'closeRightBanner']">
    <Tags class="mt10" title="实时监控" />
    <SurveillanceVideo />
    <Tags class="mt10" title="地块列表" />
    <LandList />
  </div>
</template>

<script setup>
import Tags from '@/components/Tags/index'
import CameraType from '../cameraManagement/CameraType/index.vue'
// import SurveillanceVideo from './surveillanceVideo/mapVideo.vue'
import { getDeviceStatistics } from '@/api/camera.js'
import SurveillanceVideo from './surveillanceVideo/index.vue'
import LandList from './landList/index'
import { ref, onMounted, onUnmounted } from 'vue'
import $bus from '@/utils/eventBus'
import CameraTags from '@/components/CameraTags'
const bannerFlag = ref(true)
const deviceStatusData = ref({ total: 0, offLine: 0 })
onMounted(async () => {
  $bus.on('bannerFlag', (e) => {
    bannerFlag.value = e
  })
  getStatisticsData()
})
onUnmounted(() => {
  $bus.off('bannerFlag')
})
// 摄像机状态统计
const getStatisticsData = async () => {
  const { code, data } = await getDeviceStatistics()
  if (code === '200') {
    deviceStatusData.value = data
  }
}
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
.centerBannerBox {
  position: absolute;
  top: 125px;
  left: 30%;
  z-index: 10;
  box-sizing: border-box;
  overflow: hidden;
  transition: all .3s;
}
.closeLeftBanner {
  left: -468px;
}

.closeRightBanner {
  right: -468px;
}
.closeCenterBanner {
  top: -125px;
}
</style>
