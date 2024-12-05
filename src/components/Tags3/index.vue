<template>
  <div class="s_title">{{ props.title }}</div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  title: String
})
</script>

<style lang="less" scoped>
.s_title {
  width: 328px;
  height: 47px;
  background-image: url('/public/image//supervisingAnalysis/小标题_bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  padding-left: 56px;
  font-family: DDJBT;
  box-sizing: border-box;
  font-size: 16px;
  color: #fff;
  background-position-y: -8px;
}
</style>
