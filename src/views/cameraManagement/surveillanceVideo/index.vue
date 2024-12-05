<template>
    <el-tabs class="new-tabs-header" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="图片" name="first">
            <el-image style="width: 100%;height: 100%;" :src="require('/public/image/1709795816751.jpg')"></el-image>
        </el-tab-pane>
        <el-tab-pane label="视频" name="second">
            <video style="width: 100%;height: 100%;" controls :src="require('/public/image/1709795816751.jpg')"></video>

        </el-tab-pane>
        <el-tab-pane label="实时监控" name="third">
            <!-- <DHPlayers @createSuccess="createSuccess" ref="videoPlayXian" :uid="'video-dom-xian'" /> -->
            <DHPlayers ref="childVideo" :options="cameraInfo" :WndIndex="0" :step="step" />
            <!-- <DHPlayers /> -->
            <!-- <div :class="isFullScreen ? 'controller_box2':'controller_box'"> -->
            <div class="controller_box">
                <!-- <input type="button" value="左上" @mousedown="onHandlePTZ('LeftUp', false, 1)" @mouseup="onHandlePTZ('LeftUp', true, 1)" />
                <input type="button" value="上" @mousedown="onHandlePTZ('Up', false, 1)" @mouseup="onHandlePTZ('Up', true, 1)" />
                <input type="button" value="右上" @mousedown="onHandlePTZ('RightUp', false, 1)"
                @mouseup="onHandlePTZ('RightUp', true, 1)" />
                <input type="button" value="左" @mousedown="onHandlePTZ('Left', false, 1)"
                @mouseup="onHandlePTZ('Left', true, 1)" />
                <input type="button" value="右" @mousedown="onHandlePTZ('Right', false, 1)"
                @mouseup="onHandlePTZ('Right', true, 1)" />
                <input type="button" value="左下" @mousedown="onHandlePTZ('LeftDown', false, 1)"
                @mouseup="onHandlePTZ('LeftDown', true, 1)" />
                <input type="button" value="下" @mousedown="onHandlePTZ('Down', false, 1)"
                @mouseup="onHandlePTZ('Down', true, 1)" />
                <input type="button" value="右下" @mousedown="onHandlePTZ('RightDown', false, 1)"
                @mouseup="onHandlePTZ('RightDown', true, 1)" /> -->
                <div class="icon_box">
                    <i class="iconfont icon-quanping1" @click="setfullScreen"></i>
                    <CameraFilled @click="() => capture(1)" />
                    <el-switch v-model="value1" class="ml-2" @change="onStartEnlarge"
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #dcdfe6" />
                    <span class="span1">电子放大</span>
                    <i class="iconfont icon-jian" @click="onHandlePTZ('ZoomWide', false, 1)"></i>
                    <span class="span2">变倍</span>
                    <i class="iconfont icon-jiahao" @click="onHandlePTZ('ZoomTele', false, 1)"></i>
                    <span class="span3">变倍</span>
                </div>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import { ref, onMounted, nextTick, reactive } from 'vue'
// import DHPlayers from '@/components/DHCamera'
import moment from 'moment'
import DHPlayers from '@/components/DHCamera/DHplayers.vue'
const activeName = ref('third')
const videoPlayXian = ref() // 定义引用
const value1 = ref(false)
const isFullScreen = ref(false)
const cameraInfo = reactive({
  ip: '192.168.2.108',
  port: '80',
  username: 'admin',
  pswd: 'root1013',
  channel: 1
})
const step = ref(5)

const childVideo = ref(null)

const onHandlePTZ = (type, isStop, key) => {
  if (childVideo.value) {
    childVideo.value.onHandlePTZ(type, isStop)
  }
}

const onStartEnlarge = (event) => {
  value1.value = event
  if (childVideo.value) {
    if (event) {
      childVideo.value.onStartEnlarge()
    } else {
      childVideo.value.onStopEnlarge()
    }
  }
}

// 开启全屏
const setfullScreen = () => {
  // 确保 childVideo.value 确实提供了元素
  const videoElement = childVideo.value?.$el // 使用可选链
  if (videoElement) {
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen()
    } else if (videoElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
      videoElement.webkitRequestFullscreen()
    } else if (videoElement.mozRequestFullScreen) { // Firefox
      videoElement.mozRequestFullScreen()
    } else if (videoElement.msRequestFullscreen) { // IE/Edge
      videoElement.msRequestFullscreen()
    }
  }
  isFullScreen.value = true
}

// 关闭全屏
const exitFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
    document.webkitExitFullscreen()
  } else if (document.mozCancelFullScreen) { // Firefox
    document.mozCancelFullScreen()
  } else if (document.msExitFullscreen) { // IE/Edge
    document.msExitFullscreen()
  }
  isFullScreen.value = false
}

const onPlay = () => {
  console.log(childVideo.value)
  if (childVideo.value) {
    // 直接调用子组件上的方法
    // childVideo.value.login();
  }
}

const capture = () => {
  if (childVideo.value) {
    const name = moment().format('YYYYMMDDhhmmss')
    childVideo.value.capture(name)
  }
}

const handleClick = (tab, event) => {
  console.log(tab, event)
}

// 处理 createSuccess 事件
const createSuccess = (versionInfo) => {
  console.log('Create success event received', versionInfo)
}

const lookMore = () => {
  // nextTick(()=>{
  //     videoPlayXian.value.doInitVideo();
  // })
}

onMounted(() => {
  // nextTick(()=>{
  //     videoPlayXian.value.doInitVideo();
  // })
  onPlay()
})

</script>

<style lang="less" scoped>
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

.controller_box {
    position: absolute;
    width: 100%;
    height: 45px;
    line-height: 45px;
    bottom: 0;
    z-index: 99999999;
    background-color: rgba(0, 0, 0, 0.5);

    .icon_box {
        display: flex;
        align-items: center;
        /* 垂直居中 */
        height: 45px;
        font-size: 14px;

        svg {
            width: 25px;
            height: 25px;
            margin: 0px 20px 0px 10px;
            cursor: pointer;
        }

        i {
            font-size: 20px;
            margin: 0px 10px;
            cursor: pointer;
        }

        .span1 {
            margin: 0px 10px;
        }

        .span2 {}

        .span3 {}
    }

}
</style>
