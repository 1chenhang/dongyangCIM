<template>
  <screen-short @destroy-component="destroyComponent" @get-image-data="completeCallback"></screen-short>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'
const emit = defineEmits(['closeScreenShot'])
const destroyComponent = (status) => {
  emit("closeScreenShot")
}
const completeCallback = async (base64data) => {
  console.log(base64data, '--base64data');
  const bytes = window.atob(base64data.split(',')[1]);
  const buffer = new ArrayBuffer(bytes.length);
  const uint = new Uint8Array(buffer);
  for (let j = 0; j < bytes.length; j++) {
    uint[j] = bytes.charCodeAt(j);
  }
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  // 下载图片
  var link = document.createElement("a");
  var url = URL.createObjectURL(blob);
  link.href = url;
  link.download = "image.png"; // 设置下载文件名
  document.body.appendChild(link); // 将链接添加到页面
  link.click(); // 触发下载
  document.body.removeChild(link); // 下载完成后移除链接
  URL.revokeObjectURL(url); // 释放 URL 对象

  // const formData = new FormData();
  // formData.append('file', blob, `${+new Date()}.jpeg`);
  //  const res = await fileUpload(formData);

}
onMounted(() => {

})

</script>

<style lang="less" scoped></style>