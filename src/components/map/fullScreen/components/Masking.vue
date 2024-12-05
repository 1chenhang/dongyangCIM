<template>
    <div v-if="isShowMasking" @click="isShowMasking = false" class="masking">
        <div class="mask">
            <p>点击选择摄像头</p>
        </div>
        <div class="mask2">
            <p>下拉获取更多功能</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const isShowMasking = ref(true)
</script>

<style lang="less" scoped>
.masking {
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    position: fixed;
    z-index: 99999;

    top: 0;

    .mask {
        padding: 10px 20px;
        width: 200px;
        margin-left: 108px;
        margin-top: 740px;
        background: rgba(0, 0, 0, 0.6);
        box-shadow: 1px 1px 1px 2000px rgba(0, 0, 0, 0.6);
        position: relative;

        p {
            font-size: 16px;
            color: #000;
            border-radius: 2px;
            background-color: #fff;
            padding: 5px 5px;
        }

        &::after {
            content: '';
            position: absolute;
            top: 22px;
            left: 15px;
            transform: rotate(-135deg);
            border-width: 0 10px 10px 0;
            border-style: solid;
            border-color: transparent #fff transparent transparent;
        }
    }

    .mask2 {
        padding: 10px 20px;
        width: 228px;
        right: 29px;
        bottom: 34%;
        position: absolute;

        p {
            font-size: 16px;
            color: #000;
            border-radius: 2px;
            background-color: #fff;
            padding: 5px 5px;
        }

        &::after {
            content: '';
            position: absolute;
            top: 22px;
            right: 15px;
            transform: rotate(45deg);
            border-width: 0 10px 10px 0;
            border-style: solid;
            border-color: transparent #fff transparent transparent;
        }
    }
}
</style>
