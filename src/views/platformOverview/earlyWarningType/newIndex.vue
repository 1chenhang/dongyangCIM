<template>
  <div class="s_banner">
    <div class="sxtBox">
      <img :src="require('/public/image/platformOverview/Frame_10063.gif')" alt="">
      <div class="textBox blue">
        <div class="text">摄像头数目</div>
        <div class="num">
          <span>{{ deviceObj.total }}</span> 个
        </div>
      </div>
    </div>
    <div class="sxtBox">
      <img :src="require('/public/image/platformOverview/Frame_10064.gif')" alt="">
      <div class="textBox orange">
        <div class="text">故障摄像头</div>
        <div class="num">
          <span>{{ deviceObj.offLine }}</span> 个
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, toRefs, watch, defineProps } from 'vue'
const prpos = defineProps({
  deviceStatusData:{
    type:Object,
    default:() => {}
  }
})

const deviceObj = ref({})
const { deviceStatusData } = toRefs(prpos)

watch(deviceStatusData,(newValue,oldValue)=>{
  deviceObj.value = newValue;
},{ deep: true, immediate: true })
</script>

<style lang="less" scoped>
.s_banner {
  padding: 0px 15px 0;
}

.sxtBox {
  display: flex;
  align-items: center;

  img {
    margin-right: 8px;
    height: 130px;
  }

  .textBox {
    .text {
      width: 286px;
      height: 27px;
      background-size: cover;
      background-repeat: no-repeat;
      font-size: 18px;
      color: #fff;
      text-indent: 20px;
      margin-bottom: 10px;
    }

    .num {
      span {
        font-family: YSBTH;
        font-size: 28px;
        margin-right: 10px;
      }

      font-size: 14px;
      color: #fff;
    }

  }

  .blue {
    .text {
      background-image: url('/public/image/platformOverview/sxtBg2.png');
    }

    .num {
      span {
        color: #0EFDC6;
      }
    }
  }

  .orange {
    .num {
      span {
        color: #EE7A30;
      }
    }

    .text {
      background-image: url('/public/image/platformOverview/sxtBg1.png');
    }
  }
}
</style>
