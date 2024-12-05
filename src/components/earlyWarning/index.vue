<template>
    <div class="toolBox" v-if="currentPath.path !== '/earlyWarningAnalysis'">
        <img @click="skipEarlyWarning" src="../../../public/image/cctv1.png" class="pulsate" />
    </div>
    <BaseDialog1 v-if="massifDialog" @closeDialog="massifDialog = false" :styles="massifStyles" :title="'预警消息通知'">
        <template v-slot:content>
          <earlyWaringMessage :earlyWaringList="earlyWaringList"/>
        </template>
    </BaseDialog1>
</template>
  
<script setup>
import { provide, ref, onMounted, onUnmounted, watch } from 'vue'
import $bus from '@/utils/eventBus.js'
import { useRoute, useRouter } from 'vue-router'
import BaseDialog1 from '@/components/BaseDialog1'
import earlyWaringMessage from './earlyWaringMessage.vue'
import { unreadData, updateReadStatus } from '@/api/camera'
const Router = useRouter()
let pollInterval;
const earlyWaringList = ref([]);

const massifStyles = ref({
  width: '20%',
  height:'30%',
  top: '40%',
  right: '30%'
})
const massifDialog = ref(false)

const getAlarmListPage = async ()=>{
    let res = await unreadData({});
    earlyWaringList.value = res.data;
}

onMounted(() => {
    $bus.on('closeEarlyMessageDilog',()=>{
        massifDialog.value = false;
    })
    $bus.on('closeEarlyMessageDilog2',()=>{
        getAlarmListPage();
    })
    getAlarmListPage();
    pollInterval = setInterval(getAlarmListPage, 60000); // 每1分钟秒轮询一次
})
const currentPath = ref();
watch(() => Router.currentRoute.value,
    (newValue) => {
        currentPath.value = newValue;
    },
    { immediate: true, deep: true }
)
const skipEarlyWarning = () => {
    massifDialog.value = true;
    //Router.push('/earlyWarningAnalysis')
}
onUnmounted(() => {
    // 清除轮询
    clearInterval(pollInterval);
})
</script>
  
<style lang="less" scoped>
.toolBox {
    position: absolute;
    right: 492px;
    bottom: 49px;
    z-index: 11;

    img {
        width: 58px;
        height: 46px;
        cursor: pointer;
    }

}

/* 定义动画 */
@keyframes pulsate {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}

/* 应用动画到图片元素 */
img.pulsate {
    animation: pulsate 2s infinite;
    display: block;
    margin: auto;
    /* 可选：添加平滑动画 */
    transition: transform 0.5s ease-in-out;
}</style>
  