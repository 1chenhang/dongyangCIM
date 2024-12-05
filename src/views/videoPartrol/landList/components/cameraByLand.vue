<template>
  <div class="banner">
    <div class="selectBox">
      <p>摄像头：</p>
      <el-select v-model="cameraId" placeholder="请选择" @change="selectChange" style="width: 294px"
        popper-class="selectMenuOption" suffix-icon="CaretBottom">
        <el-option v-for="item in cameraList" :key="item.deviceSn" :label="item.deviceName" :value="item.deviceSn"
          style="background: #052243F5;
" />
      </el-select>
    </div>
    <div class="selectBox">
      <p>地块id：</p>
      <div class="searchBox">
        <el-input v-model="landId" style="width: 100%"  />
      </div>
    </div>
    <div class="selectBox">
      <p>红线区域：</p>
      <div class="searchBox">
        <el-input v-model="coordArr" style="width: 100%"  />
      </div>
    </div>
    <div class="btnList">
      <div @click="addLand" class="btn btn1">
        <p>确定</p>
      </div>
      <div @click="emits('closeSon')" class="btn btn2">
        <p>取消</p>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import $bus from '@/utils/eventBus.js'
import { getYZD, getMonitorByLand } from '@/api/camera'
const cameraId = ref('')
const landId = ref('')
const coordArr = ref([])
const Store = useStore()
const cameraList = ref([])
const emits = defineEmits(['closeSon'])
cameraList.value = computed(() => Store.state.cameraData)

const selectChange = (e) => {
  console.log(e, '--computed')
}
const addLand = async () => {
  addYZD()
  addMonitorByLand()
}
const addYZD = async () => {
  const { data } = await getYZD({ deviceSn: cameraId.value, presetName: '预置点1', featureId: landId.value })
}
const addMonitorByLand = async () => {
  const { data, code } = await getMonitorByLand({ deviceSn: cameraId.value, coords: JSON.stringify(coordArr.value), featureId: landId.value })
  if (code === '200') {
    emits('closeSon')
    ElMessage.success('关联成功')
    landId.value = ''
    coordArr.value = []
  } else {
    ElMessage.error('关联失败请重试')
  }
}
onMounted(() => {
  $bus.on('canvasCoord', (coords) => {
    coordArr.value = [coords]
  })
  $bus.on('featureId', (featureId) => {
    landId.value = featureId
  })
  $bus.on('cameraObj', ({ deviceSn }) => {
    cameraId.value = deviceSn
  })
})
onBeforeUnmount(() => {
  $bus.off('canvasCoord')
  $bus.off('featureId')
  $bus.off('cameraObj')
})
watch(cameraList.value, (newValue) => {
  if (newValue) cameraList.value = newValue
}, { deep: true, immediate: true })
</script>

<style lang="less" scoped>
::v-deep.banner {
  padding: 20px 30px;

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

  .btnList {
    display: flex;
    justify-content: center;
    margin-top: 18px;

    .btn {
      width: 80px;
      box-sizing: border-box;
      border-radius: 8px;
      text-align: center;
      font-size: 14px;
      line-height: 32px;
      cursor: pointer;
      transition: all .3s;

      &:hover {
        filter: brightness(130%);
      }
    }

    .btn1 {
      margin-right: 22px;
      background: linear-gradient(180deg, rgba(1, 79, 51, 0.8) 25%, rgba(21, 242, 189, 0.8) 100%);
      border: 2px solid #31DFB5;
      box-shadow: 0px 4px 14.6px 0px #25EAC680;

      p {
        background: linear-gradient(180deg, #FFFFFF 27.27%, #4DC7BF 100%);
        // text-shadow: 0px 2px 0px #00000080;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .btn2 {
      background: linear-gradient(180deg, rgba(1, 51, 79, 0.8) 25%, rgba(21, 136, 242, 0.8) 100%);

      border: 2px solid #318CDF;
      box-shadow: 0px 4px 14.6px 0px #258BEA80;

      p {
        background: linear-gradient(180deg, #FFFFFF 27.27%, #4D9BC7 100%);

        // text-shadow: 0px 2px 0px #00000080;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}

::v-deep .el-radio__input.is-checked+.el-radio__label {
  color: #fff;
}

::v-deep .selectBox {
  display: flex;
  align-items: center;
  margin-bottom: 18px;

  .el-select {
    .el-select__wrapper {
      min-height: 35px;
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

  p {
    font-size: 14px;
    color: #fff;
  }
}

::v-deep .searchBox {
  width: 300px;
  height: 36px;
  background-image: url('/public/image/supervisingAnalysis/searchBg.png');
  margin-top: 20px;

  .el-input {
    height: 100%;

    .el-input__wrapper {
      background-color: transparent;
      box-shadow: none;

      .el-input__inner {
        color: #fff;
      }
    }
  }

  .el-input__suffix {
    color: #fff;
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
