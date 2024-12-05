<template>
  <div class="wrapperBox">
      <div class="ruler-container" ref="rulerContainer" @scroll="handleScroll">
    <div class="ruler" ref="ruler">
      <div
        v-for="i in ticks"
        :key="i"
        class="tick"
        :style="{ bottom: `${i * tickSpacing}px` }"
      >
        <div class="tick-mark w30" v-if="i % 10 === 0"></div>
        <div class="tick-mark w20" v-else-if ="i % 5 === 0"></div>
        <div class="tick-mark" v-else></div>
        <div class="tick-label" v-if="i % 10 === 0">{{ i + min }}</div>
      </div>
    </div>

  </div>
  <div class="indicator"></div>
  </div>

</template>

<script setup>
import { ref, onMounted, nextTick, defineEmits, defineExpose } from 'vue'

const min = -360
const max = 360
const tickSpacing = 10
const ticks = ref([])
const rulerContainer = ref(null)
const ruler = ref(null)
const currentValue = ref(0)
const emit = defineEmits(['handleScroll'])
onMounted(() => {
  nextTick(() => {
    const numberOfTicks = (max - min)
    ticks.value = Array.from({ length: numberOfTicks }, (_, i) => i)
    if (rulerContainer.value) {
      rulerContainer.value.scrollTop = ((numberOfTicks / 2) * tickSpacing) + 2400
    }
  })
})

const handleScroll = () => {
  const scrollTop = rulerContainer.value.scrollTop
  const currentTick = Math.round(scrollTop / tickSpacing)
  currentValue.value = -(currentTick + min - 240)
  emit('handleScroll', currentValue.value)
}
const getZero = () => {
  const numberOfTicks = (max - min)
  if (rulerContainer.value) {
    rulerContainer.value.scrollTop = ((numberOfTicks / 2) * tickSpacing) + 2400
  }
}

defineExpose({
  getZero
})
</script>

<style lang="less" scoped>
.wrapperBox{
  position: relative;
  width: 100px;
}
.ruler-container {
  position: relative;
  width: 100%;
  height: 776px;
  overflow-y: scroll;
  &::-webkit-scrollbar { width: 0 !important }
}

.ruler {
  position: relative;
  height: 10000px; /* Ensure it's tall enough to scroll */
}

.tick {
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
}

.tick-mark {
  width: 10px;
  height: 1px;
  background-color: #fff;
  margin-left: 10px;
}
.w20{
  width: 20px;
}
.w30{
  width: 30px;
}
.tick-label {
  margin-left: 5px;
  font-size: 16px;
  position: absolute;
  left: 50px;
  color: #fff;
}

.indicator {
  position: absolute;
  top: 51%;
  left: 10px;
  background-color: #2C76F3;
  height: 5px;
  width: 30px;
  pointer-events: none;
}
</style>
