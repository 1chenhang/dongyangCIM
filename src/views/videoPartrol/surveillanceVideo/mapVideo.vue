<template>
    <div class="container_box">
        <div class="video_title">
            <img src="../../../../public/image//earlyWarningAnalysis/jkbt.png">
            <span>{{ cameraName }}</span>
        </div>
        <div @dblclick="handleDoubleClick" class="video_wapper">
            <!-- <video class="videos" controls src="http://192.168.2.5:8304/Upload/Default/2024/06/27/1046553099196240993.mp4"></video> -->
            <DHPlayers  ref="childVideo" :step="5" :options="cameraInfo" :WndIndex="0"  />
            <MapCanvas />
        </div>
        <div class="video_controller">
            <div class="controller_left">
                <img @click="clearAllCanvas" src="../../../../public/image//earlyWarningAnalysis/Union.png">
                <img @click="screenClick" src="../../../../public/image//earlyWarningAnalysis/fdhm.png">
                <img @click="showBtn" src="../../../../public/image/earlyWarningAnalysis/sx.png">
            </div>
            <div class="controller_right">
                <el-switch v-model="value1" class="ml-2" @change="onStartEnlarge"
                    style="--el-switch-on-color: #1F6BC1D6;" />
                <span class="span1">地图定位</span>
                <el-switch v-model="value2" class="ml-2" @change="onStartEnlarge2"
                    style="--el-switch-on-color: #1F6BC1D6; " />
                <span class="span2">视频定位</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, onBeforeUnmount, defineEmits } from 'vue'
import DHPlayers from '@/components/DHCamera/DHplayers.vue'
import MapCanvas from './mapCanvas.vue'
import { ElNotification } from 'element-plus'

import $bus from '@/utils/eventBus.js'

const value1 = ref(false)
const value2 = ref(false)
const cameraName = ref('')
const cameraInfo = reactive({
  ip: '192.168.2.108',
  port: '80',
  username: 'admin',
  pswd: 'root1013',
  channel: 1
})
const childVideo = ref()
onMounted(() => {
  childVideo.value.login()
})
</script>

<style lang="less" scoped>

.videos{
    width: 400px;
    height: 325px;
}

.container_box {
    padding: 12px 12px 15px 12px;
    margin-top: 20px;
    height: 416px;
    color: #FFFFFF;
    font-size: 14px;
    box-sizing: border-box;
    background-image: url('../../../../public/image/earlyWarningAnalysis/Rectangle 19960.png');
    background-size: 100% 100%;
    margin-bottom: 32px;
}

.video_title {
    display: flex;
    margin-left: 3px;
    margin-bottom: 10px;

    span {
        margin-left: 4.83px;
    }
}

.video_wapper {
    height: 325px;
    margin-bottom: 12px;
    position: relative;

    img {
        width: 100%;
        height: 325px;
    }

}

.video_controller {
    display: flex;
    justify-content: space-between;

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

        span {
            margin-left: 8px;
        }

        .span1 {
            margin-right: 22px;
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
    box-shadow: 0px0px 5.68px 0px #5397FD7A;
}

.controller_right /deep/ .el-switch__core {
    width: 36px;
    height: 17px;
}
.landText{
  position: absolute;
  z-index: 11;
  pointer-events:none;
  font-size: 12px;
  color: #af0404;
}
</style>
