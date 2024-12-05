<template>
  <div class="iconBox">
    <div class="bBox">
      <img :src="require('/public/image/supervisingAnalysis/b1.png')" alt="">
      <div class="textBox">
        <p class="text">摄像头总数</p>
        <p class="num"><span>{{ staticsParams.total }}</span>个</p>
      </div>
    </div>
    <div class="bBox">
      <img :src="require('/public/image/supervisingAnalysis/b2.png')" alt="">
      <div class="textBox">
        <p class="text">新增故障</p>
        <p class="num"><span>{{ staticsParams.incr_fault }}</span>个</p>
      </div>
    </div>
    <div class="bBox">
      <img :src="require('/public/image/supervisingAnalysis/b3.png')" alt="">
      <div class="textBox">
        <p class="text">总计故障</p>
        <p class="num"><span>{{ staticsParams.fault }}</span>个</p>
      </div>
    </div>
    <div class="bBox">
      <img :src="require('/public/image/supervisingAnalysis/b4.png')" alt="">
      <div class="textBox">
        <p class="text">正常台数</p>
        <p class="num"><span>{{ staticsParams.normal }}</span>个</p>
      </div>
    </div>
    <div class="lastBgBox">
      <img :src="require('/public/image/supervisingAnalysis/b5.png')" alt="">
      <div class="textBox">
        <p class="text">本周期（根据右上角选定故障率）</p>
        <p class="num"><span>{{ staticsParams.fault_rate *100 }}</span>%</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getStaticsCamera } from '@/api/statics.js'

const staticsParams = ref({})
const getList = async () => {
  const { data, code } = await getStaticsCamera()
  if (code === '200')staticsParams.value = data
}
getList()
</script>

<style lang="less" scoped>
.iconBox {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 26px;
  justify-content: space-between;
  margin-top: 30px;

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

  .lastBgBox {
    width: 100%;
    height: 96px;
    background-image: url('/public/image/supervisingAnalysis/c3.png');
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;

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
          color: #F5C859;

        }
      }
    }
  }
}
</style>
