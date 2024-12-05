<template>
  <div class="title">{{ props.title }}</div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  title: String
})
</script>

<style lang="less" scoped>
.title {
    width: 428px;
    height: 45px;
    padding-left: 38px;
    padding-top: 5px;
    box-sizing: border-box;
    background-image: url('/public/image/platformOverview/标题_bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    font-family: YSBTH;
    font-size: 20px;
    color: #fff;
    display: flex;
    align-items: center;
  }
</style>
