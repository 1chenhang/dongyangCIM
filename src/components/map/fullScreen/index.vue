<template>
  <div class="s_wrapper">
    <div class="cameraTypeBox" v-if="isOpenTool">
      <CameraType />
    </div>
    <CameraTool />
    <MapLayer />
    <div ref="parentDomElement" class="flexBox">
      <div style="width: 50%;">
        <div class="mapPosBox">
          <MapView class="contentCesium" /> <!-- 内置cesium地图 -->
          <PosBox v-show="showPosFlag" />
        </div>
      </div>
      <div class="video_wapper">
        <FakePlayer @WSIMG="WSIMG" ref="childVideo" /><!-- 视频组件 -->
        <CanvasLine /> <!-- 画布 -->
      </div>
    </div>
    <div class="btnFatherFlex">
      <div class="btnFlex">
        <!-- <div @click="showWater" class="btn_box">水印设置</div>
        <div @click="handlerQz" class="btn_box">智能取证设置</div>
        <div @click="showAIDialog" class="btn_box">AI设置</div> -->
        <!-- <div class="controller_right">
        <el-switch v-model="mapSwitch" class="ml-2" style="--el-switch-on-color: #1F6BC1D6;" />
        <span class="span1">地图定位</span>
        <el-switch v-model="videoSwitch" class="ml-2" style="--el-switch-on-color: #1F6BC1D6; " />
        <span class="span2">视频定位</span>
      </div> -->
      </div>
      <div class="btnFlex">
        <div @click="generateImg" class="btn_box">图片取证</div>
        <div @click="openVideoIcon" class="btn_box">视频取证</div>
        <div :class="isVideoActive ? 'isVideoActive' : ''" class="videoIconBox">
          <el-tooltip effect="dark" content="开始录屏" placement="top">
            <p @click="startRecording" class="iconfont icon-bofang p1"></p>
          </el-tooltip>
          <el-tooltip effect="dark" content="结束录屏" placement="top">
            <p @click="stopRecording" class="iconfont icon-tingzhi1"></p>
          </el-tooltip>

        </div>
        <div @click="exportsPdf" class="btn_box">导出报表</div>
      </div>
    </div>

    <LandList />
    <ScreenshotByBox @isShowPos="isShowPos" ref="childShotRef" /> <!-- 截图 -->
    <ScreenRecording ref="screenRecordingRef" /> <!-- 录屏 -->
    <!-- 导出PDF弹窗 -->
    <BaseDialog1 v-show="PDFDialog" @closeDialog="PDFDialog = false" ref="PDFRef" :styles="PDFDialogStyles"
      title="导出报表">
      <template v-slot:content>
        <ExportPDF />
      </template>
    </BaseDialog1>

    <BaseDialog1 style="z-index: 99999;" v-if="earlyWaringDialog" @closeDialog="earlyWaringDialog = false"
      :styles="earlyWaringStyles" :title="'取证设置'">
      <template v-slot:content>
        <YJPD @closeYj="closeYj" />
      </template>
    </BaseDialog1>
    <BaseDialog1 style="z-index: 99999;" v-if="WaterMakSettingDialog" @closeDialog="WaterMakSettingDialog = false"
      :styles="earlyWaringStyles2" :title="'水印设置'">
      <template v-slot:content>
        <WaterMakSetting />
      </template>
    </BaseDialog1>
    <BaseDialog1 style="z-index: 99999;" v-if="alarmConfigDialog" @closeDialog="alarmConfigDialog = false"
      :styles="earlyWaringStyles3" :title="'预警配置'">
      <template v-slot:content>
        <AlarmConfig />
      </template>
    </BaseDialog1>
  </div>
  <Masking></Masking>
</template>
<script setup>
import FakePlayer from './components/FakePlayer.vue'
import MapView from './components/MapView.vue'
import CanvasLine from './components/CanvasLine.vue'
import ScreenshotByBox from './components/ScreenshotByBox.vue'
import ScreenRecording from './components/ScreenRecording.vue'
import ExportPDF from './components/ExportPDF.vue'
import Masking from './components/Masking'
import PosBox from './components/PosBox.vue'
import { ref, provide, onMounted, nextTick, watch } from 'vue'
import BaseDialog1 from '@/components/BaseDialog1'
import YJPD from './components/YJPD.vue'
import WaterMakSetting from './components/WatermarkSetting.vue'
import AlarmConfig from './components/alarmConfig.vue'
import LandList from './components/LandList.vue'
import CameraTool from './components/cameraTool.vue'
import CameraType from '@/views/cameraManagement/CameraType'
import MapLayer from './components/MapLayer.vue'
import $bus from '@/utils/eventBus.js'
const screenRecordingRef = ref()
const childVideo = ref()
const videoElement = ref()
const parentDomElement = ref()
const childShotRef = ref()
const isVideoActive = ref(false)
const PDFDialog = ref(false)
const showPosFlag = ref(false)
const earlyWaringDialog = ref(false)
const WaterMakSettingDialog = ref(false)
const alarmConfigDialog = ref(false)
const isOpenTool = ref(false)
const PDFDialogStyles = ref({
  width: '800px',
  top: '12%',
  right: '40%'
})
const earlyWaringStyles = ref({
  width: '1000px',
  top: '15%',
  left: '15%'
})
const earlyWaringStyles2 = ref({
  width: '350px',
  top: '5%',
  left: '15%'
})

