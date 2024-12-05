<template>
  <div class="wrapper">
    <div class="flexBox">
      <Tags class="mt5" title="视频监控摄像分析"></Tags>
      <div class="tabBox">
        <div class="btnBOx">
            <FolderAdd />导出统计报表
        </div>
        <p class="timeText">统计时间：{{ time }}</p>
        <ul class="tab">
          <li @click="tabClick(item)" v-for="item in tabData" :key="item.label"
            :class="isTabActive === item.id ? 'tabActive' : ''">{{ item.label }}</li>
        </ul>
      </div>
    </div>
    <div class="contentBox">
      <div class="bgBox">
        <Tags3 title="视频监控摄像分析"></Tags3>
        <SPJKFX />
      </div>
      <div class="bgBox">
        <Tags3 title="识别分析情况"></Tags3>
        <SBFXQK :timeQuery="timeQuery" />
      </div>
      <div class="bgBox">
        <Tags3 title="故障数量"></Tags3>
        <GZSL :timeQuery="timeQuery" />
      </div>
    </div>
  </div>

</template>

<script setup>
import Tags from '@/components/Tags/index'
import Tags3 from '@/components/Tags3/index'
import SPJKFX from './SPJKFX/index'
import SBFXQK from './SBFXQK/echarts.vue'
import GZSL from './GZSL/echarts.vue'
import { timeline } from '@/utils/utils'
import { onMounted, ref } from 'vue'
const isTabActive = ref(1)
const tabData = ref([
  {
    label: '实时',
    id: 1
  },
  {
    label: '昨天',
    id: 2
  },
  {
    label: '7天',
    id: 3
  },
  {
    label: '30天',
    id: 4
  },
  {
    label: '自定义',
    id: 5
  }
])
const timeQuery = ref({
  startDate: timeline('year-week-day'),
  endDate: timeline('year-week-day')
})
const time = ref(timeline('year-week-day'))
const tabClick = ({ id, label }) => {
  isTabActive.value = id
  timeQuery.value.endDate = time.value
  switch (label) {
    case '实时':
      timeQuery.value.startDate = time.value
      break
    case '昨天':
      timeQuery.value.startDate = timeline('beforeDay')
      break
    case '7天':
      timeQuery.value.startDate = timeline('beforeWeek')
      break
    case '30天':
      timeQuery.value.startDate = timeline('beforeMonth')
      break
  }
  console.log(timeQuery.value, '--timeQuery')
}

</script>

<style lang="less" scoped>
.wrapper {
  position: relative;
  z-index: 10;
  width: 1830px;
  height: 858px;
  background-image: url('/public/image/supervisingAnalysis/bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  margin: 19px auto;
  padding: 25px 39px;
  box-sizing: border-box;

  .flexBox {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tabBox {
      display: flex;
      align-items: center;

      .timeText {
        font-size: 14px;
        color: #fff;
        margin-right: 15px;
      }

      .tab {
        display: flex;
        align-items: center;

        li {
          width: 61px;
          height: 28px;
          background: #07518066;
          line-height: 28px;
          text-align: center;
          font-size: 14px;
          color: #fff;
          border: 1px solid #14567B;
          border-left: none;
          cursor: pointer;
          transition: all .3s;

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
        }

        .tabActive {
          background: linear-gradient(180deg, rgba(1, 51, 79, 0.8) 0%, rgba(19, 169, 234, 0.8) 100%);
          border-radius: 4px;
          border: 1px solid #318CDF
        }
      }
      .btnBOx{
                width:  140px;
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
  }

  .contentBox {
    display: flex;
    margin-top: 90px;
    justify-content: space-between;

    .bgBox {
      width: 554px;
      height: 572px;
      background-image: url('/public/image/supervisingAnalysis/bg5.png');
      background-size: cover;
      background-repeat: no-repeat;

    }
  }
}
</style>
