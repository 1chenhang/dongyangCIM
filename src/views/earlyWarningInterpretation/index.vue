<template>
  <div :class="['leftBannerBox', bannerFlag ? '' : 'closeLeftBanner']">
    <Tags class="mt10" title="违法处置" />
    <LeftTable />
  </div>
  <div :class="['rightBannerBox', bannerFlag ? '' : 'closeRightBanner']">
    <Tags2 class="mt10" title="图片,视频,实时监控" />
    <SurveillanceVideo />
    <Tags class="mt10" title="地块信息" />
    <LandDetail />
  </div>
</template>

<script setup>
import Tags from '@/components/Tags/index'
import Tags2 from '@/components/Tags2/index'
import LeftTable from './leftTable/index'
import SurveillanceVideo from './surveillanceVideo/index'
import LandDetail from './landDetail/index'
import { ref, onMounted, onUnmounted } from 'vue'
import emitter from '@/utils/eventBus.js'

const bannerFlag = ref(true)
onMounted(() => {
  emitter.on('bannerFlag', (e) => {
    bannerFlag.value = e
  })
})
onUnmounted(() => {
  emitter.off('bannerFlag')
})
</script>

<style lang="less" scoped>
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
