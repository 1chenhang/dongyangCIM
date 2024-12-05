<template>
    <div class="main_box">
        <div class="tabs_warpper">
            <ul class="menuBox">
                <!-- <li @click="tabsClick(item.name, index)" v-for="item in tabsList" :key="item.id"
                    :class="menu === item.name ? 'active' : ''">{{ item.name }}
                </li> -->
            </ul>
        </div>
    </div>
    <WarningAnalyse v-if="tabs === 1" />
    <IllegalDispose v-if="tabs === 2" />
    <CameraManagement v-if="tabs === 3" />
    <VideoMonitor v-if="menu === '视频监控分析'" />
    <MonitorObject v-if="menu === '监控对象统计分析'" />
</template>

<script setup>
import { ref, watch, watchEffect, onBeforeUnmount,toRefs } from 'vue'
import Tags from '@/components/Tags/index'
import WarningAnalyse from './warningAnalyse/index'
import IllegalDispose from './illegalDispose/index'
import VideoMonitor from './VideoMonitor/index'
import CameraManagement from './cameraManagement/index'
import MonitorObject from './MonitorObject/index'
import { useRoute, useRouter } from 'vue-router'
const menu = ref('预警信息分析')
const tabsList = ref([
    {
        id: 1,
        name: '预警信息分析'
    },
    {
        id: 2,
        name: '违法处置分析'
    },
    // {
    //     id: 3,
    //     name: '监控对象统计分析'
    // },
    // {
    //     id: 4,
    //     name: '视频监控分析'
    // }
])
const route = useRoute()
const {query} = toRefs(route)
const tabs = ref(1);
watch(query, async (newValue, oldValue) => {
    if(newValue.tabs){
      tabs.value = Number(newValue.tabs);
    }
}, { deep: true ,immediate:true});


const tabsClick = (name, index) => {
    menu.value = name
}

</script>

<style lang="less" scoped>
.main_box {
    position: relative;
    width: 100%;
    margin-top: 122px;
    z-index: 10;
    box-sizing: border-box;
}

.tabs_warpper {
    width: 1060px;
    height: 53px;
    margin: 0 auto;

    .menuBox {
        display: flex;
        align-items: center;
        justify-content: center;

        li {
            width: 235px;
            height: 53px;
            font-family: PMZD;
            position: relative;
            margin-right: 11px;
            color: #FFFFFF;
            font-size: 22px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            letter-spacing: 0.12em;

            &:hover {
                opacity: .8;
            }

            &:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: url('/public/image/earlyWarningAnalysis/tab_wxz.png');
                background-repeat: no-repeat;
                background-size: cover;
                z-index: -1;
            }
        }

        .active {
            width: 235px;
            height: 53px;

            &:before {
                background-image: url('/public/image/earlyWarningAnalysis/tab_xz.png');
            }

        }
    }
}
</style>