const earlyWaringStyles3 = ref({
  width: '1000px',
  top: '15%',
  left: '15%'
})
const alarmConfigDialogEdit = ref(true)
const earlyWaringStyles4 = ref({
  width: '800px',
  top: '15%',
  left: '15%'
})

const openVideoIcon = () => {
  isVideoActive.value = !isVideoActive.value
}
const startRecording = () => {
  screenRecordingRef.value.startRecording()
}
const stopRecording = () => {
  screenRecordingRef.value.stopRecording()
}
const generateImg = () => {
  childVideo.value.getImg()
}

const WSIMG = (img) => {
  childShotRef.value.generateImg(img)
}
const exportsPdf = () => {
  PDFDialog.value = true
}
const isShowPos = (e) => {
  showPosFlag.value = e
}
const handlerQz = () => {
  earlyWaringDialog.value = true
}
const showWater = () => {
  WaterMakSettingDialog.value = true
}
const showAIDialog = () => {
  alarmConfigDialog.value = true
}

const closeYj = () => {
  earlyWaringDialog.value = false
}
onMounted(() => {
  $bus.on('closeWaterDilog', () => {
    WaterMakSettingDialog.value = false
  })
  $bus.on('isOpenToolShow', (val) => {
    isOpenTool.value = val
  })
  $bus.on('closeYjpdDialog', () => {
    earlyWaringDialog.value = false
  })
  setTimeout(() => {
    videoElement.value = childVideo.value.$el.querySelector('#HKVideo1')
  }, 1000)
})
provide('parentDomElement', parentDomElement)
provide('childVideo', childVideo)
provide('videoElement', videoElement)
</script>

<style lang="less" scoped>
.s_wrapper {
  width: 100%;
  padding: 35px 40px 40px 20px;
  box-sizing: border-box;
  background: #01152b;

  // border: 1px solid #2A8DE8C7;
  // box-shadow: 0px 0px 21.7px 0px #0B80E396 inset;
  border-radius: 4px;
}

.flexBox {
  display: flex;
  width: 100%;
  background: #01152b;
}

.btnFatherFlex {
  display: flex;
  justify-content: space-between;

  .btnFlex {
    margin-top: 20px;
    display: flex;

    .btn_box {
      width: 160px;
      height: 43px;
      background-image: url('/public/image/earlyWarningAnalysis/wfcz.png');
      line-height: 43px;
      text-align: center;
      transition: all .3s;
      cursor: pointer;
      color: #fff;

      &:hover {
        filter: brightness(150%);
      }

    }
  }

  .videoIconBox {
    width: 0px;
    height: 43px;
    display: flex;
    overflow: hidden;
    justify-content: space-evenly;
    align-items: center;
    border: none;

    box-shadow: 0 0 0 1px #0B7FE2 inset;
    transition: all .3s;
    border-radius: 8px;

    .iconfont {
      font-size: 28px;
      color: #fff;
      cursor: pointer;
      transition: all .3s;

      &:hover {
        transform: scale(1.2)
      }
    }

    .p1 {
      font-size: 25px;
    }
  }

  .isVideoActive {
    width: 100px;
    border: 1px solid;
    margin: 0 20px;
  }
}

.video_wapper {
  position: relative;
}

.mapPosBox {
  width: 100%;
  height: 850px;
  overflow: hidden;
  position: relative;
}

.cameraTypeBox {
  position: absolute;
  left: 30px;
  top: 20%;
  width: 350px;
  height: 400px;
  overflow: hidden;
  overflow-y: scroll;
  z-index: 9999999;
  background-image: url('/public/image/homePage/弹框_bg.png');
  background-size: cover;
  padding-top: 60px;
  padding-left: 10px;
}

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
.controller_right {
    line-height: 21px;
  display: flex;
  align-items: center;
  margin-left: 10px;
    span {
      margin-left: 8px;
      color: #fff;
    }

    .span1 {
      margin-right: 22px;
      color: #fff;
    }
  }
  .controller_right /deep/ .el-switch {
  height: 17px;
  margin-top: -2px;

}

::v-deep .el-switch__core {
  border: 1px solid #2A8DE85C;
  background: #01152BD6;
}

::v-deep .el-switch__core .el-switch__action {
  background: linear-gradient(125.74deg, #EDF8FF 24.85%, #448EFC 83.7%);
  box-shadow: 0px0px 5.68px 0px #5397FD7A;
}

.controller_right /deep/ .el-switch__core {
  width: 36px;
  height: 17px;
}
</style>
