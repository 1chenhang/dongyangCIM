<template>
  <div class="BigOutBox">
    <el-container style="height: 100%">
      <el-header>
        <Header />
      </el-header>
      <div v-if="showMap" :class="['bgBox',bgClose?'':'opacity0'] "></div>
      <div v-else class="bgBox2"></div>
      <el-main :class="!showMap ? 'showmap' : ''">
        <div v-show="showMap">
          <div @click="closeBanner" class="closeBanner">
            <el-icon>
              <DArrowLeft v-show="bannerFlag" />
              <DArrowRight v-show="!bannerFlag" />
            </el-icon>
            <p class="text">{{ bannerFlag ? '收起' : '展开' }}面板</p>
          </div>
          <img v-show="bannerFlag" class="sideLeftBorder" :src="require('/public/image/homePage/侧边边框.png')" alt="">
          <img v-show="bannerFlag" class="sideRightBorder" :src="require('/public/image/homePage/侧边边框.png')" alt="">
          <MapView />
          <ToolBox />
          <ToolContainer />
          <earlyWarning />
          <!-- <LandData /> -->
        </div>
        <img v-show="bannerFlag" class="sideLeftBorder" :src="require('/public/image/homePage/侧边边框.png')" alt="">
        <img v-show="bannerFlag" class="sideRightBorder" :src="require('/public/image/homePage/侧边边框.png')" alt="">
        <router-view />
      </el-main>
    </el-container>
    <el-dialog append-to-body :close-on-press-escape="false" :close-on-click-modal="false" v-model="screenFLag" class="fullDialog">
      <el-header style="position: relative;background: #01152b;">
        <Header />
      </el-header>
      <FullScreen v-if="tabs === 0" />
      <div class="box_container" v-if="tabs !== 0">
        <YJPD v-if="tabs === 1"/>
        <WaterMakSetting v-if="tabs === 2" />
        <AlarmConfig v-if="tabs === 3" />
        <AILibrary v-if="tabs === 4" />
        <ModelSwitch v-if="tabs === 5" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect, onMounted, provide, toRefs } from 'vue'
import FullScreen from '../map/fullScreen'
import Header from '@/components/homePage/header/index'
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import MapView from '@/components/map/MapView.vue'
import ToolBox from '@/components/map/ToolBox/index.vue'
import earlyWarning from '@/components/earlyWarning/index.vue'
import ToolContainer from '@/components/map/ToolContainer.vue'
import YJPD from '../../components/map/fullScreen/components/YJPD.vue'
import WaterMakSetting from '../../components/map/fullScreen/components/WatermarkSetting.vue'
import AlarmConfig from '../../components/map/fullScreen/components/alarmConfig.vue'
import AILibrary from '../../components/map/fullScreen/components/AILibrary.vue'
import ModelSwitch from '../../components/map/fullScreen/components/ModelSwitch.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getAlarmType } from '@/api/camera'
import $bus from '@/utils/eventBus.js'
const { state, commit } = useStore()
const bannerFlag = ref(true)
const route = useRoute()
const showMap = ref(true)
const screenFLag = ref(false)
const cameraFullScreenObj = ref()
const fullCanvasLine = ref()
const isTabActive = ref(true)
const bgClose = ref(true)
const closeBanner = () => {
  bannerFlag.value = !bannerFlag.value
  bgClose.value = isTabActive.value || bannerFlag.value
  $bus.emit('bannerFlag', bannerFlag.value)
}
// 存储预警类型
const getAlarmTypeList = async () => {
  const { data } = await getAlarmType({})
  commit('warnTypeList', data)
}
getAlarmTypeList()
onMounted(() => {
  $bus.on('screenFLag', (query) => {
    cameraFullScreenObj.value = query.cameraFullScreenObj
    fullCanvasLine.value = query.fullCanvasLine
    screenFLag.value = query.screenFLag
  })
  $bus.on('isTabActive', (value) => {
    isTabActive.value = value
    bgClose.value = isTabActive.value || bannerFlag.value
  })
})
const { query } = toRefs(route)
const tabs = ref(0)
watch(query, async (newValue, oldValue) => {
  if (newValue.tabs) {
    tabs.value = Number(newValue.tabs)
  }
}, { deep: true, immediate: true })

