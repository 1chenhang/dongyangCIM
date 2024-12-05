<template>
    <div>
      
    </div>
</template>

<script setup>
import $bus from '@/utils/eventBus.js'
import { onBeforeUnmount, onMounted, nextTick, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { isEmptyObject } from '@/utils/utils'
const Route = useRoute()
const { query } = toRefs(Route)
console.log(query.value, '--Route')
let obj
if (isEmptyObject(query.value)) {
  obj = {
    cameraFullScreenObj: {},
    fullCanvasLine: {},
    screenFLag: true
  }
} else {
  if(query.value.cameraFullScreenObj){
    obj = {
      cameraFullScreenObj: JSON.parse(query.value.cameraFullScreenObj),
      fullCanvasLine: isEmptyObject(query.value.fullCanvasLine) ? {} : JSON.parse(query.value.fullCanvasLine),
      screenFLag: true
    }
  }else{
    obj = {
      cameraFullScreenObj: {},
      fullCanvasLine: {},
      screenFLag: true
    }
  }
 
}
onMounted(() => {
  nextTick(() => {
    $bus.emit('screenFLag', obj)
    $bus.on('cameraObj', (params) => {
      obj.cameraFullScreenObj = params
      $bus.emit('screenFLag', obj)
    })
  })
})
onBeforeUnmount(() => {
  obj.screenFLag = false
  $bus.off('cameraObj')
  $bus.emit('screenFLag', obj)
})
</script>

<style lang="less" scoped>

</style>
