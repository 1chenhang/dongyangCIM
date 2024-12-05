<template>
  <div :class="['leftBannerBox', bannerFlag ? '' : 'closeLeftBanner']">
    <Tags class="mt10" title="预警研判" />
    <LeftTable />
  </div>
  <div :class="['rightBannerBox', bannerFlag ? '' : 'closeRightBanner']">
    <div class="tabBox">
        <div class="btnBOx" @click="handlerShow">
            <Setting />预警设置
        </div>
    </div>
    <Tags2 class="mt10" title="图片,视频,实时监控" />
    <SurveillanceVideo />
    <Tags class="mt10" title="地块信息" />
    <LandDetail />
  </div>

  <BaseDialog1 style="z-index: 99999;" v-if="alarmConfigDialog" @closeDialog="alarmConfigDialog = false"
    :styles="earlyWaringStyles3" :title="'预警配置'">
    <template v-slot:content>
      <AlarmConfig />
    </template>
  </BaseDialog1>
</template>

<script setup>
import BaseDialog1 from '@/components/BaseDialog1'
import Tags from '@/components/Tags/index'
import Tags2 from '@/components/Tags2/index'
import LeftTable from './leftTable/index'
import SurveillanceVideo from './surveillanceVideo/index'
import LandDetail from './landDetail/index'
import { ref, onMounted } from 'vue'
import emitter from '@/utils/eventBus'
import AlarmConfig from '../earlyWarningAnalysis/surveillanceVideo/components/alarmConfig.vue'
const bannerFlag = ref(true)
const alarmConfigDialog = ref(false)
const earlyWaringStyles3 = ref({
  width: '1000px',
  top: '15%',
  left: '15%'
})

onMounted(async () => {
  emitter.on('bannerFlag', (e) => {
    bannerFlag.value = e
  })
})

const handlerShow = () => {
  alarmConfigDialog.value = true
}
</script>

<style lang="less" scoped>
.mt10 {
  margin-top: 10px;
}

.leftBannerBox {
  width: 468px;
  box-sizing: border-box;
  padding-left: 44px;
  position: absolute;
  top: 111px;
  left: 0px;
  z-index: 10;
  transition: all .3s;
}

.rightBannerBox {
  position: absolute;
  top: 111px;
  right: 0;
  width: 468px;
  z-index: 10;
  box-sizing: border-box;
  padding-right: 44px;
  overflow: hidden;
  transition: all .3s;
}

.closeLeftBanner {
  left: -468px;
}

.closeRightBanner {
  right: -468px;
}

.tabBox {
        .btnBOx{
                width:  100px;
                height: 28px;
                background: linear-gradient(180deg, rgba(1, 51, 79, 0.8) 0%, rgba(19, 169, 234, 0.8) 100%);
                border-radius: 4px;
                border: 1px solid #318CDF;
                line-height: 28px;
                text-align: center;
                font-size: 14px;
                color: #fff;
                border: 1px solid #14567B;
                border-left: none;
                cursor: pointer;
                transition: all .3s;
                margin-right: 20px;
                &:hover {
                    filter: brightness(150%);
                }

                &:first-child {
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                    border-left: 1px solid #14567B;
                }

                &:last-child {
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                }
                svg{
                    display: inline-block;
                    vertical-align: middle;
                    margin-top: -2px;
                    width: 20px;
                    height: 20px;
                    margin-right: 3px
                }
        }
    }
</style>
