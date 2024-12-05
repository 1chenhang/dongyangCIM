<template>
    <div class="setUpBox" v-drag>
        <div class="flexBox one">
            <el-icon @click="controlClick('left_top')">
                <CaretTop />
            </el-icon>
            <el-icon @click="controlClick('top')">
                <CaretTop />
            </el-icon>
            <el-icon @click="controlClick('right_top')">
                <CaretTop />
            </el-icon>
        </div>
        <div class="flexBox two">
            <el-icon @click="controlClick('left')">
                <CaretTop />
            </el-icon>
            <el-icon @click="controlClick('right')">
                <CaretTop />
            </el-icon>
        </div>
        <div class="flexBox three">
            <el-icon @click="controlClick('left_bottom')">
                <CaretTop />
            </el-icon>
            <el-icon @click="controlClick('bottom')">
                <CaretTop />
            </el-icon>
            <el-icon @click="controlClick('right_bottom')">
                <CaretTop />
            </el-icon>
        </div>
    </div>
</template>

<script setup>
import { CaretTop } from '@element-plus/icons-vue'
import $bus from '@/utils/eventBus.js'
// 设置水平旋转视口方向的角度
let heading = 117.92054260739572
// 设置垂直旋转视口方向的角度
let pitch = -75.96730021475499
const controlClick = (e) => {
  switch (e) {
    case 'left_top':
      pitch += 5
      heading -= 5
      break
    case 'top':
      pitch += 5
      break
    case 'right_top':
      heading += 5
      pitch += 5
      break
    case 'left':
      heading -= 5
      break
    case 'right':
      heading += 5
      break
    case 'left_bottom':
      heading -= 5
      pitch -= 5
      break
    case 'bottom':
      pitch -= 5
      break
    case 'right_bottom':
      heading += 5
      pitch -= 5
      break

    default:
      break
  }
  const lon = 114.30440509093839
  const lat = 30.56639967784591
  // 设置距离目标点的距离
  const range = 809.099601360424
  const center = Cesium.Cartesian3.fromDegrees(lon, lat)
  // 第一个是目标位置信息，第二个是视口方向信息
  viewer.camera.lookAt(center, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(heading), Cesium.Math.toRadians(pitch), range))
//   $bus.emit('controlClick', e)
}
</script>

<style lang="less" scoped>
.setUpBox {
    position: absolute;
    top: 100px;
    left: 30%;
    z-index: 11;
    background-color: rgba(13, 81, 157, 0.45);
    box-shadow: 0 0 0 1px #0B7FE2 inset;

    .flexBox {
        display: flex;
        justify-content: space-between;

        .el-icon {
            font-size: 42px;
            color: #fff;
            cursor: pointer;
        }

    }

    .one .el-icon:nth-child(1) {
        transform: rotateZ(-45deg);
    }
    .one .el-icon:nth-child(2) {

    }
    .one .el-icon:nth-child(3) {
        transform: rotateZ(45deg);
    }
    .two .el-icon:nth-child(1) {
        transform: rotateZ(-90deg);
    }
    .two .el-icon:nth-child(2) {
        transform: rotateZ(90deg);
    }
    .three .el-icon:nth-child(1) {
        transform: rotateZ(-135deg);
    }
    .three .el-icon:nth-child(2) {
        transform: rotateZ(180deg);
    }
    .three .el-icon:nth-child(3) {
        transform: rotateZ(135deg);
    }

}
</style>
