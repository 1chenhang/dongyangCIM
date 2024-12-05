<template>
  <div>
    <ul class="dateList">
      <li v-for="(item,index) in dateList" :key="item.name">
        <img :src="urlData[index] ? urlData[index].url :urlData[1]" alt="">
        <div class="text">
          <p v-html="item.name"></p> <span>{{ item.count }}</span>个
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, toRefs, watch, defineProps } from 'vue'
const urlData = ref([
  {
    url: './image/platformOverview/违法开采_icon.png'
  },
  {
    url: './image/platformOverview/违法建设_icon.png'
  },
  {
    url: './image/platformOverview/越界开采_icon.png'
  },
  {
    url: './image/platformOverview/破坏耕地_icon.png'
  },
  {
    url: './image/platformOverview/环境破坏_icon.png'
  },
  {
    url: './image/platformOverview/森林防火_icon.png'
  },
  {
    url: './image/platformOverview/地质灾害_icon.png'
  },
  {
    url: './image/platformOverview/其他_icon.png'
  }
])
const dateList = ref([])

const props = defineProps({
  yjlxData: {
    type: Array,
    default: () => []
  }
})
const { yjlxData } = toRefs(props)


watch(yjlxData, (newValue, oldValue) => {
  if (newValue.length > 0) {
    dateList.value = newValue;
  }
}, { deep: true, immediate: true })
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
