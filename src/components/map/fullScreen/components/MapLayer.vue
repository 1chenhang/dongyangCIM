<template>
    <div class="toolBanner">
        <div @click="isOpenClick" :class="['toolBox', isOpenTool ? 'toolBg' : '']">
            <i class="iconfont icon-diqiu"></i>
        </div>
        <div :class="['layerBox',isOpenTool?'isLayerActive':''] ">
            <el-radio-group @change="mapLayerChange" v-model="radio">
                <el-radio label="影像地图">影像地图</el-radio>
                <el-radio label="科技版地图">科技版地图</el-radio>
            </el-radio-group>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import $bus from '@/utils/eventBus.js'
const isOpenTool = ref(false)
const radio = ref('影像地图')
const isOpenClick = () => {
  isOpenTool.value = !isOpenTool.value
}
const mapLayerChange = () => {
  $bus.emit('mapLayerChange', radio.value)
}
onMounted(() => {
})
</script>

<style lang="less" scoped>
.toolBanner {
    display: flex;
    // flex-direction: column;
    align-items: center;
    position: absolute;
    left: 2.5%;
    top: 85%;
    z-index: 999999999;
    height: 46px; // 408
    overflow: hidden;
    transition: all .3s;
    border-radius: 5px;

    i {
        color: #fff;
        font-size: 30px;
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

::v-deep.layerBox {
     width: 0px;
    display: flex;
    margin-left: 10px;
    align-items: center;
    height: 44px;
    border: none;
    transition: all .5s;
    border-radius: 8px;
    background: #01152b;
    padding: 0;
    box-shadow: 0 0 0 1px #0B7FE2 inset;
    .el-radio-group {
        flex-wrap: nowrap;
    }
    .el-radio {
    color: #fff;

    .el-radio__inner {
      border: 1px solid #0B80E3;
      width: 14px;
      height: 14px;
      background-color: transparent;

      &:after {
        width: 5px;
        height: 5px;
        background-color: #0B80E3;
      }
    }

  }

}
.isLayerActive {
    width: 205px;
    padding: 0 10px;
  }
</style>
