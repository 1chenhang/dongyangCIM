<template>
  <div class="title">
    <p v-for="(item, index) in panelTitle" :key="index" @click="panelActive(index, item)">
      <span :class="item.isActive ? 'isActive' : ''">{{ item.title }}</span>
    </p>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import $bus from '@/utils/eventBus.js'
const props = defineProps({
  title: String
})
const panelTitle = ref([])
const panelActive = (index, item) => {
  panelTitle.value.forEach((item, index2) => {
    if (index === index2) {
      item.isActive = true
    } else {
      item.isActive = false
    }
  })
  $bus.emit('panelTitle', item)
}
onMounted(() => {
  props.title.split(',').forEach((item, index) => {
    panelTitle.value.push({
      title: item,
      isActive: index === 2
    })
  })
})

</script>

<style lang="less" scoped>
.title {
  width: 428px;
  height: 45px;
  padding-left: 38px;
  padding-top: 5px;
  box-sizing: border-box;
  background-image: url('/public/image/platformOverview/标题_bg.png');
  background-size: cover;
  background-repeat: no-repeat;

  font-size: 20px;
  color: #fff;
  display: flex;
  align-items: center;

  p {
    cursor: pointer;
    margin-right: 13px;

  }

  span {
    font-family: YSBTH;
  }

  .isActive {
    background: linear-gradient(180deg, #FFFFFF 35%, #6DB1F1 82%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 22px;
  }
}
</style>
