<template>
  <div>

  </div>
</template>

<script setup>
import RecordRTC from 'recordrtc'
import { ref, defineExpose } from 'vue'
import $bus from '@/utils/eventBus.js'
import { getUpload } from '@/api/index'
// 视频录制功能开始
const recorder = ref(null)
const videoStart = ref(false)
const invokeGetDisplayMedia = (success, error) => {
  let displaymediastreamconstraints = {
    video: {
      displaySurface: 'monitor', // monitor, window, application, browser
      logicalSurface: true,
      cursor: 'always' // never, always, motion
    }
  }
  // above constraints are NOT supported YET
  // that's why overridnig them
  displaymediastreamconstraints = {
    video: true,
    audio: true
  }
  if (navigator.mediaDevices.getDisplayMedia) {
    navigator.mediaDevices
      .getDisplayMedia(displaymediastreamconstraints)
      .then(success)
      .catch(error)
  } else {
    navigator.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error)
  }
}
const captureScreen = (callback) => {
  invokeGetDisplayMedia(
    screen => {
      addStreamStopListener(screen, () => {
        //
      })
      callback(screen)
    },
    function (error) {
      console.error(error)
      alert('Unable to capture your screen. Please check console logs.\n' + error)
    }
  )
}
const addStreamStopListener = (stream, callback) => {
  stream.addEventListener(
    'ended',
    function () {
      callback()
      callback = function () { }
    },
    false
  )
  stream.addEventListener(
    'inactive',
    function () {
      callback()
      callback = function () { }
    },
    false
  )
  stream.getTracks().forEach(track => {
    track.addEventListener(
      'ended',
      () => {
        stopRecording()
        callback()
        callback = function () { }
      },
      false
    )
    track.addEventListener(
      'inactive',
      function () {
        callback()
        callback = function () { }
      },
      false
    )
  })
}
const startRecording = () => {
  captureScreen(screen => {
    recorder.value = RecordRTC(screen, {
      type: 'video',
      mimeType: 'video/webm'
    })
    recorder.value.startRecording()
    // release screen on stopRecording
    recorder.value.screen = screen
    videoStart.value = true
  })
}
const stopRecordingCallback = async () => {
  // 如果需要下载录屏文件可加上下面代码
  const blob = recorder.value.getBlob()
  const url = URL.createObjectURL(blob)
  const formData = new FormData()
  const file = new File([blob], 'file', { type: 'mp4', lastModified: Date.now(), size: recorder.value.getBlob().size })
  formData.append('file', file)
  const { data, code } = await getUpload(formData)
  if (code === '200')$bus.emit('screenVideoSrc', data.url)
  recorder.value.screen.stop()
  recorder.value.destroy()
  recorder.value = null
  videoStart.value = false
  return
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.style.display = 'none'
  a.href = url
  a.download = new Date() + '.mp4'
  a.click()
  window.URL.revokeObjectURL(url)
  // 以上是下载所需代码
  recorder.value.screen.stop()
  recorder.value.destroy()
  recorder.value = null
  videoStart.value = false
}
const stopRecording = () => {
  recorder.value.stopRecording(stopRecordingCallback)
}

defineExpose({
  startRecording,
  stopRecording
})
</script>

<style lang="less" scoped></style>
