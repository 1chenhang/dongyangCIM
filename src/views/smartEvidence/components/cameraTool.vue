<template>
    <div v-drag :class="['toolBanner', isOpenTool ? 'isOpenActive' : '']">
      <div @click="isOpenClick" :class="['toolBox', isOpenTool ? 'toolBg' : '']">
        <i class="iconfont icon-shexiangtou-"></i>
      </div>
    </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue'
import $bus from '@/utils/eventBus.js'
import Draw from '@/utils/CesiumHandler/drawHandler.js'
import mapHelper from '@/utils/mapHelper'
const isOpenTool = ref(false)
const toolName = ref('')
const draw = ref()
const twoAndThreeFlag = ref(false)
const isControlShow = ref(false)
const isSearchShow = ref(false)
const toolList = ref([
  {
    name: '漫游',
    icon: 'icon-manyou'
  },
  {
    name: '绘制线',
    icon: 'icon-drawing'
  },
  {
    name: '测距',
    icon: 'icon-chizi_o'
  },
  {
    name: '绘制面',
    icon: 'icon-shitucemianji'
  },
  {
    name: '查询',
    icon: 'icon-chaxun'
  },
  {
    name: '清除',
    icon: 'icon-qingchu'
  },
  {
    name: '全屏',
    icon: 'icon-quanping'
  },
  {
    name: '二三维',
    icon: 'icon-diqiu'
  },
  {
    name: '控制',
    icon: 'icon-diqiu'
  }

])

const isOpenClick = () => {
  isOpenTool.value = !isOpenTool.value
  console.log(isOpenTool.value,'1111111111')
  $bus.emit('isOpenToolShow',isOpenTool.value)
}
const toggleFullscreen = () => {
  const full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
onMounted(() => {
})
</script>

  <style lang="less" scoped>
  .toolBanner {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 2.5%;
    top: 78%;
    z-index: 999999999;
    width: 46px;
    height: 46px; // 408
    overflow: hidden;
    transition: all .3s;
    border-radius:5px;
    i{
        color:#fff;
        font-size:30px;
    }

    .toolBox {
      min-width: 46px;
      min-height: 46px;
      background-image: url('/public/image/components/工具箱_bg1.png');
      background-color: #06314E;

      background-size: cover;
      background-repeat: no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 12px;
      transition: all .3s;
      cursor: pointer;

      &:hover {
        filter: brightness(200%);
      }
    }

    .toolBg {
      background-image: url('/public/image/components/工具箱_bg2.png');
    }

    .tool {
      background-image: url('/public/image/components/toolIconBg.png');
      background-size: cover;
      background-repeat: no-repeat;
      width: 38px;
      min-height: 38px;
      margin-bottom: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all .3s;

      &:hover {
        filter: brightness(200%);
      }

      color: #fff;

      i {
        font-size: 22px;
      }
    }

    .toolActive {
      background-image: url('/public/image/components/toolIconBg2.png');
    }
  }

  .isOpenActive {
    height: 500px !important;

  }
  </style>
