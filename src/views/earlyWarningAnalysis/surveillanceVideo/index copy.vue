<template>
    <div class="wrapper">
        <div class="video_title">
            <img src="../../../../public/image//earlyWarningAnalysis/jkbt.png">
            <span>{{ cameraName }}</span>
        </div>
        <p v-show="isShowPanel === '图片'">
            <!-- <el-image :src="photoUrl"
                style="height: 407px;object-fit: cover;"></el-image> -->
                    <el-carousel indicator-position="outside">
                        <el-carousel-item v-for="item in photoUrl" :key="item">
                            <el-image :src="item.url" style="height: 350px;object-fit: cover;"></el-image>
                        </el-carousel-item>
                    </el-carousel>
        </p>
        <p style="height: 370px;" v-show="isShowPanel === '视频'">
            <video ref="videoRef" style="width: 100%;height:370px;" controls
                :src="vidoeUrl">
            <track
                kind="subtitles"
                label="Custom Text"
                srclang="en"
                ref="trackRef"
            /></video>
        </p>
        <p v-show="isShowPanel === '实时监控'">
            <SurveillanceVideo :cameraObj="cameraObj" />
        </p>
    </div>
</template>

<script setup>
import 'video.js/dist/video-js.css'
import { ref, onMounted } from 'vue'
import $bus from '@/utils/eventBus.js'
import { cameraList, getPreviewUrl } from '@/api/camera'
import SurveillanceVideo from './components/JKSP.vue'
const activeName = ref('third')
const value1 = ref(false)
const value2 = ref(false)
const isShowPanel = ref('实时监控')
const childVideo = ref(null)
const analySisData = ref()
const cameraObj = ref({})
const onStartEnlarge2 = (event) => {
  $bus.emit('drawHandler', event)
}
const cameraName = ref('测试摄像头')
// 云台操作
const onHandlePTZ = (type) => {
  if (childVideo.value) {
    childVideo.value.onHandlePTZ(type)
  }
}

// 刷新
const refresh = () => {
  childVideo.value.getFlvVideo()
}

// 开启全屏
const setfullScreen = () => {
  childVideo.value.fullScreen()
}

const onStartEnlarge = (event) => {
  emitter.emit('isDraw', event)
}
const vidoeUrl = ref()
const photoUrl = ref([])
const videoRef = ref(null); // 视频元素的引用
// 添加自定义字幕轨道
const addCustomTextTrack = () => {
  const video = videoRef.value;
  const track = video.addTextTrack("subtitles", "Custom Text", "en");

  track.mode = "showing"; // 显示字幕

  // 动态添加带有换行的字幕内容
  let str = `预警信息: ${analySisData.value.alarmContent}\n
             预警位置: ${analySisData.value.townName}\n
             预警种类: ${analySisData.value.alarmTypeName}\n
             摄像头名称: ${analySisData.value.deviceName}\n
             预警地经纬度: ${analySisData.value.alertPlotLon} ${analySisData.value.alertPlotLat}\n
             `;

  const cue = new VTTCue(0, 60, str);

  // 自定义字幕的显示位置
  cue.line = 8; // 垂直位置 (0 表示顶部)
  cue.position = 95; // 水平位置 (100 表示右边)
  cue.align = 'end'; // 右对齐

  // 添加自定义字幕到轨道
  track.addCue(cue);
};
// 清除之前的字幕轨道
const clearTextTracks = () => {
  const video = videoRef.value;
  const tracks = video.textTracks; // 获取所有字幕轨道

  for (let i = 0; i < tracks.length; i++) {
    if (tracks[i].kind === "subtitles") {
      // 设置轨道模式为 disabled，清除显示的字幕
      tracks[i].mode = "disabled";
    }
  }
};

