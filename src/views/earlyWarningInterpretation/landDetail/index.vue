<template>
    <div class="container_box">
        <div class="camera_Item">
            <div class="item_title">
                <div class="img"><img :src="require('/public/image/earlyWarningInterpretation/地块Icon.png')" alt="">
                </div>
                <div class="title_bgc">
                    地块名称：江北百盛发展公司
                    <img :src="require('/public/image/earlyWarningInterpretation/地块Title.png')" alt="">
                </div>
            </div>
            <div class="item_content">
                <div class="row">
                    <p><span class="camera_label">乡镇街道：</span><span class="camera_value">江北街道</span></p>
                    <p><span class="camera_label">摄像头：</span><span class="camera_value">东阳基站</span></p>
                </div>
                <div class="row">
                    <p><span class="camera_label">土地坐落：</span><span class="camera_value">2005211</span></p>
                    <p><span class="camera_label">所属开发区：</span><span class="camera_value">东阳开发区</span></p>
                </div>
                <div class="row">
                    <p><span class="camera_label">规划用途：</span><span class="camera_value">上卢寸的</span></p>
                    <p><span class="camera_label">地块面积：</span><span class="camera_value">暂无</span></p>
                </div>
                <div class="row">
                    <p><span class="camera_label">批而未供：</span><span class="camera_value">东阳开发</span></p>
                    <p><span class="camera_label">报批项目：</span><span class="camera_value">2024-01-03 04:48:11</span></p>
                </div>
                <div class="row">
                    <p><span class="camera_label">批而未供：</span><span class="camera_value">东阳开发</span></p>
                    <p><span class="camera_label">报批项目：</span><span class="camera_value">2024-01-03 04:48:11</span></p>
                </div>
                <div class="row">
                    <p><span class="camera_label">批而未供：</span><span class="camera_value">东阳开发</span></p>
                    <p><span class="camera_label">报批项目：</span><span class="camera_value">2024-01-03 04:48:11</span></p>
                </div>
                <div class="row">
                    <p><span class="camera_label">批而未供：</span><span class="camera_value">东阳开发</span></p>
                    <p><span class="camera_label">报批项目：</span><span class="camera_value">2024-01-03 04:48:11</span></p>
                </div>
                <div class="row">
                    <p><span class="camera_label">批而未供：</span><span class="camera_value">东阳开发</span></p>
                    <p><span class="camera_label">报批项目：</span><span class="camera_value">2024-01-03 04:48:11</span></p>
                </div>
            </div>
        </div>
        <div class="flexBox">
            <div @click="earlyWaringDialog = true" class="btn_box">预警判读</div>
            <div @click="massifDialog = true" class="btn_box">地块筛选</div>
        </div>

    </div>
    <BaseDialog1 v-show="earlyWaringDialog" @closeDialog="earlyWaringDialog = false" :styles="earlyWaringStyles"
        :title="'预警判读'">
        <template v-slot:content>
            <YJPD />
        </template>
    </BaseDialog1>
    <BaseDialog1 v-show="massifDialog" @closeDialog="massifDialog = false" :styles="massifStyles" :title="'地块筛选'">
        <template v-slot:content>
            <DKSX />
        </template>
    </BaseDialog1>
</template>

<script setup>
import { ref } from 'vue'

import YJPD from './components/YJPD.vue'
import DKSX from './components/DKSX.vue'
import BaseDialog1 from '@/components/BaseDialog1'
const earlyWaringStyles = ref({
  width: '333px',
  top: '12%',
  right: '40%'
})
const massifStyles = ref({
  width: '333px',
  top: '47%',
  right: '40%'
})
const earlyWaringDialog = ref(false)
const massifDialog = ref(true)
</script>

<style lang="less" scoped>
.container_box {
    height: 52.1%;
    overflow-y: auto;
    color: #fff;
    margin-top: 10px;
    padding: 0px 10px;
}

.item_content {
    display: flex;
    height: 161px;
    overflow-y: auto;
    flex-direction: column;
    align-items: flex-start;
    background-color: #04264E85;
    font-size: 12px;
}

.row {
    display: flex;
    height: 40px;
    width: 100%;
    // justify-content: flex-start;
}

.row:nth-child(even) {
    background-color: #0E509B73;
}

.camera_Item {
    margin-bottom: 5px;
    border-radius: 3px;
    font-size: 15px;

    p {
        height: 40px;
        padding: 5px 15px;
        width: 50%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
    }

    .item_title {
        padding-bottom: 10px;
        display: flex;
        align-items: center;

        .img {
            margin-right: 12px;
        }

        .title_bgc {
            position: relative;
            padding-left: 15px;

            img {
                position: absolute;
                left: 0;
                bottom: -8px;
            }
        }

    }

    .camera_label {
        color: #99C3F4;
        font-size: 14px;
    }

    .camera_value {
        color: #fff;
        font-size: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        flex: 1;
    }
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

.flexBox {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;

    .btn_box {
        width: 160px;
        height: 43px;
        background-image: url('/public/image/earlyWarningAnalysis/wfcz.png');
        margin: 0 auto;
        line-height: 43px;
        text-align: center;
        transition: all .3s;
        cursor: pointer;

        &:hover {
            filter: brightness(150%);
        }
    }

}
</style>
