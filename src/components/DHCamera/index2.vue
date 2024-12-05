<template>
    <div class="video_home">
      <video class="videoBox" muted autoplay controls ref="videoElement"></video>
    </div>
  </template>
  
  <script setup>
  import { onMounted, onBeforeUnmount, ref,nextTick } from 'vue';
  import flvjs from 'flv.js';
  
  const videoElement = ref(null);
  
  onMounted(() => {
    if (flvjs.isSupported()) {
      const flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        url: 'http://192.168.2.4:8866/live?url=rtsp://admin:root1013@192.168.2.108:554/cam/realmonitor?channel=1&subtype=0'
      });
  
      flvPlayer.on('error', (e) => {
        console.log(e);
      });
  
      // 确保在下一个 DOM 更新的 Tick 后执行
      nextTick(() => {
        // 挂载到 video 元素上
        flvPlayer.attachMediaElement(videoElement.value);
  
        try {
          flvPlayer.load();
          flvPlayer.play();
        } catch (error) {
          console.log(error);
        }
      });
  
      // 保存 flvPlayer 实例以便之后清理
      videoElement.value.flvPlayer = flvPlayer;
    }
  });
  
  onBeforeUnmount(() => {
    if (videoElement.value?.flvPlayer) {
      videoElement.value.flvPlayer.destroy(); // 销毁播放器实例
    }
  });
  </script>
  
  <style scoped lang="less">
  .video_home {
    .videoBox {
      width: 300px;
      height: 300px;
    }
  }
  </style>