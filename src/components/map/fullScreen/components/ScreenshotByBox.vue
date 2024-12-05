<template>
  <div>

  </div>
</template>

<script setup>
import html2canvas from 'html2canvas'
import { inject, defineExpose, ref, defineEmits } from 'vue'
import $bus from '@/utils/eventBus.js'
import { getUpload } from '@/api/index'
import { ElLoading } from 'element-plus'
const parentDomElement = inject('parentDomElement')
const videoElement = inject('videoElement')
const emits = defineEmits(['isShowPos'])
let loading
const isShowPos = ref(false)
const generateImg = (WSIMG) => {
  loading = ElLoading.service({
    lock: true,
    text: '图片取证中....',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  isShowPos.value = true
  emits('isShowPos', isShowPos.value)
  // 创建一个 canvas 用于绘制视频当前帧
  // 创建一个 Image 对象
  const img = new Image()
  img.src = WSIMG
  const Wscanvas = document.createElement('canvas')
  const ctx = Wscanvas.getContext('2d')
  // 等待图片加载完成
  img.onload = function () {
    // 设置 canvas 尺寸与图片相同
    Wscanvas.width = 885
    Wscanvas.height = 850
    // 将图片绘制到 canvas 上
    ctx.drawImage(img, 0, 0, 885, 850)
  }
  // 替换原 video 元素
  videoElement.value.style.display = 'none'
  videoElement.value.parentNode.insertBefore(Wscanvas, videoElement.value)

  const el = parentDomElement.value
  const options = {
    width: el.offsetWidth,
    height: el.offsetHeight,
    useCORS: true, // 是否尝试使用 CORS 从服务器加载图像
    allowTaint: false // 是否允许跨源图像污染画布
  }
  setTimeout(() => {
    html2canvas(el, options).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg') // 转base64
      fileDownload(imgData, Wscanvas)
    })
  }, 1000)
}

// 下载图片方法
const fileDownload = async (downloadUrl, Wscanvas) => {
  const aLink = document.createElement('a')
  aLink.style.display = 'none'
  // 以防base64过长导致下载失败，所以将base64转成blob格式
  const blob = dataURIToBlob(downloadUrl)
  aLink.href = URL.createObjectURL(blob)
  const formData = new FormData()
  const file = new File([blob], 'file', { type: 'image/png', lastModified: Date.now() })
  formData.append('file', file)
  const { data, code } = await getUpload(formData)
  if (code === '200') $bus.emit('shotImgUrl', data.url)
  isShowPos.value = false
  emits('isShowPos', isShowPos.value)
  videoElement.value.style.display = 'block'
  Wscanvas.remove()

  loading.close()
  return
  aLink.download = 'img.png'
  document.body.appendChild(aLink)
  aLink.click()
  document.body.removeChild(aLink)
}

// base64转blob方法
const dataURIToBlob = (dataURI) => {
  const binStr = atob(dataURI.split(',')[1])
  const len = binStr.length
  const arr = new Uint8Array(len)

  for (let i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i)
  }
  return new Blob([arr])
}
defineExpose({
  generateImg
})

</script>

<style lang="less" scoped></style>
