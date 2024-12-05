<template>
  <ul class="ul_wrapper">
    <li>
      <img :src="require('/public/image/supervisingAnalysis/a1.png')" alt="">
      <div class="textBox">
        <p class="text">分配任务</p>
        <p class="num"><span>12</span>条</p>
      </div>
    </li>
    <li>
      <img :src="require('/public/image/supervisingAnalysis/a2.png')" alt="">
      <div class="textBox">
        <p class="text">处理任务</p>
        <p class="num"><span class="yellow">1855</span>条</p>
      </div>
    </li>
    <li>
      <img :src="require('/public/image/supervisingAnalysis/a3.png')" alt="">
      <div class="textBox">
        <p class="text">平均处理时间</p>
        <p class="num"><span class="green">12</span>条</p>
      </div>
    </li>
    <li>
      <img :src="require('/public/image/supervisingAnalysis/a4.png')" alt="">
      <div class="textBox">
        <p class="text">被投诉次数</p>
        <p class="num"><span>1424</span>次</p>
      </div>
    </li>
    <li>
      <img :src="require('/public/image/supervisingAnalysis/a5.png')" alt="">
      <div class="textBox">
        <p class="text">任务完成率</p>
        <p class="num"><span class="yellow">12</span>%</p>
      </div>
    </li>
    <li>
      <img :src="require('/public/image/supervisingAnalysis/a6.png')" alt="">
      <div class="textBox">
        <p class="text">被投诉占比</p>
        <p class="num"><span class="green">12</span>%</p>
      </div>
    </li>
  </ul>
</template>

<script setup>

</script>

<style lang="less" scoped>
.ul_wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 30px 12px;

  li {
    display: flex;
    margin-bottom: 35px;
    align-items: center;
    width: 33.3%;

    .textBox {
      .text {
        font-size: 14px;
        color: #fff;
      }

      .num {
        span {
          color: #559CEE;
          font-family: YSBTH;
          font-size: 22px;
          margin-right: 6px;
        }

        color: #FFFFFF80;
        font-size: 12px;

      }

    }
  }
}

.yellow {
  color: #E0B47C !important;
}

.green {
  color: #94FBB8 !important;
}
</style>
