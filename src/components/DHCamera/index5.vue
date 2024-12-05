<template>
  <div>
    <div id="wrapper" style="width: 500px;height: 300px;">
    </div>
  </div>
</template>
<script>
import Chimee from 'chimee-player';
import flv from 'chimee-kernel-flv';

export default {
  components: {

    Chimee, //注册组件
    flv, //注册组件
  },
  data: function () {
    return {
      title: '',
      size: '',
      videoShow: false,
    }
  },
  methods: {
    getFlvVideo() {
      const player = new Chimee({
        src: 'http://192.168.2.19:8866/live?url=rtsp://admin:root1013@192.168.2.108:554/cam/realmonitor?channel=1&subtype=0',
        // preset: {
        //   flv: flv
        // },
        isLive: true,
        // 编解码容器
        box: flv, // flv hls mp4
        // dom容器
        wrapper: '#wrapper',
        // video
        autoplay: true,
        controls: true
      })
      console.log(player)
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
