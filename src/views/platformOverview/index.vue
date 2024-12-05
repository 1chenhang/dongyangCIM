<template>

  <div :class="['leftBannerBox', bannerFlag ? '' : 'closeLeftBanner']">
    <Tags2 class="mt10" title="预警类型" />
    <p v-if="isShowPanel === '摄像头状态'">
      <EarlyWarningType :deviceStatusData="deviceStatusData" />
    </p>
    <p v-else>
      <EarlyWarningType2 :yjlxData="yjlxData" />
    </p>

    <Tags2 class="mt5" title="近7天预警,近14天预警" />
    <WeekChart :near14DaysWarn="isShowPanel3 === '近7天预警' ? near7DaysWarn : near14DaysWarn" />
    <Tags class="mt5" title="预警分类统计"></Tags>
    <EarlyWarningSort :yjflData="yjflData" />
  </div>
  <div :class="['centerBannerBox', bannerFlag ? '' : 'closeCenterBanner']">
    <CameraTags :deviceStatusData="deviceStatusData" />
  </div>
  <div :class="['rightBannerBox', bannerFlag ? '' : 'closeRightBanner']">
    <Tags class="mt5" title="乡镇预警统计"></Tags>
    <EarlyWarningVillage :xzData="xzData" />
    <Tags class="mt5" title="违法处置"></Tags>
    <IllegalDisposal />
    <Tags2 class="mt10" title="识别分析" />
    <p v-if="isShowPanel2 === '监控视频'">
      <MonitorVideo />
    </p>
    <p v-else>
      <SBFXQK />
    </p>
  </div>

</template>

<script setup>
import EarlyWarningType from './earlyWarningType/newIndex.vue'
import EarlyWarningType2 from './earlyWarningType'
import { warninfoStatistics } from '@/api/chart.js'
import { getStatistics, getDeviceStatistics, getStatisticsHistory } from '@/api/camera.js'
import WeekChart from './weekChart/echart'
import EarlyWarningSort from './earlyWarningSort/echart'
import EarlyWarningVillage from './earlyWarningVillage/echart'
import IllegalDisposal from './IllegalDisposal/index'
import MonitorVideo from './monitorVideo/index'
import SBFXQK from './SBFXQK/index'
import Tags from '@/components/Tags/index'
import Tags2 from '@/components/Tags2/index'
import { ref, onMounted, onUnmounted } from 'vue'
import emitter from '@/utils/eventBus'
import CameraTags from '@/components/CameraTags'
import { useStore } from 'vuex'
const { state, commit } = useStore()
const historyWarn = ref(0)
const near7DaysWarn = ref([])
const near14DaysWarn = ref([])
const nearDaysWarn = ref([])
const todayWarn = ref(0)
const xzData = ref([])
const yjflData = ref([])
const yjlxData = ref([])
const showData = ref(false)
const deviceStatusData = ref({})
const bannerFlag = ref(true)
const isShowPanel = ref('预警类型')
const isShowPanel2 = ref('识别分析')
const isShowPanel3 = ref('近7天预警')
const getWarninfoData = async () => {
  const { code, msg, data } = await getStatistics()
  if (code === '200') {
    const { near7DaysWarnCount, near14DaysWarnCount, yjflCount, yjlxCount, xzCount } = data
    // historyWarn.value = historyWarnCount
    near7DaysWarn.value = near7DaysWarnCount
    near14DaysWarn.value = near14DaysWarnCount
    // todayWarn.value = todayWarnCount
    xzData.value = xzCount
    yjflData.value = yjflCount
    yjlxData.value = yjlxCount
    showData.value = true
    // objData.value = {
    //   historyWarnCount: historyWarnCount,
    //   todayWarnCount: todayWarnCount
    // }
  }
}

// 摄像机状态统计
const getStatisticsData = async () => {
  const { code, data } = await getDeviceStatistics()
  if (code === '200') {
    deviceStatusData.value = data
  }
}

onMounted(async () => {
  emitter.on('bannerFlag', (e) => {
    bannerFlag.value = e
  })
  await getWarninfoData()
  await getStatisticsData()

  const showPanelTitles = ref(['预警类型', '摄像头状态'])
  const showPanel2Titles = ref(['监控视频', '识别分析'])
  const showPanel3Titles = ref(['近7天预警', '近14天预警'])
  emitter.on('panelTitle', (data) => {
    if (showPanelTitles.value.includes(data.title)) {
      isShowPanel.value = data.title
    } else if (showPanel2Titles.value.includes(data.title)) {
      isShowPanel2.value = data.title
    } else if (showPanel3Titles.value.includes(data.title)) {
      isShowPanel3.value = data.title
    }
  })
})
onUnmounted(() => {
  emitter.off('panelTitle')
})
</script>

<style lang="less" scoped>
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

.mt5 {
  margin-top: 5px;
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
