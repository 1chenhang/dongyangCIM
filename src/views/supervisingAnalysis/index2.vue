<template>
    <div class="left_banner">
      <Tags class="mt10" title="预警信息分析" />
      <CameraType />
      <Tags class="mt10" title="违法处置分析" />
      <CameraList />
    </div>
    <div class="right_banner">
      <Tags class="mt10" title="视频监控摄像分析" />
      <SurveillanceVideo/>
      <Tags class="mt10" title="监控对象统计分析" />
      <LandDetail />
    </div>
  </template>
  
  <script setup>
  import Tags from '@/components/Tags/index'
  import CameraType from './CameraType/index'
  import SurveillanceVideo from './surveillanceVideo/index'
  import CameraList from './cameraList/index'
  import LandDetail from './landDetail/index'
  </script>
  
  <style lang="less" scoped>
  .mb13 {
    margin-bottom: 13px;
  }
  
  .mt10 {
    margin-top: 10px;
  }
  </style>
  