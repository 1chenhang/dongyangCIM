<template>
  <div class="container" v-if="isTabActive">
    <div class="toolBanner">
      <div @click="toolClick(item)" v-for="item in toolList" class="tool"
        :key="item.name">
        <i :class="['iconfont', item.icon]"></i>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <img @click="isTab" class="isTab" :src="require('/public/image/homePage/收起按钮.png')" alt="">
  </div>
  <img @click="isTab" v-if="!isTabActive" class="isTab2" :src="require('/public/image/homePage/收起按钮.png')" alt="">
    <Control v-show="isControlShow" />
    <SearchBox v-show="isSearchShow" />
  </template>

<script setup>
import { ref, onMounted } from 'vue'
import Control from './components/Control'
import SearchBox from './components/SearchBox'
import Draw from '@/utils/CesiumHandler/drawHandler.js'
import $bus from '@/utils/eventBus.js'
import MeasureManager from '@/utils/measureManager'

import mapHelper from '@/utils/mapHelper'
const isOpenTool = ref(true)
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
    name: '正射',
    icon: 'icon-diqiu'
  }
  // {
  //   name: '控制',
  //   icon: 'icon-diqiu'
  // }

])
const isOpenClick = () => {
  isOpenTool.value = !isOpenTool.value
}
const toolClick = (param) => {
  toolName.value = param.name
  switch (param.name) {
    case '漫游':
      mapHelper.flyToDongYangCenter()
      // flyTo()
      break
    case '绘制线':
      drawLine()
      break
    case '测距':
      {
        const measureManager = new MeasureManager(viewer)
        measureManager.distance()
      }
      break
    case '绘制面':
      drawPlane()
      break
    case '查询':
      isSearchShow.value = !isSearchShow.value
      break
    case '清除':
      clearAll()
      break
    case '全屏':
      toggleFullscreen()
      break
    case '正射':
      twoAndThreeSwitch()
      break
    case '控制':
      isControlShow.value = !isControlShow.value
      break
    default:
      break
  }
}
// 定位至东阳指定区域
const flyTo = () => {
  viewer.camera.flyTo({
    // 114.317048, 30.570564 heading: Cesium.Math.toRadians(194.44648077420322), // 水平方向(东南西北)pitch: Cesium.Math.toRadians(-16.895707137641583), roll: Cesium.Math.toRadians(0)

    destination: Cesium.Cartesian3.fromDegrees(
      114.30315605726953,
      30.566290585097295,
      736.4296315532716
    ), // 经度、纬度、高度,
    orientation: {
      heading: Cesium.Math.toRadians(123.35386554380055), // 水平方向(东南西北)
      pitch: Cesium.Math.toRadians(-74.93740295722712), // 垂直方向
      roll: Cesium.Math.toRadians(0) //
    },
    duration: 3
  })

  // 设置相机的方位，只需要设置经度和纬度
  // const lon = 114.30440509093839
  // const lat = 30.56639967784591

  // // 设置水平旋转视口方向的角度
  // const heading = Cesium.Math.toRadians(117.92054260739572)
  // // 设置垂直旋转视口方向的角度
  // const pitch = Cesium.Math.toRadians(-75.96730021475499)
  // // 设置距离目标点的距离
  // const range = 809.099601360424
  // const center = Cesium.Cartesian3.fromDegrees(lon, lat)
  // // 第一个是目标位置信息，第二个是视口方向信息
  // viewer.camera.lookAt(center, new Cesium.HeadingPitchRange(heading, pitch, range))
}
// 绘制线
const drawLine = () => {
  draw.value.drawLine((res) => {
    console.log(res, '--res线')
    // positions.value = res
  })
}
// 绘制面
const drawPlane = () => {
  draw.value.drawPlane((res) => {
    console.log(res, '--res面')
    // positions.value = res
  })
}
const clearAll = () => {
  const pointSource = viewer.dataSources.getByName('地名搜索')[0]
  console.log(pointSource, '--pointSource')
  if (pointSource.entities) pointSource.entities.removeAll()
  draw.value.removeAll()
  const measureManager = new MeasureManager(viewer)
  measureManager.clear()
}
const toggleFullscreen = () => {
  const full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const twoAndThreeSwitch = () => {
  twoAndThreeFlag.value = !twoAndThreeFlag.value
  viewer.scene.mode = twoAndThreeFlag.value ? Cesium.SceneMode.SCENE2D : Cesium.SceneMode.SCENE3D
}
const isTabActive = ref(true)
const isTab = () => {
  isTabActive.value = !isTabActive.value
}

onMounted(() => {
  if (!viewer) return
  draw.value = new Draw(viewer)
  $bus.on('foldtool', (val) => {
    isTabActive.value = val
  })
})
</script>

  <style lang="less" scoped>
  .container{
    position: absolute;
    width: 33%;
    height: 132px;
    bottom: 0px;
    left: 35%;
    background-image: url('/public/image/bottom-small.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    box-sizing: border-box;
  }
  .toolBanner {
    width: 33%;
    position: absolute;
    display: flex;
    align-items: center;
    z-index: 11;
    overflow: hidden;
    transition: all .3s;
    top: 25%;
    left: 51%;
    transform: translateX(-50%);
    width: fit-content;

    .tool{
      text-align: center;
      font-size: 15px;
      color: #fff;
      width: 55px;
      height: 100px;
      margin-right: 15px;
      span{
        cursor: pointer;
      }
      &:hover {
        filter: brightness(200%);
      }
    }
    .tool i{
      height: 55px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      transition: all .3s;
      background-image: url('/public/image/gas_pressure.96b4740e.png');
      background-size: 100%;
      background-repeat: no-repeat;
      box-sizing: border-box;
      font-size: 28px;
      margin-bottom: 5px;
    }
  }
  .isTab {
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: all .3s;

    &:hover {
      filter: brightness(150%);
    }
  }
  .isTab2{
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: all .3s;
    z-index: 9999;
    transform: rotate(180deg);
    &:hover {
      filter: brightness(150%);
    }
  }
  </style>