watch(route, (newRoute, oldRoute) => {
  if (newRoute.path === '/supervisingAnalysis' || newRoute.path === '/entrancePage' || newRoute.path === '/smartEvidence' || newRoute.path === '/earlywarningStatistics') {
    showMap.value = false
  } else {
    showMap.value = true
  }
}, { immediate: true })
provide('fullCanvasLine', fullCanvasLine)
provide('cameraFullScreenObj', cameraFullScreenObj)
</script>
<style lang="less" scoped>
.BigOutBox {
  position: relative;
}

.bgBox {
  background-image: url('/public/image/homePage/蒙版新 1.png');
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9;
  pointer-events: none;
}

.bgBox2 {
  background-image: url('/public/image/components/bg2.png');
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9;
  pointer-events: none;
}

.el-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 10;
}

.el-header {
  padding: 0;
  height: auto;
  position: fixed;
  width: 100%;
  z-index: 12;
}

.el-main {
  padding: 0;
  position: relative;
  // z-index: 9;
  overflow: hidden;
  background-color: black;

  .closeBanner {
    width: 93px;
    height: 34px;
    background-image: url('/public/image/homePage/收起面板_bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: 78px;
    left: 54px;
    z-index: 10;
    display: flex;
    align-items: center;
    padding-left: 5px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      filter: brightness(150%);
    }

    .el-icon {
      background: linear-gradient(180deg, #FFFFFF 35%, #6DB1F1 82%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 16px;
      color: #6DB1F1;
      margin-right: 1px;
    }

    .text {
      font-family: PMZD;
      font-size: 16px;
      background: linear-gradient(180deg, #FFFFFF 35%, #6DB1F1 82%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 0.12em;
    }
  }

  .sideLeftBorder {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%)rotate(180deg);
    z-index: 10;
  }

  .sideRightBorder {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }
}

.showmap {
  background-color: #000e25;
}
.opacity0{
  opacity: 0;
}
</style>
<style lang="less">

.fullDialog {
  width: 100%;
   height: 100%;
   margin: 0;
  padding: 0;
  background: transparent;

  .el-dialog__header {
    padding: 0;

    .el-dialog__headerbtn {
      display: none;
      z-index: 999;
      font-size: 0px;
      background-image: url('/public/image/components/关闭_icon.png');
      background-repeat: no-repeat;
      background-size: cover;
      width: 30px;
      height: 30px;
      top: 5px;
      right: 5px;

      i {
        color: #333;
      }
    }
  }

  .el-dialog__body {
    height: 100%;
    background: transparent;
  }
}
</style>
<style>
div::-webkit-scrollbar {
    width: 4px;
}

div::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    opacity: 0.2;
    background: #6DE8F2;
    height: 100px;
}

div::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
}
</style>
<style lang="less" scoped>
.box_container {
  position: relative;
  z-index: 10;
  width: 95%;
  height: 85%;
  margin: 0 auto;
  margin: 2% auto auto auto;
  padding: 35px 40px 40px 20px;
  box-sizing: border-box;
  background: #01152BD6;
  border: 1px solid #2A8DE8C7;
  box-shadow: 0px 0px 21.7px 0px #0B80E396 inset;
  overflow-y: scroll;
}

.pagination {
  margin: 20px;
  height: 100px;
}

::v-deep.el-table {
  .el-table__cell {
    padding: 5px;
  }
}

.el-table {
  height: 156px;
  color: #fff;
}

::v-deep.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #0E509B73 !important;
}

::v-deep .el-table__body {
  border-collapse: separate !important;
  border-spacing: 0 2px !important;
  table-layout: auto !important;
}

::v-deep .el-table,
.el-table__expanded-cell {
  background-color: #1c252d;
}

::v-deep .el-table__row {
  height: 36px;
  /* 你想要的行高 */
  background: #0E509B73 !important;
}

::v-deep .el-table--enable-row-transition,
.el-table .cell {
  background-color: #1c252d;
}

::v-deep.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: #1c252d;
}

::v-deep.el-table tr {
  background: #04264E85;
}

::v-deep.el-table td.el-table__cell,
::v-deep.el-table th.el-table__cell.is-leaf {
  border: none;
}

::v-deep.el-table th.el-table__cell {
  background-color: transparent;
}

::v-deep .el-table__inner-wrapper::before {
  z-index: 0;
  height: 0 !important;
}

.custom-pagination {
  margin: 0 5px;
  border-radius: 3px;
  color: #fff;
}

.custom-pagination /deep/ .el-select__wrapper {
  background-color: rgba(144, 141, 141, 0.1);
  border: 0px;
}

