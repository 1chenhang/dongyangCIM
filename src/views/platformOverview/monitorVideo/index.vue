<template>
  <div class="videoWrapper">
    <div class="selectBox">
      <p>摄像头、监控选择：</p>
      <el-select v-model="value" placeholder="请选择" @change="selectChange" style="width: 294px"
        popper-class="selectMenuOption" suffix-icon="CaretBottom">
        <el-option v-for="item in cameraList" :key="item.id" :label="item.deviceName" :value="item.id" style="background: #052243F5;
" />
      </el-select>
    </div>
    <div @dblclick="handleDoubleClick" class="videoBox">
      <DHPlayers ref="childVideo" />
      <div class="textBox">
        <img :src="require('/public/image/components/监控标题前装饰.png')" alt="">
        <p>11月新能源汽车行驶里程达到98亿公里</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import DHPlayers from '@/components/DHCamera/index.vue'
import { useStore } from 'vuex'
import emitter from '@/utils/eventBus'
const Store = useStore()
const value = ref()
const childVideo = ref()
const cameraList = ref([])
const cameraObj = ref()
cameraList.value = computed(() => Store.state.cameraData)
const handleDoubleClick = () => childVideo.value.fullScreen()
const selectChange = (e) => {
  cameraList.value.forEach(item => {
    if (item.id === e) emitter.emit('cameraObj', item)
  })
}
watch(cameraList.value, (newValue) => {
  if (newValue) cameraList.value = newValue
}, { deep: true, immediate: true })
</script>

<style lang="less" scoped>
.videoWrapper {
  padding: 20px 0px;
  box-sizing: border-box;

  .selectBox {
    display: flex;
    align-items: center;
    margin-bottom: 18px;

    p {
      font-size: 14px;
      color: #fff;
    }
  }

}

::v-deep.el-select {
  .el-select__wrapper {
    min-height: 28px;
    background: url('/public/image/platformOverview/selectBg.png');
    background-size: cover;
    background-repeat: no-repeat;

    box-shadow: none;
  }

  .el-select__caret {
    font-size: 16px;
    color: #0B80E3;
  }

  .el-select__placeholder {
    color: #fff;
  }
}

.videoBox {
  height: 215px;
  padding: 10px 12px;
  box-sizing: border-box;
  background-image: url('/public/image/components/videoBg.png');
  background-size: cover;
  background-repeat: no-repeat;

  .video {
    height: 170px;
    width: 100%;
  }

  .textBox {
    display: flex;
    align-items: center;

    img {
      margin-right: 5px
    }

    p {
      font-size: 14px;
      color: #fff
    }
  }
}
</style>
<style>
.el-popper__arrow {
  display: none;
  /* 隐藏小三角图案 */
}

.el-select-dropdown__list {
  padding: 0;
  border-radius: 4px;
  border: 1px solid #0B7FE2;
}

.el-select-dropdown__item {
  color: #fff;
  border-bottom: 1px solid #0B7CDC3B;
}

.el-popper.is-light {
  border: none;
}

.el-select-dropdown__item:hover {
  color: rgb(213, 215, 230);
  background: linear-gradient(90deg, rgba(11, 132, 244, 0) 0%, rgba(11, 132, 244, 0.42) 52.16%, rgba(11, 132, 244, 0) 100%), #052243F5 !important;
}
</style>
