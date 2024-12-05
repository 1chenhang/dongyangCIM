<template>
    <video id="videoElement"></video>
  </template>
  <script>
import flvjs from 'flv.js'
  
  export default {
    data: function () {
      return {
      }
    },
    methods: {
      getFlvVideo() {
        if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: 'ws://192.168.2.19:8866/live?url=rtsp://admin:root1013@192.168.2.108:554/cam/realmonitor?channel=1&subtype=0'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    }
      },
    },
    mounted() {
      this.getFlvVideo()
    },
    computed: {
  
    },
  }
  </script>
  <style lang="less" scoped>
  </style>
  