.custom-pagination /deep/ .el-select__placeholder {
  color: #fff;
}

.custom-pagination /deep/ .el-input__wrapper {
  background-color: rgba(144, 141, 141, 0.1);
  color: #fff;
}

.custom-pagination /deep/ el-input__inner {
  color: #fff;
}

/deep/.el-pagination {
  --el-pagination-bg-color: rgba(144, 141, 141, 0.1) !important;
  --el-pagination-button-disabled-bg-color: rgba(144, 141, 141, 0.1) !important;
  --el-pagination-hover-color: #FFF !important;
  --el-pagination-text-color: #999 !important;
  --el-pagination-button-color: #999 !important;
}

::v-deep .el-pagination__total {
  color: #fff;
  font-size: 14px;
}

::v-deep .el-pager li {
  border: 1px solid #0674C1;
  margin-right: 8px;
  border-radius: 5px;
}

::v-deep .el-pagination__jump {
  color: #fff;
}

::v-deep.box_container {
  padding: 20px 30px;

  .el-form-item__label {
    color: #fff;
    line-height: 35px !important;
  }

  .el-input__suffix .el-input__icon {
    color: #fff;
    /* 图标颜色 */
    font-size: 15px;
    /* 图标大小 */
    padding-right: 16px;
  }

  .el-input__wrapper {

    background-color: rgba(13, 81, 157, 0.45);
    padding: 0px;
    box-shadow: 0 0 0 1px #0B7FE2 inset;
  }

  .el-textarea__inner {
    background-color: rgba(13, 81, 157, 0.45);
    padding: 10px;
    box-shadow: 0 0 0 1px #0B7FE2 inset;
    color: #fff;
  }

  .el-input__inner {
    padding-left: 15px;
    height: 36px;
    font-size: 15px;
    border: 0px;
    color: #fff;
  }
}

.btnList {
  display: flex;
  justify-content: center;

  .btn {
    width: 80px;
    box-sizing: border-box;
    border-radius: 8px;
    text-align: center;
    font-size: 14px;
    line-height: 32px;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      filter: brightness(130%);
    }
  }

  .btn1 {
    margin-right: 22px;
    background: linear-gradient(180deg, rgba(1, 79, 51, 0.8) 25%, rgba(21, 242, 189, 0.8) 100%);
    border: 2px solid #31DFB5;
    box-shadow: 0px 4px 14.6px 0px #25EAC680;

    p {
      background: linear-gradient(180deg, #FFFFFF 27.27%, #4DC7BF 100%);
      // text-shadow: 0px 2px 0px #00000080;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .btn2 {
    background: linear-gradient(180deg, rgba(1, 51, 79, 0.8) 25%, rgba(21, 136, 242, 0.8) 100%);

    border: 2px solid #318CDF;
    box-shadow: 0px 4px 14.6px 0px #258BEA80;

    p {
      background: linear-gradient(180deg, #FFFFFF 27.27%, #4D9BC7 100%);

      // text-shadow: 0px 2px 0px #00000080;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

::v-deep .selectBox {

  .el-select {
    .el-select__wrapper {
      min-height: 35px;
      background: url('/public/image/platformOverview/selectBg.png');
      background-size: cover;
      background-repeat: no-repeat;
      box-shadow: none;
    }

    .el-select-dropdown__item.selected {
      // background-color: #83e818!important; // 选中
    }

    .el-select-dropdown__item.hover {
      background-color: #498f6c !important; // hover
    }

    :deep .el-dropdown-menu__item:not(.is-disabled) {
      // color: #182F23!important; // disabled
    }

    .el-select-dropdown__item {
      color: #4FC78A !important; // 下拉项颜色
    }

    :deep .el-popper {
      background-color: #121f1b !important; // 展开下拉背景
      border: 1px solid #498f6c !important; // 展开下拉边框
    }

    :deep .el-popper .el-popper__arrow::before {
      border-top: 1px solid #498f6c !important; // 箭头按钮边框
      background-color: #121f1b !important; // 箭头按钮背景色
    }

    .el-select__caret {
      font-size: 16px;
      color: #0B80E3;
    }

    .el-select__placeholder {
      color: #fff;
    }
  }

  p {
    font-size: 14px;
    color: #fff;
  }

  .el-date-editor {
    color: #fff;
  }

  .el-date-editor .el-range__icon {
    margin-left: 10px;
    color: #fff;
  }

  .el-range-editor--small .el-range-input {
    color: #fff;
  }
}
</style>
