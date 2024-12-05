<template>
    <ul class="posBox">
            <li v-if="showWaterLabel('取证时间')">
                <span>时间:</span> <span>{{nowTime}}</span>
            </li>
            <li v-if="showWaterLabel('街道')">
                <span>街道:</span> <span>{{analySisData.townName}}</span>
            </li>
            <li v-if="showWaterLabel('摄像头名称')">
                <span>摄像头名称:</span> <span>{{ analySisData.deviceName }}</span>
            </li>
            <li v-if="showWaterLabel('取证时间')">
                <span>摄像头地址:</span> <span>{{analySisData.deviceAddress}}</span>
            </li>
            <li v-if="showWaterLabel('摄像头姿态')">
                <span>方位角:</span> <span>{{analySisData.dkmc || '暂无'}}</span>
            </li>
            <li v-if="showWaterLabel('预警地经纬度')">
                <span>摄像头纬度:</span> <span>{{analySisData.lat}}</span>
            </li>
            <li v-if="showWaterLabel('预警地经纬度')">
                <span>摄像头经度:</span> <span>{{analySisData.lon}}</span>
            </li>
        </ul>

  </template>

<script setup>
import { ref, watch, inject } from 'vue'
import { watermarkList } from '@/api/camera'
import { timeline } from '@/utils/utils'
const analySisData = ref({})
const nowTime = ref('')
const waterList = ref([])
const cameraFullScreenObj = inject('cameraFullScreenObj')

const geiWaterList = async () => {
  const { data } = await watermarkList({})
  waterList.value = data
}
const showWaterLabel = (val) => {
  const arr = waterList.value.find(item => item.name === val)
  if (arr && arr.state) {
    return arr.state === '1'
  }
}

watch(cameraFullScreenObj, (newValue) => {
  analySisData.value = newValue
  nowTime.value = timeline('秒')
  geiWaterList()
}, { deep: true, immediate: true })

</script>

  <style lang="less" scoped>
    .posBox{
        position: absolute;
        bottom: 15px;
        left: 15px;
        z-index: 20;
        li{
            color: #fff;
            font-size: 18px;
        }
    }
  </style>