onMounted(() => {
    
  $bus.on('panelTitle', (data) => {
    isShowPanel.value = data.title
  })

  $bus.on('analySisData', async (e) => {
    photoUrl.value = []
    isShowPanel.value = '实时监控'
    cameraName.value = e.deviceName
    if (e.alarmImageUrl) {
      const str = e.alarmImageUrl.split(',')
      str.forEach(item => {
        const obj = {
          url: ''
        }
        obj.url = 'api/ftpFile/download?path=' + item;
        photoUrl.value.push(obj)
      })
    }
    if (e.videoUrl) {
      const str = e.videoUrl
      vidoeUrl.value = 'api/ftpFile/play?path=' + str
    }
    analySisData.value = e
    const hlsUrl = await getHlsUrl(e.deviceSn)
    $bus.emit('cameraObj', { hlsUrl: hlsUrl })
    cameraObj.value = e.dyDevice
    cameraObj.value.hlsUrl = hlsUrl
    clearTextTracks()
    // 组件挂载后插入自定义字幕
    addCustomTextTrack();
  })
})
const getHlsUrl = async (deviceSn) => {
  const { data } = await getPreviewUrl({ deviceSn: deviceSn })
  return data?.previewUrl || 'test.url' // 本地测试用
}
</script>

<style lang="less" scoped>
.wrapper {
    position: relative;
    width: 420px;
    height: 434px;
    background-image: url('../../../../public/image/earlyWarningAnalysis/Rectangle 19960.png');
    margin-bottom: 32px;

    p {
        padding: 10px 12px 17px 12px;

        img {
            height: 434px;
        }
    }
    .video_title{
        padding: 12px 12px 0px 12px;
        height: 17px;
        display: flex;
        color: #fff;
        span {
            margin-left: 4.83px;
        }
    }
}
.span1{
    color: #fff;
}
.new-tabs-header {
    /deep/ .el-tabs__content {
        padding: 0px 10px;
        color: #fff;
        font-weight: 600;
        margin-top: 10px;
    }

    /deep/ .tabs-card {
        .el-tabs__nav-scroll {
            padding: 0;
        }
    }

    /deep/ .el-tabs__nav-wrap {
        &::after {
            display: none;
        }
    }

    /deep/ .el-tabs__header {
        margin: 0;
    }

    /deep/ .el-tabs__nav-scroll {
        padding: 0 10px;
    }

    /deep/ .el-tabs__active-bar {
        background-color: #6DE8F2;
        height: 4px;
        border-radius: 2px;
    }

    /deep/ .el-tabs__item:hover {
        span {
            color: #6DE8F2;
        }
    }

    /deep/ .el-tabs__item.is-active {

        color: #6DE8F2;
        position: relative;

        span {
            color: #6DE8F2;
        }
    }

    /deep/ .el-tabs__item:hover {
        color: #6DE8F2;
    }

    /deep/ .el-tabs__item {
        color: #fff;
        font-size: 14px;
        font-weight: 500;
    }

    /deep/ .el-tabs.tabs-card .el-tabs__item span {
        background: none;
        box-shadow: none;
        height: 54px;
        line-height: 54px;
        min-width: 0;
        padding: 0;
        margin: 0 18px;
    }

    /deep/ .el-tab-pane {
        color: #fff;
    }
}

.switch {
    position: absolute;
    right: 12px;
    top: 5px;
}

::v-deep .el-switch__label.is-active {
    color: #fff;
}

::v-deep .el-switch__label {
    color: #6DE8F2;
}

.video_wapper {
    position: relative;
    height: 370px;
    margin-bottom: 12px;

    img {
        width: 100%;
        height: 325px;
    }

}

.video_controller {
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    .controller_left {
        display: flex;

        img {
            width: 18px;
            height: 18px;
            margin-right: 12px;
        }
    }

    .controller_right {
        line-height: 21px;
        color: #fff;

        span {
            margin-left: 8px;
        }

        .span1 {
            margin-right: 22px;
            color: #fff;
        }
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
    box-shadow: 0px 0px 5.68px 0px #5397FD7A;
}

.controller_right /deep/ .el-switch__core {
    width: 36px;
    height: 17px;
}
</style>

<style lang="less" scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel--horizontal{
  width: 100%;
  height: 433px;
}
/deep/ .el-carousel__container{
  height: 350px;
}

/* 设置字幕样式 */
video::cue {
  color: white; /* 字体颜色 */
  background: rgba(0, 0, 0, 0.7); /* 字幕背景颜色 */
  font-size: 0.5em; /* 字体大小 */
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9); /* 字体阴影 */
  white-space: normal; /* 允许换行 */
  line-height: 1.5; /* 行间距设置 */
}
</style>
