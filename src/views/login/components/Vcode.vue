<template>
  <Vcode :show="props.codeShow" @success="success" @close="close" @fail="fail"></Vcode>
</template>
<script  setup>
import { defineProps, defineEmits } from 'vue'
import Vcode from 'vue3-puzzle-vcode'
const props = defineProps({
  codeShow: {
    type: Boolean,
    default: false
  }
})
// 图片滑块验证码
const emit = defineEmits(['closeVCode', 'codeSuccess'])
// 用户通过了验证
const success = (msg) => {
  emit('codeSuccess')
  console.log('验证通过' + msg)
}
// 用户点击遮罩层，应该关闭模态框
const close = () => {
  emit('closeVCode')
}
// 用户验证失败
const fail = () => {

}
</script>
