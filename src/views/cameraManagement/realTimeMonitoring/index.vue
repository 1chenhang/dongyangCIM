<template>
    <div class="container_box">
        <div class="video_title">
            <img :src="require('/public/image/earlyWarningAnalysis/jkbt.png')">
            <span>江北街道_塘下前村_1(近东北）(全国报警）</span>
        </div>
        <div class="video_wapper">
            <DHPlayers ref="childVideo" />
        </div>
        <div class="video_controller">
            <div class="controller_left">
                <img :src="require('/public/image/earlyWarningAnalysis/Union.png')">
                <img @click="setfullScreen" :src="require('/public/image/earlyWarningAnalysis/fdhm.png')">
                <img @click="refresh" :src="require('/public/image/earlyWarningAnalysis/sx.png')">
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
import { ref } from 'vue'
import DHPlayers from '@/components/DHCamera/index.vue'
import emitter from '@/utils/eventBus'
const activeName = ref('third')
const value1 = ref(false)
const value2 = ref(false)

const childVideo = ref(null)
const isFullScreen = ref(false)

const onStartEnlarge2 = (event) => {
    console.log(event, 'eventeventevent')
    emitter.emit('drawHandler', event)
}
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
    console.log(event, '123123')
}
</script>

<style lang="less" scoped>
.container_box {
    padding: 12px 12px 15px 12px;
    margin-top: 20px;
    height: 416px;
    color: #FFFFFF;
    font-size: 14px;
    box-sizing: border-box;
    background-image: url('../../../../public/image/earlyWarningAnalysis/Rectangle 19960.png');
    background-size: 100% 100%;
    margin-bottom: 40px;
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
    position: relative;
    height: 325px;
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
    box-shadow: 0px 0px 5.68px 0px #5397FD7A;
}

.controller_right /deep/ .el-switch__core {
    width: 36px;
    height: 17px;
}
</style>
