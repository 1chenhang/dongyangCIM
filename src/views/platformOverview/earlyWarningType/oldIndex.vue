<template>
  <div>
    <ul class="dateList">
      <li v-for="item in dateList" :key="item.name">
        <img :src="item.url" alt="">
        <div class="text">
          <p v-html="item.label"></p> <span>{{ item.value }}</span>个
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const dateList = ref([
  {
    label: '违法开采',
    value: 10,
    url: './image/platformOverview/违法开采_icon.png'
  },
  {
    label: '违法建设',
    value: 10,
    url: './image/platformOverview/违法建设_icon.png'
  },
  {
    label: '越界开采',
    value: 10,
    url: './image/platformOverview/越界开采_icon.png'
  },
  {
    label: '破坏耕地',
    value: 10,
    url: './image/platformOverview/破坏耕地_icon.png'
  },
  {
    label: '环境破坏',
    value: 10,
    url: './image/platformOverview/环境破坏_icon.png'
  },
  {
    label: '森林防火',
    value: 10,
    url: './image/platformOverview/森林防火_icon.png'
  },
  {
    label: '地质灾害',
    value: 10,
    url: './image/platformOverview/地质灾害_icon.png'
  },
  {
    label: '其&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&emsp;他',
    value: 10,
    url: './image/platformOverview/其他_icon.png'
  }

])
</script>

<style lang="less" scoped>
.dateList {
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;

  li {
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 22px;
    width: 50%;

    img {
      width: 46px;
    }

    .text {
      position: absolute;
      top: 0;
      left: 19px;
      width: 184px;
      height: 38px;
      background-image: url('/public/image/platformOverview/预警类型_蓝bg.png');
      background-size: cover;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #fff;
      padding-left: 39px;
      box-sizing: border-box;

      span {
        font-family: DDT;
        font-size: 22px;
        font-weight: 700;
        margin-left: 12px;
        margin-right: 2px;

      }
    }

    &:nth-child(even) {
      .text {
        background-image: url('/public/image/platformOverview/预警类型_绿bg.png');
      }

    }
  }
}
</style>
