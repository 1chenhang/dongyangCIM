<template>
    <div class="cameraBox">
      <div class="bBox" @click="skipClick('1')">
      <img :src="require('/public/image/supervisingAnalysis/b1.png')" alt="">
      <div class="textBox">
        <p class="text">在线设备</p>
        <p class="num"><span>{{ deviceObj.total-deviceObj.offLine }}</span>个</p>
      </div>
    </div>
    <div class="bBox" @click="skipClick('0')">
      <img :src="require('/public/image/supervisingAnalysis/b2.png')" alt="">
      <div class="textBox">
        <p class="text">离线设备</p>
        <p class="num"><span>{{ deviceObj.offLine }}</span>个</p>
      </div>
    </div>
    <div class="bBox" @click="skipClick('1')">
      <img :src="require('/public/image/supervisingAnalysis/b5.png')" alt="">
      <div class="textBox">
        <p class="text">在线率</p>
        <p class="num"><span>{{((deviceObj.total-deviceObj.offLine)/deviceObj.total*100).toFixed(2) }}</span>%</p>
      </div>
    </div>
    </div>
</template>

<script setup>
import { ref, toRefs, watch, defineProps } from 'vue'
import { useRouter } from 'vue-router'
const Router = useRouter()
const prpos = defineProps({
  deviceStatusData: {
    type: Object,
    default: () => { }
  }
})

const skipClick = (type) =>{
  Router.push({
      path: '/supervisingAnalysis',
      query: { tabs: 3,type:type }
  })  
}

const deviceObj = ref({})
const { deviceStatusData } = toRefs(prpos)

watch(deviceStatusData, (newValue) => {
  deviceObj.value = newValue
}, { deep: true, immediate: true })
</script>

<style lang="less" scoped>
.cameraBox {
    width: 780px;
    display: flex;
    justify-content: space-between;

    .bBox {
      width: 240px;
      height: 96px;
      background-image: url('/public/image/supervisingAnalysis/c1.png');
      background-size: cover;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;
      margin-bottom: 50px;
      cursor: pointer;

      &:hover {
        filter: brightness(150%);
      }
      &:nth-child(2n) {
        background-image: url('/public/image/supervisingAnalysis/c2.png');

        .textBox {
          .num {
            span {
              color: #36F2BA;
            }
          }
        }
      }
      &:nth-child(3n) {
        background-image: url('/public/image/components/故障_bg.png');

        .textBox {
          .num {
            span {
              color: #F5C859;
            }
          }
        }
      }

      img {
        margin-right: 20px;
      }

      .textBox {
        .text {
          font-size: 16px;
          color: #fff;
        }

        .num {
          color: #FFFFFF80;
          font-size: 12px;

          span {
            font-family: YSBTH;
            font-size: 26px;
            color: #36D0F2;

          }
        }
      }
    }
  }
</style>
